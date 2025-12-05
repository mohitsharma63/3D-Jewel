import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Sparkles, MapPin, Users, Award, ShoppingBag, ArrowRight, TrendingUp, Crown, Gem } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { IndiaMap } from "@/components/india-map";
import { StateSidebar } from "@/components/state-sidebar";
import { JewelryShowcase } from "@/components/jewelry-showcase";
import { WorkshopFeatures } from "@/components/workshop-features";
import { WorkshopGallery } from "@/components/workshop-gallery";
// import { HeroSection } from "@/components/hero-section";
import { indianStates, jewelryItems, formatPrice } from "@/lib/static-data";
import { Link } from "wouter";
import type { JewelryItem } from "@shared/schema";
import type { StateData } from "@shared/schema";
import SellerDashboard from "./seller-dashboard";

export default function Home() {
  const [selectedState, setSelectedState] = useState<StateData | null>(null);
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [userType, setUserType] = useState<string | null>(null);

  useEffect(() => {
    setUserType(localStorage.getItem("userType"));
  }, []);

  // Track scroll progress of the map element itself so we can make it largest
  // when it's centered in viewport and shrink as it moves away.
  const { scrollYProgress } = useScroll({ target: mapRef, offset: ["start end", "center center", "end start"] });

  const mapScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.7, 1, 0.7]);
  const mapOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.7, 1, 0.7]);

  // If seller is logged in, show workshop dashboard
  if (userType === "seller") {
    return <SellerDashboard />;
  }

  return (
    <div className={`min-h-screen pt-16 flex flex-col transition-all duration-300 ${selectedState ? "lg:ml-[460px]" : ""}`}>
      {/* Hero Section with 3D Model */}
      {/* <HeroSection /> */}

      {/* Map Section */}
      <section id="map-section" className="flex-1 relative py-20">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-amber-500/10 to-orange-500/5 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-orange-500/15 to-amber-500/5 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              <span>Interactive State Map</span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Explore Jewelry Workshops
              <br />
              <span className="text-primary">Across India</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Click on any state to discover verified jewelry artisans, their workshops, and exquisite collections crafted with generations of expertise.
            </p>
          </motion.div>

          <motion.div
            ref={mapRef}
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3, type: "spring", stiffness: 100 }}
            style={{
              scale: mapScale,
              opacity: mapOpacity
            }}
            className="h-[60vh] lg:h-[70vh] transition-transform duration-300"
          >
            <IndiaMap
              onStateSelect={setSelectedState}
              selectedState={selectedState}
            />
          </motion.div>

          {/* Left-side seller list that opens when a state is selected */}
          <StateSidebar
            state={selectedState}
            onClose={() => setSelectedState(null)}
            side="left"
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8"
          >
            <div className="flex items-center gap-4 p-6 bg-card rounded-lg border border-card-border">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">29</p>
                <p className="text-sm text-muted-foreground">States Covered</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-6 bg-card rounded-lg border border-card-border">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Gem className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">500+</p>
                <p className="text-sm text-muted-foreground">Verified Artisans</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-6 bg-card rounded-lg border border-card-border">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">10,000+</p>
                <p className="text-sm text-muted-foreground">Unique Designs</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <JewelryShowcase />

      {/* Workshop Gallery */}
      <WorkshopGallery />

      {/* Workshop Features - How to Wear Guide */}
      <WorkshopFeatures />

      {/* 3D Product Showcase Sections */}
      <ProductShowcaseSections />
    </div>
  );
}

function ProductShowcaseSections() {
  return (
    <div className="space-y-32 py-20">
      {/* Bestsellers Section - Flowing Layout */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-orange-500/5" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-6 bg-amber-500/10 text-amber-600 border-amber-500/20 px-6 py-3 text-base">
              <TrendingUp className="w-5 h-5 mr-2" />
              Bestsellers
            </Badge>
            <h2 className="font-serif text-5xl md:text-6xl font-bold mb-6">
              Most Loved Pieces
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Handpicked favorites from our master artisans across India
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Large featured item */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="lg:col-span-2 lg:row-span-2"
            >
              <FlowingProduct3DCard item={jewelryItems[0]} badge="Bestseller" size="large" />
            </motion.div>

            {/* Smaller items */}
            {jewelryItems.slice(1, 3).map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                <FlowingProduct3DCard item={item} badge="Bestseller" size="small" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Collection - Curved Layout */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-transparent py-20 rounded-[80px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 px-6 py-3 text-base">
              <Crown className="w-5 h-5 mr-2" />
              Featured Collection
            </Badge>
            <h2 className="font-serif text-5xl md:text-6xl font-bold mb-6">
              Artisan's Pride
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Exceptional craftsmanship showcasing India's rich heritage
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {jewelryItems.slice(3, 5).map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <FlowingProduct3DCard item={item} badge="Featured" size="medium" />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-8"
          >
            <FlowingProduct3DCard item={jewelryItems[5]} badge="Featured" size="wide" />
          </motion.div>
        </div>
      </section>

      {/* New Launches - Asymmetric Layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge className="mb-6 bg-emerald-500/10 text-emerald-600 border-emerald-500/20 px-6 py-3 text-base">
            <Sparkles className="w-5 h-5 mr-2" />
            New Launches
          </Badge>
          <h2 className="font-serif text-5xl md:text-6xl font-bold mb-6">
            Fresh Arrivals
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover the latest creations from our talented artisans
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {jewelryItems.slice(6, 9).map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={index === 1 ? "lg:translate-y-12" : ""}
            >
              <FlowingProduct3DCard item={item} badge="New" size="small" />
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

function FlowingProduct3DCard({ 
  item, 
  badge, 
  size = "medium" 
}: { 
  item: JewelryItem; 
  badge: string; 
  size?: "small" | "medium" | "large" | "wide";
}) {
  const [isHovered, setIsHovered] = useState(false);

  const heightClass = {
    small: "h-[400px]",
    medium: "h-[500px]",
    large: "h-[700px]",
    wide: "h-[450px]"
  }[size];

  return (
    <motion.div
      className="group relative h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -15, scale: 1.02 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className={`relative ${heightClass} bg-gradient-to-br from-background to-primary/5 rounded-[40px] overflow-hidden border-2 border-primary/10 shadow-2xl`}>
        {/* 3D Floating Product */}
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <motion.div
            className="relative w-full h-full"
            animate={{
              rotateY: isHovered ? [0, 360] : 0,
              y: isHovered ? [0, -20, 0] : 0,
            }}
            transition={{
              rotateY: { duration: 3, ease: "linear", repeat: isHovered ? Infinity : 0 },
              y: { duration: 2, ease: "easeInOut", repeat: isHovered ? Infinity : 0 }
            }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-full h-full object-contain drop-shadow-2xl"
            />
          </motion.div>

          {/* Sparkle effects */}
          {isHovered && [...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-amber-400 rounded-full"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
              }}
              animate={{
                scale: [0, 1.5, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>

        {/* Curved content overlay */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background via-background/95 to-transparent backdrop-blur-md p-8 rounded-t-[40px]">
          {/* Badge */}
          <motion.div
            className="absolute -top-6 right-8"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Badge className={`shadow-xl px-4 py-2 text-sm font-semibold ${
              badge === "Bestseller" ? "bg-amber-500" :
              badge === "Featured" ? "bg-primary" :
              "bg-emerald-500"
            }`}>
              {badge}
            </Badge>
          </motion.div>

          <h3 className="font-serif text-2xl md:text-3xl font-bold mb-2 group-hover:text-primary transition-colors">
            {item.name}
          </h3>
          
          {size !== "small" && (
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
              {item.description}
            </p>
          )}

          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-muted-foreground">
              <span className="font-medium">{item.material}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-primary">
              {formatPrice(item.price)}
            </span>
            <Button size="sm" variant="outline" className="gap-2 bg-background/50 backdrop-blur-sm">
              View
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Animated border glow */}
        <motion.div
          className="absolute inset-0 rounded-[40px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
          style={{
            background: "linear-gradient(135deg, transparent, rgba(194, 127, 36, 0.3), transparent)",
            backgroundSize: "200% 200%",
          }}
          animate={isHovered ? {
            backgroundPosition: ["0% 0%", "100% 100%"],
          } : {}}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        />
      </div>
    </motion.div>
  );
}