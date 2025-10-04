// File: src/components/property/PropertyLocation.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

type PropertyLocationProps = {
    development?: string[]
    neighborhood?: string[]
}

export default function PropertyLocation({ development, neighborhood }: PropertyLocationProps) {
    // Only show if at least one location field exists
    const hasLocation = (development && development.length > 0) || (neighborhood && neighborhood.length > 0)

    if (!hasLocation) return null

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900">
                    Location & Development
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {development && development.length > 0 && (
                    <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Development</h4>
                        <div className="flex flex-wrap gap-2">
                            {development.map((dev: string, index: number) => (
                                <Badge key={index} variant="secondary" className="text-sm">
                                    {dev.replace('-', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
                                </Badge>
                            ))}
                        </div>
                    </div>
                )}
                {neighborhood && neighborhood.length > 0 && (
                    <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Neighborhood</h4>
                        <div className="flex flex-wrap gap-2">
                            {neighborhood.map((n: string, index: number) => (
                                <Badge key={index} variant="outline" className="text-sm">
                                    {n.replace('-', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
                                </Badge>
                            ))}
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}