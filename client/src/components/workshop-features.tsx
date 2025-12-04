
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Info, Palette, Users, Award, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface WorkshopFeature {
  id: string;
  name: string;
  image: string;
  category: string;
  howToWear: string[];
  culturalSignificance: string;
  stylingTips: string[];
  occasions: string[];
  price: string;
}

const workshopFeatures: WorkshopFeature[] = [
  {
    id: "wf1",
    name: "Maharani Jadau Necklace",
    image: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=800&h=800&fit=crop",
    category: "Bridal Collection",
    howToWear: [
      "Pair with heavy bridal lehenga or saree",
      "Ensure hair is styled in a low bun to showcase the necklace",
      "Wear with matching earrings and maang tikka",
      "Ideal for traditional wedding ceremonies"
    ],
    culturalSignificance: "Jadau jewelry represents the royal heritage of Rajasthan. This necklace is crafted using ancient Kundan technique where gold is molded around precious stones.",
    stylingTips: [
      "Complement with gold or kundan bangles",
      "Choose a blouse with minimal embroidery near the neck",
      "Pair with traditional juttis for complete look",
      "Add a subtle nose ring for traditional appeal"
    ],
    occasions: ["Wedding", "Reception", "Engagement", "Festival"],
    price: "₹4,50,000"
  },
  {
    id: "wf2",
    name: "Temple Inspired Choker",
    image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800&h=800&fit=crop",
    category: "Heritage Collection",
    howToWear: [
      "Best worn with silk sarees or kanjeevarams",
      "Keep hairstyle simple - center parted bun or braid",
      "Wear with temple design earrings",
      "Perfect for South Indian traditional events"
    ],
    culturalSignificance: "Temple jewelry draws inspiration from ancient South Indian temple architecture and deity adornments. Each motif represents divine blessings.",
    stylingTips: [
      "Pair with traditional pottu (bindi)",
      "Add gajra (jasmine flowers) in hair",
      "Wear with kasavu saree for authentic look",
      "Complement with antique gold bangles"
    ],
    occasions: ["Puja", "Wedding", "Classical Dance", "Festival"],
    price: "₹1,80,000"
  },
  {
    id: "wf3",
    name: "Polki Diamond Earrings",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&h=800&fit=crop",
    category: "Contemporary Fusion",
    howToWear: [
      "Versatile - works with both traditional and modern outfits",
      "Style hair in loose waves or sleek ponytail",
      "Can be worn solo as statement pieces",
      "Suitable for day and evening events"
    ],
    culturalSignificance: "Polki represents the purest form of diamonds used in Mughal-era jewelry. These uncut diamonds reflect authentic craftsmanship.",
    stylingTips: [
      "Pair with simple chain necklace for balanced look",
      "Works beautifully with cocktail sarees",
      "Style with indo-western outfits",
      "Keep other jewelry minimal to highlight earrings"
    ],
    occasions: ["Cocktail Party", "Sangeet", "Anniversary", "Festive Gathering"],
    price: "₹2,25,000"
  }
];

export function WorkshopFeatures() {
  const [selectedFeature, setSelectedFeature] = useState<WorkshopFeature>(workshopFeatures[0]);
  const [activeTab, setActiveTab] = useState("how-to-wear");

  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-b from-background via-amber-500/5 to-background">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
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
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            <Sparkles className="w-4 h-4 mr-2" />
            Workshop Features
          </Badge>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
            Styling Guide & Cultural Heritage
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover how to wear each piece with cultural context and expert styling tips
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* 3D Product Display */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="sticky top-24"
          >
            <Card className="overflow-hidden border-2 border-primary/20">
              <div className="relative h-[500px] bg-gradient-to-br from-primary/10 via-amber-500/10 to-background flex items-center justify-center overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedFeature.id}
                    initial={{ scale: 0.8, rotateY: -90, opacity: 0 }}
                    animate={{ scale: 1, rotateY: 0, opacity: 1 }}
                    exit={{ scale: 0.8, rotateY: 90, opacity: 0 }}
                    transition={{ 
                      duration: 0.8,
                      type: "spring",
                      stiffness: 100 
                    }}
                    className="relative"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <motion.img
                      src={selectedFeature.image}
                      alt={selectedFeature.name}
                      className="max-w-full max-h-[450px] object-contain rounded-lg shadow-2xl"
                      animate={{
                        rotateY: [0, 10, -10, 0],
                      }}
                      transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      style={{
                        filter: "drop-shadow(0 25px 50px rgba(194, 127, 36, 0.3))",
                      }}
                    />

                    {/* Floating particles */}
                    <motion.div
                      className="absolute -top-4 -right-4 w-20 h-20 bg-primary/20 rounded-full blur-xl"
                      animate={{
                        y: [0, -20, 0],
                        opacity: [0.3, 0.6, 0.3]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity
                      }}
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Category Badge */}
                <div className="absolute top-6 left-6">
                  <Badge className="bg-primary shadow-lg">
                    {selectedFeature.category}
                  </Badge>
                </div>

                {/* Price Badge */}
                <div className="absolute bottom-6 right-6 bg-card/90 backdrop-blur-sm rounded-lg px-4 py-2 border border-primary/20">
                  <p className="text-2xl font-bold text-primary">
                    {selectedFeature.price}
                  </p>
                </div>
              </div>
            </Card>

            {/* Feature Selection */}
            <div className="grid grid-cols-3 gap-3 mt-4">
              {workshopFeatures.map((feature, index) => (
                <motion.button
                  key={feature.id}
                  onClick={() => setSelectedFeature(feature)}
                  className={`relative rounded-lg overflow-hidden border-2 transition-all ${
                    selectedFeature.id === feature.id
                      ? "border-primary shadow-lg scale-105"
                      : "border-transparent hover:border-primary/50"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <img
                    src={feature.image}
                    alt={feature.name}
                    className="w-full h-24 object-cover"
                  />
                  {selectedFeature.id === feature.id && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute inset-0 bg-primary/20 backdrop-blur-sm"
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Information Panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedFeature.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="font-serif text-3xl font-bold mb-6">
                  {selectedFeature.name}
                </h3>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-3 mb-6">
                    <TabsTrigger value="how-to-wear" className="text-xs sm:text-sm">
                      How to Wear
                    </TabsTrigger>
                    <TabsTrigger value="styling" className="text-xs sm:text-sm">
                      Styling Tips
                    </TabsTrigger>
                    <TabsTrigger value="culture" className="text-xs sm:text-sm">
                      Culture
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="how-to-wear" className="space-y-4">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Info className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Wearing Guide</h4>
                        <p className="text-sm text-muted-foreground">
                          Step-by-step instructions for perfect styling
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {selectedFeature.howToWear.map((step, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg"
                        >
                          <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">
                            {index + 1}
                          </div>
                          <p className="text-sm leading-relaxed">{step}</p>
                        </motion.div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="styling" className="space-y-4">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Palette className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Expert Styling Tips</h4>
                        <p className="text-sm text-muted-foreground">
                          Professional recommendations for complete look
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {selectedFeature.stylingTips.map((tip, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start gap-3 p-4 bg-gradient-to-r from-primary/5 to-amber-500/5 rounded-lg border border-primary/10"
                        >
                          <ChevronRight className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          <p className="text-sm leading-relaxed">{tip}</p>
                        </motion.div>
                      ))}
                    </div>

                    <div className="mt-6 p-4 bg-card rounded-lg border border-card-border">
                      <h5 className="font-semibold mb-3 flex items-center gap-2">
                        <Users className="w-4 h-4 text-primary" />
                        Perfect Occasions
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {selectedFeature.occasions.map((occasion) => (
                          <Badge key={occasion} variant="outline">
                            {occasion}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="culture" className="space-y-4">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Award className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Cultural Significance</h4>
                        <p className="text-sm text-muted-foreground">
                          Heritage and tradition behind the design
                        </p>
                      </div>
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-6 bg-gradient-to-br from-primary/10 via-amber-500/10 to-background rounded-lg border border-primary/20"
                    >
                      <p className="text-sm leading-relaxed text-foreground/90">
                        {selectedFeature.culturalSignificance}
                      </p>
                    </motion.div>

                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div className="p-4 bg-card rounded-lg border border-card-border text-center">
                        <Sparkles className="w-6 h-6 text-primary mx-auto mb-2" />
                        <p className="text-xs text-muted-foreground mb-1">Craftsmanship</p>
                        <p className="text-sm font-semibold">Traditional</p>
                      </div>
                      <div className="p-4 bg-card rounded-lg border border-card-border text-center">
                        <Award className="w-6 h-6 text-primary mx-auto mb-2" />
                        <p className="text-xs text-muted-foreground mb-1">Heritage</p>
                        <p className="text-sm font-semibold">Ancient</p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                <Button className="w-full mt-6" size="lg">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Contact Artisan
                </Button>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
