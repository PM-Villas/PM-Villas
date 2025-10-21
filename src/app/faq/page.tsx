// File: src/app/faq/page.tsx
import { Metadata } from 'next'
import { FAQSchema } from '@/components/seo/StructuredData'
import Hero from '@/components/common/Hero'
import CTASection from '@/components/sections/CTASection'

// Enable ISR with 60 second revalidation
export const revalidate = 60

// FAQ metadata for SEO
export const metadata: Metadata = {
    title: 'Frequently Asked Questions | PM Villas - Punta Mita Real Estate',
    description: 'Get answers to common questions about buying luxury real estate in Punta Mita, villa rentals, property management, and living in Mexico. Expert advice from PM Villas.',
    openGraph: {
        title: 'FAQ | PM Villas - Punta Mita Real Estate',
        description: 'Common questions about luxury real estate in Punta Mita, villa rentals, and property investment. Expert answers from PM Villas.',
        url: 'https://www.pmvillas.com/faq',
        siteName: 'PM Villas',
        images: [
            {
                url: 'https://www.pmvillas.com/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'PM Villas FAQ - Punta Mita Real Estate',
            },
        ],
        type: 'website',
        locale: 'en_US',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'FAQ | PM Villas - Punta Mita Real Estate',
        description: 'Common questions about luxury real estate in Punta Mita. Expert answers from PM Villas.',
        images: ['https://www.pmvillas.com/og-image.jpg'],
    },
    alternates: {
        canonical: 'https://www.pmvillas.com/faq',
    },
    keywords: [
        'Punta Mita real estate FAQ',
        'buying property in Mexico',
        'Punta Mita villa rentals',
        'Mexico real estate questions',
        'Punta Mita investment',
        'luxury villas Mexico FAQ',
    ],
}

// FAQ data - these will appear in search results as rich snippets
const faqs = [
    {
        question: 'What is Punta Mita and why is it a premier destination for luxury real estate?',
        answer: 'Punta Mita is an exclusive 1,500-acre peninsula on Mexico\'s Pacific Riviera Nayarit coast, just 45 minutes from Puerto Vallarta International Airport. It features two Jack Nicklaus Signature golf courses, private beaches, world-class amenities, and stunning ocean views. The area offers luxury estates, beachfront villas, and resort residences with exceptional investment potential and lifestyle benefits.',
    },
    {
        question: 'Can foreigners buy property in Punta Mita, Mexico?',
        answer: 'Yes, foreigners can legally own property in Punta Mita through a fideicomiso (bank trust). This is a safe, straightforward process that gives you all the benefits of ownership including the right to sell, lease, or pass the property to heirs. PM Villas guides you through every step of the legal process with trusted attorneys and ensures full transparency.',
    },
    {
        question: 'What are the costs associated with buying real estate in Punta Mita?',
        answer: 'Beyond the purchase price, buyers should budget for closing costs (approximately 4-6% of purchase price), notary fees, property transfer tax, and ongoing expenses like HOA fees, property tax (typically low in Mexico), insurance, and maintenance. PM Villas provides detailed cost breakdowns for every property to ensure you have complete financial clarity.',
    },
    {
        question: 'What are the most popular neighborhoods in Punta Mita?',
        answer: 'Popular communities include Kupuri Estates (ultra-luxury beachfront), Ranchos Estates (hillside ocean views), Lagos del Mar (lakefront living), Las Palmas (golf course proximity), Porta Fortuna (exclusive gated community), and Tau Residences (modern luxury condos). Each offers unique features, amenities, and investment characteristics. PM Villas can help match you with the perfect neighborhood for your lifestyle.',
    },
    {
        question: 'How does property rental income work in Punta Mita?',
        answer: 'Many Punta Mita properties generate strong rental income through vacation rentals. Peak seasons (November-April) command premium rates. Properties in golf communities and beachfront locations typically perform best. PM Villas offers property management services including marketing, guest services, maintenance, and financial reporting to maximize your rental returns.',
    },
    {
        question: 'What amenities are available in Punta Mita?',
        answer: 'Punta Mita features two Jack Nicklaus Signature golf courses (Bahia and Pacifico), the exclusive Beach Club Punta Mita, private beach clubs, world-class tennis facilities, spa services, multiple restaurants, water sports, fishing, surfing, and concierge services. Several luxury resorts including Four Seasons and St. Regis provide additional dining and recreation options.',
    },
    {
        question: 'What is the property tax rate in Punta Mita?',
        answer: 'Property taxes (predial) in Punta Mita are significantly lower than in the US or Canada, typically ranging from 0.1% to 0.3% of the assessed property value annually. This makes ownership very affordable compared to other luxury destinations. PM Villas can provide exact tax estimates for any property you\'re considering.',
    },
    {
        question: 'How long does it take to close on a property in Punta Mita?',
        answer: 'The typical closing timeline is 60-90 days from accepted offer to closing. This includes due diligence, fideicomiso setup (for foreign buyers), title review, and notary processes. PM Villas coordinates with trusted attorneys, notaries, and banks to ensure a smooth, timely closing process.',
    },
    {
        question: 'Is Punta Mita safe for property owners and visitors?',
        answer: 'Yes, Punta Mita is one of Mexico\'s safest areas with 24/7 gated security, controlled access, and a strong security presence throughout the peninsula. The exclusive nature of the community, combined with professional security and low crime rates, makes it extremely safe for residents and visitors.',
    },
    {
        question: 'What property management services does PM Villas offer?',
        answer: 'PM Villas provides comprehensive property management including: vacation rental marketing and booking, guest services and concierge, property maintenance and repairs, housekeeping and turnover, financial reporting, owner portal access, and 24/7 emergency support. Our local presence ensures your property is well-maintained and profitable.',
    },
    {
        question: 'What is the best time to visit Punta Mita to view properties?',
        answer: 'Punta Mita enjoys year-round pleasant weather, but the dry season (November-April) offers the most consistent conditions with sunny days and temperatures in the 80s°F. This is also peak season for experiencing the area\'s full amenities and lifestyle. However, we offer property tours year-round and can accommodate any schedule.',
    },
    {
        question: 'Are there financing options available for foreign buyers?',
        answer: 'Financing options for foreign buyers in Mexico are more limited than in the US, but developer financing is sometimes available. Most international buyers purchase with cash or obtain financing in their home country. PM Villas can connect you with financial advisors who specialize in cross-border real estate transactions.',
    },
]

export default function FAQPage() {
    return (
        <>
            <FAQSchema faqs={faqs} />

            <main className="min-h-screen bg-white">
                <Hero
                    title={<>Frequently Asked <span style={{ color: '#e1c098' }}>Questions</span></>}
                    subtitle="Everything you need to know about luxury real estate in Punta Mita"
                    imageUrl="https://cdn.sanity.io/images/canvases/caNo2t7QUntW/06e720bbc93e6afd3701195082454b253a6e3eff-1600x1067.webp"
                />

                <section className="py-16 px-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="space-y-8">
                            {faqs.map((faq, index) => (
                                <div
                                    key={index}
                                    className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
                                >
                                    <h2 className="text-xl font-semibold text-gray-900 mb-3">
                                        {faq.question}
                                    </h2>
                                    <p className="text-gray-700 leading-relaxed">
                                        {faq.answer}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Additional Help Section */}
                        <div className="mt-16 bg-gray-50 rounded-lg p-8 text-center">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                Still Have Questions?
                            </h2>
                            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                                Our team of Punta Mita experts is here to help. Whether you're looking to buy, sell,
                                or rent luxury real estate, we provide personalized guidance every step of the way.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <a
                                    href="/contact"
                                    className="inline-block px-8 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
                                >
                                    Contact Our Team
                                </a>
                                <a
                                    href="/properties-for-sale"
                                    className="inline-block px-8 py-3 bg-white text-emerald-600 font-semibold rounded-lg border-2 border-emerald-600 hover:bg-emerald-50 transition-colors"
                                >
                                    Browse Properties
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                <CTASection
                    title="Ready to Explore Punta Mita?"
                    subtitle="Let our local experts guide you through Punta Mita's most exclusive properties and investment opportunities"
                    primaryButtonText="Schedule Consultation"
                    primaryButtonHref="/contact"
                    secondaryButtonText="View All Properties"
                    secondaryButtonHref="/properties-for-sale"
                />
            </main>
        </>
    )
}
