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
          __html: `(()=>{if(!location.pathname.startsWith("/admin/"))return;const root=document.documentElement;root.classList.add("admin-theme");let theme;try{theme=localStorage.getItem("crossthenics-admin-theme")}catch{}if(theme!=="silver"&&theme!=="charcoal"){theme=window.matchMedia("(prefers-color-scheme: light)").matches?"silver":"charcoal"}root.classList.toggle("admin-light",theme==="silver")})();`,
        }}
      />
      {children}
    </>
  );
}
