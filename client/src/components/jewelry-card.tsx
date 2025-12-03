import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Heart, ShoppingBag } from "lucide-react";
import type { JewelryItem } from "@shared/schema";
import { formatPrice } from "@/lib/static-data";
import { cn } from "@/lib/utils";

interface JewelryCardProps {
  item: JewelryItem;
  index?: number;
  onViewDetails: (item: JewelryItem) => void;
}

export function JewelryCard({ item, index = 0, onViewDetails }: JewelryCardProps) {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
    >
      <Card
        className="overflow-hidden group cursor-pointer hover-elevate"
        data-testid={`card-jewelry-${item.id}`}
      >
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <div className="absolute top-3 left-3">
            <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm capitalize">
              {item.category}
            </Badge>
          </div>

          <div className="absolute top-3 right-3 flex flex-col gap-2">
            <Button
              size="icon"
              variant="secondary"
              className={cn(
                "w-9 h-9 bg-background/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300",
                isLiked && "text-red-500"
              )}
              onClick={(e) => {
                e.stopPropagation();
                setIsLiked(!isLiked);
              }}
              data-testid={`button-like-${item.id}`}
            >
              <Heart className={cn("w-4 h-4", isLiked && "fill-current")} />
            </Button>
          </div>

          <div className="absolute bottom-3 left-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
            <Button
              className="flex-1"
              onClick={() => onViewDetails(item)}
              data-testid={`button-view-${item.id}`}
            >
              <Eye className="w-4 h-4 mr-2" />
              Quick View
            </Button>
          </div>
        </div>

        <CardContent className="p-4" onClick={() => onViewDetails(item)}>
          <h3 className="font-serif text-base font-semibold line-clamp-1 mb-1">
            {item.name}
          </h3>
          <p className="text-sm text-muted-foreground mb-2">{item.material}</p>
          <div className="flex items-center justify-between">
            <span className="font-semibold text-primary">
              {formatPrice(item.price)}
            </span>
            {item.inStock ? (
              <Badge variant="outline" className="text-xs text-green-600 border-green-200 dark:border-green-800">
                In Stock
              </Badge>
            ) : (
              <Badge variant="outline" className="text-xs text-red-600 border-red-200 dark:border-red-800">
                Sold Out
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
