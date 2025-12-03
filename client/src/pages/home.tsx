
import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { IndiaMap } from "@/components/india-map";
import { StateSidebar } from "@/components/state-sidebar";
import { Sparkles, MapPin, Gem } from "lucide-react";
import type { StateData } from "@shared/schema";

export default function Home() {
  const [selectedState, setSelectedState] = useState<StateData | null>(null);
  const { scrollYProgress } = useScroll();
  
  // Map scale animation based on scroll - starts at 0.7, goes to 1
  const mapScale = useTransform(scrollYProgress, [0, 0.3], [0.7, 1]);
  const mapOpacity = useTransform(scrollYProgress, [0, 0.2], [0.6, 1]);

  return (
    <div className="min-h-screen pt-16 flex flex-col">
      <section className="flex-1 relative">
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
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-yellow-500/5 to-amber-500/5 rounded-full blur-3xl"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              <span>Discover India's Master Craftsmen</span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
              Explore Jewelry Workshops
              <br />
              <span className="text-primary">Across India</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Click on any state to discover verified jewelry artisans, their workshops, and exquisite collections crafted with generations of expertise.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
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

      <StateSidebar
        state={selectedState}
        onClose={() => setSelectedState(null)}
      />
    </div>
  );
}
