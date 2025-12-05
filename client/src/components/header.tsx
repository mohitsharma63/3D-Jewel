import { Link, useLocation } from "wouter";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "@/components/ui/button";
import { Gem, Map, Store, Info, Search, Heart, Menu, X, LogIn, LogOut, User, ChevronDown, LayoutDashboard, Package } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  const [location, setLocation] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userType, setUserType] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>("");
  const { toast } = useToast();

  const getNavItems = () => {
    if (userType === "seller") {
      return [
        { href: "/", label: "Dashboard", icon: Store },
        { href: "/catalog", label: "My Catalog", icon: Gem },
        { href: "/about", label: "About", icon: Info },
      ];
    }
    return [
      { href: "/", label: "Explore Map", icon: Map },
      { href: "/sellers", label: "All Sellers", icon: Store },
      { href: "/catalog", label: "Catalog", icon: Gem },
      { href: "/about", label: "About", icon: Info },
    ];
  };

  const navItems = getNavItems();

  useEffect(() => {
    const type = localStorage.getItem("userType");
    const name = localStorage.getItem("userName") || localStorage.getItem("sellerName");
    setUserType(type);
    setUserName(name || "");
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("userType");
    localStorage.removeItem("userName");
    localStorage.removeItem("sellerId");
    localStorage.removeItem("sellerName");
    setUserType(null);
    setUserName("");
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    setLocation("/");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          <Link href="/" data-testid="link-home" className="flex items-center gap-2 hover-elevate rounded-md px-2 py-1">
            <Gem className="h-7 w-7 text-primary" />
            <span className="font-serif text-xl font-semibold tracking-tight">
              {userType === "seller" && userName ? userName : "Jewel India"}
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1" data-testid="nav-desktop">
            {navItems.map((item) => {
              const isActive = location === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors hover-elevate",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground"
                  )}
                  data-testid={`link-nav-${item.label.toLowerCase().replace(/\s/g, "-")}`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="ghost"
              className="hidden sm:flex"
              data-testid="button-search"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="hidden sm:flex"
              data-testid="button-wishlist"
              aria-label="Wishlist"
            >
              <Heart className="h-5 w-5" />
            </Button>
            
            {userType ? (
              <div className="hidden sm:flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="gap-2 px-3 py-1.5">
                      <User className="h-4 w-4" />
                      <span className="font-medium">{userName}</span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {userType === "seller" && (
                      <>
                        <DropdownMenuItem asChild>
                          <Link href="/dashboard" className="flex items-center gap-2 cursor-pointer">
                            <LayoutDashboard className="h-4 w-4" />
                            <span>Dashboard</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href="/dashboard/catalog" className="flex items-center gap-2 cursor-pointer">
                            <Package className="h-4 w-4" />
                            <span>My Catalog</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                      </>
                    )}
                    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive">
                      <LogOut className="h-4 w-4 mr-2" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <Link href="/login">
                <Button
                  size="sm"
                  variant="ghost"
                  className="hidden sm:flex gap-2"
                  data-testid="button-login"
                >
                  <LogIn className="h-4 w-4" />
                  Login
                </Button>
              </Link>
            )}
            
            <ThemeToggle />
            <Button
              size="icon"
              variant="ghost"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background" data-testid="nav-mobile">
          <nav className="flex flex-col p-4 gap-2">
            {navItems.map((item) => {
              const isActive = location === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-md text-base font-medium transition-colors hover-elevate",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground"
                  )}
                  data-testid={`link-nav-mobile-${item.label.toLowerCase().replace(/\s/g, "-")}`}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Link>
              );
            })}
            
            <div className="border-t border-border my-2" />
            
            {userType ? (
              <>
                <div className="flex items-center gap-3 px-4 py-3 rounded-md bg-primary/10">
                  <User className="h-5 w-5" />
                  <span className="font-medium">{userName}</span>
                </div>
                {userType === "seller" && (
                  <>
                    <Link
                      href="/dashboard"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-md text-base font-medium text-muted-foreground hover-elevate"
                    >
                      <LayoutDashboard className="h-5 w-5" />
                      Dashboard
                    </Link>
                    <Link
                      href="/dashboard/catalog"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-md text-base font-medium text-muted-foreground hover-elevate"
                    >
                      <Package className="h-5 w-5" />
                      My Catalog
                    </Link>
                  </>
                )}
                <Button
                  variant="ghost"
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="justify-start gap-3 px-4 py-3 h-auto text-base font-medium text-destructive hover:text-destructive"
                >
                  <LogOut className="h-5 w-5" />
                  Logout
                </Button>
              </>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-md text-base font-medium text-muted-foreground hover-elevate"
              >
                <LogIn className="h-5 w-5" />
                Login
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
