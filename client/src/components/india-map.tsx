import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { indianStates, getSellersByState } from "@/lib/static-data";
import type { StateData } from "@shared/schema";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface IndiaMapProps {
  onStateSelect: (state: StateData | null) => void;
  selectedState: StateData | null;
}

export function IndiaMap({ onStateSelect, selectedState }: IndiaMapProps) {
  const [hoveredState, setHoveredState] = useState<StateData | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setTooltipPosition({ x: e.clientX, y: e.clientY });
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <motion.svg
        viewBox="0 0 600 600"
        className="w-full h-full max-w-3xl max-h-[70vh] drop-shadow-2xl"
        onMouseMove={handleMouseMove}
        role="img"
        aria-label="Interactive map of India showing jewelry sellers by state"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="shadow">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.3"/>
          </filter>
          <filter id="hoverGlow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          
          {/* Rich gradients for visual appeal */}
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFD700" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#FFA500" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#FF8C00" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="activeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFD700" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#FFA500" stopOpacity="0.7" />
          </linearGradient>
          <linearGradient id="mapBackground" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1a1a2e" />
            <stop offset="50%" stopColor="#16213e" />
            <stop offset="100%" stopColor="#0f3460" />
          </linearGradient>
          <radialGradient id="pulseGradient" cx="50%" cy="50%">
            <stop offset="0%" stopColor="#FFD700" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#FFD700" stopOpacity="0" />
          </radialGradient>
          
          {/* Decorative pattern */}
          <pattern id="decorPattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="5" cy="5" r="1.5" fill="#FFD700" opacity="0.15" />
            <circle cx="25" cy="25" r="1.5" fill="#FFA500" opacity="0.15" />
          </pattern>
          
          {/* Shimmer effect */}
          <linearGradient id="shimmer" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="rgba(255, 215, 0, 0.3)" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>

        {/* Decorative background circles */}
        <motion.circle
          cx="300"
          cy="300"
          r="290"
          fill="url(#mapBackground)"
          opacity="0.8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
        
        {/* Pattern overlay */}
        <circle cx="300" cy="300" r="290" fill="url(#decorPattern)" opacity="0.4" />
        
        {/* Animated decorative rings */}
        <motion.circle
          cx="300"
          cy="300"
          r="260"
          fill="none"
          stroke="#FFD700"
          strokeWidth="1"
          opacity="0.2"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.2 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.circle
          cx="300"
          cy="300"
          r="275"
          fill="none"
          stroke="#FFA500"
          strokeWidth="0.5"
          opacity="0.15"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1.05, opacity: 0.15 }}
          transition={{ duration: 2.5, repeat: Infinity, repeatType: "reverse", delay: 0.5 }}
        />

        {indianStates.map((state, index) => {
          const isHovered = hoveredState?.id === state.id;
          const isSelected = selectedState?.id === state.id;
          const sellers = getSellersByState(state.id);
          const hasSellers = sellers.length > 0;

          return (
            <g key={state.id}>
              <motion.path
                d={state.pathD}
                className={cn(
                  hasSellers ? "cursor-pointer" : "cursor-default"
                )}
                fill={
                  isSelected
                    ? "url(#activeGradient)"
                    : isHovered && hasSellers
                    ? "url(#goldGradient)"
                    : hasSellers
                    ? "rgba(255, 215, 0, 0.25)"
                    : "rgba(100, 100, 120, 0.3)"
                }
                stroke={
                  isSelected
                    ? "#FFD700"
                    : isHovered && hasSellers
                    ? "#FFA500"
                    : hasSellers
                    ? "rgba(255, 215, 0, 0.5)"
                    : "rgba(150, 150, 160, 0.5)"
                }
                strokeWidth={isSelected ? 2.5 : isHovered ? 2 : 1.5}
                filter={
                  isSelected 
                    ? "url(#hoverGlow)" 
                    : isHovered 
                    ? "url(#glow)" 
                    : "url(#shadow)"
                }
                onClick={() => hasSellers && onStateSelect(isSelected ? null : state)}
                onMouseEnter={() => setHoveredState(state)}
                onMouseLeave={() => setHoveredState(null)}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.03,
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                }}
                whileHover={
                  hasSellers 
                    ? { 
                        scale: 1.05,
                        transition: { duration: 0.2 }
                      } 
                    : {
                        scale: 1.02,
                        transition: { duration: 0.2 }
                      }
                }
                whileTap={
                  hasSellers
                    ? { scale: 0.98 }
                    : undefined
                }
                role="button"
                aria-label={`${state.name}: ${hasSellers ? state.sellerCount + ' sellers' : 'No sellers yet'}`}
                tabIndex={0}
                data-testid={`map-state-${state.id.toLowerCase()}`}
              />
              
              {/* State name label for states without sellers */}
              {!hasSellers && (
                <motion.text
                  x={getPathCenter(state.pathD).x}
                  y={getPathCenter(state.pathD).y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className="text-[9px] font-medium fill-muted-foreground/60 pointer-events-none select-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isHovered ? 1 : 0.7 }}
                  transition={{ delay: 0.4 + index * 0.03 }}
                >
                  {state.id}
                </motion.text>
              )}

              {/* Seller count badge for states with sellers */}
              {hasSellers && state.sellerCount > 0 && (
                <motion.g
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ 
                    delay: 0.3 + index * 0.03, 
                    type: "spring",
                    stiffness: 400,
                    damping: 15
                  }}
                >
                  {/* Pulsing background circle */}
                  <motion.circle
                    cx={getPathCenter(state.pathD).x}
                    cy={getPathCenter(state.pathD).y}
                    r={12}
                    fill="url(#pulseGradient)"
                    className="pointer-events-none"
                    animate={
                      isHovered || isSelected
                        ? {
                            r: [12, 16, 12],
                            opacity: [0.6, 0.3, 0.6],
                          }
                        : {}
                    }
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  
                  {/* Main badge circle */}
                  <motion.circle
                    cx={getPathCenter(state.pathD).x}
                    cy={getPathCenter(state.pathD).y}
                    r={12}
                    fill="hsl(var(--primary))"
                    className="pointer-events-none"
                    whileHover={{ scale: 1.2 }}
                    filter="url(#shadow)"
                  />
                  
                  {/* Count text */}
                  <motion.text
                    x={getPathCenter(state.pathD).x}
                    y={getPathCenter(state.pathD).y}
                    textAnchor="middle"
                    dominantBaseline="central"
                    className="text-[10px] font-bold fill-primary-foreground pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 + index * 0.03 }}
                  >
                    {sellers.length}
                  </motion.text>
                </motion.g>
              )}
            </g>
          );
        })}
      </motion.svg>

      <AnimatePresence>
        {hoveredState && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed z-50 pointer-events-none"
            style={{
              left: tooltipPosition.x + 15,
              top: tooltipPosition.y + 15,
            }}
          >
            <div className="bg-popover/95 backdrop-blur-sm border-2 border-primary/30 rounded-lg shadow-2xl px-4 py-3">
              <p className="font-serif font-bold text-base text-primary mb-1">
                {hoveredState.name}
              </p>
              {getSellersByState(hoveredState.id).length > 0 ? (
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <p className="text-sm text-muted-foreground font-medium">
                    {getSellersByState(hoveredState.id).length} Jewelry Sellers
                  </p>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-muted-foreground/50" />
                  <p className="text-sm text-muted-foreground font-medium italic">
                    No sellers yet
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        className="absolute bottom-4 right-4 bg-card/95 backdrop-blur-md border-2 border-card-border rounded-xl p-5 max-w-xs shadow-xl"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <h3 className="font-serif text-base font-bold mb-3 text-primary">Legend</h3>
        <div className="flex flex-col gap-3 text-xs">
          <motion.div 
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9 }}
          >
            <div className="w-5 h-5 rounded-md bg-primary/20 border-2 border-primary/50 shadow-sm" />
            <span className="text-foreground font-medium">States with Sellers</span>
          </motion.div>
          <motion.div 
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.0 }}
          >
            <div className="w-5 h-5 rounded-md bg-muted/25 border-2 border-border shadow-sm" />
            <span className="text-muted-foreground font-medium">No Sellers</span>
          </motion.div>
          <motion.div 
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.1 }}
          >
            <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-[9px] text-primary-foreground font-bold shadow-md">
              5
            </div>
            <span className="text-foreground font-medium">Seller Count</span>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

function getPathCenter(pathD: string): { x: number; y: number } {
  const coords = pathD.match(/\d+/g);
  if (!coords || coords.length < 2) return { x: 0, y: 0 };
  
  const numbers = coords.map(Number);
  let sumX = 0, sumY = 0;
  for (let i = 0; i < numbers.length - 1; i += 2) {
    sumX += numbers[i];
    sumY += numbers[i + 1];
  }
  const count = numbers.length / 2;
  return { x: sumX / count, y: sumY / count };
}
