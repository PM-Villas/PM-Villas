// src/components/properties/PropertyFilters.tsx
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { Filter as FilterIcon, X } from 'lucide-react'
import MultiSelect from './MultiSelect'
import FilterChips from './FilterChips'
import {
    DEV_OPTIONS,
    formatPrice,
    onCurrencyChange,
    onHalfStepKeyDown,
    onPriceKeyDown,
    sanitizeHalfStep,
    toNumberOrZero,
    PRICE_STEP,
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
    totalCount: number
}

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
    totalCount,
}: PropertyFiltersProps) {
    const [showFilters, setShowFilters] = useState(false)

    return (
        <section className="px-4 sm:px-6 pt-6">
            <div className="max-w-7xl mx-auto">
                <div className="rounded-2xl border bg-white shadow-sm overflow-hidden">
                    {/* Header */}
                    <div className="p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <h2 className="text-2xl font-semibold text-slate-900">
                                {totalCount} properties available
                            </h2>
                            <p className="text-slate-600">
                                Refine by development, neighborhood, beds, baths, price, and type.
                            </p>
                        </div>

                        <div className="flex gap-3">
                            {hasActiveFilters && (
                                <button
                                    onClick={onClear}
                                    className="text-sm text-emerald-700 hover:underline"
                                >
                                    Clear all
                                </button>
                            )}
                            <Button
                                onClick={() => setShowFilters(v => !v)}
                                className="rounded-full px-5"
                                variant={showFilters ? 'secondary' : 'default'}
                                aria-expanded={showFilters}
                            >
                                {showFilters ? (
                                    <span className="inline-flex items-center gap-2">
                                        <X className="h-4 w-4" />
                                        Hide Filters
                                    </span>
                                ) : (
                                    <span className="inline-flex items-center gap-2">
                                        <FilterIcon className="h-4 w-4" />
                                        Show Filters
                                    </span>
                                )}
                            </Button>
                        </div>
                    </div>

                    {/* Collapsible Filter Section */}
                    <div
                        className={[
                            'grid transition-all duration-500 ease-in-out',
                            'px-4 md:px-6',
                            showFilters ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
                        ].join(' ')}
                    >
                        <div className="overflow-hidden">
                            {/* MOBILE layout (2-col) */}
                            <div className="border-t pt-5 pb-2 grid grid-cols-1 xs:grid-cols-2 gap-3 lg:hidden">
                                <MultiSelect
                                    label="Development"
                                    options={DEV_OPTIONS}
                                    values={development}
                                    onChange={onDevelopmentChange}
                                />
                                <MultiSelect
                                    label="Neighborhood"
                                    options={neighborhoodOptions}
                                    values={neighborhood}
                                    onChange={onNeighborhoodChange}
                                    placeholder={development.length ? 'Select' : 'Choose development first'}
                                />

                                <div>
                                    <Label className="text-[10px] font-medium tracking-wide text-slate-500">
                                        Beds (min)
                                    </Label>
                                    <Input
                                        inputMode="decimal"
                                        placeholder="e.g., 3.5"
                                        value={bedrooms}
                                        onChange={(e) => onBedroomsChange(sanitizeHalfStep(e.target.value))}
                                        onKeyDown={onHalfStepKeyDown(bedrooms, onBedroomsChange)}
                                        className="h-10 rounded-lg"
                                    />
                                </div>

                                <div>
                                    <Label className="text-[10px] font-medium tracking-wide text-slate-500">
                                        Baths (min)
                                    </Label>
                                    <Input
                                        inputMode="decimal"
                                        placeholder="e.g., 2.5"
                                        value={bathrooms}
                                        onChange={(e) => onBathroomsChange(sanitizeHalfStep(e.target.value))}
                                        onKeyDown={onHalfStepKeyDown(bathrooms, onBathroomsChange)}
                                        className="h-10 rounded-lg"
                                    />
                                </div>

                                {/* Price MIN */}
                                <div className="relative">
                                    <Label className="text-[10px] font-medium tracking-wide text-slate-500">
                                        Price min
                                    </Label>
                                    <Input
                                        inputMode="numeric"
                                        placeholder="$1,000,000"
                                        value={formatPrice(priceMin)}
                                        onChange={onCurrencyChange(onPriceMinChange)}
                                        onKeyDown={onPriceKeyDown(priceMin, onPriceMinChange)}
                                        className="h-10 rounded-lg pr-10"
                                    />
                                    <div className="absolute right-2 top-[26px] flex flex-col items-center">
                                        <button
                                            type="button"
                                            aria-label="Increase min price"
                                            className="h-4 leading-none text-slate-500 hover:text-slate-700"
                                            onClick={() => onPriceMinChange(String(toNumberOrZero(priceMin) + PRICE_STEP))}
                                        >▲</button>
                                        <button
                                            type="button"
                                            aria-label="Decrease min price"
                                            className="h-4 leading-none text-slate-500 hover:text-slate-700"
                                            onClick={() => onPriceMinChange(String(Math.max(0, toNumberOrZero(priceMin) - PRICE_STEP)))}
                                        >▼</button>
                                    </div>
                                </div>

                                {/* Price MAX */}
                                <div className="relative">
                                    <Label className="text-[10px] font-medium tracking-wide text-slate-500">
                                        Price max
                                    </Label>
                                    <Input
                                        inputMode="numeric"
                                        placeholder="$5,000,000"
                                        value={formatPrice(priceMax)}
                                        onChange={onCurrencyChange(onPriceMaxChange)}
                                        onKeyDown={onPriceKeyDown(priceMax, onPriceMaxChange)}
                                        className="h-10 rounded-lg pr-10"
                                    />
                                    <div className="absolute right-2 top-[26px] flex flex-col items-center">
                                        <button
                                            type="button"
                                            aria-label="Increase max price"
                                            className="h-4 leading-none text-slate-500 hover:text-slate-700"
                                            onClick={() => onPriceMaxChange(String(toNumberOrZero(priceMax) + PRICE_STEP))}
                                        >▲</button>
                                        <button
                                            type="button"
                                            aria-label="Decrease max price"
                                            className="h-4 leading-none text-slate-500 hover:text-slate-700"
                                            onClick={() => onPriceMaxChange(String(Math.max(0, toNumberOrZero(priceMax) - PRICE_STEP)))}
                                        >▼</button>
                                    </div>
                                </div>

                                <div>
                                    <Label className="text-[10px] font-medium tracking-wide text-slate-500">
                                        Type
                                    </Label>
                                    <Select
                                        value={type || ''}
                                        onValueChange={(v) => onTypeChange(v === '__any__' ? '' : v)}
                                    >
                                        <SelectTrigger className="h-10 rounded-lg">
                                            <SelectValue placeholder="Any" />
                                        </SelectTrigger>
                                        <SelectContent className="rounded-2xl shadow-xl">
                                            <SelectItem value="__any__">Any</SelectItem>
                                            {['Condo', 'Villa', 'Land'].map(t => (
                                                <SelectItem key={t} value={t.toLowerCase()}>
                                                    {t}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            {/* DESKTOP: single-line strip */}
                            <div className="pt-5 pb-2 hidden lg:flex items-end gap-3 flex-nowrap overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden border-t">
                                <div className="min-w-[200px]">
                                    <MultiSelect
                                        label="Development"
                                        options={DEV_OPTIONS}
                                        values={development}
                                        onChange={onDevelopmentChange}
                                    />
                                </div>
                                <div className="min-w-[230px]">
                                    <MultiSelect
                                        label="Neighborhood"
                                        options={neighborhoodOptions}
                                        values={neighborhood}
                                        onChange={onNeighborhoodChange}
                                        placeholder={development.length ? 'Select' : 'Choose development first'}
                                    />
                                </div>

                                <div className="min-w-[125px]">
                                    <Label className="text-[10px] font-medium tracking-wide text-slate-500">
                                        Beds (min)
                                    </Label>
                                    <Input
                                        inputMode="decimal"
                                        placeholder="e.g., 3.5"
                                        value={bedrooms}
                                        onChange={(e) => onBedroomsChange(sanitizeHalfStep(e.target.value))}
                                        onKeyDown={onHalfStepKeyDown(bedrooms, onBedroomsChange)}
                                        className="h-10 rounded-lg"
                                    />
                                </div>

                                <div className="min-w-[125px]">
                                    <Label className="text-[10px] font-medium tracking-wide text-slate-500">
                                        Baths (min)
                                    </Label>
                                    <Input
                                        inputMode="decimal"
                                        placeholder="e.g., 2.5"
                                        value={bathrooms}
                                        onChange={(e) => onBathroomsChange(sanitizeHalfStep(e.target.value))}
                                        onKeyDown={onHalfStepKeyDown(bathrooms, onBathroomsChange)}
                                        className="h-10 rounded-lg"
                                    />
                                </div>

                                {/* Price MIN */}
                                <div className="min-w-[160px] relative">
                                    <Label className="text-[10px] font-medium tracking-wide text-slate-500">
                                        Price min
                                    </Label>
                                    <Input
                                        inputMode="numeric"
                                        placeholder="$1,000,000"
                                        value={formatPrice(priceMin)}
                                        onChange={onCurrencyChange(onPriceMinChange)}
                                        onKeyDown={onPriceKeyDown(priceMin, onPriceMinChange)}
                                        className="h-10 rounded-lg pr-10"
                                    />
                                    <div className="absolute right-2 top-[26px] flex flex-col items-center">
                                        <button
                                            type="button"
                                            aria-label="Increase min price"
                                            className="h-4 leading-none text-slate-500 hover:text-slate-700"
                                            onClick={() => onPriceMinChange(String(toNumberOrZero(priceMin) + PRICE_STEP))}
                                        >▲</button>
                                        <button
                                            type="button"
                                            aria-label="Decrease min price"
                                            className="h-4 leading-none text-slate-500 hover:text-slate-700"
                                            onClick={() => onPriceMinChange(String(Math.max(0, toNumberOrZero(priceMin) - PRICE_STEP)))}
                                        >▼</button>
                                    </div>
                                </div>

                                {/* Price MAX */}
                                <div className="min-w-[160px] relative">
                                    <Label className="text-[10px] font-medium tracking-wide text-slate-500">
                                        Price max
                                    </Label>
                                    <Input
                                        inputMode="numeric"
                                        placeholder="$5,000,000"
                                        value={formatPrice(priceMax)}
                                        onChange={onCurrencyChange(onPriceMaxChange)}
                                        onKeyDown={onPriceKeyDown(priceMax, onPriceMaxChange)}
                                        className="h-10 rounded-lg pr-10"
                                    />
                                    <div className="absolute right-2 top-[26px] flex flex-col items-center">
                                        <button
                                            type="button"
                                            aria-label="Increase max price"
                                            className="h-4 leading-none text-slate-500 hover:text-slate-700"
                                            onClick={() => onPriceMaxChange(String(toNumberOrZero(priceMax) + PRICE_STEP))}
                                        >▲</button>
                                        <button
                                            type="button"
                                            aria-label="Decrease max price"
                                            className="h-4 leading-none text-slate-500 hover:text-slate-700"
                                            onClick={() => onPriceMaxChange(String(Math.max(0, toNumberOrZero(priceMax) - PRICE_STEP)))}
                                        >▼</button>
                                    </div>
                                </div>

                                <div className="min-w-[150px]">
                                    <Label className="text-[10px] font-medium tracking-wide text-slate-500">
                                        Type
                                    </Label>
                                    <Select
                                        value={type || ''}
                                        onValueChange={(v) => onTypeChange(v === '__any__' ? '' : v)}
                                    >
                                        <SelectTrigger className="h-10 rounded-lg">
                                            <SelectValue placeholder="Any" />
                                        </SelectTrigger>
                                        <SelectContent className="rounded-2xl shadow-xl">
                                            <SelectItem value="__any__">Any</SelectItem>
                                            {['Condo', 'Villa', 'Land'].map(t => (
                                                <SelectItem key={t} value={t.toLowerCase()}>
                                                    {t}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            {/* ACTIONS + CHIPS */}
                            <div className="pb-6 pt-3 flex flex-col gap-3">
                                <div className="flex justify-end gap-2">
                                    <Button
                                        onClick={onApply}
                                        className="bg-emerald-600 hover:bg-emerald-700 rounded-lg"
                                    >
                                        Apply Filters
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={onClear}
                                        className="rounded-lg"
                                    >
                                        Reset
                                    </Button>
                                </div>

                                <FilterChips
                                    development={development}
                                    neighborhood={neighborhood}
                                    bedrooms={bedrooms}
                                    bathrooms={bathrooms}
                                    priceMin={priceMin}
                                    priceMax={priceMax}
                                    type={type}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}