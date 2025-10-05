// File: src/app/page.tsx
import { getFeaturedProperties } from '@/lib/sanity'

// Import all the section components
import HeroSection from '@/components/sections/HeroSection'
import StatsSection from '@/components/sections/StatsSection'
import FeaturedProperties from '@/components/sections/FeaturedProperties'
import CTASection from '@/components/sections/CTASection'

// Enable ISR with 60 second revalidation
export const revalidate = 60

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