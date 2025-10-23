// src/components/properties/PropertyFiltersWrapper.tsx
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
    initialSort: string
    isSearching: boolean
    onApply: (filters: {
        bedrooms: string
        bathrooms: string
        priceMin: string
        priceMax: string
        type: string
        development: string[]
        neighborhood: string[]
    }) => void
    onSortChange: (sort: string) => void
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
    initialSort,
    isSearching,
    onApply,
    onSortChange,
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

    // Calculate hasActiveFilters based on LOCAL STATE (not URL params)
    // Ensure boolean type (avoid string | boolean)
    const hasActiveFilters = useMemo<boolean>(() => {
        const isDefaultDevelopmentOnly =
            development.length === 1 && development[0] === 'punta-mita'

        return !!(
            (bedrooms && bedrooms.length > 0) ||
            (bathrooms && bathrooms.length > 0) ||
            (priceMin && priceMin.length > 0) ||
            (priceMax && priceMax.length > 0) ||
            (type && type.length > 0) ||
            !isDefaultDevelopmentOnly ||
            neighborhood.length > 0
        )
    }, [bedrooms, bathrooms, priceMin, priceMax, type, development, neighborhood])

    // Calculate active filter count
    const activeFilterCount = useMemo<number>(() => {
        let count = 0
        if (bedrooms && bedrooms.length > 0) count++
        if (bathrooms && bathrooms.length > 0) count++
        if (priceMin && priceMin.length > 0) count++
        if (priceMax && priceMax.length > 0) count++
        if (type && type.length > 0) count++

        // Count non-default developments
        const isDefaultDevelopmentOnly =
            development.length === 1 && development[0] === 'punta-mita'
        if (!isDefaultDevelopmentOnly) {
            count += development.length
        }

        // Count neighborhoods
        count += neighborhood.length

        return count
    }, [bedrooms, bathrooms, priceMin, priceMax, type, development, neighborhood])

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
        // Clear all local state immediately
        setBedrooms('')
        setBathrooms('')
        setPriceMin('')
        setPriceMax('')
        setType('')
        setDevelopment(['punta-mita']) // Reset to default
        setNeighborhood([])
        // Call parent clear which will update URL
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
            sort={initialSort}
            hasActiveFilters={hasActiveFilters}
            activeFilterCount={activeFilterCount}
            isSearching={isSearching}
            onBedroomsChange={setBedrooms}
            onBathroomsChange={setBathrooms}
            onPriceMinChange={setPriceMin}
            onPriceMaxChange={setPriceMax}
            onTypeChange={setType}
            onDevelopmentChange={setDevelopment}
            onNeighborhoodChange={setNeighborhood}
            onSortChange={onSortChange}
            onApply={handleApply}
            onClear={handleClear}
        />
    )
}
