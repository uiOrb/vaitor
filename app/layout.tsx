import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { Analytics } from '@vercel/analytics/next'

const inter = localFont({
  src: './fonts/Inter-Variable.ttf',
  variable: '--font-inter',
  display: 'swap',
})

const dmSerif = localFont({
  src: [
    {
      path: './fonts/DMSerifDisplay-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/DMSerifDisplay-Italic.ttf',
      weight: '400',
      style: 'italic',
    },
  ],
  variable: '--font-dm-serif',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://vaitor.dev'),
  title: 'VAITOR — Reeve Lobo | Software Developer',
  description: 'Cinematic portfolio of Reeve Lobo, Software Developer at IBM. A journey through code, craft, and cosmos.',
  keywords: ['Reeve Lobo', 'Software Developer', 'IBM', 'Portfolio', 'Full Stack', 'DevOps', 'Cloud'],
  authors: [{ name: 'Reeve Lobo' }],
  openGraph: {
    title: 'VAITOR — Reeve Lobo | Software Developer',
    description: 'A cinematic journey through code, craft, and cosmos.',
    type: 'website',
    url: 'https://vaitor.dev',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'VAITOR — Reeve Lobo Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VAITOR — Reeve Lobo | Software Developer',
    description: 'A cinematic journey through code, craft, and cosmos.',
    images: ['/og-image.jpg'],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  robots: 'index, follow',
}

export const viewport = {
  themeColor: '#09090B',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${dmSerif.variable}`}>
      <body suppressHydrationWarning>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
