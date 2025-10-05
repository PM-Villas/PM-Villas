// File: src/components/property/PropertyInfo.tsx
import { Badge } from '@/components/ui/badge'
import { IoBedOutline } from 'react-icons/io5'
import { PiBathtub, PiBuildingApartment } from 'react-icons/pi'
import { MdOutlineVisibility, MdOutlineSquareFoot } from 'react-icons/md'
import { TbRulerMeasure } from 'react-icons/tb'
import { HiOutlineLocationMarker } from 'react-icons/hi'
import { FaMapMarkerAlt } from 'react-icons/fa'

type PropertyInfoProps = {
    title: string
    price?: number
    bedrooms?: number
    bathrooms?: number
    primaryView?: string
    propertyStatus?: string
    propertyType?: string
    featured?: boolean
    development?: string[]
    neighborhood?: string[]
    lotArea?: {
        value: number
        unit: string
    }
    totalConstruction?: {
        value: number
        unit: string
    }
}

export default function PropertyInfo({
    title,
    price,
    bedrooms,
    bathrooms,
    propertyStatus,
    development,
    neighborhood,
}: PropertyInfoProps) {
    return (
        <div className="mt-4 px-4 md:px-6">
            <div className="max-w-7xl mx-auto">
                <div className="rounded-xl bg-white/95 backdrop-blur-sm border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 p-6">
                    {/* Status Badge Only */}
                    {propertyStatus && (
                        <div className="flex flex-wrap gap-2 mb-4">
                            <Badge
                                className={`text-xs font-semibold px-3 py-1 ${propertyStatus === 'for-sale'
                                    ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                                    : propertyStatus === 'sold'
                                        ? 'bg-red-500 text-white hover:bg-red-600'
                                        : propertyStatus === 'under-contract'
                                            ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                                            : 'bg-blue-500 text-white hover:bg-blue-600'
                                    }`}
                            >
                                {propertyStatus.replace('-', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
                            </Badge>
                        </div>
                    )}

                    {/* Title and Price Row */}
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                        {/* Title */}
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                            {title}
                        </h1>

                        {/* Price */}
                        <div
                            className="text-3xl md:text-4xl font-bold md:text-right"
                            style={{ color: '#e1c098' }}
                        >
                            ${price?.toLocaleString()}
                        </div>
                    </div>

                    {/* Ultra Compact Info Row - Bed, Bath, Development, Neighborhood Only */}
                    <div className="flex flex-wrap items-center gap-4 text-gray-600">
                        {bedrooms && (
                            <div className="flex items-center gap-1.5">
                                <IoBedOutline className="w-5 h-5" />
                                <span className="font-medium">{bedrooms}</span>
                            </div>
                        )}
                        {bathrooms && (
                            <div className="flex items-center gap-1.5">
                                <PiBathtub className="w-5 h-5" />
                                <span className="font-medium">{bathrooms}</span>
                            </div>
                        )}
                        {development && development.length > 0 && (
                            <div className="flex items-center gap-1.5">
                                <HiOutlineLocationMarker className="w-5 h-5" />
                                <span className="font-medium capitalize">
                                    {development[0].replace('-', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
                                </span>
                            </div>
                        )}
                        {neighborhood && neighborhood.length > 0 && (
                            <div className="flex items-center gap-1.5">
                                <FaMapMarkerAlt className="w-4 h-4" />
                                <span className="font-medium capitalize">
                                    {neighborhood[0].replace('-', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}