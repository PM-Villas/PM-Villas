// File: src/components/property/RelatedProperties.tsx
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { IoBedOutline, IoLocationOutline } from 'react-icons/io5'
import { PiBathtub } from 'react-icons/pi'
import { MdOutlineSquareFoot } from 'react-icons/md'

type RelatedProperty = {
    _id: string
    title: string
    price?: number
    bedrooms?: number
    bathrooms?: number
    propertyType?: string
    development?: string[]
    totalConstruction?: {
        value: number
        unit: string
    }
    mainImage?: {
        asset?: { url: string }
        alt?: string
    }
    slug: string
    featured?: boolean // added
}

type RelatedPropertiesProps = {
    properties: RelatedProperty[]
}

const formatUSNumber = (n: number | undefined) =>
    typeof n === 'number' ? new Intl.NumberFormat('en-US').format(n) : ''

// Helper function to format area
const formatArea = (property: any) => {
    if (property.totalConstruction?.value) {
        const unit = property.totalConstruction.unit === 'sqm' ? 'sqm' : 'sqft'
        return `${formatUSNumber(property.totalConstruction.value)} ${unit}`
    }
    return null
}

// Helper function to format development
const formatDevelopment = (property: any) => {
    if (Array.isArray(property.development) && property.development.length > 0) {
        return property.development
            .filter((dev: any) => dev && typeof dev === 'string')
            .map((dev: string) => {
                return dev
                    .split('-')
                    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ')
            })
            .join(', ')
    }
    return null
}

export default function RelatedProperties({ properties }: RelatedPropertiesProps) {
    if (!properties || properties.length === 0) return null

    return (
        <section className="py-16 px-6 bg-white">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                    Similar Properties
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {properties.map((property) => {
                        const development = formatDevelopment(property)
                        const area = formatArea(property)

                        return (
                            <Card
                                key={property._id}
                                className="group overflow-hidden border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-700 bg-white rounded-2xl"
                            >
                                {property.mainImage && (
                                    <Link href={`/properties/${property.slug}`}>
                                        <div className="relative h-80 overflow-hidden rounded-t-2xl cursor-pointer">
                                            <Image
                                                src={property.mainImage.asset?.url || '/placeholder.jpg'}
                                                alt={property.mainImage.alt || property.title}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent rounded-t-2xl"></div>
                                            <div className="absolute top-6 left-6">
                                                <Badge className="bg-white/90 text-gray-900 font-semibold shadow-lg hover:bg-white/90 hover:scale-110 transition-all duration-300 text-base px-3 py-1.5">
                                                    ${formatUSNumber(property.price)}
                                                </Badge>
                                            </div>
                                            {property.featured && (
                                                <div className="absolute top-6 right-6">
                                                    <Badge
                                                        style={{ backgroundColor: '#e1c098' }}
                                                        className="text-white font-semibold hover:scale-110 transition-all duration-300 text-base px-3 py-1.5"
                                                    >
                                                        Featured
                                                    </Badge>
                                                </div>
                                            )}
                                        </div>
                                    </Link>
                                )}

                                <CardContent className="p-6">
                                    <Link href={`/properties/${property.slug}`}>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-3 transition-colors hover:opacity-70 cursor-pointer">
                                            {property.title}
                                        </h3>
                                    </Link>

                                    {/* Property Stats - Single Row */}
                                    <div className="flex items-center gap-3 text-gray-600 text-sm flex-wrap mb-4">
                                        <div className="flex items-center space-x-1">
                                            <IoBedOutline className="w-4.5 h-4.5" />
                                            <span className="font-medium">{property.bedrooms || 0}</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <PiBathtub className="w-4.5 h-4.5" />
                                            <span className="font-medium">{property.bathrooms || 0}</span>
                                        </div>
                                        {area && (
                                            <div className="flex items-center space-x-1">
                                                <MdOutlineSquareFoot className="w-4.5 h-4.5" />
                                                <span className="font-medium">{area}</span>
                                            </div>
                                        )}
                                        {development && (
                                            <div className="flex items-center space-x-1 max-w-[150px]">
                                                <IoLocationOutline className="w-4.5 h-4.5 flex-shrink-0" />
                                                <span className="font-medium truncate">{development}</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <Link
                                            href={`/properties/${property.slug}`}
                                            style={{ color: '#e1c098' }}
                                            className="inline-flex items-center hover:opacity-80 font-semibold group-hover:translate-x-2 transition-transform"
                                        >
                                            View Details →
                                        </Link>

                                        <button
                                            onClick={() => {
                                                window.location.href = '/contact#schedule-tour'
                                            }}
                                            className="bg-black text-white px-4 py-2 text-sm rounded-md hover:bg-gray-800 transition-all duration-300 font-medium"
                                        >
                                            Schedule Tour
                                        </button>
                                    </div>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}