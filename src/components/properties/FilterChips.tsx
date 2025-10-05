// src/components/properties/FilterChips.tsx
import { Badge } from '@/components/ui/badge'
import { nfUS } from '@/lib/filterUtils'

interface FilterChipsProps {
    development: string[]
    neighborhood: string[]
    bedrooms: string
    bathrooms: string
    priceMin: string
    priceMax: string
    type: string
}

export default function FilterChips({
    development,
    neighborhood,
    bedrooms,
    bathrooms,
    priceMin,
    priceMax,
    type,
}: FilterChipsProps) {
    const hasActive =
        development.length ||
        neighborhood.length ||
        bedrooms ||
        bathrooms ||
        priceMin ||
        priceMax ||
        type

    if (!hasActive) return null

    return (
        <div className="flex flex-wrap gap-2">
            {development.map(d => (
                <Badge key={`dev-${d}`} variant="outline">
                    {d}
                </Badge>
            ))}
            {neighborhood.map(n => (
                <Badge key={`n-${n}`} variant="outline">
                    {n}
                </Badge>
            ))}
            {bedrooms && (
                <Badge variant="outline">
                    Bedrooms ≥ {bedrooms}
                </Badge>
            )}
            {bathrooms && (
                <Badge variant="outline">
                    Bathrooms ≥ {bathrooms}
                </Badge>
            )}
            {priceMin && (
                <Badge variant="outline">
                    Min ${nfUS.format(Number(priceMin))}
                </Badge>
            )}
            {priceMax && (
                <Badge variant="outline">
                    Max ${nfUS.format(Number(priceMax))}
                </Badge>
            )}
            {type && (
                <Badge variant="outline">
                    {type}
                </Badge>
            )}
        </div>
    )
}