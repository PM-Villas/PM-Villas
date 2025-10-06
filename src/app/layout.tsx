// File: src/app/layout.tsx
import type { Metadata } from 'next'
import './globals.css'
import SiteHeader from '../components/site-header'
import SiteFooter from '../components/site-footer'
import NextTopLoader from 'nextjs-toploader'

export const metadata: Metadata = {
  title: 'PM Villas',
  description: 'Luxury villas in Punta Mita',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white">
        <NextTopLoader
          color="#e1c098"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={true}
          easing="ease"
          speed={200}
          shadow="0 0 10px #e1c098,0 0 5px #e1c098"
        />
        <SiteHeader />
        {/* Main wrapper with overflow protection and offset for fixed header */}
        <main className="min-h-screen pt-20 md:pt-24 overflow-x-hidden w-full max-w-[100vw]">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  )
}
