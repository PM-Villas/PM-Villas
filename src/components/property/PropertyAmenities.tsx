// File: src/components/property/PropertyAmenities.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

type PropertyAmenitiesProps = {
    staffService?: string[]
    investmentHighlights?: string
}

export default function PropertyAmenities({ staffService, investmentHighlights }: PropertyAmenitiesProps) {
    return (
        <>
            {/* Staff Services */}
            {staffService && staffService.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold text-gray-900">
                            Staff Services
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {staffService.map((service: string, index: number) => (
                                <div key={index} className="flex items-center space-x-2 text-gray-700">
                                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                                    <span className="text-sm">
                                        {service.replace('-', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Investment Highlights */}
            {investmentHighlights && (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold text-gray-900">
                            Investment Highlights
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-600 leading-relaxed">{investmentHighlights}</p>
                    </CardContent>
                </Card>
            )}
        </>
    )
}