
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Sparkles, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ShowcaseItem {
  id: string;
  name: string;
  state: string;
  culture: string;
  image: string;
  price: string;
  specialty: string;
}

const showcaseItems: ShowcaseItem[] = [
  {
    id: "1",
    name: "Kundan Polki Necklace",
    state: "Rajasthan",
    culture: "Traditional Rajasthani Kundan work with uncut diamonds",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&q=80",
    price: "₹2,50,000",
    specialty: "Kundan Meenakari"
  },
  {
    id: "2",
    name: "Temple Jewelry Set",
    state: "Tamil Nadu",
    culture: "Ancient temple architecture inspired gold jewelry",
    image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=500&q=80",
    price: "₹1,80,000",
    specialty: "Temple Jewelry"
  },
  {
    id: "3",
    name: "Filigree Silver Bangles",
    state: "Odisha",
    culture: "Intricate silver filigree work from Cuttack",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&q=80",
    price: "₹45,000",
    specialty: "Silver Filigree"
  },
  {
    id: "4",
    name: "Jadau Bridal Set",
    state: "Gujarat",
    culture: "Gujarati Jadau craftsmanship with precious stones",
    image: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=500&q=80",
    price: "₹3,20,000",
    specialty: "Jadau Work"
  },
  {
    id: "5",
    name: "Hyderabadi Pearls",
    state: "Telangana",
    culture: "Famous Hyderabadi pearl necklace with gold accents",
    image: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=500&q=80",
    price: "₹95,000",
    specialty: "Pearl Jewelry"
  }
];

export function JewelryShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Generate random particles for sparkle effect
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 3
    }));
    setParticles(newParticles);
  }, [currentIndex]);

  const paginate = (newDirection: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = showcaseItems.length - 1;
      if (nextIndex >= showcaseItems.length) nextIndex = 0;
      return nextIndex;
    });
    setTimeout(() => setIsAnimating(false), 800);
  };

  const currentItem = showcaseItems[currentIndex];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      
      {/* Floating orbs with smoother animations */}
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 bg-primary/15 rounded-full blur-3xl"
        animate={{
          x: [0, 60, 0],
          y: [0, 40, 0],
          scale: [1, 1.15, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: [0.45, 0, 0.55, 1]
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 bg-amber-400/15 rounded-full blur-3xl"
        animate={{
          x: [0, -40, 0],
          y: [0, -60, 0],
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: [0.45, 0, 0.55, 1],
          delay: 2
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"
        animate={{
          x: [-40, 40, -40],
          y: [-40, 40, -40],
          scale: [1, 1.25, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: [0.45, 0, 0.55, 1],
          delay: 4
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            <span>State-Wise Heritage Collection</span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
            Regional Masterpieces
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the finest craftsmanship from each state's unique jewelry tradition
          </p>
        </motion.div>

        {/* 3D Floating Showcase */}
        <div className="relative min-h-[700px] flex items-center justify-center perspective-1000">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              initial={{
                opacity: 0,
                scale: 0.85,
                rotateY: direction > 0 ? 45 : -45,
                z: -200
              }}
              animate={{
                opacity: 1,
                scale: 1,
                rotateY: 0,
                z: 0
              }}
              exit={{
                opacity: 0,
                scale: 0.85,
                rotateY: direction > 0 ? -45 : 45,
                z: -200
              }}
              transition={{
                duration: 0.7,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              className="absolute w-full"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                {/* 3D Floating Product Image */}
                <motion.div
                  className="relative"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Sparkle particles */}
                  {particles.map((particle) => (
                    <motion.div
                      key={particle.id}
                      className="absolute w-1 h-1 bg-yellow-400 rounded-full"
                      style={{
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                      }}
                      animate={{
                        scale: [0, 1.5, 0],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: particle.delay,
                      }}
                    />
                  ))}

                  {/* Floating rings around product */}
                  {[0, 120, 240].map((angle, i) => (
                    <motion.div
                      key={i}
                      className="absolute inset-0"
                      animate={{
                        rotateZ: [angle, angle + 360],
                      }}
                      transition={{
                        duration: 20 + i * 5,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      <div
                        className="absolute w-full h-full rounded-full border-2 border-primary/20"
                        style={{
                          transform: `rotateX(${60 + i * 20}deg)`,
                        }}
                      />
                    </motion.div>
                  ))}

                  {/* Main product container with smooth 3D rotation */}
                  <motion.div
                    className="relative z-10"
                    animate={{
                      rotateY: [0, 360],
                      y: [0, -15, 0],
                    }}
                    transition={{
                      rotateY: {
                        duration: 25,
                        repeat: Infinity,
                        ease: "linear"
                      },
                      y: {
                        duration: 5,
                        repeat: Infinity,
                        ease: [0.45, 0, 0.55, 1]
                      }
                    }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {/* Glow effect behind image */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-primary/40 via-amber-500/40 to-primary/40 rounded-full blur-3xl"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />

                    {/* Product image with no background */}
                    <motion.div
                      className="relative"
                      whileHover={{ scale: 1.05, rotateZ: 2 }}
                      transition={{ 
                        duration: 0.4,
                        ease: [0.25, 0.46, 0.45, 0.94]
                      }}
                    >
                      <img
                        src={currentItem.image}
                        alt={currentItem.name}
                        className="w-full h-auto object-contain"
                        style={{
                          filter: "drop-shadow(0 25px 50px rgba(194, 127, 36, 0.4)) drop-shadow(0 10px 20px rgba(0, 0, 0, 0.15))",
                          mixBlendMode: "normal",
                        }}
                      />
                      
                      {/* Animated shine effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        animate={{
                          x: ["-120%", "220%"],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          repeatDelay: 3,
                          ease: [0.25, 0.46, 0.45, 0.94]
                        }}
                        style={{ mixBlendMode: "overlay" }}
                      />
                    </motion.div>

                    {/* Floating specialty badge */}
                    <motion.div
                      className="absolute -top-4 -right-4"
                      animate={{
                        y: [0, -10, 0],
                        rotate: [0, 5, 0, -5, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <Badge className="bg-gradient-to-r from-primary to-amber-500 text-primary-foreground px-4 py-2 text-sm font-semibold shadow-2xl">
                        <Sparkles className="w-3 h-3 mr-1" />
                        {currentItem.specialty}
                      </Badge>
                    </motion.div>
                  </motion.div>
                </motion.div>

                {/* Content Section */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="space-y-6"
                >
                  {/* State badge with icon */}
                  <motion.div
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary"
                    whileHover={{ scale: 1.05 }}
                  >
                    <MapPin className="w-4 h-4" />
                    <span className="font-medium">{currentItem.state}</span>
                  </motion.div>

                  {/* Product name */}
                  <motion.h3
                    className="font-serif text-4xl md:text-5xl font-bold text-foreground leading-tight"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    {currentItem.name}
                  </motion.h3>

                  {/* Culture description */}
                  <motion.p
                    className="text-lg text-muted-foreground leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    {currentItem.culture}
                  </motion.p>

                  {/* Price with animation */}
                  <motion.div
                    className="text-4xl font-bold bg-gradient-to-r from-primary to-amber-500 bg-clip-text text-transparent"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6, type: "spring" }}
                  >
                    {currentItem.price}
                  </motion.div>

                  {/* CTA Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <Button
                      size="lg"
                      className="group relative overflow-hidden bg-gradient-to-r from-primary to-amber-500 hover:shadow-2xl transition-all duration-300"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        <Sparkles className="w-5 h-5" />
                        Explore Collection
                      </span>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-amber-500 to-primary"
                        initial={{ x: "100%" }}
                        whileHover={{ x: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </Button>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 pointer-events-none z-20">
            <motion.div
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.95 }}
              className="pointer-events-auto"
            >
              <Button
                size="icon"
                variant="outline"
                className="w-16 h-16 rounded-full bg-background/90 backdrop-blur-xl border-2 border-primary/40 shadow-2xl hover:bg-primary/10 hover:border-primary/60 transition-all duration-300"
                onClick={() => paginate(-1)}
                disabled={isAnimating}
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1, x: 5 }}
              whileTap={{ scale: 0.95 }}
              className="pointer-events-auto"
            >
              <Button
                size="icon"
                variant="outline"
                className="w-16 h-16 rounded-full bg-background/90 backdrop-blur-xl border-2 border-primary/40 shadow-2xl hover:bg-primary/10 hover:border-primary/60 transition-all duration-300"
                onClick={() => paginate(1)}
                disabled={isAnimating}
              >
                <ChevronRight className="w-6 h-6" />
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Enhanced Pagination Dots */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="flex justify-center items-center gap-2.5 mt-16"
        >
          {showcaseItems.map((item, index) => (
            <motion.button
              key={index}
              onClick={() => {
                if (!isAnimating) {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }
              }}
              className={`relative group ${
                index === currentIndex ? "w-14" : "w-2.5"
              } h-2.5 rounded-full transition-all duration-500 ease-out`}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
              disabled={isAnimating}
            >
              <div
                className={`absolute inset-0 rounded-full transition-all duration-500 ${
                  index === currentIndex
                    ? "bg-gradient-to-r from-primary via-amber-500 to-primary shadow-lg shadow-primary/50"
                    : "bg-primary/25 group-hover:bg-primary/50"
                }`}
              />
              {index === currentIndex && (
                <motion.div
                  className="absolute inset-0 rounded-full bg-white/40"
                  animate={{ x: ["-120%", "220%"] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 1.5,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* State indicator labels */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex justify-center gap-6 mt-8 flex-wrap"
        >
          {showcaseItems.map((item, index) => (
            <motion.button
              key={item.id}
              onClick={() => {
                if (!isAnimating) {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-500 ${
                index === currentIndex
                  ? "text-primary-foreground bg-gradient-to-r from-primary to-amber-500 shadow-lg shadow-primary/30 scale-105"
                  : "text-muted-foreground hover:text-foreground hover:bg-primary/5"
              }`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              disabled={isAnimating}
            >
              {item.state}
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
