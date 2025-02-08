import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleClick = (e: MouseEvent) => {
      setClicked(true);
      setTimeout(() => setClicked(false), 150);

      // Add ripple effect
      const newRipple = {
        x: e.clientX,
        y: e.clientY,
        id: Date.now(),
      };
      setRipples((prev) => [...prev, newRipple]);

      // Remove ripple after animation
      setTimeout(() => {
        setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id));
      }, 1000);
    };

    document.addEventListener('mousemove', updatePosition);
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <>
      <motion.div
        className={`custom-cursor ${clicked ? 'clicked' : ''}`}
        animate={{
          x: position.x - 10,
          y: position.y - 10,
          scale: clicked ? 0.8 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 28,
        }}
      />
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="ripple"
          style={{
            left: ripple.x,
            top: ripple.y,
          }}
        />
      ))}
    </>
  );
};