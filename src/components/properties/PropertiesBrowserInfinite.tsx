// File: src/components/properties/PropertiesBrowserInfinite.tsx
'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import PropertyFiltersWrapper from './PropertyFiltersWrapper'
import PropertyCard from './PropertyCard'
import type { Property } from '@/hooks/usePropertyFilters'
import { loadMoreProperties } from '@/app/actions/loadMoreProperties'
import { Loader2 } from 'lucide-react'

interface PropertiesBrowserInfiniteProps {
    initialProperties: Property[]
    total: number
    hasMore: boolean
    searchParams: any
}

const ITEMS_PER_LOAD = 12

export default function PropertiesBrowserInfinite({
    initialProperties,
    total,
    hasMore: initialHasMore,
    searchParams,
}: PropertiesBrowserInfiniteProps) {
    const router = useRouter()
    const pathname = usePathname()

    const [properties, setProperties] = useState(initialProperties)
    const [hasMore, setHasMore] = useState(initialHasMore)
    const [isLoading, setIsLoading] = useState(false)
    const [isSearching, setIsSearching] = useState(false)
    const [page, setPage] = useState(1)

    const observerTarget = useRef<HTMLDivElement>(null)

    // Auto-apply Punta Mita filter on first load if no params
    useEffect(() => {
        const hasAnyParams =
            searchParams.bedrooms ||
            searchParams.bathrooms ||
            searchParams.priceMin ||
            searchParams.priceMax ||
            searchParams.type ||
            searchParams.development ||
            searchParams.neighborhood

        // If no params at all, redirect with punta-mita default
        if (!hasAnyParams) {
            router.replace(`${pathname}?development=punta-mita`)
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    // Reset when filters change
    useEffect(() => {
        setProperties(initialProperties)
        setHasMore(initialHasMore)
        setPage(1)
        setIsSearching(false)
    }, [initialProperties, initialHasMore])

    // Load more function
    const loadMore = useCallback(async () => {
        if (isLoading || !hasMore) return

        setIsLoading(true)

        try {
            const result = await loadMoreProperties({
                offset: page * ITEMS_PER_LOAD,
                limit: ITEMS_PER_LOAD,
                bedrooms: searchParams.bedrooms,
                bathrooms: searchParams.bathrooms,
                priceMin: searchParams.priceMin,
                priceMax: searchParams.priceMax,
                type: searchParams.type,
                development: searchParams.development,
                neighborhood: searchParams.neighborhood,
                sort: searchParams.sort,
            })

            setProperties(prev => [...prev, ...result.properties])
            setHasMore(result.hasMore)
            setPage(prev => prev + 1)
        } catch (error) {
            console.error('Error loading more properties:', error)
        } finally {
            setIsLoading(false)
        }
    }, [isLoading, hasMore, page, searchParams])

    // Intersection Observer for infinite scroll
    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting && hasMore && !isLoading) {
                    loadMore()
                }
            },
            { threshold: 0.1 }
        )

        const currentTarget = observerTarget.current
        if (currentTarget) {
            observer.observe(currentTarget)
        }

        return () => {
            if (currentTarget) {
                observer.unobserve(currentTarget)
            }
        }
    }, [hasMore, isLoading, loadMore])

    // Filter handlers
    const handleApply = (filters: {
        bedrooms: string
        bathrooms: string
        priceMin: string
        priceMax: string
        type: string
        development: string[]
        neighborhood: string[]
        sort: string
    }) => {
        setIsSearching(true)
        const p = new URLSearchParams()

        if (filters.bedrooms) p.set('bedrooms', filters.bedrooms)
        if (filters.bathrooms) p.set('bathrooms', filters.bathrooms)
        if (filters.priceMin) p.set('priceMin', filters.priceMin)
        if (filters.priceMax) p.set('priceMax', filters.priceMax)
        if (filters.type) p.set('type', filters.type)
        if (filters.development.length) p.set('development', filters.development.join(','))
        if (filters.neighborhood.length) p.set('neighborhood', filters.neighborhood.join(','))
        if (filters.sort && filters.sort !== 'featured') p.set('sort', filters.sort)

        router.push(`${pathname}?${p.toString()}`)
    }

    const handleClear = () => {
        // Clear ALL filters - redirect to properties page without any query params
        // The auto-apply effect will then add the default punta-mita filter
        router.push(pathname)
    }

    const parseCSV = (v: string | undefined): string[] => {
        if (!v) return []
        return v.split(',').map(s => s.trim()).filter(Boolean)
    }

    return (
        <>
            {/* Filters - Always Visible */}
            <PropertyFiltersWrapper
                initialBedrooms={searchParams.bedrooms || ''}
                initialBathrooms={searchParams.bathrooms || ''}
                initialPriceMin={searchParams.priceMin || ''}
                initialPriceMax={searchParams.priceMax || ''}
                initialType={searchParams.type || ''}
                initialDevelopment={parseCSV(searchParams.development)}
                initialNeighborhood={parseCSV(searchParams.neighborhood)}
                initialSort={searchParams.sort || 'featured'}
                isSearching={isSearching}
                onApply={handleApply}
                onClear={handleClear}
            />

            {/* Properties Grid with Infinite Scroll */}
            <section className="py-12 px-6">
                <div className="max-w-7xl mx-auto">
                    {properties.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {properties.map((property) => (
                                    <PropertyCard key={property._id} property={property} />
                                ))}
                            </div>

                            {/* Loading indicator and scroll trigger */}
                            <div ref={observerTarget} className="py-8">
                                {isLoading && (
                                    <div className="flex justify-center items-center gap-2 text-slate-600">
                                        <Loader2 className="h-6 w-6 animate-spin" style={{ color: '#e1c098' }} />
                                        <span className="text-sm font-medium">Loading more properties...</span>
                                    </div>
                                )}
                                {!hasMore && properties.length > 0 && (
                                    <p className="text-center text-slate-500 text-sm">
                                        You&apos;ve reached the end. Showing all {properties.length} properties.
                                    </p>
                                )}
                            </div>
                        </>
                    ) : (
                        <div className="text-center py-16">
                            <div className="W-32 h-32 mx-auto mb-8 rounded-full bg-gray-100 flex items-center justify-center">
                                <svg
                                    className="w-16 h-16 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1}
                                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m0 0h4M9 7h1m-1 4h1m4-4h1m-1 4h1"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                No properties match these filters
                            </h3>
                            <p className="text-gray-600">
                                Try changing or clearing filters to see more listings.
                            </p>
                        </div>
                    )}
                </div>
            </section>
        </>
    )
}
