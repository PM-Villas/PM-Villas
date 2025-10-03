// File: src/components/contact/ContactInfoCards.tsx
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { LucideIcon } from 'lucide-react'

type ContactInfo = {
    icon: LucideIcon
    title: string
    content: string
    action: string
    link?: string
}

type ContactInfoCardsProps = {
    heading: string
    subheading: string
    contactInfo: ContactInfo[]
}

export default function ContactInfoCards({ heading, subheading, contactInfo }: ContactInfoCardsProps) {
    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        {heading}
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        {subheading}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {contactInfo.map((info, index) => (
                        <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-center w-12 h-12 bg-emerald-100 rounded-lg mb-4">
                                    <info.icon className="h-6 w-6 text-emerald-600" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    {info.title}
                                </h3>
                                <p className="text-gray-600 mb-4 text-sm">
                                    {info.content}
                                </p>
                                {info.link ? (
                                    <a
                                        href={info.link}
                                        target={info.link.startsWith('http') ? '_blank' : '_self'}
                                        rel={info.link.startsWith('http') ? 'noopener noreferrer' : ''}
                                    >
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="w-full border-emerald-200 text-emerald-600 hover:bg-emerald-50"
                                        >
                                            {info.action}
                                        </Button>
                                    </a>
                                ) : (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="w-full border-emerald-200 text-emerald-600 hover:bg-emerald-50"
                                    >
                                        {info.action}
                                    </Button>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}