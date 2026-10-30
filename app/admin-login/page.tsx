import AdminLoginForm from "@/components/auth/AdminLoginForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Sign In | Crossthenics Fitness",
  robots: { index: false, follow: false },
};

type AdminLoginPageProps = {
  searchParams: Promise<{ redirect?: string }>;
};

export default async function AdminLoginPage({
  searchParams,
}: AdminLoginPageProps) {
  const { redirect: requestedRedirect } = await searchParams;
  const returnTo =
    requestedRedirect?.startsWith("/admin/") &&
    !requestedRedirect.startsWith("//")
      ? requestedRedirect
      : "/admin/dashboard";

  return <AdminLoginForm returnTo={returnTo} />;
}
