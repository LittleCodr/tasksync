import React from 'react';
import { motion } from 'framer-motion';

export const Background: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
      
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute inset-0"
          initial={{
            backgroundImage: `radial-gradient(circle at ${50 + i * 20}% ${30 + i * 20}%, rgba(59, 130, 246, 0.1) 0%, transparent 60%)`,
            opacity: 0
          }}
          animate={{
            backgroundImage: `radial-gradient(circle at ${50 + i * 20}% ${30 + i * 20}%, rgba(59, 130, 246, 0.1) 0%, transparent 60%)`,
            opacity: 1
          }}
          transition={{ duration: 1, delay: i * 0.2 }}
        />
      ))}

      <motion.div
        className="absolute bottom-0 left-0 right-0 h-64"
        style={{
          background: 'linear-gradient(to top, rgba(59, 130, 246, 0.05), transparent)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      />
    </div>
  );
};