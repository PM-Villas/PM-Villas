// File: src/components/blog/FeaturedPosts.tsx
import FeaturedPostCard from '@/components/blog/FeaturedPostCard'
import type { BlogPost } from '@/components/blog/blog-types'

type Props = {
    posts: BlogPost[]
    heading?: string
    subheading?: string
}

export default function FeaturedPosts({ posts, heading = 'Featured Articles', subheading }: Props) {
    if (!posts?.length) return null

    return (
        <section className="mx-auto max-w-7xl px-6 py-12">
            <div className="mb-8 text-center">
                <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">{heading}</h2>
                {subheading && (
                    <p className="mt-2 text-gray-600 max-w-2xl mx-auto">{subheading}</p>
                )}
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                    <FeaturedPostCard key={post._id} post={post} />
                ))}
            </div>
        </section>
    )
}
