import { CartProvider } from "@/components/CartProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { getCategories } from "@/lib/products";

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  const categories = getCategories();

  return (
    <CartProvider>
      <Header categories={categories} />
      <main className="flex-1">{children}</main>
      <Footer categories={categories} />
      <CartDrawer />
    </CartProvider>
  );
}
