// File: src/app/blog/[slug]/page.tsx
import { getBlogPostBySlug, getRelatedBlogPosts, getAllBlogPosts } from '@/lib/sanity'
import { notFound } from 'next/navigation'
import BlogPostHeader from '@/components/blog/BlogPostHeader'
import BlogPostContent from '@/components/blog/BlogPostContent'
import BlogPostAuthor from '@/components/blog/BlogPostAuthor'
import RelatedPosts from '@/components/blog/RelatedPosts'
import CTASection from '@/components/sections/CTASection'

// Enable ISR with 60 second revalidation
export const revalidate = 60

type Props = {
    params: { slug: string }
}

// Generate static paths for all blog posts
export async function generateStaticParams() {
    const posts = await getAllBlogPosts()

    return posts.map((post: any) => ({
        slug: post.slug.current,
    }))
}

export default async function BlogPostPage({ params }: Props) {
    const post = await getBlogPostBySlug(params.slug)

    if (!post) {
        notFound()
    }

    const relatedPosts = post.category
        ? await getRelatedBlogPosts(post.category, post._id)
        : []

    return (
        <main className="bg-white">
            <BlogPostHeader post={post} />

            <article className="mx-auto max-w-4xl px-6 py-12">
                <BlogPostContent post={post} />
            </article>

            {post.author && (
                <div className="mx-auto max-w-4xl px-6 py-8">
                    <BlogPostAuthor author={post.author} />
                </div>
            )}

            {relatedPosts.length > 0 && (
                <RelatedPosts posts={relatedPosts} />
            )}

            <CTASection
                title="Ready to Explore Punta Mita?"
                subtitle="Let our experts guide you through Punta Mita's most exclusive properties and investment opportunities"
                primaryButtonText="Schedule Consultation"
                primaryButtonHref="/contact"
                secondaryButtonText="Browse Properties"
                secondaryButtonHref="/properties"
            />
        </main>
    )
}

export async function generateMetadata({ params }: Props) {
    const post = await getBlogPostBySlug(params.slug)

    if (!post) {
        return {
            title: 'Post Not Found',
            description: 'The requested blog post could not be found.'
        }
    }

    return {
        title: `${post.title} | PM Villas Blog`,
        description: post.metaDescription || post.excerpt || post.title,
        openGraph: {
            title: post.title,
            description: post.metaDescription || post.excerpt || post.title,
            type: 'article',
            publishedTime: post.publishedAt,
            authors: post.author?.name ? [post.author.name] : undefined,
            images: post.mainImage?.asset?.url ? [post.mainImage.asset.url] : undefined,
        },
        alternates: {
            canonical: `/blog/${params.slug}`
        }
    }
}