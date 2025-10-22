// src/components/properties/ResultsBar.tsx
'use client'

import { useState } from 'react'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import SortBottomSheet from './SortBottomSheet'

interface ResultsBarProps {
    totalCount: number
    currentSort: string
    onSortChange: (sort: string) => void
}

const BRAND_COLOR = '#e1c098'

export default function ResultsBar({ totalCount, currentSort, onSortChange }: ResultsBarProps) {
    const [isMobileSheetOpen, setIsMobileSheetOpen] = useState(false)

    const getSortLabel = (sortValue: string) => {
        switch (sortValue) {
            case 'price-low':
                return 'Price: Low to High'
            case 'price-high':
                return 'Price: High to Low'
            case 'featured':
            default:
                return 'Featured'
        }
    }

    const handleMobileSortChange = (sort: string) => {
        onSortChange(sort)
        setIsMobileSheetOpen(false)
    }

    return (
        <>
            {/* Sticky bar - visible on mobile, hidden on desktop */}
            <div className="lg:hidden sticky top-[60px] z-30 bg-white border-b border-gray-200 shadow-sm">
                <div className="flex items-center justify-between px-4 py-3">
                    <div className="text-sm font-medium text-gray-700">
                        {totalCount} {totalCount === 1 ? 'property' : 'properties'}
                    </div>

                    <button
                        onClick={() => setIsMobileSheetOpen(true)}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                        </svg>
                        Sort: {getSortLabel(currentSort)}
                    </button>
                </div>
            </div>

            {/* Desktop results bar */}
            <div className="hidden lg:block bg-white border-b border-gray-200 py-4 px-6">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="text-sm font-medium text-gray-700">
                        <span className="text-lg font-semibold" style={{ color: BRAND_COLOR }}>
                            {totalCount}
                        </span>
                        {' '}
                        {totalCount === 1 ? 'property' : 'properties'} found
                    </div>

                    <div className="flex items-center gap-3">
                        <label className="text-sm font-medium text-gray-600">
                            Sort by:
                        </label>
                        <Select value={currentSort} onValueChange={onSortChange}>
                            <SelectTrigger className="w-[200px] h-10 border-gray-300">
                                <SelectValue placeholder="Sort by" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="featured">Featured</SelectItem>
                                <SelectItem value="price-low">Price: Low to High</SelectItem>
                                <SelectItem value="price-high">Price: High to Low</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>

            {/* Mobile bottom sheet */}
            <SortBottomSheet
                isOpen={isMobileSheetOpen}
                currentSort={currentSort}
                onClose={() => setIsMobileSheetOpen(false)}
                onSortChange={handleMobileSortChange}
            />
        </>
    )
}
