
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { indianStates, getSellersByState } from "@/lib/static-data";
import type { StateData } from "@shared/schema";
import { cn } from "@/lib/utils";

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

  // Circular bubble positions for states (x, y, radius)
  const statePositions: Record<string, { x: number; y: number; r: number }> = {
    // North
    "JK": { x: 300, y: 80, r: 45 },
    "HP": { x: 360, y: 120, r: 35 },
    "PB": { x: 300, y: 150, r: 38 },
    "CH": { x: 330, y: 170, r: 18 },
    "HR": { x: 350, y: 200, r: 35 },
    "DL": { x: 380, y: 180, r: 20 },
    "UK": { x: 420, y: 150, r: 32 },
    "UP": { x: 450, y: 200, r: 70 },
    
    // West
    "RJ": { x: 280, y: 250, r: 75 },
    "GJ": { x: 200, y: 320, r: 65 },
    "DD": { x: 240, y: 380, r: 15 },
    "DH": { x: 180, y: 370, r: 15 },
    
    // Central
    "MP": { x: 380, y: 320, r: 70 },
    "CG": { x: 480, y: 370, r: 50 },
    
    // East
    "BR": { x: 550, y: 250, r: 45 },
    "JH": { x: 550, y: 320, r: 45 },
    "WB": { x: 600, y: 350, r: 50 },
    "OR": { x: 520, y: 420, r: 50 },
    
    // Northeast
    "SK": { x: 640, y: 280, r: 20 },
    "AS": { x: 680, y: 310, r: 45 },
    "ML": { x: 650, y: 350, r: 22 },
    "AR": { x: 720, y: 260, r: 38 },
    "NL": { x: 710, y: 320, r: 20 },
    "MN": { x: 700, y: 355, r: 20 },
    "MZ": { x: 680, y: 385, r: 20 },
    "TR": { x: 640, y: 385, r: 20 },
    
    // West Coast & South
    "MH": { x: 350, y: 420, r: 70 },
    "GA": { x: 300, y: 480, r: 25 },
    "KA": { x: 350, y: 520, r: 60 },
    "TN": { x: 420, y: 580, r: 60 },
    "PY": { x: 460, y: 560, r: 15 },
    "KL": { x: 320, y: 580, r: 50 },
    "AP": { x: 480, y: 480, r: 60 },
    "TS": { x: 440, y: 420, r: 45 },
    
    // Islands
    "AN": { x: 720, y: 580, r: 18 },
    "LD": { x: 180, y: 560, r: 18 },
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <motion.svg
        viewBox="0 0 800 700"
        className="w-full h-full max-w-6xl max-h-[85vh] drop-shadow-2xl"
        onMouseMove={handleMouseMove}
        role="img"
        aria-label="Interactive circular map of India showing jewelry sellers by state"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <defs>
          {/* Background gradient */}
          <radialGradient id="circleBg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1e293b"/>
            <stop offset="50%" stopColor="#1a1f2e"/>
            <stop offset="100%" stopColor="#0f172a"/>
          </radialGradient>

          {/* Active state gradient */}
          <radialGradient id="activeGradient" cx="50%" cy="50%">
            <stop offset="0%" stopColor="#f59e0b"/>
            <stop offset="100%" stopColor="#d97706"/>
          </radialGradient>

          {/* Hover gradient */}
          <radialGradient id="hoverGradient" cx="50%" cy="50%">
            <stop offset="0%" stopColor="#fbbf24"/>
            <stop offset="100%" stopColor="#f59e0b"/>
          </radialGradient>

          {/* Filters */}
          <filter id="bubbleGlow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          <filter id="activeBubbleGlow">
            <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Main circular background */}
        <circle cx="400" cy="350" r="330" fill="url(#circleBg)" opacity="0.95"/>
        
        {/* Decorative outer ring */}
        <circle cx="400" cy="350" r="330" fill="none" stroke="#334155" strokeWidth="2" opacity="0.4"/>
        <circle cx="400" cy="350" r="310" fill="none" stroke="#475569" strokeWidth="1" opacity="0.2"/>

        {/* State bubbles */}
        {indianStates.map((state, index) => {
          const position = statePositions[state.id] || { x: 400, y: 350, r: 30 };
          const isHovered = hoveredState?.id === state.id;
          const isSelected = selectedState?.id === state.id;
          const sellers = getSellersByState(state.id);
          const hasSellers = sellers.length > 0;

          return (
            <g key={state.id}>
              {/* State bubble */}
              <motion.circle
                cx={position.x}
                cy={position.y}
                r={position.r}
                className={cn(hasSellers ? "cursor-pointer" : "cursor-not-allowed")}
                fill={
                  isSelected
                    ? "url(#activeGradient)"
                    : isHovered && hasSellers
                    ? "url(#hoverGradient)"
                    : hasSellers
                    ? "#e2e8f0"
                    : "#334155"
                }
                stroke={
                  isSelected 
                    ? "#f59e0b" 
                    : isHovered && hasSellers
                    ? "#fbbf24"
                    : hasSellers
                    ? "#cbd5e1"
                    : "#475569"
                }
                strokeWidth={isSelected ? 3 : isHovered ? 2.5 : 2}
                filter={isSelected ? "url(#activeBubbleGlow)" : isHovered ? "url(#bubbleGlow)" : ""}
                onClick={() => hasSellers && onStateSelect(isSelected ? null : state)}
                onMouseEnter={() => setHoveredState(state)}
                onMouseLeave={() => setHoveredState(null)}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.015,
                  type: "spring",
                  stiffness: 200
                }}
                whileHover={hasSellers ? { scale: 1.05 } : {}}
                whileTap={hasSellers ? { scale: 0.95 } : {}}
                role="button"
                aria-label={`${state.name}: ${hasSellers ? state.sellerCount + ' sellers' : 'Coming soon'}`}
              />

              {/* State label */}
              <motion.text
                x={position.x}
                y={position.y - (hasSellers && state.sellerCount > 0 ? 8 : 0)}
                textAnchor="middle"
                dominantBaseline="central"
                className={cn(
                  "font-semibold pointer-events-none select-none",
                  hasSellers 
                    ? "text-[11px] fill-gray-800" 
                    : "text-[9px] fill-gray-400"
                )}
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered || isSelected ? 1 : 0.85 }}
                transition={{ delay: 0.3 + index * 0.01 }}
              >
                {state.name}
              </motion.text>

              {/* Coming soon label */}
              {!hasSellers && (
                <motion.text
                  x={position.x}
                  y={position.y + 8}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className="text-[7px] italic fill-gray-500 pointer-events-none select-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isHovered ? 0.9 : 0.6 }}
                >
                  Coming Soon
                </motion.text>
              )}

              {/* Seller count badge */}
              {hasSellers && state.sellerCount > 0 && (
                <motion.g
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.4 + index * 0.015, type: "spring", stiffness: 300 }}
                >
                  {/* Pulse effect */}
                  {(isHovered || isSelected) && (
                    <motion.circle
                      cx={position.x}
                      cy={position.y + 8}
                      r={10}
                      fill="#f59e0b"
                      opacity="0.3"
                      animate={{
                        r: [10, 14, 10],
                        opacity: [0.3, 0.1, 0.3],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  )}

                  {/* Badge circle */}
                  <circle
                    cx={position.x}
                    cy={position.y + 8}
                    r={10}
                    fill="url(#activeGradient)"
                    filter="url(#bubbleGlow)"
                  />

                  {/* Count text */}
                  <text
                    x={position.x}
                    y={position.y + 8}
                    textAnchor="middle"
                    dominantBaseline="central"
                    className="text-[10px] font-bold fill-white pointer-events-none select-none"
                  >
                    {sellers.length}
                  </text>
                </motion.g>
              )}
            </g>
          );
        })}
      </motion.svg>

      {/* Tooltip */}
      <AnimatePresence>
        {hoveredState && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ duration: 0.15 }}
            className="fixed z-50 pointer-events-none"
            style={{
              left: tooltipPosition.x + 20,
              top: tooltipPosition.y + 20,
            }}
          >
            <div className="bg-popover/98 backdrop-blur-md border-2 border-primary/40 rounded-xl shadow-2xl px-5 py-3">
              <p className="font-serif font-bold text-lg text-primary mb-1">
                {hoveredState.name}
              </p>
              {getSellersByState(hoveredState.id).length > 0 ? (
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse"/>
                  <p className="text-sm text-muted-foreground font-medium">
                    {getSellersByState(hoveredState.id).length} Jewelry Sellers
                  </p>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-muted-foreground/50"/>
                  <p className="text-sm text-muted-foreground/70 font-medium italic">
                    Coming Soon
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Legend */}
      <motion.div 
        className="absolute bottom-6 right-6 bg-card/98 backdrop-blur-md border-2 border-primary/30 rounded-xl p-5 max-w-xs shadow-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <h3 className="font-serif text-lg font-bold mb-3 text-primary">Map Legend</h3>
        <div className="flex flex-col gap-3 text-sm">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full" style={{ background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)" }}/>
            <span className="text-foreground font-medium">Active/Selected</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#e2e8f0] border-2 border-slate-300"/>
            <span className="text-foreground font-medium">With Sellers</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#334155] border-2 border-slate-600"/>
            <span className="text-muted-foreground font-medium">Coming Soon</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#f59e0b] to-[#d97706] flex items-center justify-center text-[10px] text-white font-bold shadow-md">
              5
            </div>
            <span className="text-foreground font-medium">Seller Count</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
