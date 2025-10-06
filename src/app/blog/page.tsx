// File: src/app/blog/page.tsx
import { getFeaturedBlogPosts, getPaginatedBlogPosts } from '@/lib/blog-queries'
import CTASection from '@/components/sections/CTASection'
import Hero from '@/components/common/Hero'
import FeaturedPostsCarousel from '@/components/blog/FeaturedPostsCarousel'
import PostsGrid from '@/components/blog/PostsGrid'
import Pagination from '@/components/blog/Pagination'

const PAGE_SIZE = 12

// Enable ISR with 60 second revalidation
export const revalidate = 60

export default async function BlogPage() {
    const featuredPosts = await getFeaturedBlogPosts(6)
    const { posts, totalPages } = await getPaginatedBlogPosts(1, PAGE_SIZE)

    return (
        <>
            <div className="overflow-x-hidden w-full">
                <Hero
                    title={<>PM Villas <span style={{ color: '#e1c098' }}>Insights</span></>}
                    subtitle="Market insights, lifestyle guides, and everything you need to know about luxury real estate in Punta Mita"
                    imageUrl="https://pmvillas.com/wp-content/uploads/2025/08/Primary-Bedroom-More-Photos.webp"
                />
            </div>

            <div className="overflow-x-hidden w-full">
                <FeaturedPostsCarousel
                    posts={featuredPosts}
                    heading="Featured Articles"
                    subheading="Editor's picks from Punta Mita luxury living and market insights."
                />
            </div>

            <div className="overflow-x-hidden w-full">
                <PostsGrid posts={posts} heading="All articles" />
            </div>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 overflow-x-hidden w-full">
                <Pagination basePath="/blog" page={1} totalPages={totalPages} />
            </div>

            <div className="overflow-x-hidden w-full">
                <CTASection
                    title="Ready to Explore Punta Mita?"
                    subtitle="Let our experts guide you through Punta Mita's most exclusive properties and investment opportunities"
                    primaryButtonText="Schedule Consultation"
                    primaryButtonHref="/contact"
                    secondaryButtonText="Browse Properties"
                    secondaryButtonHref="/properties"
                />
            </div>
        </>
    )
}

export async function generateMetadata() {
    const title = 'Blog | PM Villas'
    const description = 'Browse PM Villas blog. Luxury real estate insights, guides, and news from Punta Mita.'
    const alternates = { canonical: '/blog' }
    return { title, description, alternates }
}