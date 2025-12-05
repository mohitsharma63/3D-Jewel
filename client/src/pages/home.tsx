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
    <div className="space-y-20 py-20">
      {/* Bestsellers Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 bg-amber-500/10 text-amber-600 border-amber-500/20">
            <TrendingUp className="w-4 h-4 mr-2" />
            Bestsellers
          </Badge>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
            Most Loved Pieces
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Handpicked favorites from our master artisans across India
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {jewelryItems.slice(0, 3).map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Product3DCard item={item} badge="Bestseller" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Collection */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            <Crown className="w-4 h-4 mr-2" />
            Featured Collection
          </Badge>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
            Artisan's Pride
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Exceptional craftsmanship showcasing India's rich heritage
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {jewelryItems.slice(3, 6).map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Product3DCard item={item} badge="Featured" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* New Launches */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
            <Sparkles className="w-4 h-4 mr-2" />
            New Launches
          </Badge>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
            Fresh Arrivals
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the latest creations from our talented artisans
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {jewelryItems.slice(6, 9).map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Product3DCard item={item} badge="New" />
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

function Product3DCard({ item, badge }: { item: JewelryItem; badge: string }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative bg-card rounded-2xl overflow-hidden border-2 border-card-border shadow-lg hover:shadow-2xl transition-shadow duration-300">
        {/* 3D Image Container */}
        <div className="relative h-80 overflow-hidden bg-gradient-to-br from-primary/5 to-amber-500/5">
          <motion.img
            src={item.imageUrl}
            alt={item.name}
            className="w-full h-full object-cover"
            animate={{
              scale: isHovered ? 1.15 : 1,
              rotateY: isHovered ? 10 : 0,
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{ transformStyle: "preserve-3d" }}
          />

          {/* Shine effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            initial={{ x: "-100%" }}
            animate={{ x: isHovered ? "200%" : "-100%" }}
            transition={{ duration: 0.8 }}
          />

          {/* Badge */}
          <div className="absolute top-4 right-4">
            <Badge className={`shadow-lg ${
              badge === "Bestseller" ? "bg-amber-500" :
              badge === "Featured" ? "bg-primary" :
              "bg-emerald-500"
            }`}>
              {badge}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="font-serif text-xl font-bold mb-2 group-hover:text-primary transition-colors">
            {item.name}
          </h3>
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {item.description}
          </p>

          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-muted-foreground">
              <span className="font-medium">{item.material}</span> • {item.weight}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-primary">
              {formatPrice(item.price)}
            </span>
            <Button size="sm" className="gap-2">
              View Details
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* 3D Border glow effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
          style={{
            background: "linear-gradient(45deg, transparent, rgba(194, 127, 36, 0.2), transparent)",
          }}
        />
      </div>
    </motion.div>
  );
}