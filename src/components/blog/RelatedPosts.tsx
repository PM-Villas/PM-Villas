// File: src/components/blog/RelatedPosts.tsx
import PostCard from '@/components/blog/PostCard'
import type { BlogPost } from '@/components/blog/blog-types'

type RelatedPostsProps = {
    posts: BlogPost[]
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
    if (!posts || posts.length === 0) return null

    return (
        <section className="bg-gray-50 py-16 px-6">
            <div className="mx-auto max-w-7xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Related <span style={{ color: '#e1c098' }}>Articles</span>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Continue exploring insights and stories from Punta Mita
                    </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {posts.map((post) => (
                        <PostCard key={post._id} post={post} />
                    ))}
                </div>
            </div>
        </section>
    )
}