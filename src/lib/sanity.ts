// File: src/lib/sanity.ts
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
    { next: { revalidate: 60, tags: ['properties'] } }
  )
}

// ==================== BLOG QUERIES ====================

// Get all blog posts
export async function getAllBlogPosts() {
  return await client.fetch(
    `
    *[_type == "blog"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      publishedAt,
      excerpt,
      category,
      tags,
      featured,
      readingTime,
      mainImage {
        asset->{
          _id,
          url
        },
        alt
      },
      author->{
        _id,
        name,
        title,
        image {
          asset->{
            _id,
            url
          },
          alt
        }
      }
    }
  `,
    {},
    { next: { revalidate: 60, tags: ['blog'] } }
  )
}

// Get featured blog posts
export async function getFeaturedBlogPosts() {
  return await client.fetch(
    `
    *[_type == "blog" && featured == true] | order(publishedAt desc) [0...3] {
      _id,
      title,
      slug,
      publishedAt,
      excerpt,
      category,
      tags,
      featured,
      readingTime,
      mainImage {
        asset->{
          _id,
          url
        },
        alt
      },
      author->{
        _id,
        name,
        title,
        image {
          asset->{
            _id,
            url
          },
          alt
        }
      }
    }
  `,
    {},
    { next: { revalidate: 60, tags: ['blog'] } }
  )
}

// Get blog post by slug
export async function getBlogPostBySlug(slug: string) {
  return await client.fetch(
    `
    *[_type == "blog" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      publishedAt,
      excerpt,
      category,
      tags,
      featured,
      readingTime,
      metaDescription,
      body,
      mainImage {
        asset->{
          _id,
          url
        },
        alt
      },
      author->{
        _id,
        name,
        title,
        bio,
        email,
        phone,
        image {
          asset->{
            _id,
            url
          },
          alt
        },
        social
      }
    }
  `,
    { slug },
    { next: { revalidate: 60, tags: ['blog'] } }
  )
}

// Get related blog posts by category
export async function getRelatedBlogPosts(category: string, currentPostId: string) {
  return await client.fetch(
    `
    *[_type == "blog" && category == $category && _id != $currentPostId] | order(publishedAt desc) [0...3] {
      _id,
      title,
      slug,
      publishedAt,
      excerpt,
      category,
      readingTime,
      mainImage {
        asset->{
          _id,
          url
        },
        alt
      },
      author->{
        name
      }
    }
  `,
    { category, currentPostId },
    { next: { revalidate: 60, tags: ['blog'] } }
  )
}

// Get blog posts by category
export async function getBlogPostsByCategory(category: string) {
  return await client.fetch(
    `
    *[_type == "blog" && category == $category] | order(publishedAt desc) {
      _id,
      title,
      slug,
      publishedAt,
      excerpt,
      category,
      tags,
      readingTime,
      mainImage {
        asset->{
          _id,
          url
        },
        alt
      },
      author->{
        name,
        title
      }
    }
  `,
    { category },
    { next: { revalidate: 60, tags: ['blog'] } }
  )
}