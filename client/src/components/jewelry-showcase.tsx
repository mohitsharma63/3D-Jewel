
import { useState } from "react";
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

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      rotateY: direction > 0 ? 45 : -45,
      scale: 0.8
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      rotateY: 0,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      rotateY: direction < 0 ? 45 : -45,
      scale: 0.8
    })
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = showcaseItems.length - 1;
      if (nextIndex >= showcaseItems.length) nextIndex = 0;
      return nextIndex;
    });
  };

  const currentItem = showcaseItems[currentIndex];

  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-b from-background via-primary/5 to-background">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-10 right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl"
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
          className="absolute bottom-20 left-20 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

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
            <span>Cultural Heritage Collection</span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
            3D Jewelry Showcase
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore India's finest jewelry traditions - each piece tells a story of craftsmanship and culture
          </p>
        </motion.div>

        {/* 3D Showcase Slider */}
        <div className="relative h-[600px] flex items-center justify-center perspective-1000">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.3 },
                rotateY: { duration: 0.5 },
                scale: { duration: 0.4 }
              }}
              className="absolute w-full max-w-13xl"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="bg-card rounded-2xl shadow-2xl overflow-hidden border-2 border-primary/20">
                <div className="grid md:grid-cols-2 gap-0">
                  {/* Image Section with 3D effects */}
                  <motion.div
                    className="relative h-[400px] md:h-[600px] overflow-hidden bg-gradient-to-br from-primary/20 to-amber-500/20"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.img
                      src={currentItem.image}
                      alt={currentItem.name}
                      className="w-full h-full object-cover"
                      initial={{ scale: 1.2, rotateZ: -5 }}
                      animate={{ scale: 1, rotateZ: 0 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                    
                    {/* 3D Floating Badge */}
                    <motion.div
                      className="absolute top-6 right-6"
                      initial={{ y: -20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3, type: "spring" }}
                      whileHover={{ scale: 1.1, rotateZ: 5 }}
                    >
                      <Badge className="bg-primary/90 backdrop-blur-sm text-primary-foreground px-4 py-2 text-sm font-semibold shadow-lg">
                        {currentItem.specialty}
                      </Badge>
                    </motion.div>

                    {/* Animated shine effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      initial={{ x: "-100%" }}
                      animate={{ x: "200%" }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 3,
                        ease: "easeInOut"
                      }}
                    />
                  </motion.div>

                  {/* Content Section */}
                  <div className="p-8 md:p-12 flex flex-col justify-center">
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      {/* State Badge */}
                      <motion.div
                        className="inline-flex items-center gap-2 mb-4 text-primary"
                        whileHover={{ scale: 1.05 }}
                      >
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm font-medium">{currentItem.state}</span>
                      </motion.div>

                      {/* Title */}
                      <motion.h3
                        className="font-serif text-3xl md:text-4xl font-bold mb-4 text-foreground"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        {currentItem.name}
                      </motion.h3>

                      {/* Culture Description */}
                      <motion.p
                        className="text-muted-foreground mb-6 leading-relaxed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        {currentItem.culture}
                      </motion.p>

                      {/* Price */}
                      <motion.div
                        className="text-3xl font-bold text-primary mb-8"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, type: "spring" }}
                      >
                        {currentItem.price}
                      </motion.div>

                      {/* CTA Button */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                      >
                        <Button
                          size="lg"
                          className="w-full md:w-auto shadow-lg hover:shadow-xl transition-all"
                        >
                          <Sparkles className="w-4 h-4 mr-2" />
                          View Collection
                        </Button>
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 pointer-events-none z-20"
          >
            <Button
              size="icon"
              variant="outline"
              className="pointer-events-auto w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm border-2 border-primary/20 shadow-xl hover:scale-110 transition-transform"
              onClick={() => paginate(-1)}
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              className="pointer-events-auto w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm border-2 border-primary/20 shadow-xl hover:scale-110 transition-transform"
              onClick={() => paginate(1)}
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </motion.div>
        </div>

        {/* Pagination Dots */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="flex justify-center gap-3 mt-12"
        >
          {showcaseItems.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex
                  ? "w-12 bg-primary"
                  : "w-2 bg-primary/30 hover:bg-primary/50"
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
