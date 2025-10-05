// src/components/properties/PropertyFiltersWrapper.tsx - WITH DEFAULTS
'use client'

import { useState, useMemo, useEffect } from 'react'
import PropertyFilters from './PropertyFilters'
import { NEIGHBORHOOD_BY_DEV } from '@/hooks/usePropertyFilters'

interface PropertyFiltersWrapperProps {
    initialBedrooms: string
    initialBathrooms: string
    initialPriceMin: string
    initialPriceMax: string
    initialType: string
    initialDevelopment: string[]
    initialNeighborhood: string[]
    onApply: (filters: {
        bedrooms: string
        bathrooms: string
        priceMin: string
        priceMax: string
        type: string
        development: string[]
        neighborhood: string[]
    }) => void
    onClear: () => void
}

export default function PropertyFiltersWrapper({
    initialBedrooms,
    initialBathrooms,
    initialPriceMin,
    initialPriceMax,
    initialType,
    initialDevelopment,
    initialNeighborhood,
    onApply,
    onClear,
}: PropertyFiltersWrapperProps) {
    // Set default development to "punta-mita" if nothing is selected
    const defaultDevelopment = initialDevelopment.length > 0
        ? initialDevelopment
        : ['punta-mita']

    // Local state for filters (before applying)
    const [bedrooms, setBedrooms] = useState(initialBedrooms)
    const [bathrooms, setBathrooms] = useState(initialBathrooms)
    const [priceMin, setPriceMin] = useState(initialPriceMin)
    const [priceMax, setPriceMax] = useState(initialPriceMax)
    const [type, setType] = useState(initialType)
    const [development, setDevelopment] = useState(defaultDevelopment)
    const [neighborhood, setNeighborhood] = useState(initialNeighborhood)

    // Sync with URL changes (when user navigates)
    useEffect(() => {
        setBedrooms(initialBedrooms)
        setBathrooms(initialBathrooms)
        setPriceMin(initialPriceMin)
        setPriceMax(initialPriceMax)
        setType(initialType)
        // Set default development if URL has none
        setDevelopment(initialDevelopment.length > 0 ? initialDevelopment : ['punta-mita'])
        setNeighborhood(initialNeighborhood)
    }, [
        initialBedrooms,
        initialBathrooms,
        initialPriceMin,
        initialPriceMax,
        initialType,
        initialDevelopment,
        initialNeighborhood,
    ])

    const neighborhoodOptions = useMemo(() => {
        if (!development.length) return []
        const set = new Set<string>()
        development.forEach(d => (NEIGHBORHOOD_BY_DEV[d] || []).forEach(n => set.add(n)))
        return Array.from(set).sort((a, b) => a.localeCompare(b))
    }, [development])

    // Clear invalid neighborhoods when development changes
    useEffect(() => {
        if (!neighborhood.length) return
        const allowed = new Set(neighborhoodOptions)
        const next = neighborhood.filter(n => allowed.has(n))
        if (next.length !== neighborhood.length) setNeighborhood(next)
    }, [neighborhoodOptions]) // eslint-disable-line react-hooks/exhaustive-deps

    const hasActiveFilters =
        bedrooms || bathrooms || priceMin || priceMax || type ||
        development.length || neighborhood.length

    const handleApply = () => {
        onApply({
            bedrooms,
            bathrooms,
            priceMin,
            priceMax,
            type,
            development,
            neighborhood,
        })
    }

    const handleClear = () => {
        // Clear all local state
        setBedrooms('')
        setBathrooms('')
        setPriceMin('')
        setPriceMax('')
        setType('')
        setDevelopment([])
        setNeighborhood([])
        // Call parent clear which will redirect to default
        onClear()
    }

    return (
        <PropertyFilters
            bedrooms={bedrooms}
            bathrooms={bathrooms}
            priceMin={priceMin}
            priceMax={priceMax}
            type={type}
            development={development}
            neighborhood={neighborhood}
            neighborhoodOptions={neighborhoodOptions}
            hasActiveFilters={hasActiveFilters}
            onBedroomsChange={setBedrooms}
            onBathroomsChange={setBathrooms}
            onPriceMinChange={setPriceMin}
            onPriceMaxChange={setPriceMax}
            onTypeChange={setType}
            onDevelopmentChange={setDevelopment}
            onNeighborhoodChange={setNeighborhood}
            onApply={handleApply}
            onClear={handleClear}
        />
    )
}