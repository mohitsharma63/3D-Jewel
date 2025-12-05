
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Users, Eye, ShoppingBag, DollarSign } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function DashboardAnalytics() {
  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Analytics</h1>
        <p className="text-muted-foreground">
          Track your workshop's performance and growth
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <DollarSign className="h-5 w-5 text-primary" />
              </div>
              <Badge className="bg-green-500/10 text-green-500">
                <TrendingUp className="h-3 w-3 mr-1" />
                +12.5%
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">Total Revenue</p>
            <p className="text-2xl font-bold">₹16.5L</p>
            <p className="text-xs text-muted-foreground mt-1">vs last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <ShoppingBag className="h-5 w-5 text-blue-500" />
              </div>
              <Badge className="bg-green-500/10 text-green-500">
                <TrendingUp className="h-3 w-3 mr-1" />
                +8.2%
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">Total Orders</p>
            <p className="text-2xl font-bold">124</p>
            <p className="text-xs text-muted-foreground mt-1">vs last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <Eye className="h-5 w-5 text-purple-500" />
              </div>
              <Badge className="bg-red-500/10 text-red-500">
                <TrendingDown className="h-3 w-3 mr-1" />
                -2.4%
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">Profile Views</p>
            <p className="text-2xl font-bold">1,342</p>
            <p className="text-xs text-muted-foreground mt-1">vs last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-orange-500/10 rounded-lg">
                <Users className="h-5 w-5 text-orange-500" />
              </div>
              <Badge className="bg-green-500/10 text-green-500">
                <TrendingUp className="h-3 w-3 mr-1" />
                +15.3%
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">New Customers</p>
            <p className="text-2xl font-bold">87</p>
            <p className="text-xs text-muted-foreground mt-1">vs last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Sales Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Sales Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { month: "January", sales: "₹4.2L", growth: "+12%" },
              { month: "February", sales: "₹3.8L", growth: "+8%" },
              { month: "March", sales: "₹5.1L", growth: "+18%" },
              { month: "April", sales: "₹4.6L", growth: "+5%" },
            ].map((data, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">{data.month}</p>
                  <p className="text-2xl font-bold text-primary">{data.sales}</p>
                </div>
                <Badge className="bg-green-500/10 text-green-500">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {data.growth}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Products */}
      <Card>
        <CardHeader>
          <CardTitle>Top Selling Products</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: "Kundan Bridal Necklace", sales: 24, revenue: "₹10.8L" },
              { name: "Diamond Solitaire Ring", sales: 18, revenue: "₹5.1L" },
              { name: "Temple Gold Earrings", sales: 32, revenue: "₹4.0L" },
              { name: "Polki Choker Set", sales: 12, revenue: "₹8.2L" },
            ].map((product, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-muted-foreground">{product.sales} units sold</p>
                </div>
                <p className="text-lg font-semibold text-primary">{product.revenue}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
