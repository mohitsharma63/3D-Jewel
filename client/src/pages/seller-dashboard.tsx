import { motion } from "framer-motion";
import { Store, Package, TrendingUp, Users, Eye, Phone, MessageCircle, Mail } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { JewelryCard } from "@/components/jewelry-card";
import { getSellerById, getWorkshopBySellerId, jewelryItems } from "@/lib/static-data";
import { useState, useEffect } from "react";
import type { JewelryItem } from "@shared/schema";
import { Link } from "wouter";

export default function SellerDashboard() {
  const [workshopName, setWorkshopName] = useState("");
  const [sellerData, setSellerData] = useState<any>(null);
  const [workshopData, setWorkshopData] = useState<any>(null);

  useEffect(() => {
    const sellerId = localStorage.getItem("sellerId");
    const name = localStorage.getItem("sellerName");
    setWorkshopName(name || "");

    if (sellerId) {
      const seller = getSellerById(sellerId);
      const workshop = getWorkshopBySellerId(sellerId);
      setSellerData(seller);
      setWorkshopData(workshop);
    }
  }, []);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2">
          Welcome Back, {workshopName}
        </h1>
        <p className="text-muted-foreground">
          Here's what's happening with your workshop today
        </p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{jewelryItems.length}</div>
              <p className="text-xs text-muted-foreground">Active listings</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Profile Views</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{sellerData?.reviewCount || 342}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Rating</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{sellerData?.rating || 4.9}</div>
              <p className="text-xs text-muted-foreground">Average rating</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Experience</CardTitle>
              <Store className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{sellerData?.yearsInBusiness || 75}+</div>
              <p className="text-xs text-muted-foreground">Years in business</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Workshop Info */}
      {sellerData && (
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Workshop Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Specialties</h3>
                <div className="flex flex-wrap gap-2">
                  {sellerData.specialties.map((specialty: string) => (
                    <Badge key={specialty} variant="secondary">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Location</h3>
                <p className="text-muted-foreground">{sellerData.address}</p>
                <p className="text-muted-foreground">{sellerData.city}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link href="/dashboard/catalog">
                <Button className="w-full" variant="default">
                  <Package className="w-4 h-4 mr-2" />
                  Manage Catalog
                </Button>
              </Link>
              <Link href={`/seller/${sellerData.id}`}>
                <Button className="w-full" variant="outline">
                  <Eye className="w-4 h-4 mr-2" />
                  View Public Profile
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Recent Products */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Products</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {jewelryItems.slice(0, 4).map((item, index) => (
              <JewelryCard
                key={item.id}
                item={item}
                index={index}
                onViewDetails={() => {}}
              />
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link href="/dashboard/catalog">
              <Button variant="outline">View All Products</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}