import { NextResponse } from "next/server";
import { z } from "zod";
import { getStripe, isStripeConfigured } from "@/lib/stripe";
import { getProductsByIds } from "@/lib/products";

const CheckoutSchema = z.object({
  lines: z
    .array(
      z.object({
        id: z.string(),
        quantity: z.number().int().min(1).max(48),
      })
    )
    .min(1),
  fulfillment: z.enum(["pickup", "delivery"]),
  name: z.string().min(1).max(200),
  email: z.string().email(),
  phone: z.string().min(7).max(30),
  address: z.string().max(300).optional(),
});

export async function POST(request: Request) {
  if (!isStripeConfigured()) {
    return NextResponse.json(
      {
        error:
          "Payment processing is not yet configured for this store. Add STRIPE_SECRET_KEY (and NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) to your environment to enable checkout.",
      },
      { status: 501 }
    );
  }

  const body = await request.json().catch(() => null);
  const parsed = CheckoutSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid checkout request." },
      { status: 400 }
    );
  }
  const { lines, fulfillment, name, email, phone, address } = parsed.data;

  if (fulfillment === "delivery" && !address) {
    return NextResponse.json(
      { error: "A delivery address is required for local delivery." },
      { status: 400 }
    );
  }

  const ids = lines.map((l) => l.id);
  const products = getProductsByIds(ids);
  const productMap = new Map(products.map((p) => [p.id, p]));

  const lineItems = [];
  for (const line of lines) {
    const product = productMap.get(line.id);
    if (!product) {
      return NextResponse.json(
        { error: `Product ${line.id} is no longer available.` },
        { status: 400 }
      );
    }
    if (!product.orderable) {
      return NextResponse.json(
        {
          error: `${product.name} is an age-restricted item available for in-store purchase only.`,
        },
        { status: 400 }
      );
    }
    lineItems.push({
      quantity: line.quantity,
      price_data: {
        currency: "usd",
        unit_amount: Math.round(product.price * 100),
        product_data: {
          name: `${product.name} (${product.size})`,
          metadata: { productId: product.id },
        },
      },
    });
  }

  const stripe = getStripe()!;
  const origin =
    request.headers.get("origin") ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    "http://localhost:3000";

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      customer_email: email,
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout/cancel`,
      metadata: {
        fulfillment,
        contactName: name,
        contactPhone: phone,
        deliveryAddress: fulfillment === "delivery" ? address ?? "" : "",
        ageAttestation: "customer confirmed 21+ at checkout",
      },
    });

    return NextResponse.json({ url: session.url });
  } catch {
    return NextResponse.json(
      { error: "Unable to start checkout. Please try again." },
      { status: 500 }
    );
  }
}
