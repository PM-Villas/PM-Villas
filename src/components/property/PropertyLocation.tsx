// File: src/components/property/PropertyLocation.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MapPin, Building2 } from 'lucide-react'

type PropertyLocationProps = {
    development?: string[]
    neighborhood?: string[]
}

export default function PropertyLocation({ development, neighborhood }: PropertyLocationProps) {
    // Only show if at least one location field exists
    const hasLocation = (development && development.length > 0) || (neighborhood && neighborhood.length > 0)

    if (!hasLocation) return null

    return (
        <Card className="border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="border-b border-gray-100 pb-4">
                <div className="flex items-center gap-3">
                    <div
                        className="w-1 h-8 rounded-full"
                        style={{ backgroundColor: '#e1c098' }}
                    />
                    <CardTitle className="text-2xl md:text-3xl font-bold text-gray-900">
                        Location & <span style={{ color: '#e1c098' }}>Development</span>
                    </CardTitle>
                </div>
            </CardHeader>
            <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {development && development.length > 0 && (
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 mb-4">
                                <div
                                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                                    style={{ backgroundColor: 'rgba(225, 192, 152, 0.1)' }}
                                >
                                    <Building2
                                        className="w-4 h-4"
                                        style={{ color: '#e1c098' }}
                                    />
                                </div>
                                <h4 className="font-semibold text-gray-900 text-base">Development</h4>
                            </div>
                            <div className="space-y-2">
                                {development.map((dev: string, index: number) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-3 p-3 rounded-lg bg-white border border-gray-200 hover:border-gray-300 transition-colors group"
                                    >
                                        <div
                                            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                                            style={{ backgroundColor: '#e1c098' }}
                                        />
                                        <span className="text-gray-700 group-hover:text-gray-900 transition-colors font-medium">
                                            {dev.replace('-', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {neighborhood && neighborhood.length > 0 && (
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 mb-4">
                                <div
                                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                                    style={{ backgroundColor: 'rgba(225, 192, 152, 0.1)' }}
                                >
                                    <MapPin
                                        className="w-4 h-4"
                                        style={{ color: '#e1c098' }}
                                    />
                                </div>
                                <h4 className="font-semibold text-gray-900 text-base">Neighborhood</h4>
                            </div>
                            <div className="space-y-2">
                                {neighborhood.map((n: string, index: number) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-3 p-3 rounded-lg bg-white border border-gray-200 hover:border-gray-300 transition-colors group"
                                    >
                                        <div
                                            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                                            style={{ backgroundColor: '#e1c098' }}
                                        />
                                        <span className="text-gray-700 group-hover:text-gray-900 transition-colors font-medium">
                                            {n.replace('-', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}