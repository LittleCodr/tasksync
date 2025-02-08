import React from 'react';
import { motion } from 'framer-motion';

export const AnimatedCharacter: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed bottom-24 left-6 w-32 h-32 cursor-pointer"
      whileHover={{ scale: 1.1 }}
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.2}
    >
      <div className="relative w-full h-full">
        {/* Character Body */}
        <motion.div
          className="absolute inset-0 bg-blue-500 rounded-full"
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Eyes */}
        <div className="absolute top-1/3 left-1/4 w-4 h-4 bg-white rounded-full" />
        <div className="absolute top-1/3 right-1/4 w-4 h-4 bg-white rounded-full" />
        
        {/* Smile */}
        <motion.div
          className="absolute bottom-1/3 left-1/2 w-8 h-4 border-b-4 border-white rounded-full"
          style={{ transform: 'translateX(-50%)' }}
          animate={{
            scaleX: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Speech Bubble */}
        <motion.div
          className="absolute -top-16 -right-32 bg-white px-4 py-2 rounded-lg shadow-lg"
          initial={{ opacity: 0, scale: 0 }}
          whileHover={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-sm text-gray-600">Drag me around! 😊</p>
          <div className="absolute -left-2 bottom-2 w-4 h-4 bg-white transform rotate-45" />
        </motion.div>
      </div>
    </motion.div>
  );
};