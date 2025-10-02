// File: src/components/blog/blog-types.ts
export type BlogPost = {
    _id: string
    title: string
    excerpt?: string
    publishedAt?: string
    slug: { current: string }
    mainImage?: {
        asset?: { url?: string }
        alt?: string
    }
    author?: { name?: string }
    category?: string
    readingTime?: number
    featured?: boolean
}

export type FeaturedBlock = {
    heading?: string
    subheading?: string
    posts: BlogPost[]
}
