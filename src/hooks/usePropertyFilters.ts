// src/hooks/usePropertyFilters.ts - MATCHING SANITY SCHEMA
import { useMemo, useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

export type Property = {
    _id: string
    title: string
    price?: number
    bedrooms?: number
    bathrooms?: number
    propertyType?: string
    propertyStatus?: string
    development?: string[]
    neighborhood?: string[]
    primaryView?: string
    featured?: boolean
    staffService?: boolean
    lotAreaSqFt?: number
    lotAreaSqM?: number
    totalConstructionSqFt?: number
    totalConstructionSqM?: number
    mainImage?: { asset?: { _id: string; url: string }; alt?: string }
    slug: string
    description?: string
}

const parseCSV = (v: string | null): string[] => {
    if (!v) return []
    return v.split(',').map(s => s.trim()).filter(Boolean)
}

const norm = (s?: string) => (s ?? '').toLowerCase().replace(/[\s\-_&]+/g, '')

// Punta Mita neighborhoods (kebab-case to match Sanity)
const PM_NEIGHBORHOODS = [
    'bahia-estates',
    'bella-vista',
    'el-encanto',
    'four-seasons',
    'hacienda-de-mita',
    'iyari',
    'kupuri-estates',
    'la-punta',
    'la-serenata',
    'lagos-del-mar',
    'las-marietas',
    'las-palmas',
    'las-terrazas',
    'las-vistas',
    'montage',
    'pacifico-estates',
    'porta-fortuna',
    'ranchos',
    'seven-eight-residences',
    'surf-residences',
    'tau',
].sort((a, b) => a.localeCompare(b))

// Litibu neighborhoods (kebab-case to match Sanity)
const LITIBU_NEIGHBORHOODS = [
    'litibu-bay-club',
    'uavi'
].sort((a, b) => a.localeCompare(b))

export const NEIGHBORHOOD_BY_DEV: Record<string, string[]> = {
    'punta-mita': PM_NEIGHBORHOODS,
    'litibu': LITIBU_NEIGHBORHOODS,
    'aubierge': [],
    'nauka': [],
}

export function usePropertyFilters(properties: Property[]) {
    const searchParams = useSearchParams()

    // State
    const [bedrooms, setBedrooms] = useState(searchParams.get('bedrooms') || '')
    const [bathrooms, setBathrooms] = useState(searchParams.get('bathrooms') || '')
    const [priceMin, setPriceMin] = useState(searchParams.get('priceMin') || '')
    const [priceMax, setPriceMax] = useState(searchParams.get('priceMax') || '')
    const [type, setType] = useState(searchParams.get('type') || '')
    const [development, setDevelopment] = useState<string[]>(parseCSV(searchParams.get('development')))
    const [neighborhood, setNeighborhood] = useState<string[]>(parseCSV(searchParams.get('neighborhood')))

    // Sync with URL
    useEffect(() => {
        setBedrooms(searchParams.get('bedrooms') || '')
        setBathrooms(searchParams.get('bathrooms') || '')
        setPriceMin(searchParams.get('priceMin') || '')
        setPriceMax(searchParams.get('priceMax') || '')
        setType(searchParams.get('type') || '')
        setDevelopment(parseCSV(searchParams.get('development')))
        setNeighborhood(parseCSV(searchParams.get('neighborhood')))
    }, [searchParams])

    // Dependent neighborhood options
    const neighborhoodOptions = useMemo(() => {
        if (!development.length) return []
        const set = new Set<string>()
        development.forEach(d => (NEIGHBORHOOD_BY_DEV[d] || []).forEach(n => set.add(n)))
        return Array.from(set).sort((a, b) => a.localeCompare(b))
    }, [development])

    // Clear neighborhoods when invalid
    useEffect(() => {
        if (!neighborhood.length) return
        const allowed = new Set(neighborhoodOptions)
        const next = neighborhood.filter(n => allowed.has(n))
        if (next.length !== neighborhood.length) setNeighborhood(next)
    }, [neighborhoodOptions]) // eslint-disable-line react-hooks/exhaustive-deps

    // Filtered properties
    const filtered = useMemo(() => {
        const bedMin = bedrooms ? Number(bedrooms) : undefined
        const bathMin = bathrooms ? Number(bathrooms) : undefined
        const pMin = priceMin ? Number(priceMin) : undefined
        const pMax = priceMax ? Number(priceMax) : undefined

        return properties.filter((prop) => {
            if (bedMin !== undefined && (prop.bedrooms ?? 0) < bedMin) return false
            if (bathMin !== undefined && (prop.bathrooms ?? 0) < bathMin) return false
            if (pMin !== undefined && (prop.price ?? 0) < pMin) return false
            if (pMax !== undefined && (prop.price ?? 0) > pMax) return false
            if (type && (prop.propertyType?.toLowerCase() !== type)) return false

            if (development.length) {
                const devs = (prop.development || []).map(norm)
                const wanted = development.map(norm)
                if (!devs.some(d => wanted.includes(d))) return false
            }

            if (neighborhood.length) {
                const nbs = (prop.neighborhood || []).map(norm)
                const wanted = neighborhood.map(norm)
                if (!nbs.some(n => wanted.includes(n))) return false
            }

            return true
        })
    }, [properties, bedrooms, bathrooms, priceMin, priceMax, type, development, neighborhood])

    const hasActiveFilters =
        bedrooms || bathrooms || priceMin || priceMax || type ||
        development.length || neighborhood.length

    return {
        filters: {
            bedrooms,
            bathrooms,
            priceMin,
            priceMax,
            type,
            development,
            neighborhood,
        },
        setFilters: {
            setBedrooms,
            setBathrooms,
            setPriceMin,
            setPriceMax,
            setType,
            setDevelopment,
            setNeighborhood,
        },
        neighborhoodOptions,
        filtered,
        hasActiveFilters,
    }
}