import { useState } from 'react';
import {
  Save,
  Bell,
  Shield,
  Globe,
  Mail,
  User,
  CreditCard,
  Smartphone
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { AdminSidebar } from '@/components/layout/AdminSidebar';
import { FadeIn } from '@/components/animations/FadeIn';
import { toast } from 'sonner';

export function AdminSettings() {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success('Settings saved successfully');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col lg:flex-row">
      <AdminSidebar />

      <main className="flex-1 lg:ml-64 pt-16 lg:pt-0">
        <header className="sticky top-0 z-20 bg-background/95 backdrop-blur border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-white">Settings</h1>
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="bg-primary hover:bg-primary/90 text-black font-bold px-8 rounded-xl shadow-[0_0_20px_rgba(34,197,94,0.3)] transition-all"
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
              <Save className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </header>

        <div className="p-6">
          <FadeIn>
            <Tabs defaultValue="general" className="space-y-6">
              <TabsList className="bg-white/5 border border-white/10 p-1 rounded-xl">
                <TabsTrigger value="general" className="rounded-lg px-6 data-[state=active]:bg-primary data-[state=active]:text-black">General</TabsTrigger>
                <TabsTrigger value="store" className="rounded-lg px-6 data-[state=active]:bg-primary data-[state=active]:text-black">Store</TabsTrigger>
                <TabsTrigger value="notifications" className="rounded-lg px-6 data-[state=active]:bg-primary data-[state=active]:text-black">Notifications</TabsTrigger>
                <TabsTrigger value="security" className="rounded-lg px-6 data-[state=active]:bg-primary data-[state=active]:text-black">Security</TabsTrigger>
              </TabsList>

              <TabsContent value="general" className="space-y-6">
                <Card className="bg-card/50 backdrop-blur-xl border-white/5 overflow-hidden">
                  <CardHeader className="border-b border-white/5">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <User className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">Store Profile</CardTitle>
                        <CardDescription>Basic information about your business</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="store-name">Store Name</Label>
                        <Input id="store-name" defaultValue="RollON Premium" className="bg-white/5 border-white/10 focus:border-primary/50" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="store-email">Support Email</Label>
                        <Input id="store-email" defaultValue="support@rollon.com.bd" className="bg-white/5 border-white/10 focus:border-primary/50" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="store-phone">Contact Phone</Label>
                        <Input id="store-phone" defaultValue="+880 17XX-XXXXXX" className="bg-white/5 border-white/10 focus:border-primary/50" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="store-currency">Currency</Label>
                        <Input id="store-currency" defaultValue="BDT (৳)" disabled className="bg-white/5 border-white/10 opacity-50" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card/50 backdrop-blur-xl border-white/5 overflow-hidden">
                  <CardHeader className="border-b border-white/5">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-500/10 rounded-lg">
                        <Globe className="h-5 w-5 text-blue-500" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">Localization</CardTitle>
                        <CardDescription>Configure language and regional settings</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Primary Language</Label>
                        <p className="text-sm text-muted-foreground">The default language for your storefront</p>
                      </div>
                      <Button variant="outline" className="border-white/10">English (US)</Button>
                    </div>
                    <Separator className="bg-white/5" />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Timezone</Label>
                        <p className="text-sm text-muted-foreground">Store server time and reporting</p>
                      </div>
                      <Button variant="outline" className="border-white/10">GMT+6 (Dhaka)</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="store" className="space-y-6">
                <Card className="bg-card/50 backdrop-blur-xl border-white/5 overflow-hidden">
                  <CardHeader className="border-b border-white/5">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-orange-500/10 rounded-lg">
                        <Smartphone className="h-5 w-5 text-orange-500" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">Checkout Experience</CardTitle>
                        <CardDescription>Manage how customers buy from you</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Guest Checkout</Label>
                        <p className="text-sm text-muted-foreground">Allow customers to purchase without an account</p>
                      </div>
                      <div className="w-10 h-6 bg-primary rounded-full relative"><div className="absolute right-1 top-1 w-4 h-4 bg-black rounded-full" /></div>
                    </div>
                    <Separator className="bg-white/5" />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Order Notes</Label>
                        <p className="text-sm text-muted-foreground">Enable custom messages during checkout</p>
                      </div>
                      <div className="w-10 h-6 bg-primary rounded-full relative"><div className="absolute right-1 top-1 w-4 h-4 bg-black rounded-full" /></div>
                    </div>
                    <Separator className="bg-white/5" />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Stock Auto-Update</Label>
                        <p className="text-sm text-muted-foreground">Automatically decrement stock after purchase</p>
                      </div>
                      <div className="w-10 h-6 bg-primary rounded-full relative"><div className="absolute right-1 top-1 w-4 h-4 bg-black rounded-full" /></div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card/50 backdrop-blur-xl border-white/5 overflow-hidden">
                  <CardHeader className="border-b border-white/5">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-500/10 rounded-lg">
                        <CreditCard className="h-5 w-5 text-purple-500" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">Payment Methods</CardTitle>
                        <CardDescription>Configure active payment gateways</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                            <span className="text-black font-bold text-[10px]">SSL</span>
                        </div>
                        <div>
                            <p className="font-bold">SSLCommerz</p>
                            <p className="text-xs text-muted-foreground">Cards, Netbanking</p>
                        </div>
                      </div>
                      <Badge className="bg-primary/20 text-primary border-primary/50">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-[#e2136e] rounded-lg flex items-center justify-center text-white font-bold text-[10px]">
                            bKash
                        </div>
                        <div>
                            <p className="font-bold">bKash Integration</p>
                            <p className="text-xs text-muted-foreground">Direct mobile payment</p>
                        </div>
                      </div>
                      <Badge className="bg-primary/20 text-primary border-primary/50">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 opacity-50">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-[#0070ba] rounded-lg flex items-center justify-center text-white font-bold text-[10px]">
                            PayPal
                        </div>
                        <div>
                            <p className="font-bold">PayPal</p>
                            <p className="text-xs text-muted-foreground">International payments</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-primary/10">Configure</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notifications" className="space-y-6">
                 <Card className="bg-card/50 backdrop-blur-xl border-white/5 overflow-hidden">
                  <CardHeader className="border-b border-white/5">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-yellow-500/10 rounded-lg">
                        <Bell className="h-5 w-5 text-yellow-500" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">Customer Notifications</CardTitle>
                        <CardDescription>Manage emails sent to your customers</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Order Confirmation</Label>
                        <p className="text-sm text-muted-foreground">Sent after a successful purchase</p>
                      </div>
                      <div className="w-10 h-6 bg-primary rounded-full relative"><div className="absolute right-1 top-1 w-4 h-4 bg-black rounded-full" /></div>
                    </div>
                    <Separator className="bg-white/5" />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Shipping Updates</Label>
                        <p className="text-sm text-muted-foreground">Sent when order status changes to 'shipped'</p>
                      </div>
                      <div className="w-10 h-6 bg-primary rounded-full relative"><div className="absolute right-1 top-1 w-4 h-4 bg-black rounded-full" /></div>
                    </div>
                    <Separator className="bg-white/5" />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Marketing Emails</Label>
                        <p className="text-sm text-muted-foreground">Periodic newsletters and offers</p>
                      </div>
                      <div className="w-10 h-6 bg-white/10 rounded-full relative"><div className="absolute left-1 top-1 w-4 h-4 bg-white/40 rounded-full" /></div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card/50 backdrop-blur-xl border-white/5 overflow-hidden">
                  <CardHeader className="border-b border-white/5">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Mail className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">Admin Alerts</CardTitle>
                        <CardDescription>Stay updated on store activity</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>New Order Alert</Label>
                        <p className="text-sm text-muted-foreground">Get notified immediately on every new sale</p>
                      </div>
                      <div className="w-10 h-6 bg-primary rounded-full relative"><div className="absolute right-1 top-1 w-4 h-4 bg-black rounded-full" /></div>
                    </div>
                    <Separator className="bg-white/5" />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Low Stock Alert</Label>
                        <p className="text-sm text-muted-foreground">Notify when items fall below threshold</p>
                      </div>
                      <div className="w-10 h-6 bg-primary rounded-full relative"><div className="absolute right-1 top-1 w-4 h-4 bg-black rounded-full" /></div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="security" className="space-y-6">
                <Card className="bg-card/50 backdrop-blur-xl border-white/5 overflow-hidden">
                  <CardHeader className="border-b border-white/5">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-red-500/10 rounded-lg">
                        <Shield className="h-5 w-5 text-red-500" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">Admin Security</CardTitle>
                        <CardDescription>Protect your dashboard and data</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Two-Factor Authentication</Label>
                        <p className="text-sm text-muted-foreground">Add an extra layer of security to login</p>
                      </div>
                      <div className="w-10 h-6 bg-white/10 rounded-full relative"><div className="absolute left-1 top-1 w-4 h-4 bg-white/40 rounded-full" /></div>
                    </div>
                    <Separator className="bg-white/5" />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>IP Access Control</Label>
                        <p className="text-sm text-muted-foreground">Restrict admin access to specific IP ranges</p>
                      </div>
                      <Button variant="outline" size="sm" className="border-white/10">Configure</Button>
                    </div>
                    <Separator className="bg-white/5" />
                    <div className="space-y-4 pt-4">
                        <Button variant="destructive" className="rounded-xl w-full sm:w-auto">Change Admin Password</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </FadeIn>
        </div>
      </main>
    </div>
  );
}
