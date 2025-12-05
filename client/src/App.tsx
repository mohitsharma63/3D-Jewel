import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SellerDashboardLayout } from "@/pages/seller-dashboard-layout";
import Home from "@/pages/home";
import Sellers from "@/pages/sellers";
import Catalog from "@/pages/catalog";
import SellerDetail from "@/pages/seller-detail";
import About from "@/pages/about";
import Login from "@/pages/login";
import SellerDashboard from "@/pages/seller-dashboard";
import DashboardCatalog from "@/pages/dashboard-catalog";
import DashboardCategories from "@/pages/dashboard-categories";
import DashboardOrders from "@/pages/dashboard-orders";
import DashboardInquiries from "@/pages/dashboard-inquiries";
import DashboardAnalytics from "@/pages/dashboard-analytics";
import DashboardSettings from "@/pages/dashboard-settings";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      {/* Dashboard Routes - No Header/Footer */}
      <Route path="/dashboard">
        {() => (
          <SellerDashboardLayout>
            <SellerDashboard />
          </SellerDashboardLayout>
        )}
      </Route>
      <Route path="/dashboard/catalog">
        {() => (
          <SellerDashboardLayout>
            <DashboardCatalog />
          </SellerDashboardLayout>
        )}
      </Route>
      <Route path="/dashboard/categories">
        {() => (
          <SellerDashboardLayout>
            <DashboardCategories />
          </SellerDashboardLayout>
        )}
      </Route>
      <Route path="/dashboard/orders">
        {() => (
          <SellerDashboardLayout>
            <DashboardOrders />
          </SellerDashboardLayout>
        )}
      </Route>
      <Route path="/dashboard/inquiries">
        {() => (
          <SellerDashboardLayout>
            <DashboardInquiries />
          </SellerDashboardLayout>
        )}
      </Route>
      <Route path="/dashboard/analytics">
        {() => (
          <SellerDashboardLayout>
            <DashboardAnalytics />
          </SellerDashboardLayout>
        )}
      </Route>
      <Route path="/dashboard/settings">
        {() => (
          <SellerDashboardLayout>
            <DashboardSettings />
          </SellerDashboardLayout>
        )}
      </Route>
      
      {/* Public Routes - With Header/Footer */}
      <Route path="/" component={Home} />
      <Route path="/sellers" component={Sellers} />
      <Route path="/catalog" component={Catalog} />
      <Route path="/seller/:id" component={SellerDetail} />
      <Route path="/about" component={About} />
      <Route path="/login" component={Login} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen flex flex-col bg-background">
          <Header />
          <main className="flex-1">
            <Router />
          </main>
          <Footer />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
