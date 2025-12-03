import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SellerCard } from "./seller-card";
import { getSellersByState } from "@/lib/static-data";
import type { StateData } from "@shared/schema";

interface StateSidebarProps {
  state: StateData | null;
  onClose: () => void;
}

export function StateSidebar({ state, onClose }: StateSidebarProps) {
  const sellers = state ? getSellersByState(state.id) : [];

  return (
    <AnimatePresence>
      {state && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
            onClick={onClose}
            data-testid="sidebar-overlay"
          />

          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full sm:w-[420px] lg:w-[460px] bg-background border-l border-border z-50 flex flex-col"
            data-testid="sidebar-state-sellers"
          >
            <div className="flex items-center justify-between p-6 border-b border-border bg-card/50">
              <div>
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                  <MapPin className="w-4 h-4" />
                  <span>Explore Sellers</span>
                </div>
                <h2 className="font-serif text-2xl font-semibold">{state.name}</h2>
                <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                  <Users className="w-4 h-4" />
                  <span>{sellers.length} Verified Sellers</span>
                </div>
              </div>
              <Button
                size="icon"
                variant="ghost"
                onClick={onClose}
                data-testid="button-close-sidebar"
                aria-label="Close sidebar"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <ScrollArea className="flex-1 p-6">
              {sellers.length > 0 ? (
                <div className="flex flex-col gap-4">
                  {sellers.map((seller, index) => (
                    <SellerCard
                      key={seller.id}
                      seller={seller}
                      index={index}
                      compact
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                    <Users className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="font-serif text-lg font-medium mb-2">
                    No Sellers Yet
                  </h3>
                  <p className="text-sm text-muted-foreground max-w-xs">
                    We're working on bringing jewelry artisans from {state.name} to our platform.
                  </p>
                </div>
              )}
            </ScrollArea>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
