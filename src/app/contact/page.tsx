// File: src/app/contact/page.tsx
import Hero from '@/components/common/Hero'  // <-- Changed from BlogHero
import ServicesOverview from '@/components/contact/ServicesOverview'
import ContactForm from '@/components/contact/ContactForm'
import ContactInfoCards from '@/components/contact/ContactInfoCards'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
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
                "Fair, Transparent Pricing",
                "Bicultural Advantage"
            ],
            description: "Years of living and working in Punta Mita with English and Spanish fluency."
        }
    ]

    const contactInfo = [
        {
            icon: MapPin,
            title: "Visit Our Office",
            content: "Lagos Del Mar 26, Punta de Mita, Nayarit, Mexico 63734",
            action: "Get Directions",
            link: "https://maps.google.com/?q=Lagos+Del+Mar+26+Punta+de+Mita"
        },
        {
            icon: Phone,
            title: "Call Us",
            content: "+1 847-340-0338",
            action: "Call Now",
            link: "tel:+18473400338"
        },
        {
            icon: Mail,
            title: "Email Us",
            content: "andrew.kubicek@pmvillas.com",
            action: "Send Email",
            link: "mailto:andrew.kubicek@pmvillas.com"
        },
        {
            icon: Clock,
            title: "Office Hours",
            content: "Monday - Sunday: 8:00 AM - 8:00 PM (CST)",
            action: "Schedule Tour"
        }
    ]

    return (
        <main className="min-h-screen bg-white">
            <Hero
                title={<>Who We <span style={{ color: '#e1c098' }}>Are?</span></>}
                subtitle="Your trusted local experts in Punta Mita luxury real estate and vacation rentals"
                imageUrl="https://pmvillas.com/wp-content/uploads/2025/08/Primary-Bedroom-More-Photos.webp"
            />

            <ServicesOverview
                heading="Your Local Punta Mita Experts"
                subheading="We understand every neighborhood and community — from Kupuri to Tau Residences, Lagos del Mar, Las Palmas, Porta Fortuna, and beyond. Our local presence means we know the owners, amenities, view corridors, and even sunset angles."
                services={services}
            />

            <ContactForm
                heading="Tell Us About Your Needs"
                subheading="Whether you're buying, selling, or visiting - we understand every neighborhood from Kupuri to Las Palmas, Porta Fortuna, and beyond."
            />

            <ContactInfoCards
                heading="Get In Touch"
                subheading="From luxury villa rentals to real estate sales and investment opportunities - we're your trusted local experts in Mexico's most prestigious coastal destination."
                contactInfo={contactInfo}
            />
        </main>
    )
}