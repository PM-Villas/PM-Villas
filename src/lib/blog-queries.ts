// File: src/lib/blog-queries.ts
import { client } from '@/lib/sanity'
import type { BlogPost } from '@/components/blog/blog-types'

export type PaginatedPosts = {
  posts: BlogPost[]
  total: number
  page: number
  pageSize: number
  totalPages: number
  hasPrev: boolean
  hasNext: boolean
}

// Revalidation time in seconds
const REVALIDATE_TIME = 60

export async function getPaginatedBlogPosts(
  page: number,
  pageSize: number
): Promise<PaginatedPosts> {
  const safePage = Math.max(1, Number(page || 1))
  const size = Math.max(1, Math.min(50, Number(pageSize || 12)))
  const start = (safePage - 1) * size
  const end = start + size - 1

  const query = /* groq */ `
  {
    "posts": *[_type == "blog"]
      | order(coalesce(publishedAt, _createdAt) desc)
      [${start}...${end}]{
        _id,
        title,
        excerpt,
        publishedAt,
        slug { current },
        mainImage { asset->{ url }, alt },
        author->{ name },
        category,
        readingTime,
        featured
      },
    "total": count(*[_type == "blog"])
  }`

  const data = await client.fetch<{ posts: BlogPost[]; total: number }>(
    query,
    {},
    {
      next: {
        revalidate: REVALIDATE_TIME,
        tags: ['blog', 'all-blog-posts', `blog-page-${safePage}`]
      }
    }
  )

  const totalPages = Math.max(1, Math.ceil((data?.total ?? 0) / size))
  return {
    posts: data?.posts ?? [],
    total: data?.total ?? 0,
    page: safePage,
    pageSize: size,
    totalPages,
    hasPrev: safePage > 1,
    hasNext: safePage < totalPages,
  }
}

export async function getFeaturedBlogPosts(limit = 6): Promise<BlogPost[]> {
  const query = /* groq */ `
  *[_type == "blog" && defined(featured) && featured == true]
    | order(coalesce(publishedAt, _createdAt) desc)[0...$limit]{
      _id,
      title,
      excerpt,
      publishedAt,
      slug { current },
      mainImage { asset->{ url }, alt },
      author->{ name },
      category,
      readingTime,
      featured
    }`

  return client.fetch<BlogPost[]>(
    query,
    { limit },
    {
      next: {
        revalidate: REVALIDATE_TIME,
        tags: ['blog', 'featured-blog-posts']
      }
    }
  )
}