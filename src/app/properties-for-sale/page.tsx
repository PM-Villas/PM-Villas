// File: src/app/properties/page.tsx
import { client } from '@/lib/sanity'
import PropertiesBrowserInfinite from '@/components/properties/PropertiesBrowserInfinite'
import CTASection from '@/components/sections/CTASection'
import { Metadata } from 'next'

// Enable ISR with 60 second revalidation
export const revalidate = 60

// Generate metadata for the properties listing page
export const metadata: Metadata = {
  title: 'Luxury Properties for Sale in Punta Mita | PM Villas',
  description: 'Browse our exclusive collection of luxury villas and estates for sale in Punta Mita, Mexico. Beachfront properties, oceanview homes, and premier real estate in Riviera Nayarit. Find your dream home with PM Villas.',
  openGraph: {
    title: 'Luxury Properties for Sale in Punta Mita | PM Villas',
    description: 'Browse our exclusive collection of luxury villas and estates for sale in Punta Mita, Mexico. Beachfront properties, oceanview homes, and premier real estate in Riviera Nayarit.',
    url: 'https://www.pmvillas.com/properties-for-sale',
    siteName: 'PM Villas',
    images: [
      {
        url: 'https://www.pmvillas.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Luxury villas for sale in Punta Mita',
      },
    ],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Luxury Properties for Sale in Punta Mita | PM Villas',
    description: 'Browse our exclusive collection of luxury villas and estates for sale in Punta Mita, Mexico. Beachfront properties, oceanview homes, and premier real estate.',
    images: ['https://www.pmvillas.com/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://www.pmvillas.com/properties-for-sale',
  },
  keywords: [
    'Punta Mita real estate',
    'luxury villas for sale',
    'Punta Mita properties',
    'beachfront villas Mexico',
    'Riviera Nayarit real estate',
    'oceanfront homes Punta Mita',
    'luxury real estate Mexico',
    'Punta Mita homes for sale',
    'PM Villas',
    'exclusive properties Punta Mita',
  ],
}

interface SearchParams {
  bedrooms?: string
  bathrooms?: string
  priceMin?: string
  priceMax?: string
  type?: string
  development?: string
  neighborhood?: string
  sort?: string
}

const ITEMS_PER_PAGE = 12

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

  // Only filter by development if explicitly provided
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

  // Get total count
  const totalQuery = `count(*[${filter}])`
  const total = await client.fetch<number>(
    totalQuery,
    {},
    {
      next: {
        revalidate: 60,
        tags: ['properties']
      }
    }
  )

  // Build sort order based on params
  let orderClause = 'order(featured desc, _createdAt desc)'
  if (params.sort === 'price-low') {
    orderClause = 'order(price asc)'
  } else if (params.sort === 'price-high') {
    orderClause = 'order(price desc)'
  }

  // Get first batch with dynamic sorting
  const query = `
    *[${filter}] | ${orderClause} [0...${ITEMS_PER_PAGE}] {
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

  const properties = await client.fetch(
    query,
    {},
    {
      next: {
        revalidate: 60,
        tags: ['properties']
      }
    }
  )

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
    <>
      <div className="overflow-x-hidden w-full bg-white">
        <PropertiesBrowserInfinite
          initialProperties={properties}
          total={total}
          hasMore={hasMore}
          searchParams={searchParams}
        />
      </div>

      <div className="overflow-x-hidden w-full">
        <CTASection
          title="Looking for Something Specific?"
          subtitle="Our expert team can help you find the perfect property in Punta Mita"
          primaryButtonText="Contact Our Team"
          primaryButtonHref="/contact#get-in-touch"
          secondaryButtonText="Schedule Consultation"
          secondaryButtonHref="/contact#schedule-tour"
        />
      </div>
    </>
  )
}