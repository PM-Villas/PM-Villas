// src/components/PropertiesBrowser.tsx
'use client'

import { useEffect, useMemo, useState, useTransition } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { Card, CardContent } from '@/components/ui/card'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { Command, CommandInput, CommandItem, CommandList, CommandEmpty, CommandGroup } from '@/components/ui/command'
import { Filter as FilterIcon, X } from 'lucide-react'

type Property = {
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

function parseCSV(v: string | null): string[] {
    if (!v) return []
    return v.split(',').map(s => s.trim()).filter(Boolean)
}

/* ---------- Fixed lists (alphabetical) ---------- */
const DEV_OPTIONS = ['Aubierge', 'Litibu', 'Nauka', 'Punta Mita']

const PM_NEIGHBORHOODS = [
    'Bahia Estates', 'Bella Vista', 'El Encanto', 'Four Seasons', 'Hacienda De Mita', 'Iyari',
    'Kupuri Estates', 'La Punta', 'La Serenata', 'Lagos Del Mar', 'Las Marietas', 'Las Palmas',
    'Las Terrazas', 'Las Vistas', 'Montage', 'Pacifico Estates', 'Porta Fortuna', 'Ranchos',
    'Seven & Eight Residences', 'Surf Residences', 'Tau',
].sort((a, b) => a.localeCompare(b))

const NEIGHBORHOOD_BY_DEV: Record<string, string[]> = {
    'Punta Mita': PM_NEIGHBORHOODS,
    'Litibu': ['Litibu Bay Club', 'Uavi'].sort((a, b) => a.localeCompare(b)),
    'Aubierge': [],
    'Nauka': [],
}

/* normalize for robust matching */
const norm = (s?: string) => (s ?? '').toLowerCase().replace(/[\s\-_&]+/g, '')

/* deterministic currency formatter (prevents hydration mismatches) */
const nfUS = new Intl.NumberFormat('en-US')
const PRICE_STEP = 100000

/* helpers */
const onlyDigits = (v: string) => v.replace(/\D/g, '')

/** allow integers or `.5` only (e.g., 3 or 3.5). Anything else becomes integer only */
const sanitizeHalfStep = (raw: string) => {
    const cleaned = raw.replace(/[^-0-9.]/g, '')
    const m = cleaned.match(/^(\d+)(?:\.(\d)?)?$/)
    if (!m) return ''
    const intPart = m[1]
    const frac = m[2]
    return frac === '5' ? `${intPart}.5` : intPart
}

const toNumberOrZero = (v: string) => (v ? Number(v) : 0)

/* ---------- Multiselect (searchable) ---------- */
function MultiSelect({
    label,
    values,
    options,
    onChange,
    placeholder,
}: {
    label: string
    values: string[]
    options: string[]
    onChange: (next: string[]) => void
    placeholder?: string
}) {
    const [open, setOpen] = useState(false)
    const valueText = values.length
        ? values.slice(0, 2).join(', ') + (values.length > 2 ? ` +${values.length - 2}` : '')
        : (placeholder || 'Select')

    return (
        <div className="w-full">
            <Label className="text-[10px] font-medium tracking-wide text-slate-500">{label}</Label>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <button
                        type="button"
                        className="w-full h-10 px-4 text-left rounded-lg border bg-white hover:bg-slate-50 transition shadow-sm"
                    >
                        <span className="text-[15px] leading-5 text-slate-900 truncate">{valueText}</span>
                    </button>
                </PopoverTrigger>
                <PopoverContent align="start" className="p-0 w-[360px] rounded-2xl shadow-xl border bg-white">
                    <div className="p-3 border-b">
                        <Command className="bg-transparent">
                            <CommandInput placeholder={`Search ${label.toLowerCase()}...`} />
                        </Command>
                    </div>
                    <Command className="bg-transparent">
                        <CommandList className="max-h-64">
                            <CommandEmpty className="py-4">No results.</CommandEmpty>
                            <CommandGroup heading={<span className="text-xs text-slate-500">Select one or more</span>}>
                                {options.map(opt => {
                                    const checked = values.includes(opt)
                                    return (
                                        <CommandItem
                                            key={opt}
                                            value={opt}
                                            className="flex items-center gap-3 py-3"
                                            onSelect={() => {
                                                if (checked) onChange(values.filter(v => v !== opt))
                                                else onChange([...values, opt])
                                            }}
                                        >
                                            <Checkbox
                                                checked={checked}
                                                onCheckedChange={() => {
                                                    if (checked) onChange(values.filter(v => v !== opt))
                                                    else onChange([...values, opt])
                                                }}
                                            />
                                            <span className="text-[15px]">{opt}</span>
                                        </CommandItem>
                                    )
                                })}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    )
}

export default function PropertiesBrowser({ properties }: { properties: Property[] }) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [isPending, startTransition] = useTransition()

    const [showFilters, setShowFilters] = useState(false)

    /* URL-synced state */
    const [bedrooms, setBedrooms] = useState(searchParams.get('bedrooms') || '')
    const [bathrooms, setBathrooms] = useState(searchParams.get('bathrooms') || '')
    const [priceMin, setPriceMin] = useState(searchParams.get('priceMin') || '')
    const [priceMax, setPriceMax] = useState(searchParams.get('priceMax') || '')
    const [type, setType] = useState(searchParams.get('type') || '')
    const [development, setDevelopment] = useState<string[]>(parseCSV(searchParams.get('development')))
    const [neighborhood, setNeighborhood] = useState<string[]>(parseCSV(searchParams.get('neighborhood')))

    useEffect(() => {
        setBedrooms(searchParams.get('bedrooms') || '')
        setBathrooms(searchParams.get('bathrooms') || '')
        setPriceMin(searchParams.get('priceMin') || '')
        setPriceMax(searchParams.get('priceMax') || '')
        setType(searchParams.get('type') || '')
        setDevelopment(parseCSV(searchParams.get('development')))
        setNeighborhood(parseCSV(searchParams.get('neighborhood')))
    }, [searchParams])

    /* dependent neighborhood options */
    const neighborhoodOptions = useMemo(() => {
        if (!development.length) return []
        const set = new Set<string>()
        development.forEach(d => (NEIGHBORHOOD_BY_DEV[d] || []).forEach(n => set.add(n)))
        return Array.from(set).sort((a, b) => a.localeCompare(b))
    }, [development])

    useEffect(() => {
        if (!neighborhood.length) return
        const allowed = new Set(neighborhoodOptions)
        const next = neighborhood.filter(n => allowed.has(n))
        if (next.length !== neighborhood.length) setNeighborhood(next)
    }, [neighborhoodOptions]) // eslint-disable-line react-hooks/exhaustive-deps

    /* Apply / Clear */
    const apply = () => {
        const p = new URLSearchParams()
        if (bedrooms) p.set('bedrooms', bedrooms)
        if (bathrooms) p.set('bathrooms', bathrooms)
        if (priceMin) p.set('priceMin', priceMin)
        if (priceMax) p.set('priceMax', priceMax)
        if (type) p.set('type', type)
        if (development.length) p.set('development', development.join(','))
        if (neighborhood.length) p.set('neighborhood', neighborhood.join(','))
        startTransition(() => router.push(`${pathname}?${p.toString()}`))
    }
    const clear = () => startTransition(() => router.push(pathname))

    const hasActive =
        bedrooms || bathrooms || priceMin || priceMax || type ||
        development.length || neighborhood.length

    /* $-prefixed price helpers (deterministic) */
    const fmt$ = (digits: string) => (digits ? `$${nfUS.format(Number(digits))}` : '')
    const onCurrencyChange =
        (setter: (v: string) => void) =>
            (e: React.ChangeEvent<HTMLInputElement>) => {
                const digits = onlyDigits(e.target.value)
                setter(digits)
            }

    /* up/down key handlers */
    const onHalfStepArrow = (value: string, set: (v: string) => void, dir: 1 | -1) => {
        const n = value ? Number(value) : 0
        const hasHalf = /\.5$/.test(value)
        const next = (Math.floor(n) + dir) + (hasHalf ? 0.5 : 0)
        set(String(next))
    }

    const onHalfStepKeyDown =
        (value: string, set: (v: string) => void) =>
            (e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === 'ArrowUp') {
                    e.preventDefault()
                    onHalfStepArrow(value, set, 1)
                } else if (e.key === 'ArrowDown') {
                    e.preventDefault()
                    onHalfStepArrow(value, set, -1)
                }
            }

    const onPriceKeyDown =
        (value: string, set: (v: string) => void) =>
            (e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === 'ArrowUp') {
                    e.preventDefault()
                    set(String(toNumberOrZero(value) + PRICE_STEP))
                } else if (e.key === 'ArrowDown') {
                    e.preventDefault()
                    set(String(Math.max(0, toNumberOrZero(value) - PRICE_STEP)))
                }
            }

    /* Client-side filtering */
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

    const facetTypes = useMemo(
        () => Array.from(new Set((properties.map(p => p.propertyType).filter(Boolean) as string[]))).sort(),
        [properties]
    )

    return (
        <>
            {/* INTRO CARD + INLINE COLLAPSIBLE FILTERS */}
            <section className="px-4 sm:px-6 pt-6">
                <div className="max-w-7xl mx-auto">
                    <div className="rounded-2xl border bg-white shadow-sm overflow-hidden">
                        {/* Header */}
                        <div className="p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div>
                                <h2 className="text-2xl font-semibold text-slate-900">
                                    {filtered.length} properties available
                                </h2>
                                <p className="text-slate-600">
                                    Refine by development, neighborhood, beds, baths, price, and type.
                                </p>
                            </div>

                            <div className="flex gap-3">
                                {hasActive ? (
                                    <button onClick={clear} className="text-sm text-emerald-700 hover:underline">
                                        Clear all
                                    </button>
                                ) : null}
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

                        {/* Collapsible */}
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
                                    <div>
                                        <MultiSelect
                                            label="Development"
                                            options={DEV_OPTIONS}
                                            values={development}
                                            onChange={setDevelopment}
                                            placeholder="Select"
                                        />
                                    </div>
                                    <div>
                                        <MultiSelect
                                            label="Neighborhood"
                                            options={neighborhoodOptions}
                                            values={neighborhood}
                                            onChange={setNeighborhood}
                                            placeholder={development.length ? 'Select' : 'Choose development first'}
                                        />
                                    </div>
                                    <div>
                                        <Label className="text-[10px] font-medium tracking-wide text-slate-500">Beds (min)</Label>
                                        <Input
                                            inputMode="decimal"
                                            placeholder="e.g., 3.5"
                                            value={bedrooms}
                                            onChange={(e) => setBedrooms(sanitizeHalfStep(e.target.value))}
                                            onKeyDown={onHalfStepKeyDown(bedrooms, setBedrooms)}
                                            className="h-10 rounded-lg"
                                        />
                                    </div>
                                    <div>
                                        <Label className="text-[10px] font-medium tracking-wide text-slate-500">Baths (min)</Label>
                                        <Input
                                            inputMode="decimal"
                                            placeholder="e.g., 2.5"
                                            value={bathrooms}
                                            onChange={(e) => setBathrooms(sanitizeHalfStep(e.target.value))}
                                            onKeyDown={onHalfStepKeyDown(bathrooms, setBathrooms)}
                                            className="h-10 rounded-lg"
                                        />
                                    </div>

                                    {/* Price MIN with tiny step arrows */}
                                    <div className="relative">
                                        <Label className="text-[10px] font-medium tracking-wide text-slate-500">Price min</Label>
                                        <Input
                                            inputMode="numeric"
                                            placeholder="$1,000,000"
                                            value={fmt$(priceMin)}
                                            onChange={onCurrencyChange(setPriceMin)}
                                            onKeyDown={onPriceKeyDown(priceMin, setPriceMin)}
                                            className="h-10 rounded-lg pr-10"
                                        />
                                        <div className="absolute right-2 top-[26px] flex flex-col items-center">
                                            <button
                                                type="button"
                                                aria-label="Increase min price"
                                                className="h-4 leading-none text-slate-500 hover:text-slate-700"
                                                onClick={() => setPriceMin(String(toNumberOrZero(priceMin) + PRICE_STEP))}
                                            >▲</button>
                                            <button
                                                type="button"
                                                aria-label="Decrease min price"
                                                className="h-4 leading-none text-slate-500 hover:text-slate-700"
                                                onClick={() => setPriceMin(String(Math.max(0, toNumberOrZero(priceMin) - PRICE_STEP)))}
                                            >▼</button>
                                        </div>
                                    </div>

                                    {/* Price MAX with tiny step arrows */}
                                    <div className="relative">
                                        <Label className="text-[10px] font-medium tracking-wide text-slate-500">Price max</Label>
                                        <Input
                                            inputMode="numeric"
                                            placeholder="$5,000,000"
                                            value={fmt$(priceMax)}
                                            onChange={onCurrencyChange(setPriceMax)}
                                            onKeyDown={onPriceKeyDown(priceMax, setPriceMax)}
                                            className="h-10 rounded-lg pr-10"
                                        />
                                        <div className="absolute right-2 top-[26px] flex flex-col items-center">
                                            <button
                                                type="button"
                                                aria-label="Increase max price"
                                                className="h-4 leading-none text-slate-500 hover:text-slate-700"
                                                onClick={() => setPriceMax(String(toNumberOrZero(priceMax) + PRICE_STEP))}
                                            >▲</button>
                                            <button
                                                type="button"
                                                aria-label="Decrease max price"
                                                className="h-4 leading-none text-slate-500 hover:text-slate-700"
                                                onClick={() => setPriceMax(String(Math.max(0, toNumberOrZero(priceMax) - PRICE_STEP)))}
                                            >▼</button>
                                        </div>
                                    </div>

                                    <div>
                                        <Label className="text-[10px] font-medium tracking-wide text-slate-500">Type</Label>
                                        <Select value={type || ''} onValueChange={(v) => setType(v === '__any__' ? '' : v)}>
                                            <SelectTrigger className="h-10 rounded-lg">
                                                <SelectValue placeholder="Any" />
                                            </SelectTrigger>
                                            <SelectContent className="rounded-2xl shadow-xl">
                                                <SelectItem value="__any__">Any</SelectItem>
                                                {['Condo', 'Villa', 'Land'].map(t => (
                                                    <SelectItem key={t} value={t.toLowerCase()}>{t}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                {/* DESKTOP: single-line strip */}
                                <div
                                    className="
                    pt-5 pb-2 hidden lg:flex items-end gap-3
                    flex-nowrap overflow-x-auto
                    [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
                    border-t
                  "
                                >
                                    <div className="min-w-[200px]">
                                        <MultiSelect
                                            label="Development"
                                            options={DEV_OPTIONS}
                                            values={development}
                                            onChange={setDevelopment}
                                            placeholder="Select"
                                        />
                                    </div>
                                    <div className="min-w-[230px]">
                                        <MultiSelect
                                            label="Neighborhood"
                                            options={neighborhoodOptions}
                                            values={neighborhood}
                                            onChange={setNeighborhood}
                                            placeholder={development.length ? 'Select' : 'Choose development first'}
                                        />
                                    </div>
                                    <div className="min-w-[125px]">
                                        <Label className="text-[10px] font-medium tracking-wide text-slate-500">Beds (min)</Label>
                                        <Input
                                            inputMode="decimal"
                                            placeholder="e.g., 3.5"
                                            value={bedrooms}
                                            onChange={(e) => setBedrooms(sanitizeHalfStep(e.target.value))}
                                            onKeyDown={onHalfStepKeyDown(bedrooms, setBedrooms)}
                                            className="h-10 rounded-lg"
                                        />
                                    </div>
                                    <div className="min-w-[125px]">
                                        <Label className="text-[10px] font-medium tracking-wide text-slate-500">Baths (min)</Label>
                                        <Input
                                            inputMode="decimal"
                                            placeholder="e.g., 2.5"
                                            value={bathrooms}
                                            onChange={(e) => setBathrooms(sanitizeHalfStep(e.target.value))}
                                            onKeyDown={onHalfStepKeyDown(bathrooms, setBathrooms)}
                                            className="h-10 rounded-lg"
                                        />
                                    </div>

                                    {/* Price MIN */}
                                    <div className="min-w-[160px] relative">
                                        <Label className="text-[10px] font-medium tracking-wide text-slate-500">Price min</Label>
                                        <Input
                                            inputMode="numeric"
                                            placeholder="$1,000,000"
                                            value={fmt$(priceMin)}
                                            onChange={onCurrencyChange(setPriceMin)}
                                            onKeyDown={onPriceKeyDown(priceMin, setPriceMin)}
                                            className="h-10 rounded-lg pr-10"
                                        />
                                        <div className="absolute right-2 top-[26px] flex flex-col items-center">
                                            <button
                                                type="button"
                                                aria-label="Increase min price"
                                                className="h-4 leading-none text-slate-500 hover:text-slate-700"
                                                onClick={() => setPriceMin(String(toNumberOrZero(priceMin) + PRICE_STEP))}
                                            >▲</button>
                                            <button
                                                type="button"
                                                aria-label="Decrease min price"
                                                className="h-4 leading-none text-slate-500 hover:text-slate-700"
                                                onClick={() => setPriceMin(String(Math.max(0, toNumberOrZero(priceMin) - PRICE_STEP)))}
                                            >▼</button>
                                        </div>
                                    </div>

                                    {/* Price MAX */}
                                    <div className="min-w-[160px] relative">
                                        <Label className="text-[10px] font-medium tracking-wide text-slate-500">Price max</Label>
                                        <Input
                                            inputMode="numeric"
                                            placeholder="$5,000,000"
                                            value={fmt$(priceMax)}
                                            onChange={onCurrencyChange(setPriceMax)}
                                            onKeyDown={onPriceKeyDown(priceMax, setPriceMax)}
                                            className="h-10 rounded-lg pr-10"
                                        />
                                        <div className="absolute right-2 top-[26px] flex flex-col items-center">
                                            <button
                                                type="button"
                                                aria-label="Increase max price"
                                                className="h-4 leading-none text-slate-500 hover:text-slate-700"
                                                onClick={() => setPriceMax(String(toNumberOrZero(priceMax) + PRICE_STEP))}
                                            >▲</button>
                                            <button
                                                type="button"
                                                aria-label="Decrease max price"
                                                className="h-4 leading-none text-slate-500 hover:text-slate-700"
                                                onClick={() => setPriceMax(String(Math.max(0, toNumberOrZero(priceMax) - PRICE_STEP)))}
                                            >▼</button>
                                        </div>
                                    </div>

                                    <div className="min-w-[150px]">
                                        <Label className="text-[10px] font-medium tracking-wide text-slate-500">Type</Label>
                                        <Select value={type || ''} onValueChange={(v) => setType(v === '__any__' ? '' : v)}>
                                            <SelectTrigger className="h-10 rounded-lg">
                                                <SelectValue placeholder="Any" />
                                            </SelectTrigger>
                                            <SelectContent className="rounded-2xl shadow-xl">
                                                <SelectItem value="__any__">Any</SelectItem>
                                                {['Condo', 'Villa', 'Land'].map(t => (
                                                    <SelectItem key={t} value={t.toLowerCase()}>{t}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                {/* ACTIONS + CHIPS */}
                                <div className="pb-6 pt-3 flex flex-col gap-3">
                                    <div className="flex justify-end gap-2">
                                        <Button onClick={apply} className="bg-emerald-600 hover:bg-emerald-700 rounded-lg">
                                            Apply Filters
                                        </Button>
                                        <Button variant="outline" onClick={clear} className="rounded-lg">
                                            Reset
                                        </Button>
                                    </div>

                                    {hasActive ? (
                                        <div className="flex flex-wrap gap-2">
                                            {development.map(d => <Badge key={`dev-${d}`} variant="outline">{d}</Badge>)}
                                            {neighborhood.map(n => <Badge key={`n-${n}`} variant="outline">{n}</Badge>)}
                                            {bedrooms ? <Badge variant="outline">Bedrooms ≥ {bedrooms}</Badge> : null}
                                            {bathrooms ? <Badge variant="outline">Bathrooms ≥ {bathrooms}</Badge> : null}
                                            {priceMin ? <Badge variant="outline">Min ${nfUS.format(Number(priceMin))}</Badge> : null}
                                            {priceMax ? <Badge variant="outline">Max ${nfUS.format(Number(priceMax))}</Badge> : null}
                                            {type ? <Badge variant="outline">{type}</Badge> : null}
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Properties Grid */}
            <section className="py-12 px-6">
                <div className="max-w-7xl mx-auto">
                    {filtered.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filtered.map((property) => {
                                const status = (property.propertyStatus || '').toLowerCase()
                                const showStatus = status && status !== 'available' // hide "available"
                                return (
                                    <Card
                                        key={property._id}
                                        className="group overflow-hidden border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white flex flex-col"
                                    >
                                        {property.mainImage && (
                                            <div className="relative h-[520px] overflow-hidden">
                                                <Image
                                                    src={property.mainImage?.asset?.url || '/placeholder.jpg'}
                                                    alt={property.mainImage?.alt || property.title}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                                                <div className="absolute top-4 left-4">
                                                    <Badge className="bg-white text-gray-900 font-bold shadow-lg">
                                                        {typeof property.price === 'number' ? `${nfUS.format(property.price)}` : 'Price on request'}
                                                    </Badge>
                                                </div>

                                                {showStatus && (
                                                    <div className="absolute top-4 right-4">
                                                        <Badge
                                                            className={`font-semibold shadow-lg ${status === 'for-sale'
                                                                ? 'bg-emerald-500 text-white'
                                                                : status === 'sold'
                                                                    ? 'bg-red-500 text-white'
                                                                    : status === 'under-contract'
                                                                        ? 'bg-yellow-500 text-white'
                                                                        : 'bg-blue-500 text-white'
                                                                }`}
                                                        >
                                                            {status.replace('-', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
                                                        </Badge>
                                                    </div>
                                                )}

                                                {property.featured && (
                                                    <div className="absolute bottom-4 left-4">
                                                        <Badge className="bg-orange-500 text-white font-semibold">Featured</Badge>
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        <CardContent className="p-4 flex-1 flex flex-col min-h-0">
                                            <div className="flex-1 space-y-3">
                                                <h3 className="text-lg font-bold text-gray-900 group-hover:text-emerald-600 transition-colors line-clamp-1">
                                                    {property.title}
                                                </h3>

                                                {property.development && property.development.length > 0 && (
                                                    <p className="text-sm text-gray-600 font-medium">
                                                        {property.development.map((dev: string) =>
                                                            dev.replace('-', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())
                                                        ).join(', ')}
                                                    </p>
                                                )}

                                                <div className="flex items-center justify-between text-sm text-gray-700">
                                                    <div className="flex items-center space-x-4">
                                                        {property.bedrooms ? (
                                                            <div className="flex items-center space-x-1">
                                                                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                                                                <span className="font-medium">{property.bedrooms} Beds</span>
                                                            </div>
                                                        ) : null}
                                                        {property.bathrooms ? (
                                                            <div className="flex items-center space-x-1">
                                                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                                                <span className="font-medium">{property.bathrooms} Baths</span>
                                                            </div>
                                                        ) : null}
                                                    </div>

                                                    <Badge variant="outline" className="capitalize text-xs font-semibold px-2 py-1">
                                                        {property.propertyType || 'Property'}
                                                    </Badge>
                                                </div>

                                                {property.primaryView && (
                                                    <div>
                                                        <Badge variant="secondary" className="text-xs capitalize font-medium px-2 py-1">
                                                            {property.primaryView} View
                                                        </Badge>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="border-t border-gray-100 pt-3 mt-3 flex justify-between items-center">
                                                <Link href={`/properties/${property.slug}`} prefetch={false} className="text-emerald-600 hover:text-emerald-700 text-sm font-semibold inline-flex items-center gap-1 transition-colors">
                                                    View Details →
                                                </Link>

                                                <Button size="sm" variant="outline" className="text-xs font-medium px-3 py-2">
                                                    Schedule Tour
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                )
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gray-100 flex items-center justify-center">
                                <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m0 0h4M9 7h1m-1 4h1m4-4h1m-1 4h1" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">No properties match these filters</h3>
                            <p className="text-gray-600">Try changing or clearing filters to see more listings.</p>
                        </div>
                    )}
                </div>
            </section>
        </>
    )
}