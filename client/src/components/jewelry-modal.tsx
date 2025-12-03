import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, RotateCcw, ZoomIn, ZoomOut, Phone, MessageCircle, Mail, Sparkles, Scale, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { JewelryItem } from "@shared/schema";
import { formatPrice } from "@/lib/static-data";

interface JewelryModalProps {
  item: JewelryItem | null;
  onClose: () => void;
}

export function JewelryModal({ item, onClose }: JewelryModalProps) {
  const [zoom, setZoom] = useState(1);
  const [autoRotate, setAutoRotate] = useState(true);
  const [rotation, setRotation] = useState(0);
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!autoRotate || !item) return;

    const interval = setInterval(() => {
      setRotation((prev) => (prev + 1) % 360);
    }, 50);

    return () => clearInterval(interval);
  }, [autoRotate, item]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  if (!item) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
        data-testid="modal-jewelry-viewer"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="bg-background rounded-lg w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col lg:flex-row"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            ref={canvasRef}
            className="relative flex-1 bg-gradient-to-br from-muted/50 to-background min-h-[300px] lg:min-h-[500px] flex items-center justify-center overflow-hidden"
          >
            <motion.div
              className="relative"
              style={{
                transform: `scale(${zoom}) rotateY(${rotation}deg)`,
                transformStyle: "preserve-3d",
                perspective: "1000px",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <img
                src={item.imageUrl}
                alt={item.name}
                className="max-w-full max-h-[400px] object-contain rounded-lg shadow-2xl"
                style={{
                  filter: "drop-shadow(0 25px 50px rgba(0,0,0,0.3))",
                }}
              />
              <div className="absolute inset-0 rounded-lg bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
            </motion.div>

            <Button
              size="icon"
              variant="secondary"
              className="absolute top-4 right-4"
              onClick={onClose}
              data-testid="button-close-modal"
            >
              <X className="w-5 h-5" />
            </Button>

            <div className="absolute bottom-4 left-4 right-4 flex items-center gap-4 bg-card/90 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-2">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setZoom((z) => Math.max(0.5, z - 0.25))}
                  data-testid="button-zoom-out"
                >
                  <ZoomOut className="w-4 h-4" />
                </Button>
                <Slider
                  value={[zoom]}
                  min={0.5}
                  max={2}
                  step={0.1}
                  onValueChange={([v]) => setZoom(v)}
                  className="w-24"
                  data-testid="slider-zoom"
                />
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setZoom((z) => Math.min(2, z + 0.25))}
                  data-testid="button-zoom-in"
                >
                  <ZoomIn className="w-4 h-4" />
                </Button>
              </div>

              <Separator orientation="vertical" className="h-6" />

              <div className="flex items-center gap-2">
                <Switch
                  checked={autoRotate}
                  onCheckedChange={setAutoRotate}
                  id="auto-rotate"
                  data-testid="switch-auto-rotate"
                />
                <Label htmlFor="auto-rotate" className="text-sm">
                  Auto Rotate
                </Label>
              </div>

              <Button
                size="icon"
                variant="ghost"
                onClick={() => {
                  setRotation(0);
                  setZoom(1);
                }}
                data-testid="button-reset-view"
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <ScrollArea className="w-full lg:w-[380px] border-l border-border">
            <div className="p-6">
              <Badge variant="outline" className="mb-3 capitalize">
                {item.category}
              </Badge>
              <h2 className="font-serif text-2xl font-semibold mb-2">
                {item.name}
              </h2>
              <p className="text-3xl font-bold text-primary mb-4">
                {formatPrice(item.price)}
              </p>

              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                {item.description}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-muted/50 rounded-md p-3">
                  <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
                    <Sparkles className="w-3 h-3" />
                    Material
                  </div>
                  <p className="font-medium text-sm">{item.material}</p>
                </div>
                <div className="bg-muted/50 rounded-md p-3">
                  <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
                    <Scale className="w-3 h-3" />
                    Weight
                  </div>
                  <p className="font-medium text-sm">{item.weight}</p>
                </div>
              </div>

              <Accordion type="single" collapsible className="mb-6">
                <AccordionItem value="details">
                  <AccordionTrigger className="text-sm">
                    <div className="flex items-center gap-2">
                      <Info className="w-4 h-4" />
                      Product Details
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    <ul className="space-y-2">
                      <li className="flex justify-between">
                        <span>SKU</span>
                        <span className="font-mono">{item.id.toUpperCase()}</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Category</span>
                        <span className="capitalize">{item.category}</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Availability</span>
                        <span className={item.inStock ? "text-green-600" : "text-red-600"}>
                          {item.inStock ? "In Stock" : "Out of Stock"}
                        </span>
                      </li>
                      <li className="flex justify-between">
                        <span>Certification</span>
                        <span>BIS Hallmarked</span>
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <Separator className="my-6" />

              <div className="space-y-3">
                <h3 className="font-medium text-sm mb-3">Contact Seller</h3>
                <Button className="w-full" data-testid="button-contact-call">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Now
                </Button>
                <Button variant="outline" className="w-full" data-testid="button-contact-whatsapp">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp
                </Button>
                <Button variant="ghost" className="w-full" data-testid="button-contact-email">
                  <Mail className="w-4 h-4 mr-2" />
                  Send Inquiry
                </Button>
              </div>
            </div>
          </ScrollArea>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
