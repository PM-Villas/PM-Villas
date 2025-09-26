// src/app/layout.tsx
import type { Metadata } from 'next'
import './globals.css'
import SiteHeader from '../components/site-header'
import SiteFooter from '../components/site-footer'

export const metadata: Metadata = {
  title: 'PM Villas',
  description: 'Luxury villas in Punta Mita',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white">
        <SiteHeader />
        {/* Offset for fixed header */}
        <main className="min-h-screen pt-20 md:pt-24">{children}</main>
        <SiteFooter />
      </body>
    </html>
  )
}
