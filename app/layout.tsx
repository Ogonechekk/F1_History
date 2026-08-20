import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Fraunces, Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import './apex.css'

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  axes: ['opsz'],
})

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'APEX — История Формулы-1',
  description:
    'Восемь десятилетий Формулы-1: великие машины, пилоты и сезон 2026 года.',
  generator: 'v0.app',
  openGraph: {
    title: 'APEX — История скорости',
    description: 'Формула-1 от 1950 года до нового сезона 2026.',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f1eee7' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0908' },
  ],
}

const themeInit = `
(function(){
  try {
    var t = localStorage.getItem('apex-theme');
    if (t !== 'light' && t !== 'dark' && t !== 'colorful') t = 'dark';
    document.documentElement.setAttribute('data-theme', t);
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})();
`

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="ru"
      data-theme="dark"
      className={`${fraunces.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <head>
        <Script id="apex-theme-init" strategy="beforeInteractive">
          {themeInit}
        </Script>
      </head>
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
