import React, { useEffect, useRef } from 'react';

interface OrbitImagesProps {
  images: string[];
  radiusX?: number;
  radiusY?: number;
  rotation?: number;
  duration?: number;
  itemSize?: number;
  className?: string;
}

const OrbitImages: React.FC<OrbitImagesProps> = ({
  images,
  radiusX = 370,
  radiusY = 72,
  rotation = -6,
  duration = 26,
  itemSize = 52,
  className = '',
}) => {
  const itemsRef = useRef<HTMLDivElement[]>([]);
  const angleRef = useRef(0);
  const rafRef = useRef<number>(0);
  const count = images.length;

  useEffect(() => {
    // radians per frame assuming ~60fps
    const speed = (2 * Math.PI) / (duration * 60);

    const animate = () => {
      angleRef.current += speed;
      for (let i = 0; i < itemsRef.current.length; i++) {
        const el = itemsRef.current[i];
        if (!el) continue;
        const a = angleRef.current + (i / count) * Math.PI * 2;
        const x = Math.cos(a) * radiusX;
        const y = Math.sin(a) * radiusY;
        el.style.transform = `translate(${x}px, ${y}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [count, radiusX, radiusY, duration]);

  const containerHeight = radiusY * 2 + itemSize + 24;

  return (
    <div
      className={`relative flex items-center justify-center ${className}`}
      style={{ height: containerHeight, transform: `rotate(${rotation}deg)` }}
    >
      {/* orbit track ellipse — purely decorative */}
      <div
        style={{
          position: 'absolute',
          width: radiusX * 2,
          height: radiusY * 2,
          borderRadius: '50%',
          border: '1px solid rgba(168, 85, 247, 0.15)',
          pointerEvents: 'none',
        }}
      />

      {/* center anchor — items are positioned relative to this 0×0 div */}
      <div style={{ position: 'relative', width: 0, height: 0 }}>
        {images.map((src, i) => (
          <div
            key={i}
            ref={(el) => { if (el) itemsRef.current[i] = el; }}
            style={{
              position: 'absolute',
              width: itemSize,
              height: itemSize,
              top: -itemSize / 2,
              left: -itemSize / 2,
            }}
          >
            <img
              src={src}
              alt=""
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                // counter-rotate images so they stay upright despite the container rotation
                transform: `rotate(${-rotation}deg)`,
                filter: 'drop-shadow(0 0 6px rgba(168, 85, 247, 0.4))',
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrbitImages;
