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

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `(()=>{if(!location.pathname.startsWith("/admin/"))return;const root=document.documentElement;root.classList.add("admin-theme");try{root.classList.toggle("admin-light",localStorage.getItem("crossthenics-admin-theme")==="silver")}catch{root.classList.remove("admin-light")}})();`,
        }}
      />
      {children}
    </>
  );
}
