// File: src/components/blog/PostsGrid.tsx
import PostCard from '@/components/blog/PostCard'
import type { BlogPost } from '@/components/blog/blog-types'

type Props = {
    posts: BlogPost[]
    heading?: string
}

export default function PostsGrid({ posts, heading = 'All articles' }: Props) {
    return (
        <section className="mx-auto max-w-7xl px-6 py-12">
            <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-center md:text-left">
                    {heading}
                </h2>
            </div>

            {posts?.length ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {posts.map((post) => (
                        <PostCard key={post._id} post={post} />
                    ))}
                </div>
            ) : (
                <div className="rounded-lg border border-dashed border-gray-300 p-10 text-center text-gray-500">
                    No posts yet. Please check back soon.
                </div>
            )}
        </section>
    )
}
