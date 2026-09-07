// lib/getCustomizerOptions.ts
import { supabase } from '@/lib/supabase'

export type Silhouette = {
  id: string
  name: string
  description: string | null
  baseImageUrl: string
  frameMaskUrl: string
  lensMaskUrl: string
  highlightImageUrl: string | null
}

export type Material = {
  id: string
  name: string
  description: string | null
  tint_hex: string
  finish: 'glossy' | 'matte' | 'metallic'
}

export type LensColor = { id: string; name: string; tint_hex: string; opacity: number }
export type Fit = { id: string; name: string; size_mm: number; scale_factor: number }

function publicUrl(path: string) {
  return supabase.storage.from('sunglasses-images').getPublicUrl(path).data.publicUrl
}

export async function getCustomizerOptions() {
  const [silRes, matRes, lensRes, fitRes] = await Promise.all([
    supabase.from('silhouettes').select('*').order('display_order'),
    supabase.from('materials').select('*').order('display_order'),
    supabase.from('lens_colors').select('*').order('display_order'),
    supabase.from('fits').select('*').order('display_order'),
  ])

  for (const res of [silRes, matRes, lensRes, fitRes]) {
    if (res.error) throw res.error
  }

  const silhouettes: Silhouette[] = silRes.data!.map((row) => ({
    id: row.id,
    name: row.name,
    description: row.description,
    baseImageUrl: publicUrl(row.base_image_path),
    frameMaskUrl: publicUrl(row.frame_mask_path),
    lensMaskUrl: publicUrl(row.lens_mask_path),
    highlightImageUrl: row.highlight_image_path ? publicUrl(row.highlight_image_path) : null,
  }))

  return {
    silhouettes,
    materials: matRes.data as Material[],
    lensColors: lensRes.data as LensColor[],
    fits: fitRes.data as Fit[],
  }
}