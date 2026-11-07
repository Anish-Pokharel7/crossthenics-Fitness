import fs from "fs";
import path from "path";
import type {
  Product,
  Order,
  Customer,
  Category,
  Promotion,
  Review,
  ReturnRequest,
  InventoryLog,
  StoreSettings,
  DashboardStats,
  OrderStatus,
} from "./types";

interface DatabaseSchema {
  products: Product[];
  categories: Category[];
  orders: Order[];
  customers: Customer[];
  promotions: Promotion[];
  reviews: Review[];
  returns: ReturnRequest[];
  inventoryLogs: InventoryLog[];
  settings: StoreSettings;
}

const DB_DIR = path.join(process.cwd(), "data");
const DB_PATH = path.join(DB_DIR, "crossthenics-db.json");

let memoryCache: DatabaseSchema | null = null;

function getInitialProducts(): Product[] {
  const now = new Date().toISOString();
  return [
    {
      id: "1",
      name: "Velcro Patch Hybrid Belt",
      slug: "velcro-patch-hybrid-belt",
      category: "Lifting Belts",
      price: 3800,
      compareAtPrice: 4500,
      stock: 42,
      sku: "CT-BLT-001",
      published: true,
      isBestseller: true,
      description: "Crossthenics self-locking hybrid lifting belt with steel roller buckle and velcro lock.",
      images: ["/p-image/liftingbelts.webp"],
      badge: "Bestseller",
      features: [
        "Instant one-hand tension release between sets",
        "Ergonomic contour supports lumbar without rib impingement",
        "Heavy-duty industrial velcro rated for 5,000+ open-close cycles",
      ],
      specs: {
        Hardware: "Quick-Lock Steel Roller Buckle",
        Material: "High-Tensile Reinforced Nylon",
        Width: "4-Inch Uniform Contour",
      },
      variants: [{ name: "Size", options: ["S (28-32\")", "M (32-36\")", "L (36-40\")", "XL (40-44\")"] }],
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "2",
      name: "45L Tactical Backpack (Lake Blue)",
      slug: "45l-tactical-backpack-lake-blue",
      category: "Tactical Carry",
      price: 7500,
      compareAtPrice: 8500,
      stock: 18,
      sku: "CT-BP-002",
      published: true,
      isBestseller: true,
      description: "Rugged 45-liter athlete pack with isolated shoe compartment and water-resistant Oxford 900D build.",
      images: ["/p-image/backpack.webp"],
      badge: "Bestseller",
      features: [
        "Separate ventilated compartment fits up to size 46 shoes",
        "MOLLE webbing grid on front and sides for gear attachment",
        "Reinforced load-bearing harness distributes weight evenly",
      ],
      specs: {
        Capacity: "45 Liters",
        Material: "Oxford 900D High-Density Nylon",
        Zippers: "Heavy-Duty Dual SBS Waterproof Zippers",
      },
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "3",
      name: "Precision Speed Rope",
      slug: "precision-speed-rope",
      category: "Calisthenics",
      price: 1800,
      compareAtPrice: 2200,
      stock: 65,
      sku: "CT-ROP-003",
      published: true,
      description: "High-velocity dual-bearing wire jump rope for double-unders and calisthenics conditioning.",
      images: ["/p-image/prorope.webp"],
      features: ["Smooth 360-degree ball bearings", "Kink-resistant coated steel wire"],
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "4",
      name: "Liquid Grip Chalk (250ml)",
      slug: "liquid-grip-chalk-250ml",
      category: "Grip & Accessories",
      price: 1200,
      stock: 84,
      sku: "CT-CHK-004",
      published: true,
      description: "Fast-drying, dust-free liquid magnesium carbonate formula for maximum friction on pull-up bars and barbells.",
      images: ["/p-image/gripchalk.webp"],
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "5",
      name: "Tactical Everyday Side Bag",
      slug: "tactical-everyday-side-bag",
      category: "Tactical Carry",
      price: 2800,
      compareAtPrice: 3200,
      stock: 22,
      sku: "CT-SB-005",
      published: true,
      description: "Compact cross-body sling with laser-cut MOLLE front and quick-access concealed gear pocket.",
      images: ["/p-image/sidebag.webp"],
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "6",
      name: "Powder Grip Chalk (400g)",
      slug: "powder-grip-chalk-400g",
      category: "Grip & Accessories",
      price: 1000,
      stock: 45,
      sku: "CT-CHK-006",
      published: true,
      description: "Ultra-fine gym-grade magnesium carbonate powder in resealable moisture-lock pouch.",
      images: ["/p-image/powdergp.webp"],
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "7",
      name: "Competition Lever Belt (10mm)",
      slug: "competition-lever-belt-10mm",
      category: "Lifting Belts",
      price: 8500,
      compareAtPrice: 9500,
      stock: 12,
      sku: "CT-BLT-007",
      published: true,
      isNew: true,
      description: "10mm genuine steerhide powerlifting belt with aircraft-grade cast alloy lever buckle.",
      images: ["/p-image/belt2.webp"],
      badge: "New",
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "8",
      name: "Olympic Dip Belt with Steel Chain",
      slug: "olympic-dip-belt-with-steel-chain",
      category: "Calisthenics",
      price: 4200,
      stock: 19,
      sku: "CT-DIP-008",
      published: true,
      description: "Contoured neoprene dipping belt with 36-inch zinc-coated steel chain and dual carabiners.",
      images: ["/p-image/Rchain.webp"],
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "9",
      name: "45L Tactical Backpack (Black Camo)",
      slug: "45l-tactical-backpack-black-camo",
      category: "Tactical Carry",
      price: 7500,
      stock: 14,
      sku: "CT-BP-009",
      published: true,
      description: "Stealth black camo edition of our flagship 45L athlete backpack.",
      images: ["/p-image/bkpk2.webp"],
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "10",
      name: "Reinforced Locking Carabiner (2-Pack)",
      slug: "reinforced-locking-carabiner-2-pack",
      category: "Grip & Accessories",
      price: 950,
      stock: 50,
      sku: "CT-CRB-010",
      published: true,
      description: "Heavy-duty screwgate alloy carabiners tested to 25kN rating for gym rings and dip chains.",
      images: ["/p-image/carabiner.webp"],
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "11",
      name: "45L Tactical Backpack (Desert Sand)",
      slug: "45l-tactical-backpack-desert-sand",
      category: "Tactical Carry",
      price: 7500,
      stock: 8,
      sku: "CT-BP-011",
      published: true,
      description: "Desert tan tactical backpack with 180-degree flat opening for quick gym packing.",
      images: ["/p-image/bkpk3.webp"],
      badge: "Low Stock",
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "12",
      name: "Heavy-Duty Quick-Lock Belt (Blackout)",
      slug: "heavy-duty-quick-lock-belt-blackout",
      category: "Lifting Belts",
      price: 4200,
      stock: 24,
      sku: "CT-BLT-012",
      published: true,
      description: "All-black reinforced nylon lifting belt with knurled quick-release buckle.",
      images: ["/p-image/belt3.webp"],
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "13",
      name: "45L Tactical Backpack (Ranger Green)",
      slug: "45l-tactical-backpack-ranger-green",
      category: "Tactical Carry",
      price: 7500,
      stock: 16,
      sku: "CT-BP-013",
      published: true,
      description: "Military ranger green finish with velcro patches and padded laptop compartment.",
      images: ["/p-image/bkpk4.webp"],
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "14",
      name: "Pro Calisthenics Gymnastic Rings",
      slug: "pro-calisthenics-gymnastic-rings",
      category: "Calisthenics",
      price: 3600,
      stock: 28,
      sku: "CT-RNG-014",
      published: true,
      description: "Solid birch wood rings with 1.5-inch numbered straps and quick-lock cam buckles.",
      images: ["/p-image/prorope.webp"],
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "15",
      name: "45L Tactical Backpack (Urban Grey)",
      slug: "45l-tactical-backpack-urban-grey",
      category: "Tactical Carry",
      price: 7500,
      stock: 2,
      sku: "CT-BP-015",
      published: true,
      description: "Modern matte grey backpack with waterproof base and tactical morale patches.",
      images: ["/p-image/bkpk5.webp"],
      badge: "Almost Gone",
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "16",
      name: "Premium Suede 13mm Lever Belt",
      slug: "premium-suede-13mm-lever-belt",
      category: "Lifting Belts",
      price: 9800,
      stock: 5,
      sku: "CT-BLT-016",
      published: true,
      description: "Maximum rigidity 13mm powerlifting belt wrapped in non-slip charcoal suede.",
      images: ["/p-image/belt4.webp"],
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "17",
      name: "45L Tactical Backpack (Stealth Black)",
      slug: "45l-tactical-backpack-stealth-black",
      category: "Tactical Carry",
      price: 7500,
      stock: 31,
      sku: "CT-BP-017",
      published: true,
      isBestseller: true,
      description: "The core athlete standard. Water-repellent 900D nylon, dedicated shoe compartment.",
      images: ["/p-image/bkpk6.webp"],
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "18",
      name: "45L Tactical Backpack (Multicam Alpine)",
      slug: "45l-tactical-backpack-multicam-alpine",
      category: "Tactical Carry",
      price: 7800,
      stock: 7,
      sku: "CT-BP-018",
      published: true,
      description: "Limited alpine winter camo pattern with waterproof dual zip seams.",
      images: ["/p-image/bkpk7.webp"],
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "19",
      name: "Contoured Calisthenics Dip Belt",
      slug: "contoured-calisthenics-dip-belt",
      category: "Calisthenics",
      price: 4500,
      stock: 20,
      sku: "CT-BLT-019",
      published: true,
      description: "Ergonomic wide back support for heavy weighted pull-ups and dips.",
      images: ["/p-image/belt5.webp"],
      createdAt: now,
      updatedAt: now,
    },
  ];
}

function getInitialCategories(): Category[] {
  return [
    {
      id: "cat-1",
      name: "Lifting Belts",
      slug: "lifting-belts",
      description: "Heavy-duty lever and quick-locking hybrid belts built for powerlifting, bodybuilding, and strongman.",
      image: "/p-image/liftingbelts.webp",
      productCount: 5,
      visible: true,
    },
    {
      id: "cat-2",
      name: "Tactical Carry",
      slug: "tactical-carry",
      description: "Modular 45L backpacks and compact slings engineered for athletic daily carry and gym travel.",
      image: "/p-image/backpack.webp",
      productCount: 7,
      visible: true,
    },
    {
      id: "cat-3",
      name: "Calisthenics",
      slug: "calisthenics",
      description: "High-speed jump ropes, heavy-duty weighted dip belts, and gymnastic rings for street workout athletes.",
      image: "/p-image/prorope.webp",
      productCount: 4,
      visible: true,
    },
    {
      id: "cat-4",
      name: "Grip & Accessories",
      slug: "grip-accessories",
      description: "Gym-grade liquid chalk, chalk powder, high-load carabiners, and training gear accessories.",
      image: "/p-image/gripchalk.webp",
      productCount: 3,
      visible: true,
    },
  ];
}

function getInitialCustomers(): Customer[] {
  return [
    {
      id: "cust-1",
      name: "Aayush Sharma",
      email: "aayush.sharma@gmail.com",
      phone: "9841234567",
      city: "Kathmandu",
      ordersCount: 4,
      totalSpent: 23600,
      lastOrderDate: "2026-11-05T10:15:00.000Z",
      joinedDate: "2026-03-12T08:00:00.000Z",
      status: "active",
    },
    {
      id: "cust-2",
      name: "Bikash Gurung",
      email: "bikash.gurung@outlook.com",
      phone: "9856012345",
      city: "Pokhara",
      ordersCount: 3,
      totalSpent: 16500,
      lastOrderDate: "2026-11-04T14:30:00.000Z",
      joinedDate: "2026-04-18T09:30:00.000Z",
      status: "active",
    },
    {
      id: "cust-3",
      name: "Pooja Shrestha",
      email: "pooja.shrestha@gmail.com",
      phone: "9812345678",
      city: "Lalitpur",
      ordersCount: 2,
      totalSpent: 9300,
      lastOrderDate: "2026-11-03T18:45:00.000Z",
      joinedDate: "2026-06-20T11:20:00.000Z",
      status: "active",
    },
    {
      id: "cust-4",
      name: "Rohan Karki",
      email: "rohan.karki@gmail.com",
      phone: "9801987654",
      city: "Bhaktapur",
      ordersCount: 1,
      totalSpent: 7500,
      lastOrderDate: "2026-11-02T12:00:00.000Z",
      joinedDate: "2026-11-02T12:00:00.000Z",
      status: "active",
    },
    {
      id: "cust-5",
      name: "Suman Thapa",
      email: "suman.thapa@yahoo.com",
      phone: "9847123987",
      city: "Butwal",
      ordersCount: 2,
      totalSpent: 11700,
      lastOrderDate: "2026-11-01T09:20:00.000Z",
      joinedDate: "2026-07-14T15:10:00.000Z",
      status: "active",
    },
    {
      id: "cust-6",
      name: "Nabin Poudel",
      email: "nabin.p@gmail.com",
      phone: "9861009988",
      city: "Chitwan",
      ordersCount: 1,
      totalSpent: 3800,
      lastOrderDate: "2026-10-29T16:40:00.000Z",
      joinedDate: "2026-10-29T16:40:00.000Z",
      status: "active",
    },
    {
      id: "cust-7",
      name: "Pratik Adhikari",
      email: "pratik.adhikari@gmail.com",
      phone: "9842098765",
      city: "Biratnagar",
      ordersCount: 1,
      totalSpent: 4200,
      lastOrderDate: "2026-10-27T11:05:00.000Z",
      joinedDate: "2026-10-27T11:05:00.000Z",
      status: "active",
    },
  ];
}

function getInitialOrders(): Order[] {
  return [
    {
      id: "ORD-10487",
      orderNumber: "CT-10487",
      customerId: "cust-1",
      customerName: "Aayush Sharma",
      customerEmail: "aayush.sharma@gmail.com",
      customerPhone: "9841234567",
      shippingAddress: {
        fullName: "Aayush Sharma",
        phone: "9841234567",
        address: "Baneshwor, Ward 10",
        city: "Kathmandu",
        state: "Bagmati",
        landmark: "Near Civil Bank",
      },
      items: [
        {
          productId: "1",
          productName: "Velcro Patch Hybrid Belt",
          name: "Velcro Patch Hybrid Belt",
          productImage: "/p-image/liftingbelts.webp",
          variant: "Medium (32-36\")",
          size: "Medium",
          quantity: 1,
          price: 3800,
          total: 3800,
        },
        {
          productId: "4",
          productName: "Liquid Grip Chalk (250ml)",
          name: "Liquid Grip Chalk (250ml)",
          productImage: "/p-image/gripchalk.webp",
          quantity: 1,
          price: 1200,
          total: 1200,
        },
      ],
      subtotal: 5000,
      shippingCharge: 150,
      discount: 0,
      total: 5150,
      grandTotal: 5150,
      fulfillmentStatus: "delivered",
      paymentStatus: "paid",
      paymentMethod: "esewa",
      trackingNumber: "KTM-89412-EXP",
      courierPartner: "Pathao Express",
      createdAt: "2026-11-05T10:15:00.000Z",
      updatedAt: "2026-11-06T15:00:00.000Z",
    },
    {
      id: "ORD-10486",
      orderNumber: "CT-10486",
      customerId: "cust-2",
      customerName: "Bikash Gurung",
      customerEmail: "bikash.gurung@outlook.com",
      customerPhone: "9856012345",
      shippingAddress: {
        fullName: "Bikash Gurung",
        phone: "9856012345",
        address: "Lakeside, Street 14",
        street: "Lakeside, Street 14",
        city: "Pokhara",
        state: "Gandaki",
        landmark: "Opposite Dunga Restro",
      },
      items: [
        {
          productId: "2",
          productName: "45L Tactical Backpack (Lake Blue)",
          name: "45L Tactical Backpack (Lake Blue)",
          productImage: "/p-image/backpack.webp",
          quantity: 1,
          price: 7500,
          total: 7500,
        },
      ],
      subtotal: 7500,
      shippingCharge: 0,
      discount: 0,
      total: 7500,
      grandTotal: 7500,
      fulfillmentStatus: "shipped",
      paymentStatus: "paid",
      paymentMethod: "khalti",
      trackingNumber: "PKR-33219-SND",
      courierPartner: "Sundar Courier",
      createdAt: "2026-11-04T14:30:00.000Z",
      updatedAt: "2026-11-05T09:00:00.000Z",
    },
    {
      id: "ORD-10485",
      orderNumber: "CT-10485",
      customerId: "cust-3",
      customerName: "Pooja Shrestha",
      customerEmail: "pooja.shrestha@gmail.com",
      customerPhone: "9812345678",
      shippingAddress: {
        fullName: "Pooja Shrestha",
        phone: "9812345678",
        address: "Jhamsikhel, Ward 3",
        street: "Jhamsikhel, Ward 3",
        city: "Lalitpur",
        state: "Bagmati",
      },
      items: [
        {
          productId: "3",
          productName: "Precision Speed Rope",
          name: "Precision Speed Rope",
          productImage: "/p-image/prorope.webp",
          quantity: 2,
          price: 1800,
          total: 3600,
        },
      ],
      subtotal: 3600,
      shippingCharge: 150,
      discount: 0,
      total: 3750,
      grandTotal: 3750,
      fulfillmentStatus: "processing",
      paymentStatus: "paid",
      paymentMethod: "esewa",
      createdAt: "2026-11-03T18:45:00.000Z",
      updatedAt: "2026-11-04T08:30:00.000Z",
    },
    {
      id: "ORD-10484",
      orderNumber: "CT-10484",
      customerId: "cust-4",
      customerName: "Rohan Karki",
      customerEmail: "rohan.karki@gmail.com",
      customerPhone: "9801987654",
      shippingAddress: {
        fullName: "Rohan Karki",
        phone: "9801987654",
        address: "Suryabinayak, Ward 5",
        street: "Suryabinayak, Ward 5",
        city: "Bhaktapur",
        state: "Bagmati",
      },
      items: [
        {
          productId: "9",
          productName: "45L Tactical Backpack (Black Camo)",
          name: "45L Tactical Backpack (Black Camo)",
          productImage: "/p-image/bkpk2.webp",
          quantity: 1,
          price: 7500,
          total: 7500,
        },
      ],
      subtotal: 7500,
      shippingCharge: 150,
      discount: 0,
      total: 7650,
      grandTotal: 7650,
      fulfillmentStatus: "delivered",
      paymentStatus: "paid",
      paymentMethod: "cod",
      createdAt: "2026-11-02T12:00:00.000Z",
      updatedAt: "2026-11-04T16:20:00.000Z",
    },
    {
      id: "ORD-10483",
      orderNumber: "CT-10483",
      customerId: "cust-5",
      customerName: "Suman Thapa",
      customerEmail: "suman.thapa@yahoo.com",
      customerPhone: "9847123987",
      shippingAddress: {
        fullName: "Suman Thapa",
        phone: "9847123987",
        address: "Traffic Chowk",
        street: "Traffic Chowk",
        city: "Butwal",
        state: "Lumbini",
      },
      items: [
        {
          productId: "7",
          productName: "Competition Lever Belt (10mm)",
          name: "Competition Lever Belt (10mm)",
          productImage: "/p-image/belt2.webp",
          variant: "Large",
          size: "Large",
          quantity: 1,
          price: 8500,
          total: 8500,
        },
      ],
      subtotal: 8500,
      shippingCharge: 200,
      discount: 0,
      total: 8700,
      grandTotal: 8700,
      fulfillmentStatus: "cancelled",
      paymentStatus: "refunded",
      paymentMethod: "esewa",
      notes: "Customer requested cancellation before shipment due to size change.",
      createdAt: "2026-11-01T09:20:00.000Z",
      updatedAt: "2026-11-01T14:00:00.000Z",
    },
  ];
}

function getInitialPromotions(): Promotion[] {
  return [
    {
      id: "promo-1",
      code: "CROSS10",
      type: "percentage",
      value: 10,
      minOrderAmount: 3000,
      usedCount: 48,
      usageLimit: 200,
      expiresAt: "2026-12-31T23:59:59.000Z",
      active: true,
    },
    {
      id: "promo-2",
      code: "ATHLETE500",
      type: "fixed",
      value: 500,
      minOrderAmount: 5000,
      usedCount: 29,
      usageLimit: 100,
      expiresAt: "2026-11-30T23:59:59.000Z",
      active: true,
    },
    {
      id: "promo-3",
      code: "POWERLIFT15",
      type: "percentage",
      value: 15,
      minOrderAmount: 7000,
      usedCount: 14,
      usageLimit: 50,
      expiresAt: "2026-12-15T23:59:59.000Z",
      active: true,
    },
  ];
}

function getInitialReviews(): Review[] {
  return [
    {
      id: "rev-1",
      productId: "1",
      productName: "Velcro Patch Hybrid Belt",
      customerName: "Aayush Sharma",
      rating: 5,
      comment: "Rock solid support during heavy squat triples. The quick release buckle saves huge energy between sets.",
      status: "approved",
      verified: true,
      createdAt: "2026-11-06T12:00:00.000Z",
    },
    {
      id: "rev-2",
      productId: "2",
      productName: "45L Tactical Backpack (Lake Blue)",
      customerName: "Bikash Gurung",
      rating: 5,
      comment: "Best gym bag in Nepal. Separate shoe compartment keeps everything clean and Oxford fabric is ultra tough.",
      status: "approved",
      verified: true,
      createdAt: "2026-11-05T18:30:00.000Z",
    },
    {
      id: "rev-3",
      productId: "4",
      productName: "Liquid Grip Chalk (250ml)",
      customerName: "Rohan Karki",
      rating: 4,
      comment: "Dries in under 15 seconds. Incredible grip on cold pull-up bars without creating dust clouds.",
      status: "approved",
      verified: true,
      createdAt: "2026-11-03T10:15:00.000Z",
    },
  ];
}

function getInitialReturns(): ReturnRequest[] {
  return [
    {
      id: "ret-1",
      orderId: "ORD-10483",
      customerName: "Suman Thapa",
      customerPhone: "9847123987",
      reason: "Ordered Large size but needed Medium after measuring waist contour.",
      action: "exchange",
      status: "completed",
      resolutionNote: "Customer refunded after pre-dispatch cancellation. Re-ordered size Medium.",
      createdAt: "2026-11-01T11:00:00.000Z",
    },
  ];
}

function getInitialInventoryLogs(): InventoryLog[] {
  const now = new Date().toISOString();
  return [
    {
      id: "inv-log-1",
      productId: "1",
      productName: "Velcro Patch Hybrid Belt",
      change: -1,
      newStock: 42,
      reason: "sale",
      note: "Order #ORD-10487",
      timestamp: now,
    },
    {
      id: "inv-log-2",
      productId: "2",
      productName: "45L Tactical Backpack (Lake Blue)",
      change: -1,
      newStock: 18,
      reason: "sale",
      note: "Order #ORD-10486",
      timestamp: now,
    },
    {
      id: "inv-log-3",
      productId: "15",
      productName: "45L Tactical Backpack (Urban Grey)",
      change: 0,
      newStock: 2,
      reason: "manual_adjustment",
      note: "Stock audit verified",
      timestamp: now,
    },
  ];
}

function getInitialSettings(): StoreSettings {
  return {
    storeName: "Crossthenics Fitness",
    tagline: "",
    supportEmail: "",
    supportPhone: "",
    address: "",
    currency: "NPR",
    currencySymbol: "Rs.",
    timezone: "Asia/Kathmandu",
    shipping: {
      insideValley: 0,
      outsideValley: 0,
      freeShippingThreshold: 0,
    },
    paymentMethods: {
      cod: false,
      esewa: false,
      khalti: false,
      bank_transfer: false,
    },
    lowStockThreshold: 5,
  };
}

function loadDatabase(): DatabaseSchema {
  if (memoryCache) return memoryCache;

  if (fs.existsSync(DB_PATH)) {
    try {
      const raw = fs.readFileSync(DB_PATH, "utf-8");
      memoryCache = JSON.parse(raw);
      return memoryCache!;
    } catch (error) {
      console.error(`Unable to read admin store data at ${DB_PATH}.`, error);
      throw new Error("Admin data could not be loaded. The store file needs repair.");
    }
  }

  const demoDataEnabled =
    process.env.NODE_ENV !== "production" && process.env.ADMIN_DEMO_DATA === "true";
  const initialData: DatabaseSchema = {
    products: demoDataEnabled ? getInitialProducts() : [],
    categories: demoDataEnabled ? getInitialCategories() : [],
    orders: demoDataEnabled ? getInitialOrders() : [],
    customers: demoDataEnabled ? getInitialCustomers() : [],
    promotions: demoDataEnabled ? getInitialPromotions() : [],
    reviews: demoDataEnabled ? getInitialReviews() : [],
    returns: demoDataEnabled ? getInitialReturns() : [],
    inventoryLogs: demoDataEnabled ? getInitialInventoryLogs() : [],
    settings: getInitialSettings(),
  };

  saveDatabaseSync(initialData);
  memoryCache = initialData;
  return memoryCache;
}

function saveDatabaseSync(data: DatabaseSchema): void {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), "utf-8");
}

function scheduleSave(data: DatabaseSchema): void {
  memoryCache = data;
  saveDatabaseSync(data);
}

// ─────────────────────────────────────────────────────────────
// DASHBOARD ANALYTICS
// ─────────────────────────────────────────────────────────────

export async function getDashboardAnalytics(days: number = 30): Promise<DashboardStats> {
  const db = loadDatabase();
  const periodDays = [7, 30, 90].includes(days) ? days : 30;
  const now = new Date();
  const periodMs = periodDays * 24 * 60 * 60 * 1000;
  const periodStart = new Date(now.getTime() - periodMs);
  const previousStart = new Date(periodStart.getTime() - periodMs);
  const ordersInRange = db.orders.filter((order) => {
    const createdAt = new Date(order.createdAt).getTime();
    return createdAt >= periodStart.getTime() && createdAt <= now.getTime();
  });
  const previousOrders = db.orders.filter((order) => {
    const createdAt = new Date(order.createdAt).getTime();
    return createdAt >= previousStart.getTime() && createdAt < periodStart.getTime();
  });
  const isRevenueOrder = (order: Order) =>
    order.paymentStatus === "paid" && order.fulfillmentStatus !== "cancelled";
  const sumRevenue = (orders: Order[]) =>
    orders.filter(isRevenueOrder).reduce((sum, order) => sum + order.grandTotal, 0);
  const percentageChange = (current: number, previous: number) =>
    previous === 0 ? null : Math.round(((current - previous) / previous) * 1000) / 10;
  const formatMoney = (value: number) =>
    `Rs. ${value.toLocaleString("en-NP", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  const totalRevenueValue = sumRevenue(ordersInRange);
  const previousRevenue = sumRevenue(previousOrders);
  const totalOrdersCount = ordersInRange.length;
  const previousOrdersCount = previousOrders.length;

  const salesOverviewData = Array.from({ length: 7 }, (_, index) => {
    const bucketStart = new Date(
      periodStart.getTime() + (periodMs * index) / 7
    );
    const bucketEnd = new Date(
      periodStart.getTime() + (periodMs * (index + 1)) / 7
    );
    const bucketOrders = ordersInRange.filter((order) => {
      const createdAt = new Date(order.createdAt).getTime();
      return createdAt >= bucketStart.getTime() && createdAt < bucketEnd.getTime();
    });
    return {
      date: bucketStart.toLocaleDateString("en-NP", {
        day: "numeric",
        month: "short",
        timeZone: "Asia/Kathmandu",
      }),
      revenue: sumRevenue(bucketOrders),
      orders: bucketOrders.length,
    };
  });
  const labels = salesOverviewData.map((point) => point.date);
  const revenueData = salesOverviewData.map((point) => point.revenue);
  const ordersData = salesOverviewData.map((point) => point.orders);

  const monthDates = Array.from({ length: 6 }, (_, index) => {
    const date = new Date(now.getFullYear(), now.getMonth() - 5 + index, 1);
    return {
      date,
      label: date.toLocaleDateString("en-NP", { month: "short" }),
    };
  });
  const revenueTrendData = monthDates.map(({ date, label }) => {
    const monthOrders = db.orders.filter((order) => {
      const createdAt = new Date(order.createdAt);
      return (
        createdAt.getFullYear() === date.getFullYear() &&
        createdAt.getMonth() === date.getMonth()
      );
    });
    return {
      month: label,
      revenue: sumRevenue(monthOrders),
      orders: monthOrders.length,
    };
  });
  const months = revenueTrendData.map((point) => point.month);
  const trendValues = revenueTrendData.map((point) => point.revenue);

  const productSales = new Map<string, number>();
  db.orders
    .filter((order) => order.fulfillmentStatus === "delivered" && isRevenueOrder(order))
    .forEach((order) =>
      order.items.forEach((item) =>
        productSales.set(
          item.productId,
          (productSales.get(item.productId) || 0) + item.quantity
        )
      )
    );
  const topSelling = [...productSales.entries()]
    .map(([productId, unitsSold]) => {
      const product = db.products.find((item) => item.id === productId);
      if (!product) return null;
      return {
        id: product.id,
        name: product.name,
        price: product.price,
        formattedPrice: formatMoney(product.price),
        priceFormatted: formatMoney(product.price),
        soldCount: unitsSold,
        unitsSold,
        image: product.images[0] || product.image || "",
      };
    })
    .filter((product): product is NonNullable<typeof product> => product !== null)
    .sort((left, right) => right.unitsSold - left.unitsSold)
    .slice(0, 5);

  const statuses = [
    { status: "pending", label: "Pending", color: "#E10600" },
    { status: "confirmed", label: "Confirmed", color: "#C0C0C0" },
    { status: "processing", label: "Processing", color: "#F59E0B" },
    { status: "shipped", label: "Shipped", color: "#3B82F6" },
    { status: "delivered", label: "Delivered", color: "#10B981" },
    { status: "cancelled", label: "Cancelled", color: "#777777" },
    { status: "returned", label: "Returned", color: "#8B5CF6" },
  ];
  const orderStatusBreakdown = statuses.map((item) => {
    const count = ordersInRange.filter(
      (order) => order.fulfillmentStatus === item.status
    ).length;
    return {
      ...item,
      count,
      percentage: totalOrdersCount
        ? Math.round((count / totalOrdersCount) * 1000) / 10
        : 0,
    };
  });

  const products = db.products;
  const customers = db.customers;
  const lowStockCount = products.filter(
    (product) =>
      product.stock > 0 &&
      product.stock <= (product.lowStockThreshold ?? db.settings.lowStockThreshold)
  ).length;
  const outOfStockCount = products.filter((product) => product.stock === 0).length;
  const totalStockValue = products.reduce(
    (sum, product) => sum + (product.costPrice || 0) * product.stock,
    0
  );
  const newCustomers = customers.filter((customer) => {
    const joinedAt = new Date(customer.joinedDate).getTime();
    return joinedAt >= periodStart.getTime() && joinedAt <= now.getTime();
  }).length;
  const thisMonthNewCustomers = customers.filter((customer) => {
    const joinedAt = new Date(customer.joinedDate);
    return (
      joinedAt.getFullYear() === now.getFullYear() &&
      joinedAt.getMonth() === now.getMonth()
    );
  }).length;
  const repeatCustomers = customers.filter((customer) => customer.ordersCount > 1).length;
  const deliveredPaidOrders = db.orders.filter(
    (order) => order.fulfillmentStatus === "delivered" && isRevenueOrder(order)
  );
  const averageOrderValue = deliveredPaidOrders.length
    ? Math.round(
        deliveredPaidOrders.reduce((sum, order) => sum + order.grandTotal, 0) /
          deliveredPaidOrders.length
      )
    : null;
  const customerGrowth = monthDates.map(({ date, label }) => {
    const monthCustomers = customers.filter((customer) => {
      const joinedAt = new Date(customer.joinedDate);
      return (
        joinedAt.getFullYear() === date.getFullYear() &&
        joinedAt.getMonth() === date.getMonth()
      );
    });
    return { label, customers: monthCustomers.length };
  });
  const growthCurve = monthDates.map(({ date, label }) => {
    const monthOrders = db.orders.filter((order) => {
      const createdAt = new Date(order.createdAt);
      return (
        createdAt.getFullYear() === date.getFullYear() &&
        createdAt.getMonth() === date.getMonth()
      );
    });
    const returning = monthOrders.filter((order) =>
      customers.some(
        (customer) => customer.id === order.customerId && customer.ordersCount > 1
      )
    ).length;
    return { label, newCustomers: customerGrowth.find((point) => point.label === label)?.customers || 0, returning };
  });

  return {
    metrics: {
      totalRevenue: {
        value: totalRevenueValue,
        formatted: formatMoney(totalRevenueValue),
        changePercentage: percentageChange(totalRevenueValue, previousRevenue),
        isPositive: totalRevenueValue >= previousRevenue,
      },
      totalOrders: {
        value: totalOrdersCount,
        formatted: totalOrdersCount.toLocaleString("en-NP"),
        changePercentage: percentageChange(totalOrdersCount, previousOrdersCount),
        isPositive: totalOrdersCount >= previousOrdersCount,
      },
      totalCustomers: {
        value: customers.length,
        formatted: customers.length.toLocaleString("en-NP"),
        changePercentage: null,
        isPositive: true,
      },
      conversionRate: {
        value: 0,
        formatted: "Not configured",
        changePercentage: null,
        isPositive: true,
      },
    },
    salesOverview: {
      days: periodDays,
      labels,
      revenueData,
      ordersData,
      data: salesOverviewData,
    },
    revenueTrend: {
      months,
      values: trendValues,
      data: revenueTrendData,
    },
    topSellingProducts: topSelling,
    recentOrders: [...db.orders]
      .sort((left, right) => right.createdAt.localeCompare(left.createdAt))
      .slice(0, 5),
    orderStatusBreakdown,
    inventoryOverview: {
      lowStockCount,
      outOfStockCount,
      totalProductsCount: products.length,
      totalProducts: products.length,
      totalStockValue,
      formattedStockValue: formatMoney(totalStockValue),
      totalStockValueFormatted: formatMoney(totalStockValue),
    },
    customerInsights: {
      totalCustomers: customers.length,
      newCustomers,
      newCustomersThisMonth: thisMonthNewCustomers,
      avgOrderValue: averageOrderValue || 0,
      averageOrderValueFormatted: averageOrderValue === null ? "—" : formatMoney(averageOrderValue),
      avgOrdersPerCustomer: customers.length
        ? Number((db.orders.length / customers.length).toFixed(1))
        : 0,
      repeatPurchaseRate: customers.length
        ? Math.round((repeatCustomers / customers.length) * 1000) / 10
        : undefined,
      growthCurve: {
        labels: growthCurve.map((point) => point.label),
        newCustomersData: growthCurve.map((point) => point.newCustomers),
        returningCustomersData: growthCurve.map((point) => point.returning),
      },
      customerGrowth,
    },
    trafficSources: [],
  };
}

// ─────────────────────────────────────────────────────────────
// PRODUCTS CRUD
// ─────────────────────────────────────────────────────────────

export async function getProducts(filters?: {
  category?: string;
  status?: string;
  search?: string;
  sort?: string;
  inStock?: boolean;
  isPublished?: boolean;
}): Promise<Product[]> {
  const db = loadDatabase();
  let result = [...db.products];

  if (filters?.isPublished !== undefined) {
    result = result.filter((p) => p.published === filters.isPublished);
  }

  if (filters?.inStock !== undefined) {
    result = result.filter((p) => (filters.inStock ? p.stock > 0 : p.stock === 0));
  }

  if (filters?.category && filters.category !== "all") {
    result = result.filter(
      (p) => p.category.toLowerCase() === filters.category!.toLowerCase()
    );
  }

  if (filters?.status) {
    if (filters.status === "published") result = result.filter((p) => p.published);
    if (filters.status === "draft") result = result.filter((p) => !p.published);
    if (filters.status === "low_stock") result = result.filter((p) => p.stock > 0 && p.stock <= 10);
    if (filters.status === "out_of_stock") result = result.filter((p) => p.stock === 0);
  }

  if (filters?.search) {
    const q = filters.search.toLowerCase().trim();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  }

  if (filters?.sort) {
    if (filters.sort === "price_asc") result.sort((a, b) => a.price - b.price);
    if (filters.sort === "price_desc") result.sort((a, b) => b.price - a.price);
    if (filters.sort === "stock_desc") result.sort((a, b) => b.stock - a.stock);
  }

  return result;
}

export async function getProductById(id: string): Promise<Product | null> {
  const db = loadDatabase();
  const product = db.products.find((p) => String(p.id) === String(id));
  return product || null;
}

export async function createProduct(data: Partial<Product>): Promise<Product> {
  const db = loadDatabase();
  const now = new Date().toISOString();
  const id = String(db.products.length + 1);
  const slug = (data.name || `product-${id}`).toLowerCase().replace(/[^a-z0-9]+/g, "-");

  const newProduct: Product = {
    id,
    name: data.name || "Untitled Product",
    slug,
    category: data.category || "General",
    price: Number(data.price) || 0,
    compareAtPrice: data.compareAtPrice ? Number(data.compareAtPrice) : undefined,
    stock: Number(data.stock) || 0,
    sku: data.sku || `CT-SKU-${id.padStart(3, "0")}`,
    published: data.published ?? true,
    isNew: data.isNew ?? true,
    isBestseller: data.isBestseller ?? false,
    description: data.description || "",
    images: data.images && data.images.length > 0 ? data.images : ["/p-image/liftingbelts.webp"],
    badge: data.badge,
    features: data.features || [],
    specs: data.specs || {},
    variants: data.variants,
    createdAt: now,
    updatedAt: now,
  };

  db.products.unshift(newProduct);
  scheduleSave(db);
  return newProduct;
}

export async function updateProduct(id: string, data: Partial<Product>): Promise<Product | null> {
  const db = loadDatabase();
  const index = db.products.findIndex((p) => String(p.id) === String(id));
  if (index === -1) return null;

  const current = db.products[index];
  const updated: Product = {
    ...current,
    ...data,
    updatedAt: new Date().toISOString(),
  };

  db.products[index] = updated;
  scheduleSave(db);
  return updated;
}

export async function deleteProduct(id: string): Promise<boolean> {
  const db = loadDatabase();
  const initialLen = db.products.length;
  db.products = db.products.filter((p) => String(p.id) !== String(id));
  if (db.products.length !== initialLen) {
    scheduleSave(db);
    return true;
  }
  return false;
}

// ─────────────────────────────────────────────────────────────
// CATEGORIES CRUD
// ─────────────────────────────────────────────────────────────

export async function getCategories(): Promise<Category[]> {
  const db = loadDatabase();
  // Update product counts dynamically
  return db.categories.map((c) => ({
    ...c,
    productCount: db.products.filter((p) => p.category.toLowerCase() === c.name.toLowerCase()).length,
  }));
}

export async function getCategoryById(id: string): Promise<Category | null> {
  const db = loadDatabase();
  const cat = db.categories.find((c) => c.id === id);
  return cat || null;
}

export async function createCategory(data: Partial<Category>): Promise<Category> {
  const db = loadDatabase();
  const id = `cat-${Date.now()}`;
  const slug = (data.name || "category").toLowerCase().replace(/[^a-z0-9]+/g, "-");

  const newCat: Category = {
    id,
    name: data.name || "New Category",
    slug,
    description: data.description || "",
    image: data.image || "/p-image/liftingbelts.webp",
    productCount: 0,
    visible: data.visible ?? true,
  };

  db.categories.push(newCat);
  scheduleSave(db);
  return newCat;
}

export async function updateCategory(id: string, data: Partial<Category>): Promise<Category | null> {
  const db = loadDatabase();
  const index = db.categories.findIndex((c) => c.id === id);
  if (index === -1) return null;

  db.categories[index] = { ...db.categories[index], ...data };
  scheduleSave(db);
  return db.categories[index];
}

export async function deleteCategory(id: string): Promise<boolean> {
  const db = loadDatabase();
  const initialLen = db.categories.length;
  db.categories = db.categories.filter((c) => c.id !== id);
  if (db.categories.length !== initialLen) {
    scheduleSave(db);
    return true;
  }
  return false;
}

// ─────────────────────────────────────────────────────────────
// ORDERS CRUD
// ─────────────────────────────────────────────────────────────

export async function getOrders(filters?: {
  status?: string;
  paymentStatus?: string;
  search?: string;
}): Promise<Order[]> {
  const db = loadDatabase();
  let result = [...db.orders];

  if (filters?.status && filters.status !== "all") {
    result = result.filter((o) => o.fulfillmentStatus === filters.status);
  }

  if (filters?.paymentStatus && filters.paymentStatus !== "all") {
    result = result.filter((o) => o.paymentStatus === filters.paymentStatus);
  }

  if (filters?.search) {
    const q = filters.search.toLowerCase().trim();
    result = result.filter(
      (o) =>
        o.id.toLowerCase().includes(q) ||
        o.orderNumber.toLowerCase().includes(q) ||
        o.customerName.toLowerCase().includes(q) ||
        o.customerPhone.includes(q) ||
        o.shippingAddress.city.toLowerCase().includes(q)
    );
  }

  return result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function getOrderById(id: string): Promise<Order | null> {
  const db = loadDatabase();
  const order = db.orders.find((o) => o.id === id || o.orderNumber === id);
  return order || null;
}

export async function createOrder(data: Partial<Order>): Promise<Order> {
  const db = loadDatabase();
  const now = new Date().toISOString();
  const nextNumber = 10480 + db.orders.length + 1;
  const id = `ORD-${nextNumber}`;
  const orderNumber = `CT-${nextNumber}`;

  const newOrder: Order = {
    id,
    orderNumber,
    customerId: data.customerId,
    customerName: data.customerName || "Customer",
    customerEmail: data.customerEmail || "",
    customerPhone: data.customerPhone || "",
    shippingAddress: data.shippingAddress || {
      fullName: data.customerName || "Customer",
      phone: data.customerPhone || "",
      address: "",
      city: "Kathmandu",
    },
    items: (data.items || []).map((it) => ({
      ...it,
      name: it.name || it.productName || "Product",
      productName: it.productName || it.name || "Product",
      size: it.size || it.variant,
    })),
    subtotal: data.subtotal || 0,
    shippingCharge: data.shippingCharge || 0,
    discount: data.discount || 0,
    total: data.total || 0,
    grandTotal: data.grandTotal || data.total || 0,
    fulfillmentStatus: data.fulfillmentStatus || "pending",
    paymentStatus: data.paymentStatus || "pending",
    paymentMethod: data.paymentMethod || "cod",
    trackingNumber: data.trackingNumber,
    courierPartner: data.courierPartner,
    notes: data.notes,
    createdAt: now,
    updatedAt: now,
  };

  // Decrement product inventory & create inventory logs
  for (const item of newOrder.items) {
    const prod = db.products.find((p) => String(p.id) === String(item.productId));
    if (prod) {
      prod.stock = Math.max(0, prod.stock - item.quantity);
      db.inventoryLogs.unshift({
        id: `inv-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        productId: prod.id,
        productName: prod.name,
        change: -item.quantity,
        newStock: prod.stock,
        reason: "sale",
        note: `Order #${newOrder.id}`,
        timestamp: now,
      });
    }
  }

  // Update or insert customer
  const existingCustomer = db.customers.find(
    (c) => c.phone === newOrder.customerPhone || (c.email && c.email === newOrder.customerEmail)
  );
  if (existingCustomer) {
    existingCustomer.ordersCount += 1;
    existingCustomer.totalSpent += newOrder.total;
    existingCustomer.lastOrderDate = now;
  } else {
    db.customers.unshift({
      id: `cust-${Date.now()}`,
      name: newOrder.customerName,
      email: newOrder.customerEmail || "",
      phone: newOrder.customerPhone,
      city: newOrder.shippingAddress.city,
      ordersCount: 1,
      totalSpent: newOrder.total,
      lastOrderDate: now,
      joinedDate: now,
      status: "active",
    });
  }

  db.orders.unshift(newOrder);
  scheduleSave(db);
  return newOrder;
}

export async function updateOrderStatus(
  id: string,
  status: OrderStatus,
  trackingNumber?: string,
  courierPartner?: string
): Promise<Order | null> {
  const db = loadDatabase();
  const order = db.orders.find((o) => o.id === id);
  if (!order) return null;

  order.fulfillmentStatus = status;
  if (trackingNumber !== undefined) order.trackingNumber = trackingNumber;
  if (courierPartner !== undefined) order.courierPartner = courierPartner;
  if (status === "delivered") order.paymentStatus = "paid";
  order.updatedAt = new Date().toISOString();

  scheduleSave(db);
  return order;
}

// ─────────────────────────────────────────────────────────────
// CUSTOMERS
// ─────────────────────────────────────────────────────────────

export async function getCustomers(search?: string): Promise<Customer[]> {
  const db = loadDatabase();
  let result = [...db.customers];
  if (search) {
    const q = search.toLowerCase().trim();
    result = result.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.phone.includes(q) ||
        c.city.toLowerCase().includes(q)
    );
  }
  return result;
}

export async function getCustomerById(id: string): Promise<{ customer: Customer; orders: Order[] } | null> {
  const db = loadDatabase();
  const customer = db.customers.find((c) => c.id === id);
  if (!customer) return null;

  const orders = db.orders.filter(
    (o) => o.customerId === id || o.customerPhone === customer.phone || o.customerEmail === customer.email
  );
  return { customer, orders };
}

// ─────────────────────────────────────────────────────────────
// INVENTORY
// ─────────────────────────────────────────────────────────────

export async function getInventorySummary() {
  const db = loadDatabase();
  const threshold = db.settings.lowStockThreshold || 10;
  const lowStockCount = db.products.filter((p) => p.stock > 0 && p.stock <= threshold).length;
  const outOfStockCount = db.products.filter((p) => p.stock === 0).length;
  const totalProductsCount = db.products.length;
  const totalStockValue = db.products.reduce((sum, p) => sum + p.price * p.stock, 0);

  return {
    lowStockCount,
    outOfStockCount,
    totalProductsCount,
    totalStockValue,
    formattedStockValue: `Rs. ${totalStockValue.toLocaleString()}`,
  };
}

export async function getInventoryLogs(): Promise<InventoryLog[]> {
  const db = loadDatabase();
  return [...db.inventoryLogs].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
}

export async function adjustStock(
  productId: string,
  delta: number,
  reason: InventoryLog["reason"],
  note?: string
): Promise<{ product: Product; log: InventoryLog } | null> {
  const db = loadDatabase();
  const product = db.products.find((p) => String(p.id) === String(productId));
  if (!product) return null;

  product.stock = Math.max(0, product.stock + delta);
  product.updatedAt = new Date().toISOString();

  const log: InventoryLog = {
    id: `inv-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    productId: product.id,
    productName: product.name,
    change: delta,
    newStock: product.stock,
    reason,
    note,
    timestamp: new Date().toISOString(),
  };

  db.inventoryLogs.unshift(log);
  scheduleSave(db);
  return { product, log };
}

export const adjustProductStock = adjustStock;

// ─────────────────────────────────────────────────────────────
// PROMOTIONS
// ─────────────────────────────────────────────────────────────

export async function getPromotions(): Promise<Promotion[]> {
  const db = loadDatabase();
  return db.promotions;
}

export async function createPromotion(data: Partial<Promotion>): Promise<Promotion> {
  const db = loadDatabase();
  const newPromo: Promotion = {
    id: `promo-${Date.now()}`,
    code: (data.code || "DISCOUNT").toUpperCase().trim(),
    type: data.type || "percentage",
    value: Number(data.value) || 10,
    minOrderAmount: data.minOrderAmount ? Number(data.minOrderAmount) : undefined,
    usedCount: 0,
    usageLimit: data.usageLimit ? Number(data.usageLimit) : undefined,
    expiresAt: data.expiresAt,
    active: data.active ?? true,
  };

  db.promotions.unshift(newPromo);
  scheduleSave(db);
  return newPromo;
}

export async function updatePromotion(id: string, data: Partial<Promotion>): Promise<Promotion | null> {
  const db = loadDatabase();
  const index = db.promotions.findIndex((p) => p.id === id);
  if (index === -1) return null;

  db.promotions[index] = { ...db.promotions[index], ...data };
  scheduleSave(db);
  return db.promotions[index];
}

export async function deletePromotion(id: string): Promise<boolean> {
  const db = loadDatabase();
  const len = db.promotions.length;
  db.promotions = db.promotions.filter((p) => p.id !== id);
  if (db.promotions.length !== len) {
    scheduleSave(db);
    return true;
  }
  return false;
}

// ─────────────────────────────────────────────────────────────
// REVIEWS
// ─────────────────────────────────────────────────────────────

export async function getReviews(): Promise<Review[]> {
  const db = loadDatabase();
  return db.reviews;
}

export async function moderateReview(
  id: string,
  status: "pending" | "approved" | "rejected"
): Promise<Review | null> {
  const db = loadDatabase();
  const review = db.reviews.find((r) => r.id === id);
  if (!review) return null;

  review.status = status;
  scheduleSave(db);
  return review;
}

export const updateReviewStatus = moderateReview;

export async function deleteReview(id: string): Promise<boolean> {
  const db = loadDatabase();
  const len = db.reviews.length;
  db.reviews = db.reviews.filter((r) => r.id !== id);
  if (db.reviews.length !== len) {
    scheduleSave(db);
    return true;
  }
  return false;
}

// ─────────────────────────────────────────────────────────────
// RETURNS
// ─────────────────────────────────────────────────────────────

export async function getReturns(): Promise<ReturnRequest[]> {
  const db = loadDatabase();
  return db.returns;
}

export async function updateReturnStatus(
  id: string,
  status: ReturnRequest["status"],
  resolutionNote?: string
): Promise<ReturnRequest | null> {
  const db = loadDatabase();
  const item = db.returns.find((r) => r.id === id);
  if (!item) return null;

  item.status = status;
  if (resolutionNote !== undefined) item.resolutionNote = resolutionNote;
  scheduleSave(db);
  return item;
}

// ─────────────────────────────────────────────────────────────
// SETTINGS
// ─────────────────────────────────────────────────────────────

export async function getSettings(): Promise<StoreSettings> {
  const db = loadDatabase();
  return db.settings;
}

export async function updateSettings(data: Partial<StoreSettings>): Promise<StoreSettings> {
  const db = loadDatabase();
  db.settings = {
    ...db.settings,
    ...data,
    shipping: { ...db.settings.shipping, ...(data.shipping || {}) },
    paymentMethods: { ...db.settings.paymentMethods, ...(data.paymentMethods || {}) },
  };
  scheduleSave(db);
  return db.settings;
}
