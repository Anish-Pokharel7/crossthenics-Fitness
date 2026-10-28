"use client";

import { useState } from "react";
import {
  Search,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Mail,
  Phone,
  MapPin,
  Shield,
  UserPlus,
  Activity,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const mockUsers = [
  {
    id: "USR-001",
    name: "John Smith",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    role: "customer",
    status: "active",
    avatar: null,
    joined: "Jan 15, 2025",
    lastActive: "2 hours ago",
    ordersCount: 12,
    totalSpent: 1245.50,
    address: "123 Main St, New York, NY 10001",
  },
  {
    id: "USR-002",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    phone: "+1 (555) 234-5678",
    role: "customer",
    status: "active",
    avatar: null,
    joined: "Mar 22, 2025",
    lastActive: "1 day ago",
    ordersCount: 8,
    totalSpent: 892.00,
    address: "456 Oak Ave, Los Angeles, CA 90001",
  },
  {
    id: "USR-003",
    name: "Mike Wilson",
    email: "mike@example.com",
    phone: "+1 (555) 345-6789",
    role: "customer",
    status: "inactive",
    avatar: null,
    joined: "Jun 10, 2025",
    lastActive: "45 days ago",
    ordersCount: 3,
    totalSpent: 234.99,
    address: "789 Pine Rd, Chicago, IL 60601",
  },
  {
    id: "USR-004",
    name: "Emily Davis",
    email: "emily@example.com",
    phone: "+1 (555) 456-7890",
    role: "admin",
    status: "active",
    avatar: null,
    joined: "Sep 01, 2024",
    lastActive: "5 minutes ago",
    ordersCount: 0,
    totalSpent: 0,
    address: "321 Elm St, Houston, TX 77001",
  },
  {
    id: "USR-005",
    name: "David Brown",
    email: "david@example.com",
    phone: "+1 (555) 567-8901",
    role: "customer",
    status: "active",
    avatar: null,
    joined: "Nov 05, 2025",
    lastActive: "3 hours ago",
    ordersCount: 5,
    totalSpent: 445.75,
    address: "654 Maple Dr, Phoenix, AZ 85001",
  },
  {
    id: "USR-006",
    name: "Lisa Anderson",
    email: "lisa@example.com",
    phone: "+1 (555) 678-9012",
    role: "staff",
    status: "active",
    avatar: null,
    joined: "Feb 14, 2025",
    lastActive: "1 hour ago",
    ordersCount: 1,
    totalSpent: 89.99,
    address: "987 Cedar Ln, Seattle, WA 98101",
  },
];

function RoleBadge({ role }: { role: string }) {
  const variants: Record<string, string> = {
    admin: "bg-purple-100 text-purple-800",
    staff: "bg-blue-100 text-blue-800",
    customer: "bg-gray-100 text-gray-800",
  };
  return (
    <Badge variant="secondary" className={cn("gap-1", variants[role])}>
      <Shield className="h-3 w-3" />
      {role.charAt(0).toUpperCase() + role.slice(1)}
    </Badge>
  );
}

function StatusBadge({ status }: { status: string }) {
  const variants: Record<string, string> = {
    active: "bg-green-100 text-green-800",
    inactive: "bg-gray-100 text-gray-800",
    banned: "bg-red-100 text-red-800",
  };
  return (
    <Badge variant="secondary" className={cn("gap-1", variants[status])}>
      <Activity className="h-3 w-3" />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function AdminUsers() {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedUser, setSelectedUser] = useState<typeof mockUsers[0] | null>(null);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);

  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleStatusChange = (userId: string, newStatus: string) => {
    console.log(`User ${userId} status changed to ${newStatus}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Users</h1>
          <p className="text-gray-500 mt-1">Manage customer accounts and staff</p>
        </div>
        <Button>
          <UserPlus className="h-4 w-4 mr-2" />
          Add User
        </Button>
      </div>

      {/* Filters & Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full sm:w-[160px]">
                <SelectValue placeholder="All Roles" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="staff">Staff</SelectItem>
                <SelectItem value="customer">Customer</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[160px]">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="banned">Banned</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Users ({filteredUsers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">Avatar</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead className="text-right">Orders</TableHead>
                  <TableHead className="text-right">Total Spent</TableHead>
                  <TableHead className="w-16 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-12 text-gray-500">
                      No users found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => { setSelectedUser(user); setDetailDialogOpen(true); }}>
                      <TableCell>
                        <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-700 font-semibold">
                          {getInitials(user.name)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </TableCell>
                      <TableCell><RoleBadge role={user.role} /></TableCell>
                      <TableCell><StatusBadge status={user.status} /></TableCell>
                      <TableCell className="text-sm text-gray-500">{user.joined}</TableCell>
                      <TableCell className="text-sm text-gray-500">{user.lastActive}</TableCell>
                      <TableCell className="text-right text-sm text-gray-900">{user.ordersCount}</TableCell>
                      <TableCell className="text-right font-medium text-gray-900">${user.totalSpent.toFixed(2)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-52">
                            <DropdownMenuItem onClick={(e) => { e.stopPropagation(); setSelectedUser(user); setDetailDialogOpen(true); }}>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={(e) => { e.stopPropagation(); }}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit User
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Shield className="h-4 w-4 mr-2" />
                              {user.role === "admin" ? "Remove Admin" : "Make Admin"}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={(e) => { e.stopPropagation(); handleStatusChange(user.id, user.status === "active" ? "inactive" : "active"); }}
                              className={user.status !== "active" ? "text-green-600" : "text-red-600"}
                            >
                              {user.status === "active" ? (
                                <>
                                  <Activity className="h-4 w-4 mr-2" />
                                  Deactivate
                                </>
                              ) : (
                                <>
                                  <Activity className="h-4 w-4 mr-2" />
                                  Activate
                                </>
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600" onClick={(e) => { e.stopPropagation(); handleStatusChange(user.id, "banned"); }}>
                              <Trash2 className="h-4 w-4 mr-2" />
                              Ban User
                            </DropdownMenuItem>
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

      {/* User Detail Dialog */}
      <Dialog open={detailDialogOpen} onOpenChange={setDetailDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedUser && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-full bg-orange-100 flex items-center justify-center text-orange-700 text-2xl font-bold">
                      {getInitials(selectedUser.name)}
                    </div>
                    <div>
                      <DialogTitle className="text-2xl">{selectedUser.name}</DialogTitle>
                      <p className="text-gray-500">{selectedUser.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <RoleBadge role={selectedUser.role} />
                    <StatusBadge status={selectedUser.status} />
                  </div>
                </div>
              </DialogHeader>

              <Tabs defaultValue="profile" className="w-full">
                <TabsList className="w-full">
                  <TabsTrigger value="profile">Profile</TabsTrigger>
                  <TabsTrigger value="orders">Orders</TabsTrigger>
                  <TabsTrigger value="addresses">Addresses</TabsTrigger>
                  <TabsTrigger value="activity">Activity</TabsTrigger>
                </TabsList>

                <TabsContent value="profile" className="p-6 space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <Mail className="h-5 w-5 text-gray-400" />
                          <div>
                            <p className="text-sm text-gray-500">Email</p>
                            <p className="font-medium">{selectedUser.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <Phone className="h-5 w-5 text-gray-400" />
                          <div>
                            <p className="text-sm text-gray-500">Phone</p>
                            <p className="font-medium">{selectedUser.phone}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Account Details</h3>
                      <div className="space-y-4">
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-500">User ID</p>
                          <p className="font-medium font-mono">{selectedUser.id}</p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-500">Member Since</p>
                          <p className="font-medium">{selectedUser.joined}</p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-500">Last Active</p>
                          <p className="font-medium">{selectedUser.lastActive}</p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-500">Role</p>
                          <RoleBadge role={selectedUser.role} />
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-500">Status</p>
                          <StatusBadge status={selectedUser.status} />
                        </div>
                      </div>
                    </div>
                    <div className="sm:col-span-2">
                      <h3 className="text-lg font-semibold mb-4">Shipping Address</h3>
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <MapPin className="h-5 w-5 text-gray-400 mb-2" />
                        <p className="font-medium">{selectedUser.address}</p>
                      </div>
                    </div>
                    <div className="sm:col-span-2">
                      <h3 className="text-lg font-semibold mb-4">Order Statistics</h3>
                      <div className="grid gap-4 sm:grid-cols-3">
                        <div className="p-4 bg-gray-50 rounded-lg text-center">
                          <p className="text-3xl font-bold text-orange-600">{selectedUser.ordersCount}</p>
                          <p className="text-sm text-gray-500">Total Orders</p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg text-center">
                          <p className="text-3xl font-bold text-green-600">${selectedUser.totalSpent.toFixed(2)}</p>
                          <p className="text-sm text-gray-500">Total Spent</p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg text-center">
                          <p className="text-3xl font-bold text-blue-600">${(selectedUser.totalSpent / Math.max(selectedUser.ordersCount, 1)).toFixed(2)}</p>
                          <p className="text-sm text-gray-500">Avg. Order Value</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="orders" className="p-6">
                  <div className="text-center py-12 text-gray-500">
                    <Activity className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                    <p>Order history would be displayed here</p>
                    <p className="text-sm">Connected to order management system</p>
                  </div>
                </TabsContent>

                <TabsContent value="addresses" className="p-6">
                  <div className="text-center py-12 text-gray-500">
                    <MapPin className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                    <p>Saved addresses would be displayed here</p>
                  </div>
                </TabsContent>

                <TabsContent value="activity" className="p-6">
                  <div className="text-center py-12 text-gray-500">
                    <Activity className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                    <p>Recent activity log would be displayed here</p>
                  </div>
                </TabsContent>
              </Tabs>

              <DialogFooter>
                <Button variant="outline" onClick={() => setDetailDialogOpen(false)}>Close</Button>
                <Button onClick={() => { /* Edit user */ }}>Edit User</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
