// src/components/properties/PropertiesBrowser.tsx - SERVER-SIDE VERSION
'use client'

import { useTransition } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import PropertyFiltersWrapper from './PropertyFiltersWrapper'
import PropertyGrid from './PropertyGrid'
import Pagination from './Pagination'
import type { Property } from '@/hooks/usePropertyFilters'

interface PropertiesBrowserProps {
    properties: Property[]
    total: number
    currentPage: number
    totalPages: number
    hasMore: boolean
}

const parseCSV = (v: string | null): string[] => {
    if (!v) return []
    return v.split(',').map(s => s.trim()).filter(Boolean)
}

export default function PropertiesBrowser({
    properties,
    total,
    currentPage,
    totalPages,
    hasMore
}: PropertiesBrowserProps) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [isPending, startTransition] = useTransition()

    // Read filters from URL
    const bedrooms = searchParams.get('bedrooms') || ''
    const bathrooms = searchParams.get('bathrooms') || ''
    const priceMin = searchParams.get('priceMin') || ''
    const priceMax = searchParams.get('priceMax') || ''
    const type = searchParams.get('type') || ''
    const development = parseCSV(searchParams.get('development'))
    const neighborhood = parseCSV(searchParams.get('neighborhood'))

    const handleApply = (filters: {
        bedrooms: string
        bathrooms: string
        priceMin: string
        priceMax: string
        type: string
        development: string[]
        neighborhood: string[]
    }) => {
        const p = new URLSearchParams()

        // Reset to page 1 when filters change
        p.delete('page')

        if (filters.bedrooms) p.set('bedrooms', filters.bedrooms)
        if (filters.bathrooms) p.set('bathrooms', filters.bathrooms)
        if (filters.priceMin) p.set('priceMin', filters.priceMin)
        if (filters.priceMax) p.set('priceMax', filters.priceMax)
        if (filters.type) p.set('type', filters.type)
        if (filters.development.length) p.set('development', filters.development.join(','))
        if (filters.neighborhood.length) p.set('neighborhood', filters.neighborhood.join(','))

        startTransition(() => {
            router.push(`${pathname}?${p.toString()}`)
        })
    }

    const handleClear = () => {
        startTransition(() => {
            router.push(pathname)
        })
    }

    return (
        <>
            <PropertyFiltersWrapper
                initialBedrooms={bedrooms}
                initialBathrooms={bathrooms}
                initialPriceMin={priceMin}
                initialPriceMax={priceMax}
                initialType={type}
                initialDevelopment={development}
                initialNeighborhood={neighborhood}
                totalCount={total}
                onApply={handleApply}
                onClear={handleClear}
            />

            <PropertyGrid properties={properties} />

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                hasMore={hasMore}
            />
        </>
    )
}