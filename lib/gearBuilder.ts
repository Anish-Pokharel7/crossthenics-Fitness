import { unifiedCatalog, type UnifiedProduct } from "@/lib/catalog";

export const setupStyles = [
  "Powerlifting",
  "Calisthenics",
  "Gym-to-work",
  "Everyday training",
] as const;

export type SetupStyle = (typeof setupStyles)[number];

const setupProductIds: Record<SetupStyle, string[]> = {
  Powerlifting: ["10", "11", "4", "6"],
  Calisthenics: ["3", "4", "6", "latest-6", "latest-7"],
  "Gym-to-work": ["bag-1", "5", "4"],
  "Everyday training": ["1", "2", "4", "5"],
};

const setupDescriptions: Record<SetupStyle, string> = {
  Powerlifting: "A focused selection of belts and grip products for barbell training.",
  Calisthenics: "Weighted-training and grip accessories selected for bodyweight work.",
  "Gym-to-work": "Carry options and practical training accessories for the commute.",
  "Everyday training": "Flexible carry and training essentials for a regular gym routine.",
};

export function getSetupProducts(style: SetupStyle): UnifiedProduct[] {
  const ids = new Set(setupProductIds[style]);
  return unifiedCatalog.filter((product) => ids.has(String(product.id)) && product.inStock);
}

export function getSetupDescription(style: SetupStyle): string {
  return setupDescriptions[style];
}
