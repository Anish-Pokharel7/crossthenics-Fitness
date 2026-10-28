import { fontClass } from "@/lib/fonts";

export function Fonts({ children }: { children: React.ReactNode }) {
  return <div className={fontClass}>{children}</div>;
}


