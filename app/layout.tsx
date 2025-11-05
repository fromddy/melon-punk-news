import type { Metadata } from 'next'
import { Inter, Comic_Neue } from 'next/font/google'

import { Providers } from '@/components/providers'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })
const comicNeue = Comic_Neue({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-comic-neue'
})

export const metadata: Metadata = {
  title: 'Melon Punk',
  description: 'bullish Ethereum',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${comicNeue.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
