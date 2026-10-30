"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/currency";
import {
  CheckCircle,
  Clock,
  Eye,
  Mail,
  MapPin,
  MoreVertical,
  Package,
  Phone,
  Search,
  Truck,
  XCircle,
} from "lucide-react";
import { useState } from "react";

const mockOrders = [
  {
    id: "#ORD-001",
    customer: "John Smith",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, New York, NY 10001",
    items: [
      { name: "Pro Lifting Belt - Black", qty: 1, price: 89.99 },
      { name: "Grip Chalk - Block", qty: 2, price: 12.99 },
    ],
    subtotal: 115.97,
    shipping: 9.99,
    tax: 10.03,
    total: 135.99,
    status: "delivered",
    paymentStatus: "paid",
    paymentMethod: "Credit Card",
    date: "Aug 28, 2026",
    trackingNumber: "1Z999AA10123456784",
  },
  {
    id: "#ORD-002",
    customer: "Sarah Johnson",
    email: "sarah@example.com",
    phone: "+1 (555) 234-5678",
    address: "456 Oak Ave, Los Angeles, CA 90001",
    items: [{ name: "Knee Sleeves - 7mm", qty: 1, price: 54.99 }],
    subtotal: 54.99,
    shipping: 9.99,
    tax: 5.51,
    total: 70.49,
    status: "shipped",
    paymentStatus: "paid",
    paymentMethod: "PayPal",
    date: "Aug 27, 2026",
    trackingNumber: "1Z999AA10123456785",
  },
  {
    id: "#ORD-003",
    customer: "Mike Wilson",
    email: "mike@example.com",
    phone: "+1 (555) 345-6789",
    address: "789 Pine Rd, Chicago, IL 60601",
    items: [
      { name: "Wrist Wraps - Pair", qty: 1, price: 24.99 },
      { name: "Lifting Straps - Pro", qty: 1, price: 19.99 },
    ],
    subtotal: 44.98,
    shipping: 9.99,
    tax: 4.51,
    total: 59.48,
    status: "processing",
    paymentStatus: "paid",
    paymentMethod: "Credit Card",
    date: "Aug 27, 2026",
    trackingNumber: null,
  },
  {
    id: "#ORD-004",
    customer: "Emily Davis",
    email: "emily@example.com",
    phone: "+1 (555) 456-7890",
    address: "321 Elm St, Houston, TX 77001",
    items: [{ name: "Pro Lifting Belt - Red", qty: 1, price: 89.99 }],
    subtotal: 89.99,
    shipping: 9.99,
    tax: 8.9,
    total: 108.88,
    status: "pending",
    paymentStatus: "pending",
    paymentMethod: "Bank Transfer",
    date: "Aug 26, 2026",
    trackingNumber: null,
  },
  {
    id: "#ORD-005",
    customer: "David Brown",
    email: "david@example.com",
    phone: "+1 (555) 567-8901",
    address: "654 Maple Dr, Phoenix, AZ 85001",
    items: [{ name: "Grip Chalk - Block", qty: 3, price: 12.99 }],
    subtotal: 38.97,
    shipping: 9.99,
    tax: 3.91,
    total: 52.87,
    status: "cancelled",
    paymentStatus: "refunded",
    paymentMethod: "Credit Card",
    date: "Aug 25, 2026",
    trackingNumber: null,
  },
];

const statusOptions = [
  { value: "pending", label: "Pending", icon: Clock },
  { value: "processing", label: "Processing", icon: Package },
  { value: "shipped", label: "Shipped", icon: Truck },
  { value: "delivered", label: "Delivered", icon: CheckCircle },
  { value: "cancelled", label: "Cancelled", icon: XCircle },
];

const paymentStatusOptions = [
  { value: "paid", label: "Paid" },
  { value: "pending", label: "Pending" },
  { value: "refunded", label: "Refunded" },
  { value: "failed", label: "Failed" },
];

function StatusBadge({ status }: { status: string }) {
  const statusConfig: Record<
    string,
    {
      label: string;
      className: string;
      icon: React.ComponentType<{ className?: string }>;
    }
  > = {
    pending: {
      label: "Pending",
      className: "bg-muted text-foreground",
      icon: Clock,
    },
    processing: {
      label: "Processing",
      className: "bg-[#414141] text-[#C0C0C0] border border-[#555]",
      icon: Package,
    },
    shipped: {
      label: "Shipped",
      className: "bg-[#414141] text-[#C0C0C0] border border-[#555]",
      icon: Truck,
    },
    delivered: {
      label: "Delivered",
      className: "bg-[#414141] text-[#C0C0C0] border border-[#555]",
      icon: CheckCircle,
    },
    cancelled: {
      label: "Cancelled",
      className: "bg-[#E10600] text-white",
      icon: XCircle,
    },
  };
  const config = statusConfig[status] || statusConfig.pending;
  const Icon = config.icon;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium",
        config.className,
      )}
    >
      <Icon className="h-3 w-3" />
      {config.label}
    </span>
  );
}

function PaymentStatusBadge({ status }: { status: string }) {
  const variants: Record<string, string> = {
    paid: "bg-[#414141] text-[#C0C0C0] border border-[#555]",
    pending: "bg-[#414141] text-[#C0C0C0] border border-[#555]",
    refunded: "bg-[#414141] text-[#C0C0C0] border border-[#555]",
    failed: "bg-[#E10600] text-white",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        variants[status],
      )}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

export default function AdminOrders() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentStatusFilter, setPaymentStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<
    (typeof mockOrders)[0] | null
  >(null);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);

  const filteredOrders = mockOrders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;
    const matchesPaymentStatus =
      paymentStatusFilter === "all" ||
      order.paymentStatus === paymentStatusFilter;
    return matchesSearch && matchesStatus && matchesPaymentStatus;
  });

  const handleStatusChange = (orderId: string, newStatus: string) => {
    // In a real app, this would call an API
    console.log(`Order ${orderId} status changed to ${newStatus}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Orders</h1>
          <p className="text-muted-foreground mt-1">
            Manage and track customer orders
          </p>
        </div>
      </div>

      {/* Filters & Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search orders, customers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                {statusOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={paymentStatusFilter}
              onValueChange={setPaymentStatusFilter}
            >
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Payment Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Payment Status</SelectItem>
                {paymentStatusOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Orders ({filteredOrders.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead className="w-16 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="text-center py-12 text-muted-foreground"
                    >
                      No orders found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredOrders.map((order) => (
                    <TableRow
                      key={order.id}
                      className="hover:bg-muted cursor-pointer"
                      onClick={() => {
                        setSelectedOrder(order);
                        setDetailDialogOpen(true);
                      }}
                    >
                      <TableCell className="font-medium text-foreground">
                        {order.id}
                      </TableCell>
                      <TableCell>
                        <div className="font-medium text-foreground">
                          {order.customer}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {order.email}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {order.date}
                      </TableCell>
                      <TableCell className="text-right font-medium text-foreground">
                        {formatCurrency(order.total)}
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={order.status} />
                      </TableCell>
                      <TableCell>
                        <PaymentStatusBadge status={order.paymentStatus} />
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-56">
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedOrder(order);
                                setDetailDialogOpen(true);
                              }}
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {statusOptions.map((opt) => (
                              <DropdownMenuItem
                                key={opt.value}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleStatusChange(order.id, opt.value);
                                }}
                                className={
                                  order.status === opt.value ? "bg-muted" : ""
                                }
                              >
                                {order.status === opt.value && (
                                  <CheckCircle className="h-4 w-4 mr-2 text-[#E10600]" />
                                )}
                                <opt.icon className="h-4 w-4 mr-2" />
                                {opt.label}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Order Detail Dialog */}
      <Dialog open={detailDialogOpen} onOpenChange={setDetailDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedOrder && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <DialogTitle>Order Details: {selectedOrder.id}</DialogTitle>
                  <div className="flex items-center gap-2">
                    <StatusBadge status={selectedOrder.status} />
                    <PaymentStatusBadge status={selectedOrder.paymentStatus} />
                  </div>
                </div>
              </DialogHeader>

              <Tabs defaultValue="details" className="w-full">
                <TabsList className="w-full">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="customer">Customer</TabsTrigger>
                  <TabsTrigger value="timeline">Timeline</TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="space-y-6 p-6">
                  {/* Order Items */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Order Items</h3>
                    <div className="space-y-3">
                      {selectedOrder.items.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-muted rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <div className="h-12 w-12 rounded-lg bg-secondary flex items-center justify-center">
                              <Package className="h-6 w-6 text-muted-foreground" />
                            </div>
                            <div>
                              <p className="font-medium">{item.name}</p>
                              <p className="text-sm text-muted-foreground">
                                Qty: {item.qty} × {formatCurrency(item.price)}
                              </p>
                            </div>
                          </div>
                          <span className="font-medium">
                            {formatCurrency(item.qty * item.price)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold mb-4">
                      Order Summary
                    </h3>
                    <div className="max-w-md space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>{formatCurrency(selectedOrder.subtotal)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Shipping</span>
                        <span>{formatCurrency(selectedOrder.shipping)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Tax</span>
                        <span>{formatCurrency(selectedOrder.tax)}</span>
                      </div>
                      <div className="flex justify-between text-lg font-semibold border-t pt-2">
                        <span>Total</span>
                        <span>{formatCurrency(selectedOrder.total)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Payment Info */}
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold mb-4">
                      Payment Information
                    </h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Payment Method
                        </p>
                        <p className="font-medium">
                          {selectedOrder.paymentMethod}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Payment Status
                        </p>
                        <PaymentStatusBadge
                          status={selectedOrder.paymentStatus}
                        />
                      </div>
                      {selectedOrder.trackingNumber && (
                        <div className="sm:col-span-2">
                          <p className="text-sm text-muted-foreground">
                            Tracking Number
                          </p>
                          <p className="font-medium font-mono text-sm">
                            {selectedOrder.trackingNumber}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="customer" className="p-6 space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">
                        Contact Information
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                          <Mail className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Email
                            </p>
                            <p className="font-medium">{selectedOrder.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                          <Phone className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Phone
                            </p>
                            <p className="font-medium">{selectedOrder.phone}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-4">
                        Shipping Address
                      </h3>
                      <div className="p-3 bg-muted rounded-lg">
                        <MapPin className="h-5 w-5 text-muted-foreground mb-2" />
                        <p className="font-medium">{selectedOrder.address}</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="timeline" className="p-6">
                  <div className="space-y-6">
                    {[
                      {
                        status: "pending",
                        label: "Order Placed",
                        time: selectedOrder.date,
                        completed: true,
                      },
                      {
                        status: "processing",
                        label: "Processing",
                        time: "Aug 27, 2026",
                        completed: [
                          "processing",
                          "shipped",
                          "delivered",
                        ].includes(selectedOrder.status),
                      },
                      {
                        status: "shipped",
                        label: "Shipped",
                        time: "Aug 28, 2026",
                        completed: ["shipped", "delivered"].includes(
                          selectedOrder.status,
                        ),
                      },
                      {
                        status: "delivered",
                        label: "Delivered",
                        time: "Aug 29, 2026",
                        completed: selectedOrder.status === "delivered",
                      },
                    ].map((step) => (
                      <div
                        key={step.status}
                        className="flex items-start gap-4 relative"
                      >
                        <div className="relative flex h-full w-0.5 bg-border" />
                        <div
                          className={cn(
                            "relative flex h-10 w-10 items-center justify-center rounded-full border-2 border-border bg-card shrink-0 z-10",
                            step.completed && "border-primary bg-primary",
                          )}
                        >
                          {step.completed ? (
                            <CheckCircle className="h-5 w-5 text-white" />
                          ) : (
                            <div
                              className={cn(
                                "h-2.5 w-2.5 rounded-full",
                                step.completed ? "bg-primary" : "bg-border",
                              )}
                            />
                          )}
                        </div>
                        <div className="flex-1 pt-1">
                          <p
                            className={cn(
                              "font-medium",
                              step.completed
                                ? "text-foreground"
                                : "text-muted-foreground",
                            )}
                          >
                            {step.label}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {step.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>

              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setDetailDialogOpen(false)}
                >
                  Close
                </Button>
                <Button
                  onClick={() => {
                    /* Print order */
                  }}
                >
                  Print Order
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
