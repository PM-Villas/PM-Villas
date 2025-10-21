// src/app/properties-for-sale/[slug]/page.tsx
import { client } from '@/lib/sanity'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import PropertyDetailClient from '@/components/property/PropertyDetailClient'

// Get single property by slug
async function getProperty(slug: string) {
    return await client.fetch(`
    *[_type == "property" && slug.current == $slug][0] {
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
      staffService,
      lotArea,
      totalConstruction,
      yearBuilt,
      investmentHighlights,
      description,
      featured,
      youtubeUrl,
      matterportUrl,
      mainImage {
        asset->{ _id, url },
        alt
      },
      gallery[] {
        asset->{ _id, url },
        alt,
        category
      },
      "slug": slug.current
    }
  `, { slug })
}

// Get related properties
async function getRelatedProperties(propertyType: string, currentId: string) {
    return await client.fetch(`
    *[_type == "property" && propertyType == $propertyType && _id != $currentId] | order(featured desc, _createdAt desc) [0...3] {
      _id,
      title,
      price,
      bedrooms,
      bathrooms,
      propertyType,
      featured,
      development,
      totalConstruction,
      mainImage {
        asset->{ _id, url },
        alt
      },
      "slug": slug.current
    }
  `, { propertyType, currentId })
}

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const property = await getProperty(params.slug)

    if (!property) {
        return {
            title: 'Property Not Found | PM Villas',
            description: 'The property you are looking for could not be found.',
        }
    }

    // Format price for display
    const formattedPrice = property.price?.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }) || 'Contact for pricing'

    // Create a rich description
    const description = property.description
        ? `${property.description.substring(0, 155)}...`
        : `Luxury ${property.bedrooms} bedroom, ${property.bathrooms} bathroom ${property.propertyType?.toLowerCase() || 'property'} in ${property.development || property.neighborhood || 'Punta Mita'}. ${formattedPrice}. Contact PM Villas for details.`

    // Property image for social sharing
    const imageUrl = property.mainImage?.asset?.url || 'https://www.pmvillas.com/og-image.jpg'

    const title = `${property.title} | PM Villas`
    const url = `https://www.pmvillas.com/properties-for-sale/${params.slug}`

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            url,
            siteName: 'PM Villas',
            images: [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: property.mainImage?.alt || property.title,
                },
            ],
            type: 'website',
            locale: 'en_US',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [imageUrl],
        },
        alternates: {
            canonical: url,
        },
        keywords: [
            property.title,
            'Punta Mita real estate',
            'luxury villas Punta Mita',
            `${property.propertyType} for sale`,
            property.development,
            property.neighborhood,
            'Mexico luxury real estate',
            'beachfront property Punta Mita',
            'PM Villas',
            `${property.bedrooms} bedroom villa`,
        ].filter(Boolean),
    }
}

// Main page component (Server Component)
export default async function PropertyDetailPage({ params }: { params: { slug: string } }) {
    const property = await getProperty(params.slug)

    if (!property) {
        notFound()
    }

    const relatedProperties = await getRelatedProperties(property.propertyType, property._id)

    return <PropertyDetailClient property={property} relatedProperties={relatedProperties} />
}

// Enable ISR - revalidate every 60 seconds
export const revalidate = 60
