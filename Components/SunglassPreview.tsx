// components/SunglassPreview.tsx
'use client'

type Silhouette = {
  baseImagePath: string
  frameMaskPath: string
  lensMaskPath: string
  highlightImagePath?: string
}
type Material = { tintHex: string; finish: 'glossy' | 'matte' | 'metallic' }
type LensColor = { tintHex: string; opacity: number }
type Fit = { scaleFactor: number }

const FINISH_OPACITY: Record<Material['finish'], number> = {
  glossy: 0.85,
  matte: 0.6,
  metallic: 0.7,
}

export function SunglassPreview({
  silhouette,
  material,
  lensColor,
  fit,
}: {
  silhouette: Silhouette
  material: Material
  lensColor: LensColor
  fit: Fit
}) {
  return (
    <div
      className="relative aspect-square w-full max-w-md mx-auto transition-transform"
      style={{ transform: `scale(${fit.scaleFactor})` }}
    >
      <img
        src={silhouette.baseImagePath}
        alt=""
        className="absolute inset-0 h-full w-full object-contain"
      />

      {/* Material tint — masked to the frame only */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: material.tintHex,
          opacity: FINISH_OPACITY[material.finish],
          mixBlendMode: 'multiply',
          WebkitMaskImage: `url(${silhouette.frameMaskPath})`,
          maskImage: `url(${silhouette.frameMaskPath})`,
          WebkitMaskSize: 'contain',
          maskSize: 'contain',
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat',
        }}
      />

      {/* Lens tint — masked to the lens only */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: lensColor.tintHex,
          opacity: lensColor.opacity,
          mixBlendMode: 'multiply',
          WebkitMaskImage: `url(${silhouette.lensMaskPath})`,
          maskImage: `url(${silhouette.lensMaskPath})`,
          WebkitMaskSize: 'contain',
          maskSize: 'contain',
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat',
        }}
      />

      {silhouette.highlightImagePath && (
        <img
          src={silhouette.highlightImagePath}
          alt=""
          className="absolute inset-0 h-full w-full object-contain pointer-events-none"
          style={{ mixBlendMode: 'screen' }}
        />
      )}
    </div>
  )
}