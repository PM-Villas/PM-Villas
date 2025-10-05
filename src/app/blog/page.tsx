// File: src/app/blog/page.tsx
import { getFeaturedBlogPosts, getPaginatedBlogPosts } from '@/lib/blog-queries'
import CTASection from '@/components/sections/CTASection'
import Hero from '@/components/common/Hero'  // <-- Changed from BlogHero
import FeaturedPostsCarousel from '@/components/blog/FeaturedPostsCarousel'
import PostsGrid from '@/components/blog/PostsGrid'
import Pagination from '@/components/blog/Pagination'

const PAGE_SIZE = 12

export const dynamic = 'force-static'
export const revalidate = 120

export default async function BlogPage() {
    const featuredPosts = await getFeaturedBlogPosts(6)
    const { posts, totalPages } = await getPaginatedBlogPosts(1, PAGE_SIZE)

    return (
        <main>
            <Hero
                title={<>PM Villas <span style={{ color: '#e1c098' }}>Blog</span></>}
                subtitle="Market insights, lifestyle guides, and everything you need to know about luxury real estate in Punta Mita"
                imageUrl="https://pmvillas.com/wp-content/uploads/2025/08/Primary-Bedroom-More-Photos.webp"
            />

            <FeaturedPostsCarousel
                posts={featuredPosts}
                heading="Featured Articles"
                subheading="Editor's picks from Punta Mita luxury living and market insights."
            />

            <PostsGrid posts={posts} heading="All articles" />
            <div className="mx-auto max-w-7xl px-6">
                <Pagination basePath="/blog" page={1} totalPages={totalPages} />
            </div>

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

export async function generateMetadata() {
    const title = 'Blog | PM Villas'
    const description = 'Browse PM Villas blog. Luxury real estate insights, guides, and news from Punta Mita.'
    const alternates = { canonical: '/blog' }
    return { title, description, alternates }
}