import type { StaticImageData } from "next/image";
import lift1 from "@/public/p-image/liftingbelts.webp";
import backpk from "@/public/p-image/backpack.webp";
import rope from "@/public/p-image/prorope.webp";
import chalk from "@/public/p-image/gripchalk.webp";
import sideb from "@/public/p-image/sidebag.webp";
import chalk2 from "@/public/p-image/powdergp.webp";
import belt2 from "@/public/p-image/belt2.webp";
import belt3 from "@/public/p-image/belt3.webp";
import belt4 from "@/public/p-image/belt4.webp";
import belt5 from "@/public/p-image/belt5.webp";
import bkbp2 from "@/public/p-image/bkpk2.webp";
import bkpk3 from "@/public/p-image/bkpk3.webp";
import bkpk4 from "@/public/p-image/bkpk4.webp";
import bkpk5 from "@/public/p-image/bkpk5.webp";
import bkpk6 from "@/public/p-image/bkpk6.webp";
import bkpk7 from "@/public/p-image/bkpk7.webp";
import Rchain from "@/public/p-image/Rchain.webp";
import CRB from "@/public/p-image/carabiner.webp";

export interface UnifiedProduct {
  id: string | number;
  name: string;
  price: number;
  category: "Lifting Belts" | "Tactical Carry" | "Calisthenics" | "Grip & Accessories";
  description: string;
  fullDescription: string;
  specs: { label: string; value: string }[];
  sizes?: string[];
  image: string | StaticImageData;
  badge?: string;
  inStock: boolean;
  dispatchTime: string;
  highlights: string[];
}

export const unifiedCatalog: UnifiedProduct[] = [
  {
    id: 1,
    name: "Velcro Patch Hybrid Belt",
    price: 3800,
    category: "Lifting Belts",
    badge: "Bestseller",
    description: "Crossthenics self-locking hybrid lifting belt with steel roller buckle and velcro lock.",
    fullDescription: "Engineered for rapid transitions between heavy barbell sets and high-intensity calisthenics. Features a proprietary quick-release steel roller buckle reinforced with high-tensile ripstop nylon and industrial velcro.",
    sizes: ["Small (28-32\")", "Medium (32-36\")", "Large (36-40\")", "X-Large (40-44\")"],
    specs: [
      { label: "Hardware", value: "Quick-Lock Steel Roller Buckle" },
      { label: "Material", value: "High-Tensile Reinforced Nylon" },
      { label: "Width", value: "4-Inch Uniform Contour" },
      { label: "Closure", value: "Dual Lock (Velcro + Steel)" },
      { label: "Warranty", value: "1-Year Hardware Guarantee" },
    ],
    highlights: [
      "Instant one-hand tension release between sets",
      "Ergonomic contour supports lumbar without rib impingement",
      "Heavy-duty industrial velcro rated for 5,000+ open-close cycles",
      "Complies with regional raw powerlifting standards"
    ],
    image: lift1,
    inStock: true,
    dispatchTime: "Dispatched within 24 hours from Pokhara",
  },
  {
    id: 2,
    name: "45L Tactical Backpack (Lake Blue)",
    price: 7500,
    category: "Tactical Carry",
    badge: "Bestseller",
    description: "Rugged 45-liter athlete pack with isolated shoe compartment and water-resistant Oxford 900D build.",
    fullDescription: "Constructed from high-density 900D Oxford fabric with water-resistant PU internal backing. Features a 180-degree clamshell opening, modular laser-cut MOLLE webbing, and a ventilated bottom chamber for training shoes or damp wraps.",
    sizes: ["Standard 45L (48 x 34 x 29 cm)"],
    specs: [
      { label: "Volume", value: "45 Liters" },
      { label: "Fabric", value: "Water-Resistant 900D Oxford" },
      { label: "Zippers", value: "Dual Heavy-Gauge SBS Sliders" },
      { label: "Compartments", value: "4 Main Chambers + Shoe Tunnel" },
      { label: "Laptop Sleeve", value: "Padded up to 17 inches" },
    ],
    highlights: [
      "Full 180-degree clamshell opening for fast packing",
      "Isolated bottom ventilation pocket for lifting shoes",
      "Water-resistant interior polyurethane lining",
      "Laser-cut MOLLE system for modular attachments"
    ],
    image: backpk,
    inStock: true,
    dispatchTime: "Dispatched within 24 hours from Pokhara",
  },
  {
    id: 3,
    name: "Pro Rope Dip Belt",
    price: 3900,
    category: "Calisthenics",
    badge: "Featured",
    description: "Heavy-gauge woven rope dip belt with 36-inch zinc-coated steel chain and carabiner.",
    fullDescription: "Specifically developed for weighted pull-ups, dips, and belt squats. Unlike rigid leather belts that pinch hips, the flexible woven harness conforms comfortably to the pelvis while supporting extreme loads.",
    sizes: ["One Size Fits All (Contoured 34-inch back support)"],
    specs: [
      { label: "Chain Length", value: "36-Inch Zinc-Plated Steel" },
      { label: "Harness", value: "Multi-Ply Woven High-Load Rope" },
      { label: "Load Capacity", value: "Tested up to 150 kg" },
      { label: "Hardware", value: "Locking Steel Carabiner Included" },
    ],
    highlights: [
      "Zero hip pinch under heavy multi-plate loads",
      "Includes 36-inch industrial steel link chain",
      "Heavy-duty locking screw carabiner included",
      "Reinforced eyelets with dual box stitching"
    ],
    image: rope,
    inStock: true,
    dispatchTime: "Dispatched within 24 hours from Pokhara",
  },
  {
    id: 4,
    name: "Power Grip Chalk (100g Block)",
    price: 700,
    category: "Grip & Accessories",
    badge: "Pure Grip",
    description: "100% pure magnesium carbonate solid block for gymnastics rings, barbells, and pull-up bars.",
    fullDescription: "Premium dense block chalk containing zero fillers, scent agents, or drying binders. Provides maximum friction by absorbing palm sweat instantly, preventing dangerous slippage during heavy lifts or muscle-up transitions.",
    sizes: ["100g Solid Block"],
    specs: [
      { label: "Compound", value: "100% Pure Magnesium Carbonate" },
      { label: "Weight", value: "100 Grams Solid Block" },
      { label: "Residue", value: "Ultra-Fine Low Dust Grind" },
      { label: "Ideal For", value: "Calisthenics, Powerlifting, Climbing" },
    ],
    highlights: [
      "Absorbs perspiration immediately for rock-solid friction",
      "Firm block minimizes crumb waste inside gym bags",
      "Non-toxic formula free of synthetic fillers",
      "Protects calluses against skin tearing"
    ],
    image: chalk,
    inStock: true,
    dispatchTime: "Dispatched within 24 hours from Pokhara",
  },
  {
    id: 5,
    name: "Tactical Crossbody Side Bag",
    price: 1800,
    category: "Tactical Carry",
    badge: "Essential",
    description: "Compact dual-compartment cross-body bag for chalk containers, phone, straps, and daily essentials.",
    fullDescription: "Compact and rugged, built for gym sessions and everyday carry. Keeps your phone, lifting straps, liquid chalk, keys, and wallet securely organized and readily accessible.",
    sizes: ["One Size (22 x 16 x 8 cm)"],
    specs: [
      { label: "Material", value: "Water-Resistant 600D Polyester" },
      { label: "Strap", value: "Adjustable Quick-Release Webbing" },
      { label: "Pockets", value: "Main Chamber + Front Zipper + Inner Mesh" },
    ],
    highlights: [
      "Heavy-duty adjustable shoulder strap",
      "Weather-resistant exterior coating",
      "Internal divider pocket for valuables"
    ],
    image: sideb,
    inStock: true,
    dispatchTime: "Dispatched within 24 hours from Pokhara",
  },
  {
    id: 6,
    name: "Grip Powder Chalk (250g Pouch)",
    price: 1500,
    category: "Grip & Accessories",
    description: "Fine-grain magnesium carbonate powder in a resealable zip pouch for high-volume gym use.",
    fullDescription: "Bulk 250g resealable bag of pure magnesium powder. Ideal for refilling chalk bags, gym chalk buckets, or applying directly to hands and barbell knurling.",
    sizes: ["250g Resealable Pouch"],
    specs: [
      { label: "Compound", value: "100% Magnesium Carbonate" },
      { label: "Weight", value: "250 Grams" },
      { label: "Packaging", value: "Airtight Resealable Heavy Pouch" },
    ],
    highlights: [
      "Airtight resealable pouch prevents moisture absorption",
      "Fine grind for immediate uniform skin coverage",
      "High volume value pack for serious athletes"
    ],
    image: chalk2,
    inStock: true,
    dispatchTime: "Dispatched within 24 hours from Pokhara",
  },
  {
    id: 7,
    name: "Velcro Patch Hybrid Belt (Blackout)",
    price: 3800,
    category: "Lifting Belts",
    description: "Stealth matte blackout edition of our self-locking nylon lifting belt with patch velcro.",
    fullDescription: "Featuring matte black hardware and all-black stitching. Designed for athletes seeking understated aesthetics with uncompromising intra-abdominal pressure support.",
    sizes: ["Small (28-32\")", "Medium (32-36\")", "Large (36-40\")", "X-Large (40-44\")"],
    specs: [
      { label: "Hardware", value: "Blackout Steel Roller Buckle" },
      { label: "Material", value: "Reinforced 4-Inch Nylon" },
      { label: "Warranty", value: "1-Year Hardware Guarantee" },
    ],
    highlights: [
      "Subtle matte black finish with velcro patch zone",
      "Reliable lock prevents accidental pops mid-rep",
      "Lightweight and easily rollable for gym bag storage"
    ],
    image: lift1,
    inStock: true,
    dispatchTime: "Dispatched within 24 hours from Pokhara",
  },
  {
    id: 8,
    name: "Adjustable Contoured Belt",
    price: 4200,
    category: "Lifting Belts",
    description: "Ergonomic lumbar-support lifting belt with dual-prong adjustable tension buckle.",
    fullDescription: "Provides enhanced lumbar stabilization while tapering naturally around the flanks to avoid restricting movement during cleans, snatches, or deep squats.",
    sizes: ["Small (28-32\")", "Medium (32-36\")", "Large (36-40\")", "X-Large (40-44\")"],
    specs: [
      { label: "Hardware", value: "Dual Steel Prong Buckle" },
      { label: "Contour", value: "Widened 5-Inch Lumbar Support" },
      { label: "Padding", value: "High-Density EVA Foam Core" },
    ],
    highlights: [
      "5-inch widened lumbar support area",
      "Dual steel prongs distribute strain evenly across strap holes",
      "Beveled edge binding eliminates skin chafing"
    ],
    image: belt2,
    inStock: true,
    dispatchTime: "Dispatched within 24 hours from Pokhara",
  },
  {
    id: 9,
    name: "Weightlifting Buckle Belt",
    price: 4500,
    category: "Lifting Belts",
    description: "Durable multi-ply belt with reinforced steel buckle designed for heavy training sessions.",
    fullDescription: "A durable hybrid belt designed for heavy squat and deadlift sessions. Combines firm structured support with ease of tension adjustment.",
    sizes: ["Small (28-32\")", "Medium (32-36\")", "Large (36-40\")", "X-Large (40-44\")"],
    specs: [
      { label: "Buckle", value: "Solid Steel Roller Buckle" },
      { label: "Thickness", value: "7.5mm Composite Core" },
      { label: "Stitching", value: "Triple Row Nylon Thread" },
    ],
    highlights: [
      "Rigid core prevents lumbar hyper-extension",
      "Seamless steel roller glides smoothly during tightening",
      "Reinforced heavy-duty belt tongue"
    ],
    image: belt3,
    inStock: true,
    dispatchTime: "Dispatched within 24 hours from Pokhara",
  },
  {
    id: 10,
    name: "Powerlifting Lever Belt",
    price: 5000,
    category: "Lifting Belts",
    description: "Heavy-duty powerlifting belt built with stiff core support for maximum intra-abdominal pressure.",
    fullDescription: "Uniform 4-inch width from front to back provides the exact 360-degree abdominal bracing surface demanded by heavy powerlifters. Delivers maximum bracing resistance.",
    sizes: ["Small (28-32\")", "Medium (32-36\")", "Large (36-40\")", "X-Large (40-44\")"],
    specs: [
      { label: "Width", value: "Uniform 4-Inch (10cm)" },
      { label: "Thickness", value: "10mm Heavy Density Core" },
      { label: "Closure", value: "Cast Alloy Lever Clasp" },
    ],
    highlights: [
      "Uniform width delivers complete 360-degree abdominal bracing",
      "Heavy 10mm thickness holds shape under maximum poundages",
      "Pre-drilled holes allow easy micro-adjustments"
    ],
    image: belt4,
    inStock: true,
    dispatchTime: "Dispatched within 24 hours from Pokhara",
  },
  {
    id: 11,
    name: "Competitive Heavy Lifting Belt",
    price: 5500,
    category: "Lifting Belts",
    badge: "Heavy Duty",
    description: "Professional-grade 10mm competition belt engineered for dedicated strength athletes.",
    fullDescription: "Our flagship heavy lifting belt. Designed to meet strict powerlifting dimensional standards with quad-stitched borders and rust-resistant hardware.",
    sizes: ["Small (28-32\")", "Medium (32-36\")", "Large (36-40\")", "X-Large (40-44\")"],
    specs: [
      { label: "Thickness", value: "10mm Precision Spec" },
      { label: "Width", value: "4 Inches (10cm)" },
      { label: "Hardware", value: "Heavy Industrial Steel Buckle" },
      { label: "Edge Finish", value: "Sealed & Burnished Border" },
    ],
    highlights: [
      "Maximum intra-abdominal wall stabilization",
      "Heavy industrial chrome-plated steel hardware",
      "Resistant to stretching and humidity"
    ],
    image: belt5,
    inStock: true,
    dispatchTime: "Dispatched within 24 hours from Pokhara",
  },
  // Tactical Backpacks
  {
    id: "bag-1",
    name: "45L Tactical Backpack (Lake Blue)",
    price: 7500,
    category: "Tactical Carry",
    description: "High-capacity 45L training pack with dual primary compartments and isolated shoe tunnel.",
    fullDescription: "Rugged tactical backpack in Lake Blue featuring water-resistant Oxford 900D material, MOLLE webbing, and breathable mesh back padding for heavy load carriage.",
    sizes: ["Standard 45L"],
    specs: [
      { label: "Capacity", value: "45 Liters" },
      { label: "Fabric", value: "Water-Resistant 900D Oxford" },
      { label: "Hardware", value: "SBS Heavy Zippers" },
    ],
    highlights: ["Isolated shoe compartment", "Laser-cut MOLLE webbing", "Water-resistant coating"],
    image: backpk,
    inStock: true,
    dispatchTime: "Dispatched within 24 hours from Pokhara",
  },
  {
    id: "bag-2",
    name: "Leopard Print Gym Backpack",
    price: 5500,
    category: "Tactical Carry",
    description: "Distinctive patterned 900D gym backpack with multi-pocket layout and laptop sleeve.",
    fullDescription: "Stand out in the gym with our custom Leopard Edition. Built with durable Oxford 900D fabric, reinforced shoulder straps, and modular storage compartments.",
    sizes: ["Standard 35L"],
    specs: [
      { label: "Capacity", value: "35 Liters" },
      { label: "Fabric", value: "900D Oxford Polyester" },
    ],
    highlights: ["Custom printed durable exterior", "Padded laptop sleeve", "Padded shoulder straps"],
    image: bkbp2,
    inStock: true,
    dispatchTime: "Dispatched within 24 hours from Pokhara",
  },
  {
    id: "bag-3",
    name: "Combat 45L Tactical Backpack",
    price: 8500,
    category: "Tactical Carry",
    description: "Rugged military-inspired 45L backpack with external compression straps and patch field.",
    fullDescription: "Designed for rugged outdoor and gym utility. Features side and bottom compression straps to cinch down loads, plus heavy-duty webbing for accessories.",
    sizes: ["Standard 45L"],
    specs: [
      { label: "Capacity", value: "45 Liters" },
      { label: "Fabric", value: "Water-Resistant 900D Oxford" },
    ],
    highlights: ["External compression straps", "Velcro morale patch zone", "Heavy duty zippers"],
    image: bkpk3,
    inStock: true,
    dispatchTime: "Dispatched within 24 hours from Pokhara",
  },
  {
    id: "bag-4",
    name: "Tactical 45L (Black & Red)",
    price: 9000,
    category: "Tactical Carry",
    description: "High-spec 45L backpack in Crossthenics signature Charcoal Black and Signal Red contrast.",
    fullDescription: "Finished in our signature brand colorway. Features red accent cord pulls, reinforced stress points, and dual hydration bottle side pockets.",
    sizes: ["Standard 45L"],
    specs: [
      { label: "Capacity", value: "45 Liters" },
      { label: "Fabric", value: "Water-Resistant 900D Oxford" },
    ],
    highlights: ["Signature brand colors", "Double reinforced stitching", "Dual water bottle pockets"],
    image: bkpk4,
    inStock: true,
    dispatchTime: "Dispatched within 24 hours from Pokhara",
  },
  {
    id: "bag-5",
    name: "Tactical 45L (Black & White)",
    price: 9000,
    category: "Tactical Carry",
    description: "High-contrast monochrome 45L backpack with water-resistant internal lining.",
    fullDescription: "Monochrome edition offering crisp visual contrast with the full 45L capacity and shoe chamber.",
    sizes: ["Standard 45L"],
    specs: [
      { label: "Capacity", value: "45 Liters" },
      { label: "Fabric", value: "900D Oxford" },
    ],
    highlights: ["Monochrome styling", "Full clamshell opening", "Shoe compartment"],
    image: bkpk5,
    inStock: true,
    dispatchTime: "Dispatched within 24 hours from Pokhara",
  },
  {
    id: "bag-6",
    name: "Deep Blue 45L Tactical Backpack",
    price: 7500,
    category: "Tactical Carry",
    description: "Clean deep blue 45L tactical gym bag with MOLLE webbing and padded harness.",
    fullDescription: "Understated deep blue hue for versatile travel and gym use. Features breathable back mesh.",
    sizes: ["Standard 45L"],
    specs: [
      { label: "Capacity", value: "45 Liters" },
      { label: "Fabric", value: "900D Oxford" },
    ],
    highlights: ["Ventilated back padding", "Reinforced drag handle", "Padded laptop chamber"],
    image: bkpk6,
    inStock: true,
    dispatchTime: "Dispatched within 24 hours from Pokhara",
  },
  {
    id: "bag-7",
    name: "Signal Red 45L Tactical Backpack",
    price: 9000,
    category: "Tactical Carry",
    description: "Bold Signal Red 45L backpack with black webbing accents and tactical storage compartments.",
    fullDescription: "Striking red shell with black MOLLE webbing. High visibility and maximum storage for serious competitors.",
    sizes: ["Standard 45L"],
    specs: [
      { label: "Capacity", value: "45 Liters" },
      { label: "Fabric", value: "Water-Resistant 900D Oxford" },
    ],
    highlights: ["High visibility exterior", "180-degree flat opening", "Separate shoe tunnel"],
    image: bkpk7,
    inStock: true,
    dispatchTime: "Dispatched within 24 hours from Pokhara",
  },
  // Hardware and Accessories
  {
    id: "latest-6",
    name: "Nylon Dipping Rope Chain",
    price: 800,
    category: "Calisthenics",
    description: "Heavy-duty reinforced nylon rope link for weighted calisthenics and dip attachments.",
    fullDescription: "Engineered to withstand repeated abrasive contact with iron weight plates. A lighter, quieter alternative to bare steel chains for weighted pull-ups and dips.",
    sizes: ["Standard 40-Inch"],
    specs: [
      { label: "Length", value: "40 Inches" },
      { label: "Material", value: "High-Tensile Braided Nylon" },
      { label: "Load Rating", value: "Rated for 120 kg" },
    ],
    highlights: ["Quiet and smooth against plates", "Does not scuff gym floors", "Includes heavy attachment loop"],
    image: Rchain,
    inStock: true,
    dispatchTime: "Dispatched within 24 hours from Pokhara",
  },
  {
    id: "latest-7",
    name: "Heavy-Duty Screw-Lock Carabiner Clip",
    price: 700,
    category: "Grip & Accessories",
    description: "Hardened steel screw-gate locking carabiner for dip belts and pulley attachments.",
    fullDescription: "Provides secure positive locking for dip belts, cable systems, and resistance bands. Screw-gate barrel prevents accidental opening under dynamic loads.",
    sizes: ["One Size (10 x 6 cm)"],
    specs: [
      { label: "Gate Type", value: "Screw-Lock Barrel" },
      { label: "Material", value: "Hardened Carbon Steel" },
      { label: "Major Axis Strength", value: "Tested to 2,000 kg" },
    ],
    highlights: ["Screw-gate mechanism prevents accidental release", "Snag-free keylock nose", "Zinc-galvanized anti-rust finish"],
    image: CRB,
    inStock: true,
    dispatchTime: "Dispatched within 24 hours from Pokhara",
  },
];

export function getProductById(id: string | number): UnifiedProduct | undefined {
  const strId = String(id).toLowerCase().trim();
  
  // Exact match
  const exact = unifiedCatalog.find((p) => String(p.id).toLowerCase() === strId);
  if (exact) return exact;

  // Numeric fallback: if passed "bag-2" or just "2"
  const numericId = parseInt(strId.replace(/\D/g, ""), 10);
  if (!isNaN(numericId)) {
    return unifiedCatalog.find((p) => p.id === numericId || p.id === `bag-${numericId}` || p.id === `latest-${numericId}`);
  }

  return undefined;
}

export function getRelatedProducts(currentId: string | number, limit = 4): UnifiedProduct[] {
  return unifiedCatalog.filter((p) => String(p.id) !== String(currentId)).slice(0, limit);
}
