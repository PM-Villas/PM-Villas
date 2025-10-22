// src/components/properties/SortBottomSheet.tsx
'use client'

import { useEffect, useState } from 'react'

interface SortBottomSheetProps {
    isOpen: boolean
    currentSort: string
    onClose: () => void
    onSortChange: (sort: string) => void
}

const BRAND_COLOR = '#e1c098'

const sortOptions = [
    { value: 'featured', label: 'Featured Properties', icon: '⭐' },
    { value: 'price-low', label: 'Price: Low to High', icon: '↑' },
    { value: 'price-high', label: 'Price: High to Low', icon: '↓' },
]

export default function SortBottomSheet({ isOpen, currentSort, onClose, onSortChange }: SortBottomSheetProps) {
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
                className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-[10000] lg:hidden shadow-2xl"
                style={{
                    animation: !isDragging ? (isOpen ? 'slideUp 300ms ease-out' : 'slideDown 300ms ease-out') : 'none',
                    maxHeight: '50vh',
                    top: '80px',
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
                <div className="px-6 pt-2 pb-4 border-b border-gray-200">
                    <h3 className="text-xl font-bold text-gray-900">Sort Properties</h3>
                    <p className="text-sm text-gray-500 mt-1">Choose how to order your results</p>
                </div>

                {/* Sort Options */}
                <div className="px-4 py-4 max-h-[50vh] overflow-y-auto">
                    {sortOptions.map((option) => {
                        const isActive = currentSort === option.value
                        return (
                            <button
                                key={option.value}
                                onClick={() => onSortChange(option.value)}
                                className={`w-full flex items-center justify-between px-4 py-4 rounded-xl mb-2 transition-all duration-200 ${
                                    isActive
                                        ? 'bg-gray-50 border-2'
                                        : 'hover:bg-gray-50 border-2 border-transparent'
                                }`}
                                style={isActive ? { borderColor: BRAND_COLOR } : {}}
                            >
                                <div className="flex items-center gap-4">
                                    <span className="text-2xl">{option.icon}</span>
                                    <div className="text-left">
                                        <div className={`font-semibold ${isActive ? 'text-gray-900' : 'text-gray-700'}`}>
                                            {option.label}
                                        </div>
                                        {option.value === 'featured' && (
                                            <div className="text-xs text-gray-500 mt-0.5">
                                                Our top picks for you
                                            </div>
                                        )}
                                        {option.value === 'price-low' && (
                                            <div className="text-xs text-gray-500 mt-0.5">
                                                Most affordable first
                                            </div>
                                        )}
                                        {option.value === 'price-high' && (
                                            <div className="text-xs text-gray-500 mt-0.5">
                                                Highest value first
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Checkmark */}
                                {isActive && (
                                    <div
                                        className="w-6 h-6 rounded-full flex items-center justify-center"
                                        style={{ backgroundColor: BRAND_COLOR }}
                                    >
                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                )}
                            </button>
                        )
                    })}
                </div>

                {/* Safe area padding for iOS */}
                <div className="h-8" />
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
