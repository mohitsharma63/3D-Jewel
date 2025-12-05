
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "wouter";
import {
  Store,
  Package,
  TrendingUp,
  Users,
  Eye,
  Settings,
  LogOut,
  Menu,
  X,
  Gem,
  LayoutDashboard,
  ShoppingBag,
  MessageSquare,
  BarChart3,
  Heart,
  Bell,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/theme-toggle";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function SellerDashboardLayout({ children }: DashboardLayoutProps) {
  const [location, setLocation] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const name = localStorage.getItem("sellerName");
    setUserName(name || "");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userType");
    localStorage.removeItem("userName");
    localStorage.removeItem("sellerId");
    localStorage.removeItem("sellerName");
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    setLocation("/login");
  };

  const navItems = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      href: "/dashboard/catalog",
      label: "My Catalog",
      icon: Package,
    },
    {
      href: "/dashboard/categories",
      label: "Categories",
      icon: Gem,
    },
    {
      href: "/dashboard/orders",
      label: "Orders",
      icon: ShoppingBag,
    },
    {
      href: "/dashboard/inquiries",
      label: "Inquiries",
      icon: MessageSquare,
    },
    {
      href: "/dashboard/analytics",
      label: "Analytics",
      icon: BarChart3,
    },
    {
      href: "/dashboard/settings",
      label: "Settings",
      icon: Settings,
    },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar - Desktop */}
      <aside
        className={cn(
          "hidden lg:flex flex-col fixed left-0 top-0 h-screen bg-card border-r border-border transition-all duration-300 z-50",
          sidebarOpen ? "w-64" : "w-20"
        )}
      >
        {/* Logo */}
        <div className="p-6 flex items-center justify-between">
          {sidebarOpen ? (
            <div className="flex items-center gap-2">
              <Gem className="h-6 w-6 text-primary" />
              <span className="font-serif text-lg font-semibold">{userName}</span>
            </div>
          ) : (
            <Gem className="h-6 w-6 text-primary mx-auto" />
          )}
        </div>

        <Separator />

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <div
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors cursor-pointer",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent text-muted-foreground hover:text-foreground",
                    !sidebarOpen && "justify-center"
                  )}
                >
                  <item.icon className="h-5 w-5 shrink-0" />
                  {sidebarOpen && (
                    <span className="font-medium text-sm">{item.label}</span>
                  )}
                </div>
              </Link>
            );
          })}
        </nav>

        <Separator />

        {/* Bottom Actions */}
        <div className="p-4 space-y-2">
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start",
              !sidebarOpen && "justify-center px-2"
            )}
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5 shrink-0" />
            {sidebarOpen && <span className="ml-3">Logout</span>}
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="w-full"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
          <aside className="fixed left-0 top-0 h-screen w-64 bg-card border-r border-border">
            {/* Logo */}
            <div className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Gem className="h-6 w-6 text-primary" />
                <span className="font-serif text-lg font-semibold">{userName}</span>
              </div>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <Separator />

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
              {navItems.map((item) => {
                const isActive = location === item.href;
                return (
                  <Link key={item.href} href={item.href}>
                    <div
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors cursor-pointer",
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-accent text-muted-foreground hover:text-foreground"
                      )}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <item.icon className="h-5 w-5 shrink-0" />
                      <span className="font-medium text-sm">{item.label}</span>
                    </div>
                  </Link>
                );
              })}
            </nav>

            <Separator />

            {/* Bottom Actions */}
            <div className="p-4">
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5" />
                <span className="ml-3">Logout</span>
              </Button>
            </div>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div
        className={cn(
          "flex-1 flex flex-col transition-all duration-300",
          sidebarOpen ? "lg:ml-64" : "lg:ml-20"
        )}
      >
        {/* Top Bar */}
        <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            <Button
              size="icon"
              variant="ghost"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>

            <div className="flex-1" />

            <div className="flex items-center gap-2">
              <Button size="icon" variant="ghost">
                <Bell className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="ghost">
                <Heart className="h-5 w-5" />
              </Button>
              <ThemeToggle />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
