import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Star,
  Clock,
  Users,
  Shield,
  Award,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { JewelryCard } from "@/components/jewelry-card";
import { JewelryModal } from "@/components/jewelry-modal";
import {
  getSellerById,
  getWorkshopBySellerId,
  getStateById,
  jewelryItems,
} from "@/lib/static-data";
import type { JewelryItem } from "@shared/schema";
import { useState } from "react";

export default function SellerDetail() {
  const { id } = useParams<{ id: string }>();
  const [selectedItem, setSelectedItem] = useState<JewelryItem | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const seller = getSellerById(id || "");
  const workshop = seller ? getWorkshopBySellerId(seller.id) : undefined;
  const state = seller ? getStateById(seller.state) : undefined;

  if (!seller) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-2xl font-bold mb-2">Seller Not Found</h1>
          <p className="text-muted-foreground mb-4">
            The seller you're looking for doesn't exist.
          </p>
          <Link href="/sellers">
            <Button>View All Sellers</Button>
          </Link>
        </div>
      </div>
    );
  }

  const galleryImages = workshop?.galleryImages || [seller.thumbnailImage];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? galleryImages.length - 1 : prev - 1
    );
  };

  return (
    <div className="min-h-screen pt-16">
      <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <motion.img
          key={currentImageIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          src={workshop?.heroImage || seller.thumbnailImage}
          alt={seller.workshopName}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="max-w-7xl mx-auto">
            <Link href="/sellers" className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm mb-4 transition-colors" data-testid="link-back-sellers">
              <ChevronLeft className="w-4 h-4" />
              Back to Sellers
            </Link>

            <div className="flex flex-wrap items-start gap-4 justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="font-serif text-3xl md:text-5xl font-bold text-white">
                    {seller.workshopName}
                  </h1>
                  {seller.verified && (
                    <Badge className="bg-primary">
                      <Shield className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>
                {workshop && (
                  <p className="text-xl text-white/80 font-serif italic">
                    {workshop.tagline}
                  </p>
                )}
                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center gap-1 text-white">
                    <MapPin className="w-4 h-4" />
                    <span>
                      {seller.city}, {state?.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-amber-400">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="font-semibold">{seller.rating}</span>
                    <span className="text-white/60">({seller.reviewCount} reviews)</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button className="gap-2" data-testid="button-seller-call">
                  <Phone className="w-4 h-4" />
                  Call Now
                </Button>
                <Button variant="outline" className="gap-2 bg-white/10 border-white/20 text-white hover:bg-white/20" data-testid="button-seller-whatsapp">
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </Button>
                <Button variant="outline" className="gap-2 bg-white/10 border-white/20 text-white hover:bg-white/20" data-testid="button-seller-email">
                  <Mail className="w-4 h-4" />
                  Email
                </Button>
              </div>
            </div>
          </div>
        </div>

        {galleryImages.length > 1 && (
          <>
            <Button
              size="icon"
              variant="secondary"
              className="absolute left-4 top-1/2 -translate-y-1/2"
              onClick={prevImage}
              data-testid="button-gallery-prev"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className="absolute right-4 top-1/2 -translate-y-1/2"
              onClick={nextImage}
              data-testid="button-gallery-next"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <Card>
            <CardContent className="p-4 text-center">
              <Clock className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold">{seller.yearsInBusiness}+</p>
              <p className="text-sm text-muted-foreground">Years in Business</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Users className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold">{workshop?.teamSize || 10}+</p>
              <p className="text-sm text-muted-foreground">Master Artisans</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Star className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold">{seller.rating}</p>
              <p className="text-sm text-muted-foreground">Customer Rating</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Award className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold">{workshop?.certifications.length || 3}</p>
              <p className="text-sm text-muted-foreground">Certifications</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="about" className="mb-12">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="about" data-testid="tab-about">About</TabsTrigger>
            <TabsTrigger value="catalog" data-testid="tab-catalog">Catalog</TabsTrigger>
            <TabsTrigger value="contact" data-testid="tab-contact">Contact</TabsTrigger>
          </TabsList>

          <TabsContent value="about" className="mt-8">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <h2 className="font-serif text-2xl font-semibold mb-4">Our Story</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {workshop?.description ||
                    `${seller.workshopName} is a renowned jewelry workshop based in ${seller.city}, ${state?.name}. With over ${seller.yearsInBusiness} years of experience, we have been creating exquisite jewelry pieces that blend traditional craftsmanship with contemporary designs.`}
                </p>

                <h3 className="font-serif text-xl font-semibold mb-3">Our Specialties</h3>
                <div className="flex flex-wrap gap-2 mb-8">
                  {(workshop?.specialties || seller.specialties).map((specialty) => (
                    <Badge key={specialty} variant="outline" className="text-sm py-1 px-3">
                      <Sparkles className="w-3 h-3 mr-1" />
                      {specialty}
                    </Badge>
                  ))}
                </div>

                {workshop && (
                  <>
                    <h3 className="font-serif text-xl font-semibold mb-3">Gallery</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {workshop.galleryImages.map((img, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className="aspect-square rounded-lg overflow-hidden cursor-pointer hover-elevate"
                          onClick={() => setCurrentImageIndex(index)}
                        >
                          <img
                            src={img}
                            alt={`Gallery ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </motion.div>
                      ))}
                    </div>
                  </>
                )}
              </div>

              <div>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-serif text-lg font-semibold mb-4">Quick Facts</h3>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium">Established</p>
                          <p className="text-sm text-muted-foreground">
                            {workshop?.establishedYear || new Date().getFullYear() - seller.yearsInBusiness}
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium">Location</p>
                          <p className="text-sm text-muted-foreground">{seller.address}</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <Award className="w-5 h-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium">Certifications</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {(workshop?.certifications || ["BIS Hallmark", "IGI Certified"]).map(
                              (cert) => (
                                <Badge key={cert} variant="secondary" className="text-xs">
                                  {cert}
                                </Badge>
                              )
                            )}
                          </div>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="catalog" className="mt-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl font-semibold">Featured Collection</h2>
              <Link href="/catalog" data-testid="link-view-full-catalog">
                <Button variant="outline">
                  View Full Catalog
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {jewelryItems.slice(0, 8).map((item, index) => (
                <JewelryCard
                  key={item.id}
                  item={item}
                  index={index}
                  onViewDetails={setSelectedItem}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="contact" className="mt-8">
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-serif text-xl font-semibold mb-4">Contact Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Phone className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Phone</p>
                        <p className="font-medium">{seller.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <MessageCircle className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">WhatsApp</p>
                        <p className="font-medium">{seller.whatsapp}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Mail className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="font-medium">{seller.email}</p>
                      </div>
                    </div>
                    <Separator className="my-4" />
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <MapPin className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Address</p>
                        <p className="font-medium">{seller.address}</p>
                        <p className="text-sm text-muted-foreground">
                          {seller.city}, {state?.name}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-serif text-xl font-semibold mb-4">Business Hours</h3>
                  <ul className="space-y-3 text-sm">
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Monday - Friday</span>
                      <span className="font-medium">10:00 AM - 8:00 PM</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Saturday</span>
                      <span className="font-medium">10:00 AM - 9:00 PM</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Sunday</span>
                      <span className="font-medium">11:00 AM - 7:00 PM</span>
                    </li>
                  </ul>
                  <Separator className="my-4" />
                  <p className="text-sm text-muted-foreground">
                    Appointments recommended for bespoke design consultations.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <JewelryModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </div>
  );
}
