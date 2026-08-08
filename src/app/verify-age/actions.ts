"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

function isValidNextPath(path: string | null): path is string {
  return !!path && path.startsWith("/") && !path.startsWith("//");
}

export async function verifyAge(formData: FormData) {
  const month = Number(formData.get("month"));
  const day = Number(formData.get("day"));
  const year = Number(formData.get("year"));
  const nextRaw = formData.get("next");
  const next = isValidNextPath(nextRaw as string) ? (nextRaw as string) : "/";

  const dob = new Date(year, month - 1, day);
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age--;
  }

  const validDate =
    !Number.isNaN(dob.getTime()) &&
    dob.getMonth() === month - 1 &&
    dob.getDate() === day;

  if (!validDate || age < 21) {
    redirect("/verify-age/blocked");
  }

  const cookieStore = await cookies();
  cookieStore.set("cl_age_verified", "true", {
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
    sameSite: "lax",
  });

  redirect(next);
}
