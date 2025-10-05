// src/components/properties/PropertyGrid.tsx
import PropertyCard from './PropertyCard'
import type { Property } from '@/hooks/usePropertyFilters'

interface PropertyGridProps {
    properties: Property[]
}

export default function PropertyGrid({ properties }: PropertyGridProps) {
    if (properties.length === 0) {
        return (
            <section className="py-12 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center py-16">
                        <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gray-100 flex items-center justify-center">
                            <svg
                                className="w-16 h-16 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1}
                                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m0 0h4M9 7h1m-1 4h1m4-4h1m-1 4h1"
                                />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                            No properties match these filters
                        </h3>
                        <p className="text-gray-600">
                            Try changing or clearing filters to see more listings.
                        </p>
                    </div>
                </div>
            </section>
        )
    }

    return (
        <section className="py-12 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {properties.map((property) => (
                        <PropertyCard key={property._id} property={property} />
                    ))}
                </div>
            </div>
        </section>
    )
}