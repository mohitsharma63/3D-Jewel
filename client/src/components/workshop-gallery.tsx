
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Award, Users, Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface Workshop {
  id: string;
  name: string;
  location: string;
  established: number;
  artisans: number;
  specialty: string;
  images: string[];
  description: string;
}

const workshops: Workshop[] = [
  {
    id: "1",
    name: "Zaveri & Sons Master Workshop",
    location: "Mumbai, Maharashtra",
    established: 1948,
    artisans: 35,
    specialty: "Kundan & Bridal",
    description: "Four generations of master craftsmen creating exquisite bridal jewelry",
    images: [
      "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800&h=600&fit=crop"
    ]
  },
  {
    id: "2",
    name: "Royal Jaipur Jewellers Studio",
    location: "Jaipur, Rajasthan",
    established: 1903,
    artisans: 55,
    specialty: "Polki & Gemstone",
    description: "120 years of royal craftsmanship in the Pink City's heart",
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&h=600&fit=crop"
    ]
  },
  {
    id: "3",
    name: "KC Jewellers Heritage Atelier",
    location: "Ahmedabad, Gujarat",
    established: 1933,
    artisans: 42,
    specialty: "Jadau & Meenakari",
    description: "Preserving ancient art forms with modern excellence",
    images: [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1610375461246-83df859d849d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=800&h=600&fit=crop"
    ]
  }
];

export function WorkshopGallery() {
  const [selectedWorkshop, setSelectedWorkshop] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const workshop = workshops[selectedWorkshop];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % workshop.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? workshop.images.length - 1 : prev - 1
    );
  };

  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-b from-background via-amber-500/5 to-background">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
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
            <Award className="w-4 h-4 mr-2" />
            Master Workshops
          </Badge>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
            Inside Our Artisan Studios
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore the workshops where tradition meets craftsmanship - witness the creation of timeless jewelry
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image with 3D effect */}
            <motion.div
              className="relative h-[500px] rounded-2xl overflow-hidden bg-gradient-to-br from-primary/10 to-amber-500/10"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={`${selectedWorkshop}-${currentImageIndex}`}
                  src={workshop.images[currentImageIndex]}
                  alt={workshop.name}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0, rotateY: -90, scale: 0.8 }}
                  animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                  exit={{ opacity: 0, rotateY: 90, scale: 0.8 }}
                  transition={{ duration: 0.5 }}
                  style={{ transformStyle: "preserve-3d" }}
                />
              </AnimatePresence>

              {/* Navigation buttons */}
              <div className="absolute inset-0 flex items-center justify-between p-4">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={prevImage}
                  className="bg-background/80 backdrop-blur-sm hover:scale-110 transition-transform"
                >
                  <ChevronLeft className="w-6 h-6" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={nextImage}
                  className="bg-background/80 backdrop-blur-sm hover:scale-110 transition-transform"
                >
                  <ChevronRight className="w-6 h-6" />
                </Button>
              </div>

              {/* Image counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-background/80 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium">
                {currentImageIndex + 1} / {workshop.images.length}
              </div>
            </motion.div>

            {/* Thumbnail grid */}
            <div className="grid grid-cols-4 gap-3">
              {workshop.images.map((image, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    currentImageIndex === index
                      ? "border-primary scale-105"
                      : "border-transparent hover:border-primary/50"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <img
                    src={image}
                    alt={`Gallery ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {currentImageIndex === index && (
                    <motion.div
                      layoutId="activeImageIndicator"
                      className="absolute inset-0 bg-primary/20"
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Workshop Info */}
          <div className="space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedWorkshop}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4 }}
              >
                <h3 className="font-serif text-3xl font-bold mb-4">
                  {workshop.name}
                </h3>

                <div className="flex items-center gap-2 text-muted-foreground mb-4">
                  <MapPin className="w-4 h-4" />
                  <span>{workshop.location}</span>
                </div>

                <p className="text-muted-foreground leading-relaxed mb-6">
                  {workshop.description}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <Calendar className="w-6 h-6 text-primary mx-auto mb-2" />
                      <p className="text-2xl font-bold">{new Date().getFullYear() - workshop.established}</p>
                      <p className="text-xs text-muted-foreground">Years</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <Users className="w-6 h-6 text-primary mx-auto mb-2" />
                      <p className="text-2xl font-bold">{workshop.artisans}+</p>
                      <p className="text-xs text-muted-foreground">Artisans</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <Award className="w-6 h-6 text-primary mx-auto mb-2" />
                      <p className="text-2xl font-bold">BIS</p>
                      <p className="text-xs text-muted-foreground">Certified</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="p-4 bg-primary/10 rounded-lg border border-primary/20 mb-6">
                  <p className="text-sm font-medium text-primary">Specialty</p>
                  <p className="text-lg font-semibold">{workshop.specialty}</p>
                </div>

                <Button size="lg" className="w-full">
                  Visit Workshop
                </Button>
              </motion.div>
            </AnimatePresence>

            {/* Workshop selector */}
            <div className="space-y-3">
              <p className="text-sm font-medium text-muted-foreground">Other Workshops</p>
              <div className="grid gap-3">
                {workshops.map((w, index) => (
                  <motion.button
                    key={w.id}
                    onClick={() => {
                      setSelectedWorkshop(index);
                      setCurrentImageIndex(0);
                    }}
                    className={`p-4 rounded-lg border-2 text-left transition-all ${
                      selectedWorkshop === index
                        ? "border-primary bg-primary/5"
                        : "border-transparent bg-muted/50 hover:border-primary/50"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <p className="font-semibold">{w.name}</p>
                    <p className="text-sm text-muted-foreground">{w.location}</p>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
