import React from "react";

/**
 * CinematicBackground
 *
 * Fixed full-screen atmospheric layer rendered once at AppShell level.
 * Charcoal architectural foundation (#1C1C1C) with subtle depth texture.
 */
export default function CinematicBackground() {
  return (
    <div aria-hidden="true" className="cinematic-bg">
      {/* ── Extremely subtle architectural grid ── */}
      <div className="cinematic-grid" />

      {/* ── Very fine SVG Film Grain Texture for digital depth ── */}
      <svg
        className="cinematic-grain"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
      >
        <filter id="cine-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.75"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#cine-grain)" opacity="0.015" />
      </svg>
    </div>
  );
}
