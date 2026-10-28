import React from "react";
import { cn } from "@/lib/utils";

export type GlowOrbVariant = "red" | "orange" | "white" | "crimson" | "dark";
export type GlowOrbSize = "sm" | "md" | "lg" | "xl" | "2xl" | "hero";
export type GlowOrbBlur = "sm" | "md" | "lg" | "xl" | "2xl";
export type GlowOrbAnimation = "pulse" | "float" | "drift" | "none";

export interface GlowOrbProps {
  variant?: GlowOrbVariant;
  size?: GlowOrbSize;
  blur?: GlowOrbBlur;
  animation?: GlowOrbAnimation;
  className?: string;
  style?: React.CSSProperties;
}

const sizeClasses: Record<GlowOrbSize, string> = {
  sm: "h-48 w-48",
  md: "h-80 w-80",
  lg: "h-[450px] w-[450px]",
  xl: "h-[600px] w-[600px]",
  "2xl": "h-[800px] w-[800px]",
  hero: "h-[75vh] w-[110vw] max-w-[1300px]",
};

const blurClasses: Record<GlowOrbBlur, string> = {
  sm: "blur-[50px]",
  md: "blur-[80px]",
  lg: "blur-[110px]",
  xl: "blur-[140px]",
  "2xl": "blur-[170px]",
};

const variantClasses: Record<GlowOrbVariant, string> = {
  red: "orb-red",
  orange: "orb-orange",
  white: "orb-white",
  crimson: "orb-crimson",
  dark: "orb-dark",
};

const animationClasses: Record<GlowOrbAnimation, string> = {
  pulse: "animate-orb-pulse",
  float: "animate-orb-float",
  drift: "animate-orb-drift",
  none: "",
};

export function GlowOrb({
  variant = "red",
  size = "md",
  blur = "lg",
  animation = "none",
  className,
  style,
}: GlowOrbProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "glow-orb",
        sizeClasses[size],
        blurClasses[blur],
        variantClasses[variant],
        animationClasses[animation],
        className
      )}
      style={style}
    />
  );
}

export default GlowOrb;


