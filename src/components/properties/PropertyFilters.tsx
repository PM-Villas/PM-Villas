// src/components/properties/PropertyFilters.tsx - COMPLETE FINAL VERSION
'use client'

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
    const handleBedroomsChange = (value: string) => {
        onBedroomsChange(value === '__any__' ? '' : value)
    }

    const handleBathroomsChange = (value: string) => {
        onBathroomsChange(value === '__any__' ? '' : value)
    }

    return (
        <section className="sticky top-16 z-40 bg-white border-b border-gray-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                {/* Desktop Filter Bar */}
                <div className="hidden lg:block py-4">
                    <div className="flex items-end gap-3">
                        {/* Development */}
                        <div className="w-[180px]">
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
                        <div className="w-[200px]">
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

                        {/* Bedrooms - Max 6 */}
                        <div className="w-[160px]">
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

                        {/* Bathrooms - Made Wider */}
                        <div className="w-[160px]">
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

                        {/* Price Range - With Arrows */}
                        <div className="flex items-end gap-2">
                            <div className="w-[150px] relative">
                                <Label className="text-xs font-medium text-gray-600 mb-1.5 block">
                                    Min Price
                                </Label>
                                <Input
                                    inputMode="numeric"
                                    placeholder="Min Price"
                                    value={formatPrice(priceMin)}
                                    onChange={onCurrencyChange(onPriceMinChange)}
                                    onKeyDown={onPriceKeyDown(priceMin, onPriceMinChange)}
                                    className="h-10 border-gray-300 pr-8"
                                />
                                <div className="absolute right-2 bottom-2 flex flex-col">
                                    <button
                                        type="button"
                                        aria-label="Increase min price"
                                        className="h-4 text-xs text-gray-400 hover:text-gray-600 leading-none"
                                        onClick={() => {
                                            const current = priceMin ? Number(priceMin) : 0
                                            onPriceMinChange(String(current + 250000))
                                        }}
                                    >▲</button>
                                    <button
                                        type="button"
                                        aria-label="Decrease min price"
                                        className="h-4 text-xs text-gray-400 hover:text-gray-600 leading-none"
                                        onClick={() => {
                                            const current = priceMin ? Number(priceMin) : 0
                                            onPriceMinChange(String(Math.max(0, current - 250000)))
                                        }}
                                    >▼</button>
                                </div>
                            </div>
                            <span className="text-gray-400 mb-2">-</span>
                            <div className="w-[150px] relative">
                                <Label className="text-xs font-medium text-gray-600 mb-1.5 block">
                                    Max Price
                                </Label>
                                <Input
                                    inputMode="numeric"
                                    placeholder="Max Price"
                                    value={formatPrice(priceMax)}
                                    onChange={onCurrencyChange(onPriceMaxChange)}
                                    onKeyDown={onPriceKeyDown(priceMax, onPriceMaxChange)}
                                    className="h-10 border-gray-300 pr-8"
                                />
                                <div className="absolute right-2 bottom-2 flex flex-col">
                                    <button
                                        type="button"
                                        aria-label="Increase max price"
                                        className="h-4 text-xs text-gray-400 hover:text-gray-600 leading-none"
                                        onClick={() => {
                                            const current = priceMax ? Number(priceMax) : 0
                                            onPriceMaxChange(String(current + 250000))
                                        }}
                                    >▲</button>
                                    <button
                                        type="button"
                                        aria-label="Decrease max price"
                                        className="h-4 text-xs text-gray-400 hover:text-gray-600 leading-none"
                                        onClick={() => {
                                            const current = priceMax ? Number(priceMax) : 0
                                            onPriceMaxChange(String(Math.max(0, current - 250000)))
                                        }}
                                    >▼</button>
                                </div>
                            </div>
                        </div>

                        {/* Property Type */}
                        <div className="w-[170px]">
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

                        {/* Search Button */}
                        <Button
                            onClick={onApply}
                            className="h-10 px-8 text-white font-semibold ml-auto"
                            style={{ backgroundColor: BRAND_COLOR }}
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            Search
                        </Button>

                        {/* Clear Filters */}
                        {hasActiveFilters && (
                            <Button
                                onClick={onClear}
                                variant="ghost"
                                className="h-10 text-gray-600 hover:text-gray-900"
                            >
                                Clear
                            </Button>
                        )}
                    </div>
                </div>

                {/* Mobile Filter Bar */}
                <div className="lg:hidden py-3 space-y-3">
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

                    {/* Row 2: Beds, Baths - Max 6 */}
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

                    {/* Row 3: Price Range - With Arrows */}
                    <div className="grid grid-cols-2 gap-2">
                        <div className="relative">
                            <Label className="text-xs font-medium text-gray-600 mb-1.5 block">
                                Min Price
                            </Label>
                            <Input
                                inputMode="numeric"
                                placeholder="Min Price"
                                value={formatPrice(priceMin)}
                                onChange={onCurrencyChange(onPriceMinChange)}
                                onKeyDown={onPriceKeyDown(priceMin, onPriceMinChange)}
                                className="h-10 border-gray-300 pr-8"
                            />
                            <div className="absolute right-2 bottom-2 flex flex-col">
                                <button
                                    type="button"
                                    aria-label="Increase min price"
                                    className="h-4 text-xs text-gray-400 hover:text-gray-600 leading-none"
                                    onClick={() => {
                                        const current = priceMin ? Number(priceMin) : 0
                                        onPriceMinChange(String(current + 250000))
                                    }}
                                >▲</button>
                                <button
                                    type="button"
                                    aria-label="Decrease min price"
                                    className="h-4 text-xs text-gray-400 hover:text-gray-600 leading-none"
                                    onClick={() => {
                                        const current = priceMin ? Number(priceMin) : 0
                                        onPriceMinChange(String(Math.max(0, current - 250000)))
                                    }}
                                >▼</button>
                            </div>
                        </div>
                        <div className="relative">
                            <Label className="text-xs font-medium text-gray-600 mb-1.5 block">
                                Max Price
                            </Label>
                            <Input
                                inputMode="numeric"
                                placeholder="Max Price"
                                value={formatPrice(priceMax)}
                                onChange={onCurrencyChange(onPriceMaxChange)}
                                onKeyDown={onPriceKeyDown(priceMax, onPriceMaxChange)}
                                className="h-10 border-gray-300 pr-8"
                            />
                            <div className="absolute right-2 bottom-2 flex flex-col">
                                <button
                                    type="button"
                                    aria-label="Increase max price"
                                    className="h-4 text-xs text-gray-400 hover:text-gray-600 leading-none"
                                    onClick={() => {
                                        const current = priceMax ? Number(priceMax) : 0
                                        onPriceMaxChange(String(current + 250000))
                                    }}
                                >▲</button>
                                <button
                                    type="button"
                                    aria-label="Decrease max price"
                                    className="h-4 text-xs text-gray-400 hover:text-gray-600 leading-none"
                                    onClick={() => {
                                        const current = priceMax ? Number(priceMax) : 0
                                        onPriceMaxChange(String(Math.max(0, current - 250000)))
                                    }}
                                >▼</button>
                            </div>
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

                    {/* Row 5: Search Button */}
                    <div className="flex gap-2">
                        <Button
                            onClick={onApply}
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
                                onClick={onClear}
                                variant="outline"
                                className="h-10 px-6"
                            >
                                Clear
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}