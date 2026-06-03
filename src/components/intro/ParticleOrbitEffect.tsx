import { useEffect, useRef } from 'react';

interface Particle {
  angle: number;
  speed: number;
  radius: number;
  size: number;
  hue: number;
  opacity: number;
  life: number;
  maxLife: number;
}

interface ParticleOrbitEffectProps {
  particleCount?: number;
  radius?: number;
  colorRange?: [number, number];
  particleSpeed?: number;
  intensity?: number;
  fadeOpacity?: number;
  particleSize?: number;
}

const ParticleOrbitEffect: React.FC<ParticleOrbitEffectProps> = ({
  particleCount = 18,
  radius = 58,
  colorRange = [220, 310],
  particleSpeed = 0.022,
  intensity = 0.85,
  fadeOpacity = 0.04,
  particleSize = 2.5,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);

    const particles: Particle[] = Array.from({ length: particleCount }, (_, i) => ({
      angle: (i / particleCount) * Math.PI * 2,
      speed: particleSpeed * (0.7 + Math.random() * 0.6),
      radius: radius * (0.6 + Math.random() * 0.8),
      size: particleSize * (0.5 + Math.random() * 1.0),
      hue: colorRange[0] + Math.random() * (colorRange[1] - colorRange[0]),
      opacity: 0.4 + Math.random() * 0.6,
      life: Math.random() * 100,
      maxLife: 60 + Math.random() * 80,
    }));

    const animate = () => {
      // Clear completely each frame so the canvas stays transparent
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Optional soft glow trail: fade previous frame using destination-out
      // (erases old pixels without adding opaque bg)
      if (fadeOpacity > 0) {
        ctx.save();
        ctx.globalCompositeOperation = 'destination-out';
        ctx.fillStyle = `rgba(0, 0, 0, ${fadeOpacity * 0.5})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.restore();
      }

      const { x: mx, y: my } = mouseRef.current;

      for (const p of particles) {
        p.angle += p.speed;
        p.life += 1;
        if (p.life > p.maxLife) {
          p.life = 0;
          p.hue = colorRange[0] + Math.random() * (colorRange[1] - colorRange[0]);
        }

        const lifeFrac = p.life / p.maxLife;
        const alpha = Math.sin(lifeFrac * Math.PI) * p.opacity * intensity;

        const px = mx + Math.cos(p.angle) * p.radius;
        const py = my + Math.sin(p.angle) * p.radius;

        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 90%, 65%, ${alpha})`;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [particleCount, radius, colorRange, particleSpeed, intensity, fadeOpacity, particleSize]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 99998,
      }}
    />
  );
};

export default ParticleOrbitEffect;
