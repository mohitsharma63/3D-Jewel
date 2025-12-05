
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Save, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function DashboardSettings() {
  const { toast } = useToast();
  const [workshopName, setWorkshopName] = useState("Rajesh Zaveri");
  const [email, setEmail] = useState("rajesh@zaveri.com");
  const [phone, setPhone] = useState("+91 98765 43210");
  const [address, setAddress] = useState("23, Zaveri Bazaar, Kalbadevi Road, Mumbai");
  const [description, setDescription] = useState(
    "Specializing in traditional and contemporary jewelry designs with over 75 years of experience."
  );
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [orderUpdates, setOrderUpdates] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your workshop settings have been updated successfully.",
    });
  };

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">
          Manage your workshop profile and preferences
        </p>
      </div>

      {/* Workshop Information */}
      <Card>
        <CardHeader>
          <CardTitle>Workshop Information</CardTitle>
          <CardDescription>
            Update your workshop details and contact information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="workshopName">Workshop Name</Label>
            <Input
              id="workshopName"
              value={workshopName}
              onChange={(e) => setWorkshopName(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Textarea
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Workshop Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label>Workshop Logo</Label>
            <div className="flex items-center gap-4">
              <div className="w-24 h-24 bg-muted rounded-lg flex items-center justify-center">
                <Upload className="h-8 w-8 text-muted-foreground" />
              </div>
              <Button variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                Upload New Logo
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Business Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Business Settings</CardTitle>
          <CardDescription>
            Configure your business hours and policies
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="businessHours">Business Hours</Label>
              <Input
                id="businessHours"
                defaultValue="Mon-Sat: 10:00 AM - 8:00 PM"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="minOrder">Minimum Order Value</Label>
              <Input
                id="minOrder"
                type="number"
                defaultValue="5000"
                placeholder="Enter amount in ₹"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="returnPolicy">Return Policy</Label>
            <Textarea
              id="returnPolicy"
              defaultValue="30-day return policy on all products. Items must be unused and in original packaging."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="shippingInfo">Shipping Information</Label>
            <Textarea
              id="shippingInfo"
              defaultValue="Free shipping on orders above ₹25,000. Standard shipping takes 5-7 business days."
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Notification Preferences */}
      <Card>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
          <CardDescription>
            Manage how you receive notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Email Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive notifications via email
              </p>
            </div>
            <Switch
              checked={emailNotifications}
              onCheckedChange={setEmailNotifications}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Order Updates</Label>
              <p className="text-sm text-muted-foreground">
                Get notified about new orders and updates
              </p>
            </div>
            <Switch
              checked={orderUpdates}
              onCheckedChange={setOrderUpdates}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Marketing Emails</Label>
              <p className="text-sm text-muted-foreground">
                Receive promotional emails and tips
              </p>
            </div>
            <Switch
              checked={marketingEmails}
              onCheckedChange={setMarketingEmails}
            />
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} size="lg" className="gap-2">
          <Save className="h-4 w-4" />
          Save Changes
        </Button>
      </div>
    </div>
  );
}
