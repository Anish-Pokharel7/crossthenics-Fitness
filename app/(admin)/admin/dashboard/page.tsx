import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  DollarSign,
  Package,
  Settings,
  ShoppingCart,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";
import Link from "next/link";

const stats = [
  {
    name: "Total Products",
    value: "247",
    change: "+12%",
    changeType: "increase",
    icon: Package,
    color: "bg-blue-500",
    href: "/admin/products",
  },
  {
    name: "Total Orders",
    value: "1,234",
    change: "+8%",
    changeType: "increase",
    icon: ShoppingCart,
    color: "bg-green-500",
    href: "/admin/orders",
  },
  {
    name: "Total Users",
    value: "5,678",
    change: "+15%",
    changeType: "increase",
    icon: Users,
    color: "bg-purple-500",
    href: "/admin/users",
  },
  {
    name: "Revenue",
    value: "$89,432",
    change: "-3%",
    changeType: "decrease",
    icon: DollarSign,
    color: "bg-primary",
    href: "/admin/orders",
  },
];

const recentOrders = [
  {
    id: "#ORD-001",
    customer: "John Smith",
    email: "john@example.com",
    total: "$299.99",
    status: "Delivered",
    date: "Aug 28, 2026",
  },
  {
    id: "#ORD-002",
    customer: "Sarah Johnson",
    email: "sarah@example.com",
    total: "$149.50",
    status: "Shipped",
    date: "Aug 27, 2026",
  },
  {
    id: "#ORD-003",
    customer: "Mike Wilson",
    email: "mike@example.com",
    total: "$89.99",
    status: "Processing",
    date: "Aug 27, 2026",
  },
  {
    id: "#ORD-004",
    customer: "Emily Davis",
    email: "emily@example.com",
    total: "$449.00",
    status: "Pending",
    date: "Aug 26, 2026",
  },
  {
    id: "#ORD-005",
    customer: "David Brown",
    email: "david@example.com",
    total: "$199.99",
    status: "Cancelled",
    date: "Aug 25, 2026",
  },
];

const lowStockProducts = [
  {
    name: "Pro Lifting Belt - Black",
    sku: "PLB-001",
    stock: 3,
    price: "$89.99",
  },
  { name: "Grip Chalk - Block", sku: "GCB-002", stock: 5, price: "$12.99" },
  { name: "Wrist Wraps - Pair", sku: "WW-003", stock: 2, price: "$24.99" },
  { name: "Knee Sleeves - 7mm", sku: "KS-004", stock: 7, price: "$54.99" },
];

function StatCard({ stat }: { stat: (typeof stats)[0] }) {
  const Icon = stat.icon;
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {stat.name}
        </CardTitle>
        <div className={cn("p-2 rounded-lg", stat.color)}>
          <Icon className="h-4 w-4 text-white" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{stat.value}</div>
        <Link
          href={stat.href}
          className={cn(
            "text-xs font-medium flex items-center gap-1 mt-2",
            stat.changeType === "increase" ? "text-green-600" : "text-red-600",
          )}
        >
          {stat.changeType === "increase" ? (
            <TrendingUp size={12} />
          ) : (
            <TrendingDown size={12} />
          )}
          {stat.change} vs last month
        </Link>
      </CardContent>
    </Card>
  );
}

function StatusBadge({ status }: { status: string }) {
  const variants: Record<string, string> = {
    Delivered: "bg-green-100 text-green-800",
    Shipped: "bg-blue-100 text-blue-800",
    Processing: "bg-yellow-100 text-yellow-800",
    Pending: "bg-muted text-foreground",
    Cancelled: "bg-red-100 text-red-800",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        variants[status],
      )}
    >
      {status}
    </span>
  );
}

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back! Here&apos;s what&apos;s happening with your store.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Export Report</Button>
          <Button>Refresh Data</Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.name} stat={stat} />
        ))}
      </div>

      {/* Recent Orders & Low Stock */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Orders</CardTitle>
              <Link
                href="/admin/orders"
                className="text-sm text-primary hover:text-primary/80 font-medium"
              >
                View all
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider border-b border-border">
                    <th className="pb-3">Order ID</th>
                    <th className="pb-3">Customer</th>
                    <th className="pb-3">Total</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-muted">
                      <td className="py-3 text-sm font-medium text-foreground">
                        {order.id}
                      </td>
                      <td className="py-3">
                        <div className="text-sm text-foreground">
                          {order.customer}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {order.email}
                        </div>
                      </td>
                      <td className="py-3 text-sm text-foreground">
                        {order.total}
                      </td>
                      <td className="py-3">
                        <StatusBadge status={order.status} />
                      </td>
                      <td className="py-3 text-sm text-muted-foreground">
                        {order.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Low Stock Products */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Low Stock Alert</CardTitle>
              <Link
                href="/admin/products"
                className="text-sm text-primary hover:text-primary/80 font-medium"
              >
                View all
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {lowStockProducts.map((product) => (
                <div
                  key={product.sku}
                  className="flex items-center justify-between p-3 bg-muted rounded-lg"
                >
                  <div>
                    <p className="font-medium text-foreground">
                      {product.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      SKU: {product.sku}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-red-600">
                      Only {product.stock} left
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {product.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Link
              href="/admin/products/new"
              className="flex flex-col items-center p-6 text-center bg-muted rounded-lg hover:bg-secondary transition-colors"
            >
              <Package className="h-10 w-10 text-primary mb-2" />
              <span className="font-medium text-foreground">Add Product</span>
            </Link>
            <Link
              href="/admin/orders"
              className="flex flex-col items-center p-6 text-center bg-muted rounded-lg hover:bg-secondary transition-colors"
            >
              <ShoppingCart className="h-10 w-10 text-blue-600 mb-2" />
              <span className="font-medium text-foreground">Manage Orders</span>
            </Link>
            <Link
              href="/admin/users"
              className="flex flex-col items-center p-6 text-center bg-muted rounded-lg hover:bg-secondary transition-colors"
            >
              <Users className="h-10 w-10 text-green-600 mb-2" />
              <span className="font-medium text-foreground">View Users</span>
            </Link>
            <Link
              href="/admin/settings"
              className="flex flex-col items-center p-6 text-center bg-muted rounded-lg hover:bg-secondary transition-colors"
            >
              <Settings className="h-10 w-10 text-purple-600 mb-2" />
              <span className="font-medium text-foreground">Settings</span>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
