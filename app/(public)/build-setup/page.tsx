import GearBuilder from "@/components/sections/GearBuilder";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Build Your Setup | Crossthenics Fitness",
  description:
    "Choose training equipment from the Crossthenics catalog and add a complete selection to your cart.",
};

export default function BuildSetupPage() {
  return <GearBuilder />;
}
