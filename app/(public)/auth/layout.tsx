import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication | Crossthenics Fitness",
  description: "Sign in or create your athlete account for Crossthenics Fitness",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative min-h-screen w-full flex items-center justify-center overflow-hidden px-4 py-24 sm:py-32">
      {/* Subtle grid pattern — local decoration, not atmospheric */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)",
          backgroundSize: "48px 48px"
        }}
      />

      <div className="relative z-10 w-full flex items-center justify-center">
        {children}
      </div>
    </main>
  );
}
