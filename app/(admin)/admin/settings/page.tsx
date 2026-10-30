"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Bell,
  CreditCard,
  Globe,
  Loader2,
  Mail,
  Palette,
  Save,
  Settings,
  Shield,
  Store,
  Truck,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const settingsTabs = [
  { id: "general", label: "General", icon: Settings },
  { id: "store", label: "Store", icon: Store },
  { id: "payments", label: "Payments", icon: CreditCard },
  { id: "shipping", label: "Shipping", icon: Truck },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "localization", label: "Localization", icon: Globe },
  { id: "email", label: "Email", icon: Mail },
];

function SettingItem({
  label,
  description,
  children,
}: {
  label: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-6 border-b border-border last:border-0">
      <div className="flex-1">
        <Label className="text-base font-medium text-foreground">{label}</Label>
        {description && (
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        )}
      </div>
      <div className="flex items-center gap-4 w-full sm:w-auto">{children}</div>
    </div>
  );
}

export default function AdminSettings() {
  const [saving, setSaving] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("general");

  const handleSave = async (tab: string) => {
    setSaving(tab);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSaving(null);
    toast.success(
      `${settingsTabs.find((t) => t.id === tab)?.label} settings saved`,
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground mt-1">
            Manage your store configuration
          </p>
        </div>
      </div>

      {/* Settings Tabs */}
      <Card>
        <CardContent className="pt-0">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-1 p-1 bg-muted rounded-lg">
              {settingsTabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    className="flex items-center justify-center gap-2 px-3 py-2 text-sm data-[state=active]:bg-card data-[state=active]:shadow-sm"
                  >
                    <Icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {/* General Settings */}
            <TabsContent value="general" className="p-6 space-y-0">
              <SettingItem
                label="Store Name"
                description="The name of your store displayed to customers"
              >
                <Input
                  defaultValue="Crossthenics Fitness"
                  className="w-full sm:w-96"
                />
              </SettingItem>
              <SettingItem
                label="Store Description"
                description="A brief description of your store for SEO"
              >
                <Textarea
                  defaultValue="Premium fitness equipment and accessories for serious athletes"
                  className="w-full sm:w-96"
                  rows={3}
                />
              </SettingItem>
              <SettingItem
                label="Store Email"
                description="Primary contact email for the store"
              >
                <Input
                  type="email"
                  defaultValue="hello@crossthenics.com"
                  className="w-full sm:w-96"
                />
              </SettingItem>
              <SettingItem
                label="Store Phone"
                description="Customer support phone number"
              >
                <Input
                  defaultValue="+1 (555) 123-4567"
                  className="w-full sm:w-96"
                />
              </SettingItem>
              <SettingItem
                label="Store Address"
                description="Physical address for shipping and returns"
              >
                <Textarea
                  defaultValue="123 Fitness Ave, New York, NY 10001"
                  className="w-full sm:w-96"
                  rows={2}
                />
              </SettingItem>
              <SettingItem
                label="Timezone"
                description="Default timezone for order timestamps"
              >
                <Select defaultValue="America/New_York">
                  <SelectTrigger className="w-full sm:w-96">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="America/New_York">
                      Eastern Time (ET)
                    </SelectItem>
                    <SelectItem value="America/Chicago">
                      Central Time (CT)
                    </SelectItem>
                    <SelectItem value="America/Denver">
                      Mountain Time (MT)
                    </SelectItem>
                    <SelectItem value="America/Los_Angeles">
                      Pacific Time (PT)
                    </SelectItem>
                    <SelectItem value="UTC">UTC</SelectItem>
                  </SelectContent>
                </Select>
              </SettingItem>
              <div className="p-6 border-t border-border flex justify-end">
                <Button
                  onClick={() => handleSave("general")}
                  disabled={saving === "general"}
                >
                  {saving === "general" ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <Save className="h-4 w-4 mr-2" />
                  )}
                  Save Changes
                </Button>
              </div>
            </TabsContent>

            {/* Store Settings */}
            <TabsContent value="store" className="p-6 space-y-0">
              <SettingItem
                label="Currency"
                description="Default currency for product prices"
              >
                <Select defaultValue="NPR">
                  <SelectTrigger className="w-full sm:w-96">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="NPR">NPR (Rs.)</SelectItem>
                  </SelectContent>
                </Select>
              </SettingItem>
              <SettingItem
                label="Tax Calculation"
                description="How tax is calculated on orders"
              >
                <Select defaultValue="inclusive">
                  <SelectTrigger className="w-full sm:w-96">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="inclusive">
                      Tax Included in Price
                    </SelectItem>
                    <SelectItem value="exclusive">
                      Tax Added at Checkout
                    </SelectItem>
                  </SelectContent>
                </Select>
              </SettingItem>
              <SettingItem
                label="Default Tax Rate (%)"
                description="Default tax rate applied to orders"
              >
                <Input
                  type="number"
                  step="0.1"
                  defaultValue="8.5"
                  className="w-full sm:w-96"
                />
              </SettingItem>
              <SettingItem
                label="Allow Guest Checkout"
                description="Allow customers to checkout without creating an account"
              >
                <Switch defaultChecked />
              </SettingItem>
              <SettingItem
                label="Require Account Verification"
                description="Require email verification before first order"
              >
                <Switch />
              </SettingItem>
              <SettingItem
                label="Minimum Order Amount"
                description="Minimum order value required for checkout"
              >
                <Input
                  type="number"
                  step="0.01"
                  defaultValue="0"
                  className="w-full sm:w-96"
                  placeholder="0.00"
                />
              </SettingItem>
              <div className="p-6 border-t border-border flex justify-end">
                <Button
                  onClick={() => handleSave("store")}
                  disabled={saving === "store"}
                >
                  {saving === "store" ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <Save className="h-4 w-4 mr-2" />
                  )}
                  Save Changes
                </Button>
              </div>
            </TabsContent>

            {/* Payments Settings */}
            <TabsContent value="payments" className="p-6 space-y-0">
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-foreground">
                  Payment Providers
                </h3>
                <div className="space-y-4">
                  {[
                    "Stripe",
                    "PayPal",
                    "Square",
                    "Apple Pay",
                    "Google Pay",
                  ].map((provider) => (
                    <SettingItem
                      key={provider}
                      label={provider}
                      description={`Configure ${provider} payment integration`}
                    >
                      <div className="flex items-center gap-4">
                        <Switch
                          defaultChecked={["Stripe", "PayPal"].includes(
                            provider,
                          )}
                        />
                        <Button variant="outline" size="sm">
                          Configure
                        </Button>
                      </div>
                    </SettingItem>
                  ))}
                </div>
              </div>
              <div className="p-6 border-t border-border flex justify-end">
                <Button
                  onClick={() => handleSave("payments")}
                  disabled={saving === "payments"}
                >
                  {saving === "payments" ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <Save className="h-4 w-4 mr-2" />
                  )}
                  Save Changes
                </Button>
              </div>
            </TabsContent>

            {/* Shipping Settings */}
            <TabsContent value="shipping" className="p-6 space-y-0">
              <SettingItem
                label="Free Shipping Threshold"
                description="Minimum order amount for free shipping"
              >
                <Input
                  type="number"
                  step="0.01"
                  defaultValue="100"
                  className="w-full sm:w-96"
                  placeholder="100.00"
                />
              </SettingItem>
              <SettingItem
                label="Default Shipping Rate"
                description="Flat rate shipping cost"
              >
                <Input
                  type="number"
                  step="0.01"
                  defaultValue="9.99"
                  className="w-full sm:w-96"
                  placeholder="9.99"
                />
              </SettingItem>
              <SettingItem
                label="International Shipping"
                description="Enable shipping to international addresses"
              >
                <Switch />
              </SettingItem>
              <SettingItem
                label="Shipping Zones"
                description="Configure shipping rates by region"
              >
                <Button variant="outline">Manage Zones</Button>
              </SettingItem>
              <SettingItem
                label="Packaging Options"
                description="Available packaging types for orders"
              >
                <Button variant="outline">Configure Packaging</Button>
              </SettingItem>
              <div className="p-6 border-t border-border flex justify-end">
                <Button
                  onClick={() => handleSave("shipping")}
                  disabled={saving === "shipping"}
                >
                  {saving === "shipping" ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <Save className="h-4 w-4 mr-2" />
                  )}
                  Save Changes
                </Button>
              </div>
            </TabsContent>

            {/* Notifications Settings */}
            <TabsContent value="notifications" className="p-6 space-y-0">
              <SettingItem
                label="Order Confirmation Email"
                description="Send email confirmation when order is placed"
              >
                <Switch defaultChecked />
              </SettingItem>
              <SettingItem
                label="Shipping Notification"
                description="Notify customer when order ships"
              >
                <Switch defaultChecked />
              </SettingItem>
              <SettingItem
                label="Delivery Confirmation"
                description="Notify customer when order is delivered"
              >
                <Switch defaultChecked />
              </SettingItem>
              <SettingItem
                label="Low Stock Alerts"
                description="Receive notifications when inventory is low"
              >
                <Switch defaultChecked />
              </SettingItem>
              <SettingItem
                label="New Customer Registration"
                description="Notify admin when new customer registers"
              >
                <Switch />
              </SettingItem>
              <SettingItem
                label="Weekly Sales Report"
                description="Receive weekly sales summary via email"
              >
                <Switch defaultChecked />
              </SettingItem>
              <div className="p-6 border-t border-border flex justify-end">
                <Button
                  onClick={() => handleSave("notifications")}
                  disabled={saving === "notifications"}
                >
                  {saving === "notifications" ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <Save className="h-4 w-4 mr-2" />
                  )}
                  Save Changes
                </Button>
              </div>
            </TabsContent>

            {/* Security Settings */}
            <TabsContent value="security" className="p-6 space-y-0">
              <SettingItem
                label="Two-Factor Authentication"
                description="Require 2FA for admin accounts"
              >
                <Switch defaultChecked />
              </SettingItem>
              <SettingItem
                label="Session Timeout (minutes)"
                description="Auto-logout after inactivity"
              >
                <Input
                  type="number"
                  defaultValue="60"
                  className="w-full sm:w-96"
                />
              </SettingItem>
              <SettingItem
                label="Password Expiry (days)"
                description="Force password change after specified days"
              >
                <Input
                  type="number"
                  defaultValue="90"
                  className="w-full sm:w-96"
                />
              </SettingItem>
              <SettingItem
                label="Login Attempts Before Lockout"
                description="Number of failed attempts before temporary lockout"
              >
                <Input
                  type="number"
                  defaultValue="5"
                  className="w-full sm:w-96"
                />
              </SettingItem>
              <SettingItem
                label="API Access"
                description="Enable API access for third-party integrations"
              >
                <Switch />
              </SettingItem>
              <div className="p-6 border-t border-border flex justify-end">
                <Button
                  onClick={() => handleSave("security")}
                  disabled={saving === "security"}
                >
                  {saving === "security" ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <Save className="h-4 w-4 mr-2" />
                  )}
                  Save Changes
                </Button>
              </div>
            </TabsContent>

            {/* Appearance Settings */}
            <TabsContent value="appearance" className="p-6 space-y-0">
              <SettingItem
                label="Theme Mode"
                description="Default theme for the admin panel"
              >
                <Select defaultValue="system">
                  <SelectTrigger className="w-full sm:w-96">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </SettingItem>
              <SettingItem
                label="Primary Color"
                description="Brand primary color used throughout the store"
              >
                <Input
                  type="color"
                  defaultValue="#E10600"
                  className="w-12 h-12 rounded-lg border border-border cursor-pointer"
                />
              </SettingItem>
              <SettingItem
                label="Logo"
                description="Store logo displayed in header and emails"
              >
                <Button variant="outline">Upload Logo</Button>
              </SettingItem>
              <SettingItem label="Favicon" description="Browser tab icon">
                <Button variant="outline">Upload Favicon</Button>
              </SettingItem>
              <SettingItem
                label="Compact Sidebar"
                description="Use compact sidebar navigation by default"
              >
                <Switch />
              </SettingItem>
              <div className="p-6 border-t border-border flex justify-end">
                <Button
                  onClick={() => handleSave("appearance")}
                  disabled={saving === "appearance"}
                >
                  {saving === "appearance" ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <Save className="h-4 w-4 mr-2" />
                  )}
                  Save Changes
                </Button>
              </div>
            </TabsContent>

            {/* Localization Settings */}
            <TabsContent value="localization" className="p-6 space-y-0">
              <SettingItem
                label="Default Language"
                description="Primary language for the store"
              >
                <Select defaultValue="en">
                  <SelectTrigger className="w-full sm:w-96">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                    <SelectItem value="it">Italian</SelectItem>
                    <SelectItem value="pt">Portuguese</SelectItem>
                  </SelectContent>
                </Select>
              </SettingItem>
              <SettingItem
                label="Supported Languages"
                description="Languages available for customers"
              >
                <Button variant="outline">Manage Languages</Button>
              </SettingItem>
              <SettingItem
                label="Date Format"
                description="Default date display format"
              >
                <Select defaultValue="MM/DD/YYYY">
                  <SelectTrigger className="w-full sm:w-96">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                    <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                    <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                  </SelectContent>
                </Select>
              </SettingItem>
              <SettingItem
                label="Number Format"
                description="Number and currency formatting"
              >
                <Select defaultValue="en-US">
                  <SelectTrigger className="w-full sm:w-96">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en-US">US (1,234.56)</SelectItem>
                    <SelectItem value="de-DE">German (1.234,56)</SelectItem>
                    <SelectItem value="fr-FR">French (1 234,56)</SelectItem>
                  </SelectContent>
                </Select>
              </SettingItem>
              <div className="p-6 border-t border-border flex justify-end">
                <Button
                  onClick={() => handleSave("localization")}
                  disabled={saving === "localization"}
                >
                  {saving === "localization" ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <Save className="h-4 w-4 mr-2" />
                  )}
                  Save Changes
                </Button>
              </div>
            </TabsContent>

            {/* Email Settings */}
            <TabsContent value="email" className="p-6 space-y-0">
              <SettingItem
                label="Email Provider"
                description="Service used for sending transactional emails"
              >
                <Select defaultValue="sendgrid">
                  <SelectTrigger className="w-full sm:w-96">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sendgrid">SendGrid</SelectItem>
                    <SelectItem value="mailgun">Mailgun</SelectItem>
                    <SelectItem value="postmark">Postmark</SelectItem>
                    <SelectItem value="smtp">Custom SMTP</SelectItem>
                  </SelectContent>
                </Select>
              </SettingItem>
              <SettingItem
                label="From Name"
                description="Name displayed in sender field"
              >
                <Input
                  defaultValue="Crossthenics Fitness"
                  className="w-full sm:w-96"
                />
              </SettingItem>
              <SettingItem
                label="From Email"
                description="Email address used as sender"
              >
                <Input
                  type="email"
                  defaultValue="noreply@crossthenics.com"
                  className="w-full sm:w-96"
                />
              </SettingItem>
              <SettingItem
                label="Reply-To Email"
                description="Email address for customer replies"
              >
                <Input
                  type="email"
                  defaultValue="support@crossthenics.com"
                  className="w-full sm:w-96"
                />
              </SettingItem>
              <SettingItem
                label="Email Templates"
                description="Customize transactional email templates"
              >
                <Button variant="outline">Manage Templates</Button>
              </SettingItem>
              <SettingItem
                label="Test Email"
                description="Send a test email to verify configuration"
              >
                <Button
                  variant="outline"
                  onClick={() => toast.info("Test email sent!")}
                >
                  Send Test
                </Button>
              </SettingItem>
              <div className="p-6 border-t border-border flex justify-end">
                <Button
                  onClick={() => handleSave("email")}
                  disabled={saving === "email"}
                >
                  {saving === "email" ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <Save className="h-4 w-4 mr-2" />
                  )}
                  Save Changes
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
