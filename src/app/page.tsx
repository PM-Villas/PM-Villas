// File: src/app/page.tsx
import { getFeaturedProperties } from '@/lib/sanity'
import { Metadata } from 'next'

// Import all the section components
import HeroSection from '@/components/sections/HeroSection'
import StatsSection from '@/components/sections/StatsSection'
import FeaturedProperties from '@/components/sections/FeaturedProperties'
import CTASection from '@/components/sections/CTASection'

// Enable ISR with 60 second revalidation
export const revalidate = 60

// Homepage metadata - rich and comprehensive for SEO
export const metadata: Metadata = {
  title: 'PM Villas | Luxury Real Estate & Villas in Punta Mita, Mexico',
  description: 'Discover exclusive luxury villas and premier real estate in Punta Mita, Mexico. PM Villas offers beachfront properties, oceanview estates, and world-class concierge services in Riviera Nayarit. Your gateway to paradise living.',
  openGraph: {
    title: 'PM Villas | Luxury Real Estate & Villas in Punta Mita, Mexico',
    description: 'Discover exclusive luxury villas and premier real estate in Punta Mita, Mexico. PM Villas offers beachfront properties, oceanview estates, and world-class concierge services in Riviera Nayarit.',
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
    title: 'PM Villas | Luxury Real Estate & Villas in Punta Mita, Mexico',
    description: 'Discover exclusive luxury villas and premier real estate in Punta Mita, Mexico. Beachfront properties, oceanview estates, and world-class concierge services.',
    images: ['https://www.pmvillas.com/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://www.pmvillas.com',
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
        <CTASection />
      </div>
    </>
  )
}