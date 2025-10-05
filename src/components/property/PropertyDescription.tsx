// File: src/components/property/PropertyDescription.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

type PropertyDescriptionProps = {
    description?: string
}

export default function PropertyDescription({ description }: PropertyDescriptionProps) {
    if (!description) return null

    return (
        <Card className="border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="border-b border-gray-100 pb-4">
                <div className="flex items-center gap-3">
                    <div
                        className="w-1 h-8 rounded-full"
                        style={{ backgroundColor: '#e1c098' }}
                    />
                    <CardTitle className="text-2xl md:text-3xl font-bold text-gray-900">
                        Property <span style={{ color: '#e1c098' }}>Description</span>
                    </CardTitle>
                </div>
            </CardHeader>
            <CardContent className="pt-6">
                <div className="prose prose-lg max-w-none">
                    <p className="text-gray-700 leading-relaxed text-base md:text-lg whitespace-pre-line">
                        {description}
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}