import { ADMIN_SESSION_COOKIE, verifyAdminSession } from "@/lib/auth/adminSession";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

export default async function AdminApplicationLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = (await cookies()).get(ADMIN_SESSION_COOKIE)?.value;
  if (!verifyAdminSession(session)) {
    redirect("/admin-login?redirect=/admin/dashboard");
  }

  return children;
}
