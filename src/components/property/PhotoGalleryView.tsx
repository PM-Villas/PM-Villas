// File: src/components/property/PhotoGalleryView.tsx
// Mobile: 60vh height, object-contain for full image display (Airbnb-style)
'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

type GalleryImage = {
    asset?: { url: string }
    alt?: string
    category?: string
}

type PhotoGalleryViewProps = {
    images: GalleryImage[]
    selectedIndex: number
    propertyTitle: string
    onOpenFullScreen: () => void
    onSelectImage: (index: number) => void
    onNextImage: () => void
    onPrevImage: () => void
}

export default function PhotoGalleryView({
    images,
    selectedIndex,
    propertyTitle,
    onOpenFullScreen,
    onSelectImage,
    onNextImage,
    onPrevImage,
}: PhotoGalleryViewProps) {
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
            onNextImage()
        }
        if (isRightSwipe && images.length > 1) {
            onPrevImage()
        }

        // Reset
        setTouchStart(0)
        setTouchEnd(0)
    }

    // If no images available, show placeholder
    if (images.length === 0) {
        return (
            <div className="relative h-[60vh] md:h-[89vh] lg:h-[74vh] xl:h-[72vh] overflow-hidden bg-gray-200 flex items-center justify-center">
                <div className="text-gray-500 text-lg">No images available</div>
            </div>
        )
    }

    return (
        <div
            className="relative h-[60vh] md:h-[89vh] lg:h-[74vh] xl:h-[72vh] overflow-hidden bg-gray-100"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            {/* Main Image */}
            {currentImage && (
                <Image
                    src={currentImage.asset?.url || '/placeholder.jpg'}
                    alt={currentImage.alt || propertyTitle}
                    fill
                    className="object-cover transition-all duration-300"
                    priority
                />
            )}

            {/* Click-to-zoom (image opens fullscreen) */}
            <button
                onClick={onOpenFullScreen}
                className="absolute inset-0 cursor-zoom-in"
                aria-label="Open full screen"
                type="button"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none"></div>

            {/* Navigation Arrows - Hidden on mobile, visible on desktop */}
            {images.length > 1 && (
                <>
                    <button
                        onClick={onPrevImage}
                        className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 z-30 w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full items-center justify-center hover:bg-white/30 transition-all duration-200 hover:scale-105"
                        aria-label="Previous image"
                    >
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    <button
                        onClick={onNextImage}
                        className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 z-30 w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full items-center justify-center hover:bg-white/30 transition-all duration-200 hover:scale-105"
                        aria-label="Next image"
                    >
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </>
            )}

            {/* Counter - Top-right on desktop, bottom-right on mobile */}
            {images.length > 1 && (
                <div className="absolute md:top-6 bottom-24 right-4 md:right-6 z-30 bg-black/60 backdrop-blur-sm rounded-lg px-4 py-2 text-white text-sm font-medium">
                    {safeIndex + 1} / {images.length}
                </div>
            )}

            {/* Category Badge */}
            {currentImage?.category && currentImage.category !== 'main' && (
                <div className="absolute top-20 right-6 z-30">
                    <Badge className="bg-emerald-500 text-white font-medium">
                        {currentImage.category.replace(/\b\w/g, (l: string) => l.toUpperCase())}
                    </Badge>
                </div>
            )}

            {/* Slide Dots (centered above the button) */}
            {images.length > 1 && (
                <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2.5">
                    {images.map((_, i) => (
                        <button
                            key={i}
                            type="button"
                            onClick={() => onSelectImage(i)}
                            aria-label={`Go to slide ${i + 1}`}
                            className={`w-2.5 h-2.5 rounded-full transition-opacity ${safeIndex === i
                                ? 'bg-white opacity-100'
                                : 'bg-white/70 opacity-60 hover:opacity-100'
                                }`}
                        />
                    ))}
                </div>
            )}

            {/* View All Photos Button */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30">
                <Button
                    onClick={onOpenFullScreen}
                    variant="outline"
                    className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 hover:border-white/50 transition-all duration-200"
                >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                    View All {images.length} Photos
                </Button>
            </div>
        </div>
    )
}