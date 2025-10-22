// src/components/properties/FilterBottomSheet.tsx
'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { Loader2 } from 'lucide-react'
import MultiSelect from './MultiSelect'
import {
    formatPrice,
    onCurrencyChange,
    onPriceKeyDown,
} from '@/lib/filterUtils'

interface FilterBottomSheetProps {
    isOpen: boolean
    onClose: () => void

    // Filter values
    bedrooms: string
    bathrooms: string
    priceMin: string
    priceMax: string
    type: string
    development: string[]
    neighborhood: string[]

    // Options
    developmentOptions: string[]
    neighborhoodOptions: string[]

    // State setters
    onBedroomsChange: (v: string) => void
    onBathroomsChange: (v: string) => void
    onPriceMinChange: (v: string) => void
    onPriceMaxChange: (v: string) => void
    onTypeChange: (v: string) => void
    onDevelopmentChange: (v: string[]) => void
    onNeighborhoodChange: (v: string[]) => void

    // Actions
    onApply: () => void
    onClear: () => void
    hasActiveFilters: boolean
    isSearching: boolean
}

const BRAND_COLOR = '#e1c098'

export default function FilterBottomSheet({
    isOpen,
    onClose,
    bedrooms,
    bathrooms,
    priceMin,
    priceMax,
    type,
    development,
    neighborhood,
    developmentOptions,
    neighborhoodOptions,
    onBedroomsChange,
    onBathroomsChange,
    onPriceMinChange,
    onPriceMaxChange,
    onTypeChange,
    onDevelopmentChange,
    onNeighborhoodChange,
    onApply,
    onClear,
    hasActiveFilters,
    isSearching,
}: FilterBottomSheetProps) {
    // Track focus state for price inputs
    const [minPriceFocused, setMinPriceFocused] = useState(false)
    const [maxPriceFocused, setMaxPriceFocused] = useState(false)

    // Prevent body scroll when sheet is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => {
            document.body.style.overflow = ''
        }
    }, [isOpen])

    // Handle ESC key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose()
            }
        }
        document.addEventListener('keydown', handleEsc)
        return () => document.removeEventListener('keydown', handleEsc)
    }, [isOpen, onClose])

    if (!isOpen) return null

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
        onPriceMaxChange(value)
    }

    // Validate price range on blur
    const validatePriceRange = () => {
        if (priceMin && priceMax) {
            const minNum = Number(priceMin)
            const maxNum = Number(priceMax)
            if (maxNum < minNum) {
                onPriceMaxChange(priceMin)
            }
        }
    }

    // Show arrows when focused OR when there's a value
    const showMinPriceArrows = minPriceFocused || !!priceMin
    const showMaxPriceArrows = maxPriceFocused || !!priceMax

    // Handle search - close sheet
    const handleSearch = () => {
        onApply()
        onClose()
    }

    // Handle clear - close sheet
    const handleClearFilters = () => {
        onClear()
        onClose()
    }

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/50 z-[100] transition-opacity duration-300 lg:hidden"
                onClick={onClose}
                style={{
                    animation: isOpen ? 'fadeIn 300ms ease-out' : 'fadeOut 300ms ease-out',
                }}
            />

            {/* Bottom Sheet */}
            <div
                className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-[101] lg:hidden shadow-2xl flex flex-col"
                style={{
                    animation: isOpen ? 'slideUp 300ms ease-out' : 'slideDown 300ms ease-out',
                    maxHeight: '85vh',
                }}
            >
                {/* Handle bar */}
                <div className="flex justify-center pt-3 pb-2">
                    <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
                </div>

                {/* Header */}
                <div className="px-6 pt-2 pb-4 border-b border-gray-200">
                    <h3 className="text-xl font-bold text-gray-900">Filter Properties</h3>
                    <p className="text-sm text-gray-500 mt-1">Refine your search results</p>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                    {/* Development */}
                    <div>
                        <Label className="text-sm font-semibold text-gray-700 mb-2 block">
                            Development
                        </Label>
                        <MultiSelect
                            label=""
                            options={developmentOptions}
                            values={development}
                            onChange={onDevelopmentChange}
                            placeholder="Select development"
                            showDisplayNames="development"
                        />
                    </div>

                    {/* Neighborhood */}
                    <div>
                        <Label className="text-sm font-semibold text-gray-700 mb-2 block">
                            Neighborhood
                        </Label>
                        <MultiSelect
                            label=""
                            options={neighborhoodOptions}
                            values={neighborhood}
                            onChange={onNeighborhoodChange}
                            placeholder="Select neighborhood"
                            showDisplayNames="neighborhood"
                        />
                    </div>

                    {/* Bedrooms & Bathrooms */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label className="text-sm font-semibold text-gray-700 mb-2 block">
                                Bedrooms
                            </Label>
                            <Select
                                value={bedrooms || '__any__'}
                                onValueChange={handleBedroomsChange}
                            >
                                <SelectTrigger className="h-11 border-gray-300">
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
                            <Label className="text-sm font-semibold text-gray-700 mb-2 block">
                                Bathrooms
                            </Label>
                            <Select
                                value={bathrooms || '__any__'}
                                onValueChange={handleBathroomsChange}
                            >
                                <SelectTrigger className="h-11 border-gray-300">
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

                    {/* Price Range */}
                    <div>
                        <Label className="text-sm font-semibold text-gray-700 mb-2 block">
                            Price Range
                        </Label>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="relative">
                                <Input
                                    inputMode="numeric"
                                    placeholder="Min price"
                                    value={formatPrice(priceMin)}
                                    onChange={onCurrencyChange(handlePriceMinChange)}
                                    onKeyDown={onPriceKeyDown(priceMin, handlePriceMinChange)}
                                    onFocus={() => setMinPriceFocused(true)}
                                    onBlur={() => setMinPriceFocused(false)}
                                    className="h-11 border-gray-300 pr-6"
                                />
                                {showMinPriceArrows && (
                                    <div className="absolute right-1.5 top-[10px] flex flex-col gap-0">
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
                                <Input
                                    inputMode="numeric"
                                    placeholder="Max price"
                                    value={formatPrice(priceMax)}
                                    onChange={onCurrencyChange(handlePriceMaxChange)}
                                    onKeyDown={onPriceKeyDown(priceMax, handlePriceMaxChange)}
                                    onFocus={() => setMaxPriceFocused(true)}
                                    onBlur={() => {
                                        setMaxPriceFocused(false)
                                        validatePriceRange()
                                    }}
                                    className="h-11 border-gray-300 pr-6"
                                />
                                {showMaxPriceArrows && (
                                    <div className="absolute right-1.5 top-[10px] flex flex-col gap-0">
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
                    </div>

                    {/* Property Type */}
                    <div>
                        <Label className="text-sm font-semibold text-gray-700 mb-2 block">
                            Property Type
                        </Label>
                        <Select value={type || '__any__'} onValueChange={(v) => onTypeChange(v === '__any__' ? '' : v)}>
                            <SelectTrigger className="h-11 border-gray-300">
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
                </div>

                {/* Sticky Footer with Buttons */}
                <div className="border-t border-gray-200 px-6 py-4 bg-white">
                    <div className="flex gap-3">
                        <Button
                            onClick={handleSearch}
                            disabled={isSearching}
                            className="flex-1 h-12 text-white font-semibold text-base"
                            style={{ backgroundColor: BRAND_COLOR }}
                        >
                            {isSearching ? (
                                <>
                                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                    Searching...
                                </>
                            ) : (
                                <>
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                    Search
                                </>
                            )}
                        </Button>
                        {hasActiveFilters && (
                            <Button
                                onClick={handleClearFilters}
                                variant="outline"
                                className="h-12 px-6 text-base font-semibold"
                            >
                                Clear
                            </Button>
                        )}
                    </div>
                </div>

                {/* Safe area padding for iOS */}
                <div className="h-4" />
            </div>

            {/* CSS Animations */}
            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes fadeOut {
                    from { opacity: 1; }
                    to { opacity: 0; }
                }
                @keyframes slideUp {
                    from { transform: translateY(100%); }
                    to { transform: translateY(0); }
                }
                @keyframes slideDown {
                    from { transform: translateY(0); }
                    to { transform: translateY(100%); }
                }
            `}</style>
        </>
    )
}
