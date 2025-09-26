// src/lib/sanity.ts
import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: false, // Set to false for development
})

// Image URL builder
const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

// Query for featured properties with proper image fields
export async function getFeaturedProperties() {
  return await client.fetch(
    `
    *[_type == "property" && featured == true] | order(_createdAt desc) [0...6] {
      _id,
      title,
      price,
      bedrooms,
      bathrooms,
      propertyType,
      mainImage {
        asset->{
          _id,
          url
        },
        alt
      },
      "slug": slug.current
    }
  `,
    {},
    // ✨ Added: cache hints so this data can be revalidated by tag
    { next: { revalidate: 60, tags: ['properties'] } }
  )
}
