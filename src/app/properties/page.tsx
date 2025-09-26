// src/app/properties/page.tsx
import { client } from '@/lib/sanity'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import PropertiesBrowser from '@/components/PropertiesBrowser'

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
            {/* Removed the intro/hero section to avoid overcrowding and show properties directly */}

            {/* Client-side filter + grid (unchanged) */}
            <PropertiesBrowser properties={properties} />

            {/* CTA Section (unchanged) */}
            <section className="py-16 bg-slate-900">
                <div className="max-w-4xl mx-auto text-center px-6">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        Looking for Something Specific?
                    </h2>
                    <p className="text-xl text-gray-300 mb-8">
                        Our expert team can help you find the perfect property in Punta Mita
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white px-8">
                            Contact Our Team
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            className="border-white text-white hover:bg-white hover:text-gray-900 px-8"
                        >
                            Schedule Consultation
                        </Button>
                    </div>
                </div>
            </section>
        </main>
    )
}
