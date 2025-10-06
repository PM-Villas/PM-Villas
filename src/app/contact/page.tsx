// File: src/app/contact/page.tsx
import Hero from '@/components/common/Hero'
import ServicesOverview from '@/components/contact/ServicesOverview'
import ContactInfoCards from '@/components/contact/ContactInfoCards'
import HubSpotForm from '@/components/contact/HubSpotForm'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Contact Us | PM Villas',
    description: 'Get in touch with PM Villas for luxury villa rentals and real estate sales in Punta Mita. Local experts with personalized service.',
    alternates: {
        canonical: '/contact'
    }
}

export default function ContactPage() {
    const services = [
        {
            title: "Luxury Villa Rentals",
            features: [
                "Personalized Villa Matching",
                "Direct Owner Access",
                "Concierge Services",
                "On-Call Support"
            ],
            description: "Hand-selected luxury villas, condos, and estates carefully vetted for quality and guest experience."
        },
        {
            title: "Real Estate Sales",
            features: [
                "Market Analysis",
                "Private Property Tours",
                "Negotiation Support",
                "Closing Support"
            ],
            description: "Expert guidance for vacation condos, second homes, and rental investment properties."
        },
        {
            title: "Why Choose PM Villas",
            features: [
                "Local Knowledge",
                "Direct Relationships",
                "End-to-End Service",
                "Fair, Transparent Pricing"
            ],
            description: "Years of living and working in Punta Mita with English and Spanish fluency."
        }
    ]

    return (
        <main className="min-h-screen bg-white">
            <Hero
                title={<>Who We <span style={{ color: '#e1c098' }}>Are?</span></>}
                imageUrl="https://cdn.sanity.io/images/canvases/caNo2t7QUntW/06e720bbc93e6afd3701195082454b253a6e3eff-1600x1067.webp"
            />

            <ServicesOverview
                heading="Your Local Punta Mita Experts"
                subheading="We understand every neighborhood and community — from Kupuri to Tau Residences, Lagos del Mar, Las Palmas, Porta Fortuna, and beyond. Our local presence means we know the owners, amenities, view corridors, and even sunset angles."
                services={services}
            />

            <HubSpotForm />

            <div className="bg-gray-900 py-16">
                <ContactInfoCards
                    heading="Get In Touch"
                    subheading="From luxury villa rentals to real estate sales and investment opportunities - we're your trusted local experts in Mexico's most prestigious coastal destination."
                />
            </div>
        </main>
    )
}