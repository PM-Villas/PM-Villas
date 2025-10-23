// src/components/properties/PropertyFilters.tsx
'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import MultiSelect from './MultiSelect'
import FilterBottomSheet from './FilterBottomSheet'
import SortBottomSheet from './SortBottomSheet'
import {
    DEV_OPTIONS,
    formatPrice,
    onCurrencyChange,
    onPriceKeyDown,
} from '@/lib/filterUtils'

interface PropertyFiltersProps {
    bedrooms: string
    bathrooms: string
    priceMin: string
    priceMax: string
    type: string
    development: string[]
    neighborhood: string[]
    neighborhoodOptions: string[]
    sort: string
    hasActiveFilters: boolean
    activeFilterCount: number
    isSearching: boolean
    onBedroomsChange: (v: string) => void
    onBathroomsChange: (v: string) => void
    onPriceMinChange: (v: string) => void
    onPriceMaxChange: (v: string) => void
    onTypeChange: (v: string) => void
    onDevelopmentChange: (v: string[]) => void
    onNeighborhoodChange: (v: string[]) => void
    onSortChange: (v: string) => void
    onApply: () => void
    onClear: () => void
}

const BRAND_COLOR = '#e1c098'

export default function PropertyFilters({
    bedrooms,
    bathrooms,
    priceMin,
    priceMax,
    type,
    development,
    neighborhood,
    neighborhoodOptions,
    sort,
    hasActiveFilters,
    activeFilterCount,
    isSearching,
    onBedroomsChange,
    onBathroomsChange,
    onPriceMinChange,
    onPriceMaxChange,
    onTypeChange,
    onDevelopmentChange,
    onNeighborhoodChange,
    onSortChange,
    onApply,
    onClear,
}: PropertyFiltersProps) {
    // Track focus state for price inputs
    const [minPriceFocused, setMinPriceFocused] = useState(false)
    const [maxPriceFocused, setMaxPriceFocused] = useState(false)

    // Mobile filter toggle
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

    const handleBedroomsChange = (value: string) => {
        onBedroomsChange(value === '__any__' ? '' : value)
        onApply()
    }

    const handleBathroomsChange = (value: string) => {
        onBathroomsChange(value === '__any__' ? '' : value)
        onApply()
    }

    // Price validation - prevent max from being less than min
    const handlePriceMinChange = (value: string) => {
        onPriceMinChange(value)

        // If max is set and new min is greater than max, adjust max
        if (priceMax && value) {
            const minNum = Number(value)
            const maxNum = Number(priceMax)
            if (minNum > maxNum) {
                onPriceMaxChange(value)
            }
        }
    }

    const handlePriceMaxChange = (value: string) => {
        // Always allow typing - don't block input
        onPriceMaxChange(value)
    }

    // Validate price range on blur and apply filters
    const validatePriceRange = () => {
        if (priceMin && priceMax) {
            const minNum = Number(priceMin)
            const maxNum = Number(priceMax)
            if (maxNum < minNum) {
                // Adjust max to equal min if it's less
                onPriceMaxChange(priceMin)
            }
        }
        onApply()
    }

    // Handle price blur - apply filters when user leaves input
    const handlePriceBlur = () => {
        onApply()
    }

    // Reactive handlers for immediate filter application
    const handleDevelopmentChange = (values: string[]) => {
        onDevelopmentChange(values)
        onApply()
    }

    const handleNeighborhoodChange = (values: string[]) => {
        onNeighborhoodChange(values)
        onApply()
    }

    const handleTypeChange = (value: string) => {
        onTypeChange(value === '__any__' ? '' : value)
        onApply()
    }

    // Show arrows when focused OR when there's a value
    const showMinPriceArrows = minPriceFocused || !!priceMin
    const showMaxPriceArrows = maxPriceFocused || !!priceMax

    // Mobile sort sheet toggle
    const [mobileSortOpen, setMobileSortOpen] = useState(false)

    // Helper function to get sort indicator icon
    const getSortIndicator = (sortValue: string) => {
        switch (sortValue) {
            case 'price-low':
                return '↑'
            case 'price-high':
                return '↓'
            case 'featured':
            default:
                return (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                )
        }
    }

    return (
        <section className="sticky top-15 z-40 bg-white shadow-sm border-b border-gray-200 lg:border-b-0">
            <div className="max-w-7xl mx-auto lg:px-4 lg:sm:px-6">
                {/* Desktop Filter Bar */}
                <div className="hidden lg:block py-3">
                    <div className="flex items-end gap-2">
                        {/* Development */}
                        <div className="w-[160px]">
                            <Label className="text-xs font-medium text-gray-600 mb-1.5 block">
                                Development
                            </Label>
                            <MultiSelect
                                label=""
                                options={DEV_OPTIONS}
                                values={development}
                                onChange={handleDevelopmentChange}
                                placeholder="Development"
                                showDisplayNames="development"
                            />
                        </div>

                        {/* Neighborhood */}
                        <div className="w-[170px]">
                            <Label className="text-xs font-medium text-gray-600 mb-1.5 block">
                                Neighborhood
                            </Label>
                            <MultiSelect
                                label=""
                                options={neighborhoodOptions}
                                values={neighborhood}
                                onChange={handleNeighborhoodChange}
                                placeholder="Neighborhood"
                                showDisplayNames="neighborhood"
                            />
                        </div>

                        {/* Bedrooms */}
                        <div className="w-[120px]">
                            <Label className="text-xs font-medium text-gray-600 mb-1.5 block">
                                Bedrooms
                            </Label>
                            <Select
                                value={bedrooms || '__any__'}
                                onValueChange={handleBedroomsChange}
                            >
                                <SelectTrigger className="h-10 border-gray-300">
                                    <SelectValue placeholder="Bedrooms" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="__any__">Any Beds</SelectItem>
                                    {[1, 2, 3, 4, 5, 6].map(num => (
                                        <SelectItem key={num} value={String(num)}>{num}+ Beds</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Bathrooms */}
                        <div className="w-[120px]">
                            <Label className="text-xs font-medium text-gray-600 mb-1.5 block">
                                Bathrooms
                            </Label>
                            <Select
                                value={bathrooms || '__any__'}
                                onValueChange={handleBathroomsChange}
                            >
                                <SelectTrigger className="h-10 border-gray-300">
                                    <SelectValue placeholder="Bathrooms" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="__any__">Any Baths</SelectItem>
                                    {[1, 2, 3, 4, 5, 6].map(num => (
                                        <SelectItem key={num} value={String(num)}>{num}+ Baths</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Price Range */}
                        <div className="flex items-end gap-1.5">
                            <div className="w-[130px] relative">
                                <Label className="text-xs font-medium text-gray-600 mb-1.5 block">
                                    Min Price
                                </Label>
                                <Input
                                    inputMode="numeric"
                                    placeholder="Min"
                                    value={formatPrice(priceMin)}
                                    onChange={onCurrencyChange(handlePriceMinChange)}
                                    onKeyDown={onPriceKeyDown(priceMin, handlePriceMinChange)}
                                    onFocus={() => setMinPriceFocused(true)}
                                    onBlur={() => {
                                        setMinPriceFocused(false)
                                        handlePriceBlur()
                                    }}
                                    className="h-10 border-gray-300 pr-6"
                                />
                                {showMinPriceArrows && (
                                    <div className="absolute right-1.5 top-[26px] flex flex-col gap-0">
                                        <button
                                            type="button"
                                            aria-label="Increase min price"
                                            className="h-[18px] w-4 flex items-center justify-center text-[10px] text-gray-400 hover:text-gray-600 leading-none"
                                            onClick={() => {
                                                const current = priceMin ? Number(priceMin) : 0
                                                handlePriceMinChange(String(current + 250000))
                                                onApply()
                                            }}
                                        >▲</button>
                                        <button
                                            type="button"
                                            aria-label="Decrease min price"
                                            className="h-[18px] w-4 flex items-center justify-center text-[10px] text-gray-400 hover:text-gray-600 leading-none"
                                            onClick={() => {
                                                const current = priceMin ? Number(priceMin) : 0
                                                handlePriceMinChange(String(Math.max(0, current - 250000)))
                                                onApply()
                                            }}
                                        >▼</button>
                                    </div>
                                )}
                            </div>
                            <span className="text-gray-400 mb-2 text-sm">-</span>
                            <div className="w-[130px] relative">
                                <Label className="text-xs font-medium text-gray-600 mb-1.5 block">
                                    Max Price
                                </Label>
                                <Input
                                    inputMode="numeric"
                                    placeholder="Max"
                                    value={formatPrice(priceMax)}
                                    onChange={onCurrencyChange(handlePriceMaxChange)}
                                    onKeyDown={onPriceKeyDown(priceMax, handlePriceMaxChange)}
                                    onFocus={() => setMaxPriceFocused(true)}
                                    onBlur={() => {
                                        setMaxPriceFocused(false)
                                        validatePriceRange()
                                    }}
                                    className="h-10 border-gray-300 pr-6"
                                />
                                {showMaxPriceArrows && (
                                    <div className="absolute right-1.5 top-[26px] flex flex-col gap-0">
                                        <button
                                            type="button"
                                            aria-label="Increase max price"
                                            className="h-[18px] w-4 flex items-center justify-center text-[10px] text-gray-400 hover:text-gray-600 leading-none"
                                            onClick={() => {
                                                const current = priceMax ? Number(priceMax) : 0
                                                handlePriceMaxChange(String(current + 250000))
                                                onApply()
                                            }}
                                        >▲</button>
                                        <button
                                            type="button"
                                            aria-label="Decrease max price"
                                            className="h-[18px] w-4 flex items-center justify-center text-[10px] text-gray-400 hover:text-gray-600 leading-none"
                                            onClick={() => {
                                                const current = priceMax ? Number(priceMax) : 0
                                                handlePriceMaxChange(String(Math.max(0, current - 250000)))
                                                onApply()
                                            }}
                                        >▼</button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Property Type */}
                        <div className="w-[130px]">
                            <Label className="text-xs font-medium text-gray-600 mb-1.5 block">
                                Type
                            </Label>
                            <Select value={type || '__any__'} onValueChange={handleTypeChange}>
                                <SelectTrigger className="h-10 border-gray-300">
                                    <SelectValue placeholder="Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="__any__">Any Type</SelectItem>
                                    {['Condo', 'Villa', 'Land'].map(t => (
                                        <SelectItem key={t} value={t.toLowerCase()}>{t}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Clear Button */}
                        {hasActiveFilters && (
                            <div className="ml-auto">
                                <Button
                                    onClick={onClear}
                                    variant="ghost"
                                    className="h-10 px-4 text-gray-600 hover:text-gray-900"
                                >
                                    Clear All
                                </Button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Mobile Filter & Sort Toggle Buttons */}
                <div className="lg:hidden -mt-px flex">
                    <Button
                        onClick={() => setMobileFiltersOpen(true)}
                        className="flex-1 h-11 text-white font-semibold flex items-center justify-center gap-2 rounded-none"
                        style={{ backgroundColor: BRAND_COLOR }}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                        </svg>
                        Filters
                        {hasActiveFilters && activeFilterCount > 0 && (
                            <span className="ml-1 bg-white text-gray-900 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                                {activeFilterCount}
                            </span>
                        )}
                    </Button>
                    <Button
                        onClick={() => setMobileSortOpen(true)}
                        className="flex-1 h-11 text-white font-semibold flex items-center justify-center gap-2 rounded-none"
                        style={{ backgroundColor: BRAND_COLOR }}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
                        </svg>
                        Sort
                        {sort && sort !== 'featured' && (
                            typeof getSortIndicator(sort) === 'string' ? (
                                <span className="ml-1 bg-white text-gray-900 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                                    {getSortIndicator(sort)}
                                </span>
                            ) : (
                                <span className="ml-1 bg-white text-gray-900 rounded-full w-5 h-5 flex items-center justify-center">
                                    {getSortIndicator(sort)}
                                </span>
                            )
                        )}
                    </Button>
                </div>

                {/* Mobile Filter Bottom Sheet */}
                <FilterBottomSheet
                    isOpen={mobileFiltersOpen}
                    onClose={() => setMobileFiltersOpen(false)}
                    bedrooms={bedrooms}
                    bathrooms={bathrooms}
                    priceMin={priceMin}
                    priceMax={priceMax}
                    type={type}
                    development={development}
                    neighborhood={neighborhood}
                    developmentOptions={DEV_OPTIONS}
                    neighborhoodOptions={neighborhoodOptions}
                    onBedroomsChange={onBedroomsChange}
                    onBathroomsChange={onBathroomsChange}
                    onPriceMinChange={onPriceMinChange}
                    onPriceMaxChange={onPriceMaxChange}
                    onTypeChange={onTypeChange}
                    onDevelopmentChange={onDevelopmentChange}
                    onNeighborhoodChange={onNeighborhoodChange}
                    onApply={onApply}
                    onClear={onClear}
                    hasActiveFilters={hasActiveFilters}
                />

                {/* Mobile Sort Bottom Sheet */}
                <SortBottomSheet
                    isOpen={mobileSortOpen}
                    currentSort={sort || 'featured'}
                    onClose={() => setMobileSortOpen(false)}
                    onSortChange={onSortChange}
                />
            </div>
        </section>
    )
}