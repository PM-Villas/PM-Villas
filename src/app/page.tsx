// File: src/app/page.tsx
import { getFeaturedProperties } from '@/lib/sanity'
import { Metadata } from 'next'

// Import all the section components
import HeroSection from '@/components/sections/HeroSection'
import StatsSection from '@/components/sections/StatsSection'
import FeaturedProperties from '@/components/sections/FeaturedProperties'
import NewsletterSection from '@/components/sections/NewsletterSection'
import ScrollToTop from '@/components/utils/ScrollToTop'
// import CTASection from '@/components/sections/CTASection' // Commented out - CTA section removed from homepage

// Enable ISR with 60 second revalidation
export const revalidate = 60

// Homepage metadata - rich and comprehensive for SEO
export const metadata: Metadata = {
  title: 'PM Villas | Punta Mita Luxury Real Estate & Villas',
  description: 'Exclusive luxury villas and real estate in Punta Mita, Mexico. Beachfront properties, oceanview estates, and world-class concierge services.',
  openGraph: {
    title: 'PM Villas | Punta Mita Luxury Real Estate & Villas',
    description: 'Exclusive luxury villas and real estate in Punta Mita, Mexico. Beachfront properties, oceanview estates, and world-class concierge services.',
    url: 'https://www.pmvillas.com',
    siteName: 'PM Villas',
    images: [
      {
        url: 'https://www.pmvillas.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'PM Villas - Luxury real estate in Punta Mita, Mexico',
      },
    ],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PM Villas | Punta Mita Luxury Real Estate & Villas',
    description: 'Exclusive luxury villas and real estate in Punta Mita, Mexico. Beachfront properties, oceanview estates, and world-class concierge services.',
    images: ['https://www.pmvillas.com/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://www.pmvillas.com',
    languages: {
      'en-US': 'https://www.pmvillas.com',
    },
  },
  keywords: [
    'PM Villas',
    'Punta Mita real estate',
    'luxury villas Punta Mita',
    'Punta Mita properties',
    'beachfront villas Mexico',
    'Riviera Nayarit real estate',
    'luxury real estate Mexico',
    'Punta Mita vacation rentals',
    'oceanfront properties Punta Mita',
    'exclusive villas Mexico',
    'Punta Mita concierge services',
    'Mexico luxury homes',
  ],
}

export default async function HomePage() {
  const featuredProperties = await getFeaturedProperties()

  return (
    <>
      <ScrollToTop />
      <div className="overflow-x-hidden w-full">
        <HeroSection />
      </div>

      <div className="overflow-x-hidden w-full">
        <StatsSection />
      </div>

      <div className="overflow-x-hidden w-full">
        <FeaturedProperties properties={featuredProperties} />
      </div>

      <div className="overflow-x-hidden w-full">
        <NewsletterSection />
      </div>

      {/* CTA Section removed from homepage */}
      {/* <div className="overflow-x-hidden w-full">
        <CTASection />
      </div> */}
    </>
  )
}