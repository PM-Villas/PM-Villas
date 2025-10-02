// src/app/page.tsx
import { getFeaturedProperties } from '@/lib/sanity'

// Import all the section components
import HeroSection from '@/components/sections/HeroSection'
import StatsSection from '@/components/sections/StatsSection'
import FeaturedProperties from '@/components/sections/FeaturedProperties'
import CTASection from '@/components/sections/CTASection'

export default async function HomePage() {
  const featuredProperties = await getFeaturedProperties()

  return (
    <>
      <HeroSection />
      <StatsSection />
      <FeaturedProperties properties={featuredProperties} />
      <CTASection />
    </>
  )
}