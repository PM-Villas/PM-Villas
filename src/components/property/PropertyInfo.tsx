// File: src/components/property/PropertyInfo.tsx
import { Badge } from '@/components/ui/badge'
import { IoBedOutline } from 'react-icons/io5'
import { PiBathtub } from 'react-icons/pi'
import { MdOutlineVisibility } from 'react-icons/md'

type PropertyInfoProps = {
    title: string
    price?: number
    bedrooms?: number
    bathrooms?: number
    primaryView?: string
    propertyStatus?: string
    propertyType?: string
    featured?: boolean
}

export default function PropertyInfo({
    title,
    price,
    bedrooms,
    bathrooms,
    primaryView,
    propertyStatus,
    propertyType,
    featured,
}: PropertyInfoProps) {
    return (
        <div className="mt-4 px-4 md:px-6">
            <div className="max-w-7xl mx-auto">
                <div className="rounded-xl bg-white/95 backdrop-blur-sm border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 p-6">
                    {/* Badges Section */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {propertyStatus && (
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
                        )}
                        {featured && (
                            <Badge
                                className="text-xs font-semibold px-3 py-1 text-white"
                                style={{ backgroundColor: '#e1c098' }}
                            >
                                ⭐ Featured
                            </Badge>
                        )}
                        {propertyType && (
                            <Badge
                                variant="outline"
                                className="text-xs font-semibold px-3 py-1 bg-white hover:bg-gray-50 border-2"
                                style={{ borderColor: '#e1c098', color: '#e1c098' }}
                            >
                                {propertyType.replace(/\b\w/g, (l: string) => l.toUpperCase())}
                            </Badge>
                        )}
                    </div>

                    {/* Title with Accent Bar */}
                    <div className="mb-4">
                        <div className="flex items-start gap-3">
                            <div
                                className="w-1 h-10 rounded-full flex-shrink-0 mt-1"
                                style={{ backgroundColor: '#e1c098' }}
                            />
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-gray-900">
                                {title}
                            </h1>
                        </div>
                    </div>

                    {/* Property Features with Icons */}
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                        {bedrooms && (
                            <div className="flex items-center gap-2 group">
                                <div
                                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                                    style={{ backgroundColor: 'rgba(225, 192, 152, 0.15)' }}
                                >
                                    <IoBedOutline
                                        className="w-5 h-5"
                                        style={{ color: '#e1c098' }}
                                    />
                                </div>
                                <div>
                                    <div className="text-lg font-bold text-gray-900">{bedrooms}</div>
                                    <div className="text-xs text-gray-600 font-medium">Bedrooms</div>
                                </div>
                            </div>
                        )}
                        {bathrooms && (
                            <div className="flex items-center gap-2 group">
                                <div
                                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                                    style={{ backgroundColor: 'rgba(225, 192, 152, 0.15)' }}
                                >
                                    <PiBathtub
                                        className="w-5 h-5"
                                        style={{ color: '#e1c098' }}
                                    />
                                </div>
                                <div>
                                    <div className="text-lg font-bold text-gray-900">{bathrooms}</div>
                                    <div className="text-xs text-gray-600 font-medium">Bathrooms</div>
                                </div>
                            </div>
                        )}
                        {primaryView && (
                            <div className="flex items-center gap-2 group">
                                <div
                                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                                    style={{ backgroundColor: 'rgba(225, 192, 152, 0.15)' }}
                                >
                                    <MdOutlineVisibility
                                        className="w-5 h-5"
                                        style={{ color: '#e1c098' }}
                                    />
                                </div>
                                <div>
                                    <div className="text-base font-bold text-gray-900 capitalize">
                                        {primaryView.replace(/\b\w/g, (l: string) => l.toUpperCase())}
                                    </div>
                                    <div className="text-xs text-gray-600 font-medium">View</div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Price Section */}
                    <div className="border-t border-gray-200 pt-4">
                        <div
                            className="text-4xl md:text-5xl font-bold"
                            style={{ color: '#e1c098' }}
                        >
                            ${price?.toLocaleString()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}