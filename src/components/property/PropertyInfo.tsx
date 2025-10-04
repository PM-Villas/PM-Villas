// File: src/components/property/PropertyInfo.tsx
import { Badge } from '@/components/ui/badge'

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
        <div className="mt-6">
            <div className="max-w-7xl mx-auto rounded-xl bg-white/90 backdrop-blur-sm border border-gray-200 shadow-sm p-8">
                <div className="space-y-4">
                    <div className="flex flex-wrap gap-3 mb-4">
                        {propertyStatus && (
                            <Badge
                                className={`text-sm font-semibold ${propertyStatus === 'for-sale'
                                    ? 'bg-emerald-500 text-white'
                                    : propertyStatus === 'sold'
                                        ? 'bg-red-500 text-white'
                                        : propertyStatus === 'under-contract'
                                            ? 'bg-yellow-500 text-white'
                                            : 'bg-blue-500 text-white'
                                    }`}
                            >
                                {propertyStatus.replace('-', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
                            </Badge>
                        )}
                        {featured && (
                            <Badge className="bg-orange-500 text-white text-sm font-semibold">
                                Featured Property
                            </Badge>
                        )}
                        {propertyType && (
                            <Badge variant="outline" className="bg-white text-gray-900 text-sm font-semibold">
                                {propertyType.replace(/\b\w/g, (l: string) => l.toUpperCase())}
                            </Badge>
                        )}
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold leading-tight text-gray-900">
                        {title}
                    </h1>

                    <div className="flex items-center space-x-6 text-lg text-gray-800">
                        {bedrooms && (
                            <div className="flex items-center space-x-2">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                                </svg>
                                <span>{bedrooms} Bedrooms</span>
                            </div>
                        )}
                        {bathrooms && (
                            <div className="flex items-center space-x-2">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        fillRule="evenodd"
                                        d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <span>{bathrooms} Bathrooms</span>
                            </div>
                        )}
                        {primaryView && (
                            <div className="flex items-center space-x-2">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                    <path
                                        fillRule="evenodd"
                                        d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <span>{primaryView.replace(/\b\w/g, (l: string) => l.toUpperCase())} View</span>
                            </div>
                        )}
                    </div>

                    <div className="text-5xl font-bold text-emerald-400">
                        ${price?.toLocaleString()}
                    </div>
                </div>
            </div>
        </div>
    )
}