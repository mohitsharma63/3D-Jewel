
import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Gem, User, Store } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [sellerEmail, setSellerEmail] = useState("");
  const [sellerPassword, setSellerPassword] = useState("");

  const handleUserLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Dummy user credentials
    if (userEmail === "user@demo.com" && userPassword === "user123") {
      localStorage.setItem("userType", "user");
      localStorage.setItem("userName", "Demo User");
      toast({
        title: "Login Successful",
        description: "Welcome back!",
      });
      setLocation("/");
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid credentials. Use: user@demo.com / user123",
        variant: "destructive",
      });
    }
  };

  const handleSellerLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Dummy seller credentials
    if (sellerEmail === "seller@demo.com" && sellerPassword === "seller123") {
      localStorage.setItem("userType", "seller");
      localStorage.setItem("sellerId", "s1");
      localStorage.setItem("sellerName", "Rajesh Zaveri");
      toast({
        title: "Login Successful",
        description: "Welcome back, Seller!",
      });
      setLocation("/seller/s1");
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid credentials. Use: seller@demo.com / seller123",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Gem className="h-10 w-10 text-primary" />
            <h1 className="font-serif text-3xl font-bold">Jewel India</h1>
          </div>
          <p className="text-muted-foreground">Sign in to your account</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Choose your account type to continue</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="user" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="user" className="gap-2">
                  <User className="h-4 w-4" />
                  User
                </TabsTrigger>
                <TabsTrigger value="seller" className="gap-2">
                  <Store className="h-4 w-4" />
                  Seller
                </TabsTrigger>
              </TabsList>

              <TabsContent value="user" className="space-y-4 mt-4">
                <form onSubmit={handleUserLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="user-email">Email</Label>
                    <Input
                      id="user-email"
                      type="email"
                      placeholder="user@demo.com"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="user-password">Password</Label>
                    <Input
                      id="user-password"
                      type="password"
                      placeholder="user123"
                      value={userPassword}
                      onChange={(e) => setUserPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="text-xs text-muted-foreground bg-muted p-3 rounded-md">
                    <strong>Demo Credentials:</strong><br />
                    Email: user@demo.com<br />
                    Password: user123
                  </div>
                  <Button type="submit" className="w-full">
                    Login as User
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="seller" className="space-y-4 mt-4">
                <form onSubmit={handleSellerLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="seller-email">Email</Label>
                    <Input
                      id="seller-email"
                      type="email"
                      placeholder="seller@demo.com"
                      value={sellerEmail}
                      onChange={(e) => setSellerEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="seller-password">Password</Label>
                    <Input
                      id="seller-password"
                      type="password"
                      placeholder="seller123"
                      value={sellerPassword}
                      onChange={(e) => setSellerPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="text-xs text-muted-foreground bg-muted p-3 rounded-md">
                    <strong>Demo Credentials:</strong><br />
                    Email: seller@demo.com<br />
                    Password: seller123
                  </div>
                  <Button type="submit" className="w-full">
                    Login as Seller
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="text-center mt-6 text-sm text-muted-foreground">
          <p>Don't have an account? Registration coming soon!</p>
        </div>
      </motion.div>
    </div>
  );
}
