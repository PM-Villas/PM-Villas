// File: src/components/property/PropertyFeatures.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

type PropertyFeaturesProps = {
    bedrooms?: number
    bathrooms?: number
    propertyType?: string
    yearBuilt?: number
    primaryView?: string
    lotArea?: {
        value: number
        unit: string
    }
    totalConstruction?: {
        value: number
        unit: string
    }
}

export default function PropertyFeatures({
    bedrooms,
    bathrooms,
    propertyType,
    yearBuilt,
    primaryView,
    lotArea,
    totalConstruction,
}: PropertyFeaturesProps) {
    // Only show the card if at least one feature exists
    const hasFeatures = bedrooms || bathrooms || propertyType || yearBuilt || primaryView || lotArea || totalConstruction

    if (!hasFeatures) return null

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900">
                    Property Details
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {bedrooms && (
                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                            <span className="font-medium text-gray-700">Bedrooms</span>
                            <span className="text-gray-900">{bedrooms}</span>
                        </div>
                    )}
                    {bathrooms && (
                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                            <span className="font-medium text-gray-700">Bathrooms</span>
                            <span className="text-gray-900">{bathrooms}</span>
                        </div>
                    )}
                    {propertyType && (
                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                            <span className="font-medium text-gray-700">Property Type</span>
                            <span className="text-gray-900 capitalize">{propertyType}</span>
                        </div>
                    )}
                    {yearBuilt && (
                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                            <span className="font-medium text-gray-700">Year Built</span>
                            <span className="text-gray-900">{yearBuilt}</span>
                        </div>
                    )}
                    {primaryView && (
                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                            <span className="font-medium text-gray-700">Primary View</span>
                            <span className="text-gray-900 capitalize">{primaryView}</span>
                        </div>
                    )}
                    {lotArea && (
                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                            <span className="font-medium text-gray-700">Lot Area</span>
                            <span className="text-gray-900">
                                {lotArea.value} {lotArea.unit}
                            </span>
                        </div>
                    )}
                    {totalConstruction && (
                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                            <span className="font-medium text-gray-700">Construction Area</span>
                            <span className="text-gray-900">
                                {totalConstruction.value} {totalConstruction.unit}
                            </span>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}