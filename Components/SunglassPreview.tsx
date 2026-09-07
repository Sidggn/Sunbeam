// Components/SunglassPreview.tsx
import React from 'react';

interface SunglassPreviewProps {
  frameColor: string; // e.g., hex or rgb for the frame
  lensTint: string;   // e.g., rgba(20, 60, 90, 0.6)
  modelName: string;
  size: string;
  material: string;
}

export default function SunglassPreview({
  frameColor,
  lensTint,
  modelName,
  size,
  material,
}: SunglassPreviewProps) {
  return (
    <div className="relative w-full max-w-md mx-auto bg-gray-100 rounded-xl overflow-hidden shadow-lg border border-gray-200">
      {/* Header Label */}
      <div className="p-4 bg-gray-50 border-b border-gray-200">
        <span className="text-xs font-mono tracking-wider text-gray-500 uppercase">
          Live Preview
        </span>
      </div>

      {/* Main Preview Stage */}
      <div className="relative h-72 flex items-center justify-center bg-gradient-to-b from-white to-gray-100 p-6">
        
        {/* Soft Drop Shadow under the entire frame to lift it off the background */}
        <div className="relative w-full max-w-[280px] h-[140px] filter drop-shadow-[0_12px_16px_rgba(0,0,0,0.12)]">

          {/* LAYER 1: Frame Base (Dynamic Color via CSS custom property or inline style) */}
          <div 
            className="absolute inset-0 z-30 pointer-events-none transition-colors duration-300"
            style={{
              // If using a mask or SVG background, or a tinted frame container:
              filter: `drop-shadow(inset 0 2px 4px rgba(0,0,0,0.3))`
            }}
          >
            {/* Insert your Frame SVG or Frame Image with transparent sockets here */}
            <svg viewBox="0 0 300 120" className="w-full h-full">
              {/* Example Frame Path styled with user's frameColor */}
              <path
                d="M15,40 C15,20 40,15 70,15 L130,20 C140,22 145,28 150,35 C155,28 160,22 170,20 L230,15 C260,15 285,20 285,40 L285,85 C285,105 265,110 230,105 L170,95 C160,93 155,88 150,80 C145,88 140,93 130,95 L70,105 C40,110 15,105 15,85 Z"
                fill={frameColor}
                stroke="#111"
                strokeWidth="4"
              />
              {/* Bridge */}
              <rect x="138" y="45" width="24" height="10" rx="4" fill="#111" />
            </svg>
          </div>

          {/* LAYER 2: Translucent Lenses with Inner Groove Shadow & Multiply Blend Mode */}
          <div 
            className="absolute inset-0 z-20 pointer-events-none overflow-hidden rounded-[30px]"
            style={{ backgroundColor: lensTint, mixBlendMode: 'multiply' }}
          />

          {/* LAYER 3: Glossy Reflection Map with Screen Blend Mode */}
          <div 
            className="absolute inset-0 z-40 pointer-events-none opacity-70"
            style={{ mixBlendMode: 'screen' }}
          >
            <svg viewBox="0 0 300 120" className="w-full h-full">
              {/* Dynamic light sheen streaks across glass curvature */}
              <path
                d="M25,30 Q50,15 90,35 L60,80 Q30,60 25,30 Z"
                fill="url(#sheen-gradient)"
              />
              <path
                d="M185,30 Q210,15 250,35 L220,80 Q190,60 185,30 Z"
                fill="url(#sheen-gradient)"
              />
              <defs>
                <linearGradient id="sheen-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>

        </div>
      </div>

      {/* Footer Info */}
      <div className="p-4 bg-white border-t border-gray-200 flex justify-between items-center text-sm">
        <div>
          <span className="font-bold text-gray-900 block">{modelName}</span>
          <span className="text-xs text-gray-500">{material}</span>
        </div>
        <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded text-gray-600">
          {size}
        </span>
      </div>
    </div>
  );
}