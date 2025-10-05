// File: src/components/property/PropertyFeatures.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { IoBedOutline, IoCalendarOutline } from 'react-icons/io5'
import { PiBathtub, PiBuildingApartment } from 'react-icons/pi'
import { MdOutlineSquareFoot, MdOutlineVisibility } from 'react-icons/md'
import { TbRulerMeasure } from 'react-icons/tb'

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

    const features = [
        {
            icon: IoBedOutline,
            label: 'Bedrooms',
            value: bedrooms,
            show: !!bedrooms
        },
        {
            icon: PiBathtub,
            label: 'Bathrooms',
            value: bathrooms,
            show: !!bathrooms
        },
        {
            icon: PiBuildingApartment,
            label: 'Property Type',
            value: propertyType,
            capitalize: true,
            show: !!propertyType
        },
        {
            icon: IoCalendarOutline,
            label: 'Year Built',
            value: yearBuilt,
            show: !!yearBuilt
        },
        {
            icon: MdOutlineVisibility,
            label: 'Primary View',
            value: primaryView,
            capitalize: true,
            show: !!primaryView
        },
        {
            icon: TbRulerMeasure,
            label: 'Lot Area',
            value: lotArea ? `${lotArea.value} ${lotArea.unit}` : null,
            show: !!lotArea
        },
        {
            icon: MdOutlineSquareFoot,
            label: 'Construction Area',
            value: totalConstruction ? `${totalConstruction.value} ${totalConstruction.unit}` : null,
            show: !!totalConstruction
        },
    ].filter(f => f.show)

    return (
        <Card className="border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="border-b border-gray-100 pb-4">
                <div className="flex items-center gap-3">
                    <div
                        className="w-1 h-8 rounded-full"
                        style={{ backgroundColor: '#e1c098' }}
                    />
                    <CardTitle className="text-2xl md:text-3xl font-bold text-gray-900">
                        Property <span style={{ color: '#e1c098' }}>Details</span>
                    </CardTitle>
                </div>
            </CardHeader>
            <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {features.map((feature, index) => {
                        const Icon = feature.icon
                        return (
                            <div
                                key={index}
                                className="flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                            >
                                <div className="flex items-center gap-3">
                                    <div
                                        className="w-10 h-10 rounded-full flex items-center justify-center"
                                        style={{ backgroundColor: 'rgba(225, 192, 152, 0.15)' }}
                                    >
                                        <Icon
                                            className="w-5 h-5"
                                            style={{ color: '#e1c098' }}
                                        />
                                    </div>
                                    <span className="font-medium text-gray-700">
                                        {feature.label}
                                    </span>
                                </div>
                                <span className={`text-gray-900 font-semibold ${feature.capitalize ? 'capitalize' : ''}`}>
                                    {feature.value}
                                </span>
                            </div>
                        )
                    })}
                </div>
            </CardContent>
        </Card>
    )
}