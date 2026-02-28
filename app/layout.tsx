import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
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
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
