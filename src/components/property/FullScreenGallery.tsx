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

    // Professional touch handling with velocity and momentum
    const [touchStartX, setTouchStartX] = useState(0)
    const [touchStartY, setTouchStartY] = useState(0)
    const [touchStartTime, setTouchStartTime] = useState(0)
    const [dragOffset, setDragOffset] = useState(0)
    const [isDragging, setIsDragging] = useState(false)
    const [isHorizontalSwipe, setIsHorizontalSwipe] = useState(false)
    const [lastTouchX, setLastTouchX] = useState(0)
    const [lastTouchTime, setLastTouchTime] = useState(0)

    // Zoom state
    const [scale, setScale] = useState(1)
    const [positionX, setPositionX] = useState(0)
    const [positionY, setPositionY] = useState(0)
    const [lastDistance, setLastDistance] = useState(0)
    const [lastTapTime, setLastTapTime] = useState(0)
    const [isPinching, setIsPinching] = useState(false)

    // Reset zoom when image changes
    React.useEffect(() => {
        setScale(1)
        setPositionX(0)
        setPositionY(0)
    }, [selectedIndex])

    // Get distance between two touch points
    const getDistance = (touches: React.TouchList) => {
        const dx = touches[0].clientX - touches[1].clientX
        const dy = touches[0].clientY - touches[1].clientY
        return Math.sqrt(dx * dx + dy * dy)
    }

    const handleTouchStart = (e: React.TouchEvent) => {
        // Handle pinch zoom
        if (e.touches.length === 2) {
            setIsPinching(true)
            setLastDistance(getDistance(e.touches))
            setIsDragging(false)
            return
        }

        // Handle double tap to zoom
        const now = Date.now()
        if (now - lastTapTime < 300) {
            // Double tap detected
            if (scale > 1) {
                // Reset zoom
                setScale(1)
                setPositionX(0)
                setPositionY(0)
            } else {
                // Zoom in to 2x
                setScale(2)
            }
            setLastTapTime(0)
            return
        }
        setLastTapTime(now)

        // Regular touch start for swipe
        if (scale === 1) {
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
    }

    const handleTouchMove = (e: React.TouchEvent) => {
        // Always prevent default to stop page scrolling
        e.preventDefault()

        // Handle pinch zoom
        if (e.touches.length === 2 && isPinching) {
            const distance = getDistance(e.touches)
            const scaleChange = distance / lastDistance
            const newScale = Math.max(1, Math.min(4, scale * scaleChange))
            setScale(newScale)
            setLastDistance(distance)
            return
        }

        // Handle pan when zoomed
        if (scale > 1 && e.touches.length === 1) {
            const dx = e.touches[0].clientX - touchStartX
            const dy = e.touches[0].clientY - touchStartY
            setPositionX(dx)
            setPositionY(dy)
            return
        }

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
                // Vertical scroll - cancel drag
                setIsDragging(false)
                return
            }
        }

        // Only handle horizontal swipes
        if (!isHorizontalSwipe) return

        // Prevent default to stop vertical scroll during horizontal swipe
        e.preventDefault()

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

    const handleTouchEnd = () => {
        // Reset pinching state
        if (isPinching) {
            setIsPinching(false)
            return
        }

        if (!isDragging) return

        // Only navigate if it was a horizontal swipe and not zoomed
        if (isHorizontalSwipe && scale === 1) {
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
                if (dragOffset > 0 && safeIndex > 0) {
                    // Swiped right - go to previous
                    onPrev()
                } else if (dragOffset < 0 && safeIndex < images.length - 1) {
                    // Swiped left - go to next
                    onNext()
                }
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

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowLeft') {
            onPrev()
        } else if (e.key === 'ArrowRight') {
            onNext()
        }
    }

    // Calculate carousel position with smooth drag
    const getCarouselTransform = () => {
        // Base position based on current index (percentage-based for smooth transitions)
        const baseOffset = -(safeIndex * 100)

        // Only apply drag offset if it's a horizontal swipe
        const activeDragOffset = isHorizontalSwipe ? dragOffset : 0

        return `translateX(calc(${baseOffset}% + ${activeDragOffset}px))`
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

            {/* Carousel Track with smooth drag transform */}
            <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                <div
                    className="relative h-full flex"
                    style={{
                        transform: getCarouselTransform(),
                        transition: isDragging ? 'none' : 'transform 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                        willChange: 'transform',
                        touchAction: 'none',
                    }}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    {/* Render all images in carousel */}
                    {images.map((image, index) => (
                        <div key={index} className="relative min-w-full h-full flex-shrink-0 flex items-center justify-center p-4 md:p-8">
                            <div
                                className="relative w-full h-full max-w-6xl"
                                style={{
                                    transform: index === safeIndex ? `scale(${scale}) translate(${positionX / scale}px, ${positionY / scale}px)` : 'none',
                                    transition: isDragging || isPinching ? 'none' : 'transform 0.3s ease-out',
                                    transformOrigin: 'center center',
                                }}
                            >
                                <Image
                                    src={image.asset?.url || '/placeholder.jpg'}
                                    alt={image.alt || propertyTitle}
                                    fill
                                    className="object-contain"
                                    sizes="100vw"
                                    priority={index === safeIndex}
                                    loading={Math.abs(index - safeIndex) <= 1 ? 'eager' : 'lazy'}
                                />
                            </div>
                        </div>
                    ))}
                </div>

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
                <div className="hidden md:block">Press ESC to close • Use arrow keys to navigate</div>
                <div className="md:hidden">Double tap to zoom • Pinch to zoom in/out</div>
            </div>
        </div>
    )
}