// File: src/components/property/PropertyDescription.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

type PropertyDescriptionProps = {
    description?: string
}

export default function PropertyDescription({ description }: PropertyDescriptionProps) {
    if (!description) return null

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900">
                    Property Description
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-gray-600 leading-relaxed text-lg">
                    {description}
                </p>
            </CardContent>
        </Card>
    )
}