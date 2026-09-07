import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import './globals.css'

export const metadata: Metadata = {
  title: 'Sunbeam — Sunglass customiser',
  description: 'Customise your perfect pair of sunglasses with Sunbeam.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="bg-[#eee9de]">
      <body>{children}</body>
    </html>
  )
}
