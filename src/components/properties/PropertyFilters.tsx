// src/components/properties/PropertyFilters.tsx - COMPLETE FIX WITH MOBILE TOGGLE
'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import MultiSelect from './MultiSelect'
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
    hasActiveFilters: boolean
    onBedroomsChange: (v: string) => void
    onBathroomsChange: (v: string) => void
    onPriceMinChange: (v: string) => void
    onPriceMaxChange: (v: string) => void
    onTypeChange: (v: string) => void
    onDevelopmentChange: (v: string[]) => void
    onNeighborhoodChange: (v: string[]) => void
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
    hasActiveFilters,
    onBedroomsChange,
    onBathroomsChange,
    onPriceMinChange,
    onPriceMaxChange,
    onTypeChange,
    onDevelopmentChange,
    onNeighborhoodChange,
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
    }

    const handleBathroomsChange = (value: string) => {
        onBathroomsChange(value === '__any__' ? '' : value)
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

    // Validate price range on blur
    const validatePriceRange = () => {
        if (priceMin && priceMax) {
            const minNum = Number(priceMin)
            const maxNum = Number(priceMax)
            if (maxNum < minNum) {
                // Adjust max to equal min if it's less
                onPriceMaxChange(priceMin)
            }
        }
    }

    // Show arrows when focused OR when there's a value
    const showMinPriceArrows = minPriceFocused || !!priceMin
    const showMaxPriceArrows = maxPriceFocused || !!priceMax

    // Handle search - close mobile filters
    const handleSearch = () => {
        onApply()
        setMobileFiltersOpen(false)
    }

    // Handle clear - close mobile filters
    const handleClear = () => {
        onClear()
        setMobileFiltersOpen(false)
    }

    return (
        <section className="sticky top-16 z-40 bg-white shadow-sm border-b border-gray-200 lg:border-b-0">
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
                                onChange={onDevelopmentChange}
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
                                onChange={onNeighborhoodChange}
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
                                    onBlur={() => setMinPriceFocused(false)}
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
                                            }}
                                        >▲</button>
                                        <button
                                            type="button"
                                            aria-label="Decrease min price"
                                            className="h-[18px] w-4 flex items-center justify-center text-[10px] text-gray-400 hover:text-gray-600 leading-none"
                                            onClick={() => {
                                                const current = priceMin ? Number(priceMin) : 0
                                                handlePriceMinChange(String(Math.max(0, current - 250000)))
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
                                            }}
                                        >▲</button>
                                        <button
                                            type="button"
                                            aria-label="Decrease max price"
                                            className="h-[18px] w-4 flex items-center justify-center text-[10px] text-gray-400 hover:text-gray-600 leading-none"
                                            onClick={() => {
                                                const current = priceMax ? Number(priceMax) : 0
                                                handlePriceMaxChange(String(Math.max(0, current - 250000)))
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
                            <Select value={type || '__any__'} onValueChange={(v) => onTypeChange(v === '__any__' ? '' : v)}>
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

                        {/* Search & Clear Buttons */}
                        <div className="flex gap-1.5 ml-auto">
                            <Button
                                onClick={handleSearch}
                                className="h-10 px-6 text-white font-semibold"
                                style={{ backgroundColor: BRAND_COLOR }}
                            >
                                <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                Search
                            </Button>

                            {hasActiveFilters && (
                                <Button
                                    onClick={handleClear}
                                    variant="ghost"
                                    className="h-10 px-4 text-gray-600 hover:text-gray-900"
                                >
                                    Clear
                                </Button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Mobile Filter Toggle Button */}
                <div className="lg:hidden -mt-px">
                    <Button
                        onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                        className="w-full h-11 text-white font-semibold flex items-center justify-center gap-2 rounded-none"
                        style={{ backgroundColor: BRAND_COLOR }}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                        </svg>
                        {mobileFiltersOpen ? 'Hide Filters' : 'Show Filters'}
                        {hasActiveFilters && !mobileFiltersOpen && (
                            <span className="ml-1 bg-white text-gray-900 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                                !
                            </span>
                        )}
                    </Button>
                </div>

                {/* Mobile Filter Panel - Collapsible */}
                {mobileFiltersOpen && (
                    <div className="lg:hidden pb-4 px-4 space-y-3 bg-gray-50">
                        {/* Row 1: Development, Neighborhood */}
                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <Label className="text-xs font-medium text-gray-600 mb-1.5 block">
                                    Development
                                </Label>
                                <MultiSelect
                                    label=""
                                    options={DEV_OPTIONS}
                                    values={development}
                                    onChange={onDevelopmentChange}
                                    placeholder="Development"
                                    showDisplayNames="development"
                                />
                            </div>
                            <div>
                                <Label className="text-xs font-medium text-gray-600 mb-1.5 block">
                                    Neighborhood
                                </Label>
                                <MultiSelect
                                    label=""
                                    options={neighborhoodOptions}
                                    values={neighborhood}
                                    onChange={onNeighborhoodChange}
                                    placeholder="Neighborhood"
                                    showDisplayNames="neighborhood"
                                />
                            </div>
                        </div>

                        {/* Row 2: Beds, Baths */}
                        <div className="grid grid-cols-2 gap-2">
                            <div>
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

                            <div>
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
                        </div>

                        {/* Row 3: Price Range */}
                        <div className="grid grid-cols-2 gap-2">
                            <div className="relative">
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
                                    onBlur={() => setMinPriceFocused(false)}
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
                                            }}
                                        >▲</button>
                                        <button
                                            type="button"
                                            aria-label="Decrease min price"
                                            className="h-[18px] w-4 flex items-center justify-center text-[10px] text-gray-400 hover:text-gray-600 leading-none"
                                            onClick={() => {
                                                const current = priceMin ? Number(priceMin) : 0
                                                handlePriceMinChange(String(Math.max(0, current - 250000)))
                                            }}
                                        >▼</button>
                                    </div>
                                )}
                            </div>
                            <div className="relative">
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
                                            }}
                                        >▲</button>
                                        <button
                                            type="button"
                                            aria-label="Decrease max price"
                                            className="h-[18px] w-4 flex items-center justify-center text-[10px] text-gray-400 hover:text-gray-600 leading-none"
                                            onClick={() => {
                                                const current = priceMax ? Number(priceMax) : 0
                                                handlePriceMaxChange(String(Math.max(0, current - 250000)))
                                            }}
                                        >▼</button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Row 4: Property Type */}
                        <div>
                            <Label className="text-xs font-medium text-gray-600 mb-1.5 block">
                                Property Type
                            </Label>
                            <Select value={type || '__any__'} onValueChange={(v) => onTypeChange(v === '__any__' ? '' : v)}>
                                <SelectTrigger className="h-10 border-gray-300">
                                    <SelectValue placeholder="Property Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="__any__">Any Type</SelectItem>
                                    {['Condo', 'Villa', 'Land'].map(t => (
                                        <SelectItem key={t} value={t.toLowerCase()}>{t}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Row 5: Search & Clear Buttons */}
                        <div className="flex gap-2 pt-2">
                            <Button
                                onClick={handleSearch}
                                className="flex-1 h-10 text-white font-semibold"
                                style={{ backgroundColor: BRAND_COLOR }}
                            >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                Search
                            </Button>
                            {hasActiveFilters && (
                                <Button
                                    onClick={handleClear}
                                    variant="outline"
                                    className="h-10 px-6"
                                >
                                    Clear
                                </Button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}