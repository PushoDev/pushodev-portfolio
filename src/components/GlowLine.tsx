/**
 * Decorative neon line (horizontal or vertical) used as a section divider
 */
import React from "react";

type Orientation = "vertical" | "horizontal";
type ColorScheme = "purple" | "cyan" | "pink";

interface GlowLineProps {
  orientation: Orientation;
  position: string;
  color: ColorScheme;
  className?: string;
}

// Full class names so Tailwind can detect them at build time
const COLOR_SCHEMES: Record<ColorScheme, { line: string; glow: string }> = {
  purple: { line: "via-purple-400", glow: "via-purple-500" },
  cyan: { line: "via-cyan-400", glow: "via-cyan-500" },
  pink: { line: "via-pink-400", glow: "via-pink-500" },
};

const GlowLine: React.FC<GlowLineProps> = ({ orientation, position, color, className = "" }) => {
  const isVertical = orientation === "vertical";
  const container = isVertical ? "absolute w-px h-full" : "absolute w-full h-px";
  const positionStyle: React.CSSProperties = isVertical ? { left: position } : { top: position };
  const gradient = isVertical ? "bg-gradient-to-b" : "bg-gradient-to-r";
  const { line, glow } = COLOR_SCHEMES[color];

  const glowLayers = [
    { size: isVertical ? "w-1 -ml-0.5" : "h-1 -mt-0.5", effect: "blur-sm", tone: line },
    { size: isVertical ? "w-2 -ml-1" : "h-2 -mt-1", effect: "blur-md opacity-80", tone: glow },
    { size: isVertical ? "w-4 -ml-2" : "h-4 -mt-2", effect: "blur-lg opacity-60", tone: line },
  ];

  return (
    <div aria-hidden="true" className={`${container} pointer-events-none ${className}`} style={positionStyle}>
      <div className={`absolute inset-0 ${gradient} from-transparent ${line} to-transparent`} />
      {/* White core only reads on dark backgrounds */}
      <div
        className={`absolute inset-0 ${isVertical ? "w-0.5 -ml-px" : "h-0.5 -mt-px"} ${gradient} from-transparent via-white to-transparent opacity-0 dark:opacity-60`}
      />
      {glowLayers.map((layer, index) => (
        <div
          key={index}
          className={`absolute inset-0 ${layer.size} ${gradient} from-transparent ${layer.tone} to-transparent ${layer.effect}`}
        />
      ))}
    </div>
  );
};

export default GlowLine;
