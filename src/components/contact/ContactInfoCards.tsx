// File: src/components/contact/ContactInfoCards.tsx
'use client'

import { Card, CardContent } from '@/components/ui/card'
import { MapPin, Phone, Mail, Clock, type LucideIcon } from 'lucide-react'
import React from 'react'

type ContactInfoCardsProps = {
    heading: string
    subheading: string
}

type ContactInfo = {
    icon: LucideIcon
    title: string
    content: string
    action: string
    link: string
}

export default function ContactInfoCards({ heading, subheading }: ContactInfoCardsProps) {
    const contactInfo: ContactInfo[] = [
        {
            icon: MapPin,
            title: 'Visit Our Office',
            content: 'Lagos Del Mar 26, Punta de Mita, Nayarit, Mexico 63734',
            action: 'Get Directions',
            link: 'https://maps.google.com/?q=Lagos+Del+Mar+26+Punta+de+Mita',
        },
        {
            icon: Phone,
            title: 'Call Us',
            content: '+1 847-340-0338',
            action: 'Call Now',
            link: 'tel:+18473400338',
        },
        {
            icon: Mail,
            title: 'Email Us',
            content: 'andrew.kubicek@pmvillas.com',
            action: 'Send Email',
            link: 'mailto:andrew.kubicek@pmvillas.com',
        },
        {
            icon: Clock,
            title: 'Office Hours',
            content: 'Monday - Sunday: 8:00 AM - 8:00 PM (CST)',
            action: 'Schedule Tour',
            link: '#schedule-tour',
        },
    ]

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, link: string) => {
        if (link.startsWith('#')) {
            e.preventDefault()
            const element = document.querySelector(link)
            if (element) {
                const elementPosition = (element as HTMLElement).getBoundingClientRect().top + window.pageYOffset
                const offsetPosition = elementPosition - 100
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
            }
        }
    }

    return (
        <section id="get-in-touch" className="py-20  from-gray-50 to-white scroll-mt-12">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Get In <span style={{ color: '#e1c098' }}>Touch</span>
                    </h2>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">{subheading}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {contactInfo.map((info, index) => (
                        <Card
                            key={index}
                            className="h-full bg-gray-800/50 border-gray-700 hover:border-gray-600 hover:shadow-xl transition-all duration-300 backdrop-blur-sm"
                        >
                            <CardContent className="p-6 flex flex-col h-full">
                                <div
                                    className="flex items-center justify-center w-12 h-12 rounded-lg mb-4"
                                    style={{ backgroundColor: 'rgba(225, 192, 152, 0.15)' }}
                                >
                                    <info.icon className="h-6 w-6" style={{ color: '#e1c098' }} />
                                </div>

                                <h3 className="text-lg font-semibold text-white mb-2">{info.title}</h3>
                                <p className="text-gray-300 mb-4 text-sm flex-grow">{info.content}</p>

                                <a
                                    href={info.link}
                                    target={info.link.startsWith('http') ? '_blank' : undefined}
                                    rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                                    onClick={(e) => handleClick(e, info.link)}
                                    className="w-full text-white px-6 py-2.5 text-sm font-medium rounded-full shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl text-center block mt-auto"
                                    style={{ backgroundColor: '#e1c098', borderColor: '#e1c098' }}
                                >
                                    {info.action}
                                </a>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
