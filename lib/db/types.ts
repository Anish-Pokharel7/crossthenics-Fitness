export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "returned";

export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";

export type PaymentMethod = "cod" | "esewa" | "khalti" | "bank_transfer";

export type OrderFulfillmentStatus = OrderStatus;
export type OrderPaymentStatus = PaymentStatus;

export interface ShippingAddress {
  fullName: string;
  phone: string;
  address?: string;
  street?: string;
  city: string;
  state?: string;
  province?: string;
  postalCode?: string;
  landmark?: string;
}

export interface OrderItem {
  productId: string;
  productName?: string;
  name?: string;
  productImage?: string;
  image?: string;
  variant?: string;
  size?: string;
  quantity: number;
  price: number;
  total?: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: ShippingAddress;
  items: OrderItem[];
  subtotal: number;
  shippingCharge: number;
  shippingCost?: number;
  discount: number;
  total: number;
  grandTotal: number;
  fulfillmentStatus: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  trackingNumber?: string;
  courierPartner?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductVariant {
  name: string;
  options: string[];
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  salePrice?: number;
  costPrice?: number;
  compareAtPrice?: number;
  stock: number;
  lowStockThreshold?: number;
  sku: string;
  published: boolean;
  isPublished?: boolean;
  isNew?: boolean;
  isBestseller?: boolean;
  description: string;
  fullDescription?: string;
  images: string[];
  image?: string;
  inStock?: boolean;
  sizes?: string[];
  badge?: string;
  features?: string[];
  specs?: Record<string, string>;
  variants?: ProductVariant[];
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount: number;
  visible: boolean;
  isVisible?: boolean;
  sortOrder?: number;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  ordersCount: number;
  totalSpent: number;
  lastOrderDate: string;
  joinedDate: string;
  status: "active" | "inactive";
}

export interface Promotion {
  id: string;
  code: string;
  type: "percentage" | "fixed";
  value: number;
  minOrderAmount?: number;
  usedCount: number;
  usageLimit?: number;
  expiresAt?: string;
  active: boolean;
  description?: string;
}

export interface Review {
  id: string;
  productId: string;
  productName: string;
  customerName: string;
  rating: number;
  comment: string;
  status: "pending" | "approved" | "rejected";
  verified: boolean;
  createdAt: string;
}

export interface ReturnRequest {
  id: string;
  orderId: string;
  customerName: string;
  customerPhone: string;
  reason: string;
  action: "refund" | "exchange";
  status: "pending" | "approved" | "rejected" | "completed";
  resolutionNote?: string;
  createdAt: string;
}

export interface InventoryLog {
  id: string;
  productId: string;
  productName: string;
  change: number;
  newStock: number;
  reason: "sale" | "restock" | "damage" | "return" | "manual_adjustment";
  note?: string;
  timestamp: string;
}

export interface StoreSettings {
  storeName: string;
  tagline: string;
  supportEmail: string;
  supportPhone: string;
  address: string;
  currency: string;
  currencySymbol: string;
  timezone: string;
  shipping: {
    insideValley: number;
    outsideValley: number;
    freeShippingThreshold: number;
  };
  paymentMethods: {
    cod: boolean;
    esewa: boolean;
    khalti: boolean;
    bank_transfer: boolean;
  };
  lowStockThreshold: number;
}

export interface DashboardMetric {
  value: number;
  formatted: string;
  changePercentage: number | null;
  isPositive: boolean;
}

export interface DashboardStats {
  metrics: {
    totalRevenue: DashboardMetric;
    totalOrders: DashboardMetric;
    totalCustomers: DashboardMetric;
    conversionRate: DashboardMetric;
  };
  salesOverview: {
    days: number;
    labels: string[];
    revenueData: number[];
    ordersData: number[];
    data: Array<{ date: string; revenue: number; orders: number }>;
  };
  revenueTrend: {
    months: string[];
    values: number[];
    data: Array<{ month: string; revenue: number; orders: number }>;
  };
  topSellingProducts: Array<{
    id: string;
    name: string;
    price: number;
    formattedPrice: string;
    priceFormatted?: string;
    soldCount: number;
    unitsSold?: number;
    image: string;
  }>;
  recentOrders: Order[];
  orderStatusBreakdown: Array<{
    status: string;
    label: string;
    count: number;
    percentage: number;
    color: string;
  }>;
  inventoryOverview: {
    lowStockCount: number;
    outOfStockCount: number;
    totalProductsCount: number;
    totalProducts?: number;
    totalStockValue: number;
    formattedStockValue: string;
    totalStockValueFormatted?: string;
  };
  customerInsights: {
    totalCustomers: number;
    newCustomers: number;
    newCustomersThisMonth?: number;
    avgOrderValue: number;
    averageOrderValueFormatted?: string;
    avgOrdersPerCustomer: number;
    repeatPurchaseRate?: number;
    growthCurve: {
      labels: string[];
      newCustomersData: number[];
      returningCustomersData: number[];
    };
    customerGrowth: Array<{ label: string; customers: number }>;
  };
  trafficSources: Array<{
    source: string;
    visitors: number;
    percentage: number;
    color?: string;
  }>;
}
