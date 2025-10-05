// src/app/properties/page.tsx - INFINITE SCROLL VERSION
import { client } from '@/lib/sanity'
import PropertiesBrowserInfinite from '@/components/properties/PropertiesBrowserInfinite'
import CTASection from '@/components/sections/CTASection'

interface SearchParams {
  bedrooms?: string
  bathrooms?: string
  priceMin?: string
  priceMax?: string
  type?: string
  development?: string
  neighborhood?: string
}

const ITEMS_PER_PAGE = 12 // Load 12 properties at a time

function buildSanityFilter(params: SearchParams) {
  const filters: string[] = ['_type == "property"']

  if (params.bedrooms) {
    filters.push(`bedrooms >= ${Number(params.bedrooms)}`)
  }
  if (params.bathrooms) {
    filters.push(`bathrooms >= ${Number(params.bathrooms)}`)
  }
  if (params.priceMin) {
    filters.push(`price >= ${Number(params.priceMin)}`)
  }
  if (params.priceMax) {
    filters.push(`price <= ${Number(params.priceMax)}`)
  }
  if (params.type) {
    filters.push(`lower(propertyType) == "${params.type.toLowerCase()}"`)
  }
  if (params.development) {
    const devs = params.development.split(',').map(d => `"${d.trim()}"`).join(',')
    filters.push(`count((development[])[@ in [${devs}]]) > 0`)
  }
  if (params.neighborhood) {
    const hoods = params.neighborhood.split(',').map(n => `"${n.trim()}"`).join(',')
    filters.push(`count((neighborhood[])[@ in [${hoods}]]) > 0`)
  }

  return filters.join(' && ')
}

async function getInitialProperties(params: SearchParams) {
  const filter = buildSanityFilter(params)

  // Get total count for reference
  const totalQuery = `count(*[${filter}])`
  const total = await client.fetch<number>(totalQuery)

  // Get first batch (12 properties)
  const query = `
        *[${filter}] | order(_createdAt desc) [0...${ITEMS_PER_PAGE}] {
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
            staffService,
            lotAreaSqFt,
            lotAreaSqM,
            totalConstructionSqFt,
            totalConstructionSqM,
            totalConstruction
        }
    `

  const properties = await client.fetch(query)

  return {
    properties,
    total,
    hasMore: properties.length < total,
  }
}

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const { properties, total, hasMore } = await getInitialProperties(searchParams)

  return (
    <main className="min-h-screen bg-white">
      <PropertiesBrowserInfinite
        initialProperties={properties}
        total={total}
        hasMore={hasMore}
        searchParams={searchParams}
      />

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