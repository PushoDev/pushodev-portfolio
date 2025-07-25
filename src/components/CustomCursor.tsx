/**
 * Custom cursor component with trailing effect and interactive animations
 */
import React, { useEffect, useRef } from 'react';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const trail = trailRef.current;
    
    if (!cursor || !trail) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      
      // Main cursor
      cursor.style.left = `${clientX}px`;
      cursor.style.top = `${clientY}px`;
      
      // Trailing cursor with delay
      setTimeout(() => {
        trail.style.left = `${clientX}px`;
        trail.style.top = `${clientY}px`;
      }, 100);
    };

    const handleMouseEnter = () => {
      cursor?.classList.add('scale-150', 'bg-cyan-400/50');
      trail?.classList.add('scale-125');
    };

    const handleMouseLeave = () => {
      cursor?.classList.remove('scale-150', 'bg-cyan-400/50');
      trail?.classList.remove('scale-125');
    };

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    
    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [data-cursor-hover]');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      {/* Main cursor */}
      <div
        ref={cursorRef}
        className="fixed w-4 h-4 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full pointer-events-none z-[9999] mix-blend-difference transition-all duration-150 ease-out"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
      
      {/* Trailing cursor */}
      <div
        ref={trailRef}
        className="fixed w-8 h-8 border-2 border-cyan-400/30 rounded-full pointer-events-none z-[9998] transition-all duration-300 ease-out"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
    </>
  );
};

export default CustomCursor;
