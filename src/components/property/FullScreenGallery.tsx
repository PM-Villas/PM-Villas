// File: src/components/property/FullScreenGallery.tsx
'use client'

import React, { useState } from 'react'
import Image from 'next/image'

type GalleryImage = {
    asset?: { url: string }
    alt?: string
    category?: string
}

type FullScreenGalleryProps = {
    isOpen: boolean
    images: GalleryImage[]
    selectedIndex: number
    propertyTitle: string
    onClose: () => void
    onNext: () => void
    onPrev: () => void
    onSelectImage: (index: number) => void
}

export default function FullScreenGallery({
    isOpen,
    images,
    selectedIndex,
    propertyTitle,
    onClose,
    onNext,
    onPrev,
    onSelectImage,
}: FullScreenGalleryProps) {
    // Safety check: ensure selectedIndex is valid
    const safeIndex = selectedIndex >= 0 && selectedIndex < images.length ? selectedIndex : 0
    const currentImage = images[safeIndex]

    // Touch handling for swipe navigation
    const [touchStart, setTouchStart] = useState(0)
    const [touchEnd, setTouchEnd] = useState(0)

    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStart(e.targetTouches[0].clientX)
    }

    const handleTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX)
    }

    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd) return

        const distance = touchStart - touchEnd
        const isLeftSwipe = distance > 50
        const isRightSwipe = distance < -50

        if (isLeftSwipe && images.length > 1) {
            onNext()
        }
        if (isRightSwipe && images.length > 1) {
            onPrev()
        }

        // Reset
        setTouchStart(0)
        setTouchEnd(0)
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowLeft') {
            onPrev()
        } else if (e.key === 'ArrowRight') {
            onNext()
        }
    }

    if (!isOpen) return null

    // If no images available, show placeholder
    if (images.length === 0) {
        return (
            <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center">
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 z-50 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                    aria-label="Close gallery"
                    type="button"
                >
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <div className="text-white text-lg">No images available</div>
            </div>
        )
    }

    return (
        <div
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
            onKeyDown={handleKeyDown}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            tabIndex={0}
        >
            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute top-6 right-6 z-50 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                aria-label="Close gallery"
                type="button"
            >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            {/* Main Image */}
            <div className="relative w-full h-full flex items-center justify-center p-4">
                {currentImage && (
                    <div className="relative max-w-7xl max-h-full">
                        <Image
                            src={currentImage.asset?.url || '/placeholder.jpg'}
                            alt={currentImage.alt || propertyTitle}
                            width={1200}
                            height={800}
                            className="object-contain max-w-full max-h-full"
                            priority
                        />
                    </div>
                )}

                {/* Arrows - Hidden on mobile, visible on desktop */}
                {images.length > 1 && (
                    <>
                        <button
                            onClick={onPrev}
                            className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full items-center justify-center hover:bg-white/30 transition-all duration-200"
                            aria-label="Previous image"
                        >
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        <button
                            onClick={onNext}
                            className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full items-center justify-center hover:bg-white/30 transition-all duration-200"
                            aria-label="Next image"
                        >
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </>
                )}
            </div>

            {/* Bottom Info Bar */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="text-white">
                        <div className="text-lg font-semibold">
                            {currentImage?.alt || `Photo ${safeIndex + 1}`}
                        </div>
                        {currentImage?.category && currentImage.category !== 'main' && (
                            <div className="text-sm text-gray-300 mt-1">
                                {currentImage.category.replace(/\b\w/g, (l: string) => l.toUpperCase())} Photo
                            </div>
                        )}
                    </div>

                    <div className="text-white text-lg font-medium">
                        {safeIndex + 1} / {images.length}
                    </div>
                </div>

                {/* Thumbnail Strip */}
                <div className="max-w-7xl mx-auto mt-4">
                    <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
                        {images.map((image: GalleryImage, index: number) => (
                            <button
                                key={index}
                                onClick={() => onSelectImage(index)}
                                className={`relative w-16 h-12 flex-shrink-0 rounded overflow-hidden border transition-all duration-200 ${safeIndex === index
                                    ? 'border-emerald-400 ring-2 ring-emerald-400/50'
                                    : 'border-white/30 hover:border-white/60'
                                    }`}
                            >
                                <Image
                                    src={image.asset?.url || '/placeholder.jpg'}
                                    alt={image.alt || `Gallery ${index + 1}`}
                                    fill
                                    className="object-cover"
                                />
                                {safeIndex === index && (
                                    <div className="absolute inset-0 bg-emerald-400/25"></div>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Instructions */}
            <div className="absolute top-6 left-6 text-white/70 text-sm">
                Press ESC to close • Use arrow keys to navigate
            </div>
        </div>
    )
}