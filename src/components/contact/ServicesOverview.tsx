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
                        Your Local Punta Mita <span style={{ color: '#e1c098' }}>Experts</span>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        {subheading}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {services.map((service, index) => (
                        <Card
                            key={index}
                            className="hover:shadow-xl transition-all duration-300 border-gray-200 hover:border-gray-300 group"
                        >
                            <CardContent className="p-6">
                                <div className="flex items-center mb-4">
                                    <div
                                        className="w-2 h-8 rounded-full mr-3"
                                        style={{ backgroundColor: '#e1c098' }}
                                    />
                                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
                                        {service.title}
                                    </h3>
                                </div>
                                <ul className="space-y-2 text-gray-600 text-sm mb-4">
                                    {service.features.map((feature, featureIndex) => (
                                        <li key={featureIndex} className="flex items-start">
                                            <span
                                                className="inline-block w-1.5 h-1.5 rounded-full mt-2 mr-2 flex-shrink-0"
                                                style={{ backgroundColor: '#e1c098' }}
                                            />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <p className="text-sm text-gray-500 border-t border-gray-100 pt-4">
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