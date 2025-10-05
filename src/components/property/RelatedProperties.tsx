// File: src/components/property/RelatedProperties.tsx
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

type RelatedProperty = {
    _id: string
    title: string
    price?: number
    bedrooms?: number
    bathrooms?: number
    propertyType?: string
    mainImage?: {
        asset?: { url: string }
        alt?: string
    }
    slug: string
}

type RelatedPropertiesProps = {
    properties: RelatedProperty[]
}

export default function RelatedProperties({ properties }: RelatedPropertiesProps) {
    if (!properties || properties.length === 0) return null

    return (
        <section className="py-16 px-6 bg-slate-50">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Similar Properties</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {properties.map((property) => (
                        <Card
                            key={property._id}
                            className="group overflow-hidden border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                            {property.mainImage && (
                                <div className="relative h-48 overflow-hidden">
                                    <Image
                                        src={property.mainImage.asset?.url || '/placeholder.jpg'}
                                        alt={property.mainImage.alt || property.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <Badge className="bg-white text-gray-900 font-semibold">
                                            ${property.price?.toLocaleString()}
                                        </Badge>
                                    </div>
                                </div>
                            )}
                            <CardContent className="p-4">
                                <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">
                                    {property.title}
                                </h3>
                                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                                    <div className="flex space-x-3">
                                        {property.bedrooms && <span>{property.bedrooms} Beds</span>}
                                        {property.bathrooms && <span>{property.bathrooms} Baths</span>}
                                    </div>
                                    <Badge variant="outline" className="capitalize text-xs">
                                        {property.propertyType}
                                    </Badge>
                                </div>
                                <Link
                                    href={`/properties/${property.slug}`}
                                    className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-semibold text-sm"
                                >
                                    View Details
                                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </Link>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}