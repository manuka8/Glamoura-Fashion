'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const LETTERS = "GLAMOURA".split("");

const shimmerStyle: React.CSSProperties = {
  background: `linear-gradient(135deg, #ff6b9d 0%, #ff3b6f 15%, #ffd700 30%, #ff69b4 45%, #00e5ff 60%, #ffd700 75%, #ff6b9d 100%)`,
  backgroundSize: '300% auto',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
  animation: 'shimmerText 2.5s linear infinite',
};

export function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden"
        >
          {/* Ambient glow layers */}
          <motion.div
            animate={{ scale: [1, 1.4, 1], opacity: [0.08, 0.18, 0.08] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-[60vw] h-[60vw] max-w-[500px] max-h-[500px] rounded-full bg-pink-500 blur-[80px] pointer-events-none"
          />
          <motion.div
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.05, 0.12, 0.05] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute w-[50vw] h-[50vw] max-w-[400px] max-h-[400px] rounded-full bg-cyan-500 blur-[100px] pointer-events-none translate-x-1/4 translate-y-1/4"
          />

          {/* Main content */}
          <div className="relative z-10 flex flex-col items-center px-4 w-full">
            {/* Brand letters */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.34, 1.2, 0.64, 1] }}
              className="flex items-center justify-center gap-[0.15em] sm:gap-[0.2em] md:gap-[0.25em]"
            >
              {LETTERS.map((letter, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 60, rotateY: 90, scale: 0.4 }}
                  animate={{ opacity: 1, y: 0, rotateY: 0, scale: 1 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.25 + index * 0.08,
                    type: "spring",
                    stiffness: 220,
                    damping: 16,
                  }}
                  style={shimmerStyle}
                  className="text-[2.2rem] xs:text-[2.6rem] sm:text-5xl md:text-7xl lg:text-8xl font-serif font-black drop-shadow-2xl cursor-default inline-block leading-none"
                >
                  {letter}
                </motion.span>
              ))}
            </motion.div>

            {/* Glowing underline */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 1.2, delay: 1.4, ease: "easeInOut" }}
              className="relative h-[2px] w-full max-w-[280px] sm:max-w-[380px] md:max-w-[520px] bg-gradient-to-r from-transparent via-pink-500 to-transparent mt-4 rounded-full overflow-hidden"
            >
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 1.8, delay: 1.8, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
              />
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.2, duration: 0.8 }}
              className="mt-5 text-white/70 text-[9px] xs:text-[10px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.4em] font-medium text-center"
            >
              Modern Luxury Fashion
            </motion.p>

            {/* Loading dots */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.8 }}
              className="flex items-center gap-2 mt-8"
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{ scale: [1, 1.6, 1], opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                  className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-pink-400 to-rose-500"
                />
              ))}
            </motion.div>
          </div>

          {/* Floating sparkles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(8)].map((_, i) => {
              const positions = [
                { left: '15%', top: '20%' }, { left: '80%', top: '15%' },
                { left: '70%', top: '75%' }, { left: '10%', top: '70%' },
                { left: '50%', top: '10%' }, { left: '90%', top: '50%' },
                { left: '25%', top: '85%' }, { left: '60%', top: '40%' },
              ];
              return (
                <motion.div
                  key={i}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: [0, 1.2, 0], opacity: [0, 0.9, 0] }}
                  transition={{
                    duration: 2.5,
                    delay: 1 + i * 0.35,
                    repeat: Infinity,
                    repeatDelay: 1 + i * 0.2,
                  }}
                  className="absolute w-1 h-1 bg-gradient-to-r from-pink-400 to-yellow-300 rounded-full"
                  style={{
                    ...positions[i],
                    boxShadow: '0 0 8px rgba(255,105,180,0.9)',
                  }}
                />
              );
            })}
          </div>

          {/* Inline keyframes */}
          <style>{`
            @keyframes shimmerText {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
