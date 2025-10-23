// src/components/properties/FilterBottomSheet.tsx
// All improvements applied: Reactive filters, Refine results subtitle
'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
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
    onApply: (overrides?: Partial<{
        bedrooms: string
        bathrooms: string
        priceMin: string
        priceMax: string
        type: string
        development: string[]
        neighborhood: string[]
    }>) => void
    onDebouncedApply: (overrides?: Partial<{
        bedrooms: string
        bathrooms: string
        priceMin: string
        priceMax: string
        type: string
        development: string[]
        neighborhood: string[]
    }>) => void
    onClear: () => void
    hasActiveFilters: boolean
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
    onDebouncedApply,
    onClear,
    hasActiveFilters,
}: FilterBottomSheetProps) {
    // Track focus state for price inputs
    const [minPriceFocused, setMinPriceFocused] = useState(false)
    const [maxPriceFocused, setMaxPriceFocused] = useState(false)

    // Drag state for swipe-to-close
    const [dragStart, setDragStart] = useState(0)
    const [dragOffset, setDragOffset] = useState(0)
    const [isDragging, setIsDragging] = useState(false)

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

    // Reset drag offset when sheet opens/closes
    useEffect(() => {
        if (!isOpen) {
            setDragOffset(0)
            setIsDragging(false)
        }
    }, [isOpen])

    // Handle drag to close
    const handleTouchStart = (e: React.TouchEvent) => {
        setDragStart(e.touches[0].clientY)
        setIsDragging(true)
    }

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isDragging) return
        const currentY = e.touches[0].clientY
        const offset = currentY - dragStart
        // Only allow dragging down (positive offset)
        if (offset > 0) {
            setDragOffset(offset)
        }
    }

    const handleTouchEnd = () => {
        setIsDragging(false)
        // If dragged down more than 100px, close the sheet
        if (dragOffset > 100) {
            onClose()
        }
        setDragOffset(0)
    }

    if (!isOpen) return null

    const handleBedroomsChange = (value: string) => {
        const newValue = value === '__any__' ? '' : value
        onBedroomsChange(newValue)
        onDebouncedApply({ bedrooms: newValue })
    }

    const handleBathroomsChange = (value: string) => {
        const newValue = value === '__any__' ? '' : value
        onBathroomsChange(newValue)
        onDebouncedApply({ bathrooms: newValue })
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

    // Validate price range on blur and apply filters
    const validatePriceRange = () => {
        if (priceMin && priceMax) {
            const minNum = Number(priceMin)
            const maxNum = Number(priceMax)
            if (maxNum < minNum) {
                onPriceMaxChange(priceMin)
            }
        }
        onApply()
    }

    // Show arrows when focused OR when there's a value
    const showMinPriceArrows = minPriceFocused || !!priceMin
    const showMaxPriceArrows = maxPriceFocused || !!priceMax

    // Reactive handlers for immediate filter application
    const handleDevelopmentChange = (values: string[]) => {
        onDevelopmentChange(values)
        onDebouncedApply({ development: values })
    }

    const handleNeighborhoodChange = (values: string[]) => {
        onNeighborhoodChange(values)
        onDebouncedApply({ neighborhood: values })
    }

    const handleTypeChange = (value: string) => {
        const newValue = value === '__any__' ? '' : value
        onTypeChange(newValue)
        onDebouncedApply({ type: newValue })
    }

    // Handle price blur - apply filters when user leaves input
    const handlePriceBlur = () => {
        onApply()
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
                className="fixed inset-0 bg-black/50 z-[9999] transition-opacity duration-300 lg:hidden"
                onClick={onClose}
                style={{
                    animation: isOpen ? 'fadeIn 300ms ease-out' : 'fadeOut 300ms ease-out',
                }}
            />

            {/* Bottom Sheet */}
            <div
                className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-[10000] lg:hidden shadow-2xl flex flex-col"
                style={{
                    animation: !isDragging ? (isOpen ? 'slideUp 300ms ease-out' : 'slideDown 300ms ease-out') : 'none',
                    maxHeight: '85vh',
                    transform: `translateY(${dragOffset}px)`,
                    transition: isDragging ? 'none' : 'transform 0.2s ease-out',
                }}
            >
                {/* Handle bar - draggable */}
                <div
                    className="flex justify-center pt-2 pb-1 cursor-grab active:cursor-grabbing"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
                </div>

                {/* Header */}
                <div className="px-6 pt-1 pb-3 border-b border-gray-200">
                    <h3 className="text-lg font-bold text-gray-900">Filter Properties</h3>
                    <p className="text-xs text-gray-500 mt-0.5">Refine your results</p>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto px-6 py-3 space-y-2.5">
                    {/* Development */}
                    <div>
                        <Label className="text-xs font-semibold text-gray-700 mb-1.5 block">
                            Development
                        </Label>
                        <MultiSelect
                            label=""
                            options={developmentOptions}
                            values={development}
                            onChange={handleDevelopmentChange}
                            placeholder="Select development"
                            showDisplayNames="development"
                        />
                    </div>

                    {/* Neighborhood */}
                    <div>
                        <Label className="text-xs font-semibold text-gray-700 mb-1.5 block">
                            Neighborhood
                        </Label>
                        <MultiSelect
                            label=""
                            options={neighborhoodOptions}
                            values={neighborhood}
                            onChange={handleNeighborhoodChange}
                            placeholder="Select neighborhood"
                            showDisplayNames="neighborhood"
                        />
                    </div>

                    {/* Bedrooms & Bathrooms */}
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <Label className="text-xs font-semibold text-gray-700 mb-1.5 block">
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
                            <Label className="text-xs font-semibold text-gray-700 mb-1.5 block">
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

                    {/* Price Range */}
                    <div>
                        <Label className="text-xs font-semibold text-gray-700 mb-1.5 block">
                            Price Range
                        </Label>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="relative">
                                <Input
                                    inputMode="numeric"
                                    placeholder="Min price"
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
                                    <div className="absolute right-1.5 top-[10px] flex flex-col gap-0">
                                        <button
                                            type="button"
                                            aria-label="Increase min price"
                                            className="h-[18px] w-4 flex items-center justify-center text-[10px] text-gray-400 hover:text-gray-600 leading-none"
                                            onClick={() => {
                                                const current = priceMin ? Number(priceMin) : 0
                                                const newValue = String(current + 250000)
                                                handlePriceMinChange(newValue)
                                                onApply({ priceMin: newValue })
                                            }}
                                        >▲</button>
                                        <button
                                            type="button"
                                            aria-label="Decrease min price"
                                            className="h-[18px] w-4 flex items-center justify-center text-[10px] text-gray-400 hover:text-gray-600 leading-none"
                                            onClick={() => {
                                                const current = priceMin ? Number(priceMin) : 0
                                                const newValue = String(Math.max(0, current - 250000))
                                                handlePriceMinChange(newValue)
                                                onApply({ priceMin: newValue })
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
                                    className="h-10 border-gray-300 pr-6"
                                />
                                {showMaxPriceArrows && (
                                    <div className="absolute right-1.5 top-[10px] flex flex-col gap-0">
                                        <button
                                            type="button"
                                            aria-label="Increase max price"
                                            className="h-[18px] w-4 flex items-center justify-center text-[10px] text-gray-400 hover:text-gray-600 leading-none"
                                            onClick={() => {
                                                const current = priceMax ? Number(priceMax) : 0
                                                const newValue = String(current + 250000)
                                                handlePriceMaxChange(newValue)
                                                onApply({ priceMax: newValue })
                                            }}
                                        >▲</button>
                                        <button
                                            type="button"
                                            aria-label="Decrease max price"
                                            className="h-[18px] w-4 flex items-center justify-center text-[10px] text-gray-400 hover:text-gray-600 leading-none"
                                            onClick={() => {
                                                const current = priceMax ? Number(priceMax) : 0
                                                const newValue = String(Math.max(0, current - 250000))
                                                handlePriceMaxChange(newValue)
                                                onApply({ priceMax: newValue })
                                            }}
                                        >▼</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Property Type */}
                    <div>
                        <Label className="text-xs font-semibold text-gray-700 mb-1.5 block">
                            Property Type
                        </Label>
                        <Select value={type || '__any__'} onValueChange={handleTypeChange}>
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
                </div>

                {/* Sticky Footer with Clear Button */}
                {hasActiveFilters && (
                    <div className="border-t border-gray-200 px-6 py-3 bg-white">
                        <Button
                            onClick={handleClearFilters}
                            variant="outline"
                            className="w-full h-10 text-sm font-semibold"
                        >
                            Clear All Filters
                        </Button>
                    </div>
                )}

                {/* Safe area padding for iOS */}
                <div className="h-2" />
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
