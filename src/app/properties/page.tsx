import { client } from '@/lib/sanity'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

// Get all properties
async function getAllProperties() {
    return await client.fetch(`
    *[_type == "property"] | order(_createdAt desc) {
      _id,
      title,
      price,
      bedrooms,
      bathrooms,
      propertyType,
      propertyStatus,
      development,
      neighborhood,
      primaryView,
      mainImage {
        asset->{
          _id,
          url
        },
        alt
      },
      "slug": slug.current,
      featured,
      description
    }
  `)
}

export default async function PropertiesPage() {
    const properties = await getAllProperties()

    return (
        <main className="min-h-screen bg-white">
            {/* Header */}
            <section className="relative py-24 px-6 bg-gradient-to-r from-slate-900 to-slate-800">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        Our Properties
                    </h1>
                    <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                        Discover luxury villas and exclusive properties in Punta Mita's most prestigious locations
                    </p>
                </div>
            </section>

            {/* Filter Bar */}
            <section className="py-8 px-6 bg-slate-50 border-b">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-wrap gap-4 items-center justify-between">
                        <div className="flex flex-wrap gap-3">
                            <Badge variant="outline" className="cursor-pointer hover:bg-emerald-50 hover:border-emerald-300">
                                All Properties
                            </Badge>
                            <Badge variant="outline" className="cursor-pointer hover:bg-emerald-50 hover:border-emerald-300">
                                Villas
                            </Badge>
                            <Badge variant="outline" className="cursor-pointer hover:bg-emerald-50 hover:border-emerald-300">
                                Condos
                            </Badge>
                            <Badge variant="outline" className="cursor-pointer hover:bg-emerald-50 hover:border-emerald-300">
                                Land
                            </Badge>
                            <Badge variant="outline" className="cursor-pointer hover:bg-emerald-50 hover:border-emerald-300">
                                Featured
                            </Badge>
                        </div>
                        <div className="text-sm text-gray-600">
                            {properties.length} properties found
                        </div>
                    </div>
                </div>
            </section>

            {/* Properties Grid */}
            <section className="py-16 px-6">
                <div className="max-w-7xl mx-auto">
                    {properties.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {properties.map((property: any) => (
                                <Card key={property._id} className="group overflow-hidden border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white">
                                    {property.mainImage && (
                                        <div className="relative h-64 overflow-hidden">
                                            <Image
                                                src={property.mainImage?.asset?.url || '/placeholder.jpg'}
                                                alt={property.mainImage?.alt || property.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                                            {/* Price Badge */}
                                            <div className="absolute top-4 left-4">
                                                <Badge className="bg-white text-gray-900 font-bold shadow-lg">
                                                    ${property.price?.toLocaleString()}
                                                </Badge>
                                            </div>

                                            {/* Status Badge */}
                                            <div className="absolute top-4 right-4">
                                                <Badge
                                                    className={`font-semibold shadow-lg ${property.propertyStatus === 'for-sale'
                                                        ? 'bg-emerald-500 text-white'
                                                        : property.propertyStatus === 'sold'
                                                            ? 'bg-red-500 text-white'
                                                            : property.propertyStatus === 'under-contract'
                                                                ? 'bg-yellow-500 text-white'
                                                                : 'bg-blue-500 text-white'
                                                        }`}
                                                >
                                                    {property.propertyStatus?.replace('-', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
                                                </Badge>
                                            </div>

                                            {/* Featured Badge */}
                                            {property.featured && (
                                                <div className="absolute bottom-4 left-4">
                                                    <Badge className="bg-orange-500 text-white font-semibold">
                                                        Featured
                                                    </Badge>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    <CardContent className="p-6">
                                        <div className="mb-4">
                                            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors line-clamp-2">
                                                {property.title}
                                            </h3>

                                            {property.development && property.development.length > 0 && (
                                                <p className="text-sm text-gray-600 mb-2">
                                                    {property.development.map((dev: string) => dev.replace('-', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())).join(', ')}
                                                </p>
                                            )}

                                            <p className="text-sm text-gray-600 line-clamp-2">
                                                {property.description}
                                            </p>
                                        </div>

                                        {/* Property Details */}
                                        <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
                                            <div className="flex items-center space-x-4">
                                                {property.bedrooms && (
                                                    <div className="flex items-center space-x-1">
                                                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                                                        <span>{property.bedrooms} Beds</span>
                                                    </div>
                                                )}
                                                {property.bathrooms && (
                                                    <div className="flex items-center space-x-1">
                                                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                                        <span>{property.bathrooms} Baths</span>
                                                    </div>
                                                )}
                                            </div>

                                            <Badge variant="outline" className="capitalize text-xs">
                                                {property.propertyType}
                                            </Badge>
                                        </div>

                                        {/* View and Primary View */}
                                        {property.primaryView && (
                                            <div className="mb-4">
                                                <Badge variant="secondary" className="text-xs capitalize">
                                                    {property.primaryView} View
                                                </Badge>
                                            </div>
                                        )}

                                        <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
                                            <Link
                                                href={`/properties/${property.slug}`}
                                                className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-semibold text-sm transition-colors"
                                            >
                                                View Details
                                                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                </svg>
                                            </Link>

                                            <Button size="sm" variant="outline" className="text-xs">
                                                Schedule Tour
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gray-100 flex items-center justify-center">
                                <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m0 0h4M9 7h1m-1 4h1m4-4h1m-1 4h1" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">No properties available</h3>
                            <p className="text-gray-600">Check back soon for new luxury property listings.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-slate-900">
                <div className="max-w-4xl mx-auto text-center px-6">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        Looking for Something Specific?
                    </h2>
                    <p className="text-xl text-gray-300 mb-8">
                        Our expert team can help you find the perfect property in Punta Mita
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white px-8">
                            Contact Our Team
                        </Button>
                        <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-gray-900 px-8">
                            Schedule Consultation
                        </Button>
                    </div>
                </div>
            </section>
        </main>
    )
}