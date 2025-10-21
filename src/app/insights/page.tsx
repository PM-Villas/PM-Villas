// File: src/app/insights/page.tsx
import { getFeaturedBlogPosts, getPaginatedBlogPosts } from '@/lib/blog-queries'
import CTASection from '@/components/sections/CTASection'
import Hero from '@/components/common/Hero'
import FeaturedPostsCarousel from '@/components/blog/FeaturedPostsCarousel'
import PostsGrid from '@/components/blog/PostsGrid'
import Pagination from '@/components/blog/Pagination'

const PAGE_SIZE = 12

// Enable ISR with 60 second revalidation
export const revalidate = 60

export default async function InsightsPage() {
    const featuredPosts = await getFeaturedBlogPosts(6)
    const { posts, totalPages } = await getPaginatedBlogPosts(1, PAGE_SIZE)

    return (
        <>
            <div className="overflow-x-hidden w-full">
                <Hero
                    title={<>PM Villas <span style={{ color: '#e1c098' }}>Insights</span></>}
                    subtitle="Market insights, lifestyle guides, and everything you need to know about luxury real estate in Punta Mita"
                    imageUrl="https://cdn.sanity.io/images/canvases/caNo2t7QUntW/06e720bbc93e6afd3701195082454b253a6e3eff-1600x1067.webp"
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
                <Pagination basePath="/insights" page={1} totalPages={totalPages} />
            </div>

            {/* FAQ Link Banner */}
            <div className="overflow-x-hidden w-full py-12 px-6">
                <div className="max-w-4xl mx-auto">
                    <a
                        href="/faq"
                        className="group block bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                    >
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="text-center md:text-left">
                                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                                    Have Questions About Punta Mita?
                                </h3>
                                <p className="text-emerald-50 text-lg">
                                    Get expert answers to common questions about buying property, villa rentals, and living in Punta Mita
                                </p>
                            </div>
                            <div className="flex-shrink-0">
                                <span className="inline-block px-8 py-4 bg-white text-emerald-600 font-bold rounded-lg group-hover:bg-emerald-50 transition-colors shadow-md">
                                    View FAQ →
                                </span>
                            </div>
                        </div>
                    </a>
                </div>
            </div>

            <div className="overflow-x-hidden w-full">
                <CTASection
                    title="Ready to Explore Punta Mita?"
                    subtitle="Let our experts guide you through Punta Mita's most exclusive properties and investment opportunities"
                    primaryButtonText="Schedule Consultation"
                    primaryButtonHref="/contact"
                    secondaryButtonText="Browse Properties"
                    secondaryButtonHref="/properties-for-sale"
                />
            </div>
        </>
    )
}

export async function generateMetadata() {
    const title = 'Insights | PM Villas'
    const description = 'Explore luxury real estate insights, market guides, and lifestyle articles about Punta Mita, Mexico. Expert advice on property investment, local amenities, and paradise living from PM Villas.'

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            url: 'https://www.pmvillas.com/insights',
            siteName: 'PM Villas',
            images: [
                {
                    url: 'https://www.pmvillas.com/og-image.jpg',
                    width: 1200,
                    height: 630,
                    alt: 'PM Villas Insights - Luxury real estate guides',
                },
            ],
            type: 'website',
            locale: 'en_US',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: ['https://www.pmvillas.com/og-image.jpg'],
        },
        alternates: {
            canonical: 'https://www.pmvillas.com/insights',
        },
    }
}