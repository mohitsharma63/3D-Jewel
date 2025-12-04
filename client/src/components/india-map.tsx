
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
  const [zoom, setZoom] = useState<number>(1);
  const [isMapHovered, setIsMapHovered] = useState<boolean>(false);

  // A small palette of muted/pastel colors to more closely resemble
  // a political map with clear state fills and visible borders.
  const stateColors = [
    "#f7c6c7",
    "#fbe7c6",
    "#e8f6d7",
    "#d6eaf8",
    "#f0d6f7",
    "#f3e7c6",
    "#dfeef3",
    "#fde2e2",
  ];

  const clamp = (v: number) => Math.min(2, Math.max(0.6, v));
  const zoomIn = () => setZoom((z) => clamp(parseFloat((z + 0.1).toFixed(2))));
  const zoomOut = () => setZoom((z) => clamp(parseFloat((z - 0.1).toFixed(2))));

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setTooltipPosition({ x: e.clientX, y: e.clientY });
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <motion.svg
        viewBox="0 0 700 700"
        className="w-full h-full max-w-4xl max-h-[75vh] drop-shadow-2xl"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsMapHovered(true)}
        onMouseLeave={() => setIsMapHovered(false)}
        role="img"
        aria-label="Interactive map of India showing jewelry sellers by state"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: +(zoom * (isMapHovered ? 1.06 : 1)).toFixed(3) }}
        transition={{ duration: 0.45, ease: "easeOut", type: "spring", stiffness: 200, damping: 25 }}
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
          
          <pattern id="decorPattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="5" cy="5" r="1.5" fill="#FFD700" opacity="0.15" />
            <circle cx="25" cy="25" r="1.5" fill="#FFA500" opacity="0.15" />
          </pattern>

          {/* Pattern for states without sellers */}
          <pattern id="emptyStatePattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 0 10 L 20 10 M 10 0 L 10 20" stroke="rgba(150, 150, 160, 0.2)" strokeWidth="0.5"/>
          </pattern>
          
          <linearGradient id="shimmer" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="rgba(255, 215, 0, 0.3)" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>

        <motion.circle
          cx="350"
          cy="350"
          r="340"
          fill="url(#mapBackground)"
          opacity="0.8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
        
        <circle cx="350" cy="350" r="340" fill="url(#decorPattern)" opacity="0.4" />
        
        <motion.circle
          cx="350"
          cy="350"
          r="300"
          fill="none"
          stroke="#FFD700"
          strokeWidth="1"
          opacity="0.2"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.2 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
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
                    ? stateColors[index % stateColors.length]
                    : "url(#emptyStatePattern)"
                }
                stroke={isSelected ? "#222" : "#222"}
                  strokeWidth={isSelected ? 1.6 : isHovered ? 1.2 : 0.9}
                  strokeOpacity={1}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  paintOrder="fill stroke markers"
                  vectorEffect="non-scaling-stroke"
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
                aria-label={`${state.name}: ${hasSellers ? state.sellerCount + ' sellers' : 'Coming soon'}`}
                tabIndex={0}
                data-testid={`map-state-${state.id.toLowerCase()}`}
              />
              
              {!hasSellers && (
                <>
                  <motion.text
                    x={getPathCenter(state.pathD).x}
                    y={getPathCenter(state.pathD).y}
                    textAnchor="middle"
                    dominantBaseline="central"
                    className="text-[8px] font-semibold fill-[#111] pointer-events-none select-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 1 : 0.85 }}
                    transition={{ delay: 0.35 + index * 0.03 }}
                  >
                    {state.name}
                  </motion.text>
                  <motion.text
                    x={getPathCenter(state.pathD).x}
                    y={getPathCenter(state.pathD).y + 9}
                    textAnchor="middle"
                    dominantBaseline="central"
                    className="text-[7px] italic fill-muted-foreground/40 pointer-events-none select-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 0.9 : 0.5 }}
                    transition={{ delay: 0.45 + index * 0.03 }}
                  >
                    Coming Soon
                  </motion.text>
                  
                  {/* Decorative subtle dot for empty states */}
                  <motion.circle
                    cx={getPathCenter(state.pathD).x}
                    cy={getPathCenter(state.pathD).y}
                    r={2}
                    fill="rgba(34,34,34,0.12)"
                    className="pointer-events-none"
                    initial={{ scale: 0 }}
                    animate={{ scale: isHovered ? 1.1 : 1 }}
                    transition={{ delay: 0.55 + index * 0.03 }}
                  />
                </>
              )}

              {/* Always render state name label for better political-map look */}
              <motion.text
                x={getPathCenter(state.pathD).x}
                y={getPathCenter(state.pathD).y - 10}
                textAnchor="middle"
                dominantBaseline="central"
                className="text-[9px] font-medium fill-[#111] pointer-events-none select-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 + index * 0.02 }}
              >
                {state.name}
              </motion.text>
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
                  
                  <motion.circle
                    cx={getPathCenter(state.pathD).x}
                    cy={getPathCenter(state.pathD).y}
                    r={12}
                    fill="hsl(var(--primary))"
                    className="pointer-events-none"
                    whileHover={{ scale: 1.2 }}
                    filter="url(#shadow)"
                  />
                  
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

      {/* Zoom controls */}
      <div className="absolute top-6 right-6 z-50 flex flex-col gap-2">
        <button
          aria-label="Zoom in"
          className="w-10 h-10 rounded-md bg-card/90 border border-border flex items-center justify-center text-sm font-bold shadow-md hover:bg-card"
          onClick={zoomIn}
        >
          +
        </button>
        <button
          aria-label="Zoom out"
          className="w-10 h-10 rounded-md bg-card/90 border border-border flex items-center justify-center text-sm font-bold shadow-md hover:bg-card"
          onClick={zoomOut}
        >
          -
        </button>
      </div>

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
                    Coming Soon
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
            <div className="w-5 h-5 rounded-md border-2 border-border shadow-sm" style={{ backgroundImage: "url(#emptyStatePattern)" }} />
            <span className="text-muted-foreground font-medium">Coming Soon</span>
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
