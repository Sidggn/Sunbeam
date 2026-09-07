// components/Customizer.tsx
'use client'

import { useState } from 'react'
import { SunglassPreview } from '@/components/SunglassPreview'
import type { Silhouette, Material, LensColor, Fit } from '@/lib/getCustomizerOptions'

export function Customizer({
  silhouettes,
  materials,
  lensColors,
  fits,
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

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <SunglassPreview
        silhouette={{
          baseImagePath: silhouette.baseImageUrl,
          frameMaskPath: silhouette.frameMaskUrl,
          lensMaskPath: silhouette.lensMaskUrl,
          highlightImagePath: silhouette.highlightImageUrl ?? undefined,
        }}
        material={{ tintHex: material.tint_hex, finish: material.finish }}
        lensColor={{ tintHex: lensColor.tint_hex, opacity: lensColor.opacity }}
        fit={{ scaleFactor: fit.scale_factor }}
      />

      <div className="space-y-6">
        <div>
          <p className="font-medium mb-2">Silhouette</p>
          <div className="flex flex-wrap gap-2">
            {silhouettes.map((s) => (
              <button
                key={s.id}
                onClick={() => setSilhouette(s)}
                className={`px-3 py-2 border rounded ${
                  s.id === silhouette.id ? 'border-black' : 'border-gray-300'
                }`}
              >
                {s.name}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="font-medium mb-2">Material</p>
          <div className="flex flex-wrap gap-2">
            {materials.map((m) => (
              <button
                key={m.id}
                onClick={() => setMaterial(m)}
                className={`px-3 py-2 border rounded ${
                  m.id === material.id ? 'border-black' : 'border-gray-300'
                }`}
              >
                {m.name}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="font-medium mb-2">Lens color</p>
          <div className="flex flex-wrap gap-2">
            {lensColors.map((l) => (
              <button
                key={l.id}
                onClick={() => setLensColor(l)}
                className={`px-3 py-2 border rounded ${
                  l.id === lensColor.id ? 'border-black' : 'border-gray-300'
                }`}
              >
                {l.name}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="font-medium mb-2">Fit</p>
          <div className="flex flex-wrap gap-2">
            {fits.map((f) => (
              <button
                key={f.id}
                onClick={() => setFit(f)}
                className={`px-3 py-2 border rounded ${
                  f.id === fit.id ? 'border-black' : 'border-gray-300'
                }`}
              >
                {f.name} ({f.size_mm}mm)
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}