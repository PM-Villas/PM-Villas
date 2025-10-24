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

    // Professional touch handling with velocity and momentum
    const [touchStartX, setTouchStartX] = useState(0)
    const [touchStartY, setTouchStartY] = useState(0)
    const [touchStartTime, setTouchStartTime] = useState(0)
    const [dragOffset, setDragOffset] = useState(0)
    const [isDragging, setIsDragging] = useState(false)
    const [isHorizontalSwipe, setIsHorizontalSwipe] = useState(false)
    const [lastTouchX, setLastTouchX] = useState(0)
    const [lastTouchTime, setLastTouchTime] = useState(0)
    const [wasSwiping, setWasSwiping] = useState(false)

    const handleTouchStart = (e: React.TouchEvent) => {
        // Prevent page scrolling when touching the gallery
        e.preventDefault()

        const touchX = e.targetTouches[0].clientX
        const touchY = e.targetTouches[0].clientY
        const time = Date.now()
        setTouchStartX(touchX)
        setTouchStartY(touchY)
        setTouchStartTime(time)
        setLastTouchX(touchX)
        setLastTouchTime(time)
        setIsDragging(true)
        setIsHorizontalSwipe(false)
    }

    const handleTouchMove = (e: React.TouchEvent) => {
        // Always prevent default to stop page scrolling
        e.preventDefault()

        if (!isDragging) return

        const currentTouchX = e.targetTouches[0].clientX
        const currentTouchY = e.targetTouches[0].clientY
        const currentTime = Date.now()

        // Determine swipe direction on first significant move
        if (!isHorizontalSwipe && (Math.abs(currentTouchX - touchStartX) > 10 || Math.abs(currentTouchY - touchStartY) > 10)) {
            const horizontalDiff = Math.abs(currentTouchX - touchStartX)
            const verticalDiff = Math.abs(currentTouchY - touchStartY)

            // If horizontal movement is greater, it's a horizontal swipe
            if (horizontalDiff > verticalDiff) {
                setIsHorizontalSwipe(true)
            } else {
                // Vertical gesture - don't navigate, but still prevent page scroll
                setIsDragging(false)
                return
            }
        }

        // Only handle horizontal swipes
        if (!isHorizontalSwipe) return

        let diff = currentTouchX - touchStartX

        // Apply edge resistance at boundaries
        const isAtStart = safeIndex === 0
        const isAtEnd = safeIndex === images.length - 1

        if ((isAtStart && diff > 0) || (isAtEnd && diff < 0)) {
            // Apply resistance: reduce drag by 70% at edges
            diff = diff * 0.3
        }

        setDragOffset(diff)
        setLastTouchX(currentTouchX)
        setLastTouchTime(currentTime)
    }

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (!isDragging) return

        let didSwipe = false

        // Only navigate if it was a horizontal swipe
        if (isHorizontalSwipe) {
            // Calculate velocity (pixels per millisecond)
            const timeDiff = Date.now() - lastTouchTime
            const touchDiff = lastTouchX - touchStartX
            const velocity = timeDiff > 0 ? Math.abs(touchDiff / timeDiff) : 0

            // Thresholds
            const distanceThreshold = 50 // Minimum drag distance
            const velocityThreshold = 0.3 // Minimum velocity for momentum swipe

            // Determine if we should navigate
            const shouldNavigate =
                Math.abs(dragOffset) > distanceThreshold ||
                velocity > velocityThreshold

            if (shouldNavigate && images.length > 1) {
                didSwipe = true
                if (dragOffset > 0 && safeIndex > 0) {
                    // Swiped right - go to previous
                    onPrevImage()
                } else if (dragOffset < 0 && safeIndex < images.length - 1) {
                    // Swiped left - go to next
                    onNextImage()
                }
            }

            // Prevent click event if user was swiping
            if (didSwipe) {
                e.preventDefault()
                setWasSwiping(true)
                // Reset the flag after a short delay
                setTimeout(() => setWasSwiping(false), 100)
            }
        }

        // Reset
        setIsDragging(false)
        setIsHorizontalSwipe(false)
        setDragOffset(0)
        setTouchStartX(0)
        setTouchStartY(0)
        setTouchStartTime(0)
        setLastTouchX(0)
        setLastTouchTime(0)
    }

    const handleClick = (e: React.MouseEvent) => {
        // Don't open fullscreen if user was just swiping
        if (wasSwiping) {
            e.preventDefault()
            e.stopPropagation()
            return
        }
        onOpenFullScreen()
    }

    // If no images available, show placeholder
    if (images.length === 0) {
        return (
            <div className="relative h-[48vh] md:h-[89vh] lg:h-[74vh] xl:h-[72vh] overflow-hidden bg-gray-200 flex items-center justify-center">
                <div className="text-gray-500 text-lg">No images available</div>
            </div>
        )
    }

    // Calculate carousel position with smooth drag
    const getCarouselTransform = () => {
        // Base position based on current index (percentage-based for smooth transitions)
        const baseOffset = -(safeIndex * 100)

        // Only apply drag offset if it's a horizontal swipe
        const activeDragOffset = isHorizontalSwipe ? dragOffset : 0

        return `translateX(calc(${baseOffset}% + ${activeDragOffset}px))`
    }

    return (
        <div
            className="relative h-[48vh] md:h-[89vh] lg:h-[74vh] xl:h-[72vh] overflow-hidden bg-white"
        >
            {/* Carousel Track - renders all images for smooth transitions */}
            <div
                className="relative h-full flex"
                style={{
                    transform: getCarouselTransform(),
                    transition: isDragging ? 'none' : 'transform 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    willChange: 'transform',
                }}
            >
                {/* Render all images in carousel */}
                {images.map((image, index) => (
                    <div key={index} className="relative min-w-full h-full flex-shrink-0 flex items-center justify-center">
                        <div className="relative w-full h-full">
                            <Image
                                src={image.asset?.url || '/placeholder.jpg'}
                                alt={image.alt || propertyTitle}
                                fill
                                className="object-contain"
                                priority={index === safeIndex}
                                loading={Math.abs(index - safeIndex) <= 1 ? 'eager' : 'lazy'}
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* Interactive overlay - handles both touch swipe and click-to-zoom */}
            <button
                onClick={handleClick}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                className="absolute inset-0 cursor-zoom-in z-10"
                style={{ touchAction: 'none' }}
                aria-label="Swipe to navigate or tap to open full screen"
                type="button"
            />

            {/* Gradient overlay for better text visibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none z-20"></div>

            {/* Navigation Arrows - Hidden on mobile, visible on desktop */}
            {images.length > 1 && (
                <>
                    <button
                        type="button"
                        onClick={onPrevImage}
                        className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 z-30 w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full items-center justify-center hover:bg-white/30 transition-all duration-200 hover:scale-105"
                        aria-label="Previous image"
                    >
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    <button
                        type="button"
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

            {/* Image Counter - Bottom right corner on mobile, top right on desktop */}
            {images.length > 1 && (
                <div className="absolute bottom-6 right-6 md:top-6 md:bottom-auto z-30">
                    <div className="bg-black/70 backdrop-blur-md rounded-full px-4 py-2 text-white text-sm font-semibold shadow-lg">
                        {safeIndex + 1} / {images.length}
                    </div>
                </div>
            )}

            {/* Category Badge */}
            {currentImage?.category && currentImage.category !== 'main' && (
                <div className="absolute top-6 right-6 md:top-20 md:right-6 z-30">
                    <Badge className="bg-emerald-500 text-white font-medium">
                        {currentImage.category.replace(/\b\w/g, (l: string) => l.toUpperCase())}
                    </Badge>
                </div>
            )}

            {/* View All Photos Button - Centered at bottom */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30">
                <Button
                    onClick={onOpenFullScreen}
                    variant="outline"
                    className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 hover:border-white/50 transition-all duration-200 shadow-lg"
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