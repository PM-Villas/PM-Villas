// File: src/app/layout.tsx
import type { Metadata } from 'next'
import './globals.css'
import SiteHeader from '../components/site-header'
import SiteFooter from '../components/site-footer'
import NextTopLoader from 'nextjs-toploader'
import { OrganizationSchema, LocalBusinessSchema } from '@/components/seo/StructuredData'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.pmvillas.com'),
  title: 'PM Villas',
  description: 'Luxury villas in Punta Mita',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <OrganizationSchema />
        <LocalBusinessSchema />
      </head>
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
        <main className="min-h-screen pt-20 md:pt-24 overflow-x-hidden w-full max-w-[100vw]">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  )
}