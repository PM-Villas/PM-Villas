// File: src/components/contact/ServicesOverview.tsx
import { Card, CardContent } from '@/components/ui/card'

type Service = {
    title: string
    features: string[]
    description: string
}

type ServicesOverviewProps = {
    heading: string
    subheading: string
    services: Service[]
}

export default function ServicesOverview({ heading, subheading, services }: ServicesOverviewProps) {
    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        {heading}
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        {subheading}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {services.map((service, index) => (
                        <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                            <CardContent className="p-6">
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                    {service.title}
                                </h3>
                                <ul className="space-y-2 text-gray-600 text-sm mb-4">
                                    {service.features.map((feature, featureIndex) => (
                                        <li key={featureIndex}>• {feature}</li>
                                    ))}
                                </ul>
                                <p className="text-sm text-gray-500">
                                    {service.description}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}