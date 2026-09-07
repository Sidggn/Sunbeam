import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: 'Sunbeam — Sunglass customiser',
  description: 'Customise your perfect pair of sunglasses with Sunbeam.',
  metadataBase: new URL('https://sunbeam.example.com'), // swap for the real deploy URL
  robots: {
    index: false,
    follow: false,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-white antialiased">{children}</body>
    </html>
  )
}