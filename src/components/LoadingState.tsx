import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Activity } from 'lucide-react';

const LOADING_STEPS = [
  "Analyzing genetic markers...",
  "Cross-referencing breed databases...",
  "Calculating historical vet costs...",
  "Finalizing risk assessment..."
];

export function LoadingState() {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStepIndex((prev) => (prev < LOADING_STEPS.length - 1 ? prev + 1 : prev));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto py-24 flex flex-col items-center justify-center min-h-[400px]">
      <motion.div 
        className="relative w-16 h-16 mb-8 flex items-center justify-center"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute inset-0 rounded-full border-4 border-fetch-pink/20"></div>
        <motion.div 
          className="absolute inset-0 rounded-full border-4 border-fetch-pink border-t-transparent"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        ></motion.div>
        <Activity className="w-6 h-6 text-fetch-pink absolute" />
      </motion.div>

      <div className="h-8 relative w-full flex justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.p
            key={stepIndex}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg font-medium text-gray-600 absolute text-center"
          >
            {LOADING_STEPS[stepIndex]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
