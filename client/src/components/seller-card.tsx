import { Link } from "wouter";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Shield, ArrowRight } from "lucide-react";
import type { Seller } from "@shared/schema";

interface SellerCardProps {
  seller: Seller;
  index?: number;
  compact?: boolean;
}

export function SellerCard({ seller, index = 0, compact = false }: SellerCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
    >
      <Link href={`/seller/${seller.id}`} data-testid={`card-seller-${seller.id}`}>
        <Card className="overflow-hidden hover-elevate active-elevate-2 cursor-pointer group">
          <div className="relative aspect-video overflow-hidden">
            <img
              src={seller.thumbnailImage}
              alt={seller.workshopName}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            {seller.verified && (
              <Badge
                variant="secondary"
                className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm"
              >
                <Shield className="w-3 h-3 mr-1" />
                Verified
              </Badge>
            )}
            <div className="absolute bottom-3 left-3 right-3">
              <h3 className="font-serif text-lg font-semibold text-white line-clamp-1">
                {seller.workshopName}
              </h3>
              <div className="flex items-center gap-1 text-white/80 text-sm">
                <MapPin className="w-3 h-3" />
                <span>{seller.city}</span>
              </div>
            </div>
          </div>
          <CardContent className={compact ? "p-3" : "p-4"}>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center gap-1 text-amber-500">
                <Star className="w-4 h-4 fill-current" />
                <span className="font-semibold text-sm">{seller.rating}</span>
              </div>
              <span className="text-xs text-muted-foreground">
                ({seller.reviewCount} reviews)
              </span>
              <span className="text-xs text-muted-foreground ml-auto">
                Est. {new Date().getFullYear() - seller.yearsInBusiness}
              </span>
            </div>

            <div className="flex flex-wrap gap-1 mb-3">
              {seller.specialties.slice(0, 3).map((specialty) => (
                <Badge
                  key={specialty}
                  variant="outline"
                  className="text-xs font-normal"
                >
                  {specialty}
                </Badge>
              ))}
            </div>

            {!compact && (
              <Button variant="ghost" className="w-full group/btn">
                <span>View Workshop</span>
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
              </Button>
            )}
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
