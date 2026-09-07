// components/Customizer.tsx
'use client'

import { useState } from 'react'
import { SunglassPreview } from './SunglassPreview'
import type { Silhouette, Material, LensColor, Fit } from '../lib/getCustomizerOptions'

export function Customizer({
  silhouettes = [],
  materials = [],
  lensColors = [],
  fits = [],
}: {
  silhouettes: Silhouette[]
  materials: Material[]
  lensColors: LensColor[]
  fits: Fit[]
}) {
  const [silhouette, setSilhouette] = useState(silhouettes[0])
  const [material, setMaterial] = useState(materials[0])
  const [lensColor, setLensColor] = useState(lensColors[0])
  const [fit, setFit] = useState(fits[0])

  if (!silhouettes?.length || !materials?.length || !lensColors?.length || !fits?.length) {
    return <div className="p-4 text-sm text-gray-500">Loading customizer options...</div>
  }

  return (
    <div className="grid gap-8 lg:grid-cols-12 items-start">
      {/* Left Column: Sticky Preview on Desktop, Top Card on Mobile */}
      <div className="lg:col-span-6 lg:sticky lg:top-8">
        <SunglassPreview
          silhouette={{
            baseImagePath: silhouette?.baseImageUrl || silhouette?.base_image_url || '',
            frameMaskPath: silhouette?.frameMaskUrl || silhouette?.frame_mask_url || '',
            lensMaskPath: silhouette?.lensMaskUrl || silhouette?.lens_mask_url || '',
            highlightImagePath: silhouette?.highlightImageUrl || silhouette?.highlight_image_url || undefined,
          }}
          material={{ 
            tintHex: material?.tint_hex || material?.tintHex || '#000000', 
            finish: material?.finish || 'matte' 
          }}
          lensColor={{ 
            tintHex: lensColor?.tint_hex || lensColor?.tintHex || '#333333', 
            opacity: lensColor?.opacity ?? 0.8 
          }}
          fit={{ 
            scaleFactor: fit?.scale_factor || fit?.scaleFactor || 1 
          }}
        />
      </div>

      {/* Right Column: Configuration Options */}
      <div className="lg:col-span-6 space-y-6">
        <div>
          <p className="font-medium mb-2 text-sm tracking-wide text-gray-700">FRAME COLOR</p>
          <div className="grid grid-cols-2 gap-3">
            {silhouettes.map((s) => (
              <button
                key={s.id}
                onClick={() => setSilhouette(s)}
                className={`p-3 border rounded-xl text-left transition-all ${
                  s.id === silhouette?.id ? 'border-black ring-1 ring-black bg-gray-50 font-medium' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {s.name}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="font-medium mb-2 text-sm tracking-wide text-gray-700">MATERIAL</p>
          <div className="grid grid-cols-2 gap-3">
            {materials.map((m) => (
              <button
                key={m.id}
                onClick={() => setMaterial(m)}
                className={`p-3 border rounded-xl text-left transition-all ${
                  m.id === material?.id ? 'border-black ring-1 ring-black bg-gray-50 font-medium' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {m.name}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="font-medium mb-2 text-sm tracking-wide text-gray-700">LENS TINT</p>
          <div className="grid grid-cols-2 gap-3">
            {lensColors.map((l) => (
              <button
                key={l.id}
                onClick={() => setLensColor(l)}
                className={`p-3 border rounded-xl text-left transition-all ${
                  l.id === lensColor?.id ? 'border-black ring-1 ring-black bg-gray-50 font-medium' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {l.name}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="font-medium mb-2 text-sm tracking-wide text-gray-700">FIT</p>
          <div className="grid grid-cols-2 gap-3">
            {fits.map((f) => (
              <button
                key={f.id}
                onClick={() => setFit(f)}
                className={`p-3 border rounded-xl text-left transition-all ${
                  f.id === fit?.id ? 'border-black ring-1 ring-black bg-gray-50 font-medium' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-medium">{f.name}</div>
                {f.size_mm || f.sizeMm ? <div className="text-xs text-gray-500 mt-0.5">{f.size_mm || f.sizeMm} mm</div> : null}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}