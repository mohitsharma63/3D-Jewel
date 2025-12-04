
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export function Jewelry3DModel() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.2 }}
      className="relative w-full h-[500px] rounded-2xl overflow-hidden"
      style={{
        background: "linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, rgba(194, 127, 36, 0.1) 100%)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
      }}
    >
      {/* Glass-morphism overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
      
      {/* Animated Jewelry Display */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="relative"
          animate={{
            rotateY: [0, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Main Ring */}
          <motion.div
            className="relative w-64 h-64"
            animate={{
              y: [0, -20, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {/* Ring Circle */}
            <div className="absolute inset-0 rounded-full border-8 border-yellow-500/80 shadow-2xl"
              style={{
                background: "radial-gradient(circle, rgba(255,215,0,0.3) 0%, rgba(194,127,36,0.1) 100%)",
              }}
            />
            
            {/* Center Diamond */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400/60 via-blue-200/40 to-blue-300/60 rotate-45 shadow-xl"
                style={{
                  clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                }}
              />
              <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-blue-300" />
            </motion.div>
            
            {/* Accent Gems around ring */}
            {[0, 60, 120, 180, 240, 300].map((angle, i) => {
              const radian = (angle * Math.PI) / 180;
              const x = Math.cos(radian) * 110;
              const y = Math.sin(radian) * 110;
              
              return (
                <motion.div
                  key={i}
                  className="absolute w-4 h-4 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 shadow-lg"
                  style={{
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                    transform: "translate(-50%, -50%)",
                  }}
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut"
                  }}
                />
              );
            })}
          </motion.div>
        </motion.div>
      </div>

      {/* Sparkle Effects */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-yellow-300 rounded-full"
          style={{
            left: `${20 + Math.random() * 60}%`,
            top: `${20 + Math.random() * 60}%`,
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 0.3,
          }}
        />
      ))}

      {/* Floating text overlay */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-8 left-8 right-8 text-center"
      >
        <div className="inline-block px-6 py-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30">
          <p className="text-sm font-medium text-foreground flex items-center gap-2 justify-center">
            <Sparkles className="w-4 h-4" />
            Handcrafted Jewelry Designs
            <Sparkles className="w-4 h-4" />
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
