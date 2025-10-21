// src/app/sitemap.ts
import { MetadataRoute } from 'next'
import { client } from '@/lib/sanity'

// This function generates your sitemap automatically for ALL search engines
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.pmvillas.com'

  // ==========================================
  // STEP 1: Fetch all properties from Sanity
  // ==========================================
  const properties = await client.fetch(`
    *[_type == "property"] {
      "slug": slug.current,
      _updatedAt,
      featured,
      propertyStatus
    }
  `)

  // ==========================================
  // STEP 2: Fetch all blog posts from Sanity
  // ==========================================
  const posts = await client.fetch(`
    *[_type == "blog"] {
      "slug": slug.current,
      _updatedAt,
      publishedAt,
      featured
    }
  `)

  // ==========================================
  // STEP 3: Define your static pages
  // ==========================================
  const staticPages = [
    {
      url: baseUrl, // Homepage
      lastModified: new Date(),
      changeFrequency: 'daily' as const, // Updates daily
      priority: 1.0, // Most important page (scale 0-1)
    },
    {
      url: `${baseUrl}/properties-for-sale`, // Properties listing
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9, // Very important
    },
    {
      url: `${baseUrl}/insights`, // Blog page
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8, // Important
    },
    {
      url: `${baseUrl}/faq`, // FAQ page - important for SEO
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8, // Important for featured snippets
    },
    {
      url: `${baseUrl}/contact`, // Contact page
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7, // Moderately important
    },
  ]

  // ==========================================
  // STEP 4: Convert properties to sitemap format
  // Featured properties get higher priority for better SEO
  // ==========================================
  const propertyPages = properties.map((property: any) => ({
    url: `${baseUrl}/properties-for-sale/${property.slug}`,
    lastModified: new Date(property._updatedAt),
    changeFrequency: 'weekly' as const,
    // Featured properties and available properties get higher priority
    priority: property.featured ? 0.9 : property.propertyStatus === 'sold-out' ? 0.6 : 0.8,
  }))

  // ==========================================
  // STEP 5: Convert blog posts to sitemap format
  // Featured posts get higher priority
  // ==========================================
  const blogPages = posts.map((post: any) => ({
    url: `${baseUrl}/insights/${post.slug}`,
    lastModified: new Date(post._updatedAt || post.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: post.featured ? 0.7 : 0.6,
  }))

  // ==========================================
  // STEP 6: Combine everything and return
  // ==========================================
  return [...staticPages, ...propertyPages, ...blogPages]
}