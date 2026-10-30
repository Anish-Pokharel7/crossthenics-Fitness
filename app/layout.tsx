import { AppShell } from "@/components/layout/AppShell";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { AuthProvider } from "@/lib/auth/AuthContext";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Crossthenics Fitness | Premium Athletic & Strength Equipment Nepal",
  description:
    "Performance lifting belts, tactical 45L backpacks, calisthenics hardware, and pure grip chalk engineered for athletes in Nepal. Dispatched from Pokhara.",
  keywords: [
    "lifting belt nepal",
    "tactical backpack 45L nepal",
    "crossthenics fitness",
    "gym chalk nepal",
    "calisthenics equipment nepal",
  ],
  openGraph: {
    title: "Crossthenics Fitness | Premium Athletic Equipment Nepal",
    description:
      "Engineered lifting belts, tactical packs, and competition calisthenics gear. Dispatched across all 7 provinces of Nepal.",
    url: "https://crossthenics-fitness.vercel.app/",
    siteName: "Crossthenics Fitness",
    locale: "en_NP",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <ThemeProvider>
          <AuthProvider>
            <AppShell>{children}</AppShell>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
