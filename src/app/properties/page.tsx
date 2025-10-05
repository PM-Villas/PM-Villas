// src/app/properties/page.tsx
import { client } from '@/lib/sanity'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import PropertiesBrowser from '@/components/PropertiesBrowser'
import CTASection from '@/components/sections/CTASection'

// Get all properties (unchanged)
async function getAllProperties() {
    return await client.fetch(`
    *[_type == "property"] | order(_createdAt desc) {
      _id,
      title,
      price,
      bedrooms,
      bathrooms,
      propertyType,
      propertyStatus,
      development,
      neighborhood,
      primaryView,
      mainImage {
        asset->{ _id, url },
        alt
      },
      "slug": slug.current,
      featured,
      description,
      // optional fields used by the client filter (safe if absent)
      staffService,
      lotAreaSqFt,
      lotAreaSqM,
      totalConstructionSqFt,
      totalConstructionSqM
    }
  `)
}

export default async function PropertiesPage() {
    const properties = await getAllProperties()

    return (
        <main className="min-h-screen bg-white">
            {/* Client-side filter + grid */}
            <PropertiesBrowser properties={properties} />

            {/* CTA Section - now using the reusable component */}
            <CTASection
                title="Looking for Something Specific?"
                subtitle="Our expert team can help you find the perfect property in Punta Mita"
                primaryButtonText="Contact Our Team"
                primaryButtonHref="/contact#get-in-touch"
                secondaryButtonText="Schedule Consultation"
                secondaryButtonHref="/contact#schedule-tour"
            />
        </main>
    )
}