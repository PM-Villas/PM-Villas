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
    const [lastTapTime, setLastTapTime] = useState(0)
    const [isPinching, setIsPinching] = useState(false)
    const [initialDistance, setInitialDistance] = useState(0)
    const [initialScale, setInitialScale] = useState(1)
    const [pinchCenterX, setPinchCenterX] = useState(0)
    const [pinchCenterY, setPinchCenterY] = useState(0)
    const [panStartX, setPanStartX] = useState(0)
    const [panStartY, setPanStartY] = useState(0)
    const [isPanning, setIsPanning] = useState(false)

    // Reset zoom when image changes OR when gallery opens
    React.useEffect(() => {
        setScale(1)
        setPositionX(0)
        setPositionY(0)
        setIsPanning(false)
    }, [selectedIndex, isOpen])

    // Get distance between two touch points for pinch zoom
    const getDistance = (touches: React.TouchList) => {
        const dx = touches[0].clientX - touches[1].clientX
        const dy = touches[0].clientY - touches[1].clientY
        return Math.sqrt(dx * dx + dy * dy)
    }

    // Get center point between two touches
    const getCenter = (touches: React.TouchList) => {
        return {
            x: (touches[0].clientX + touches[1].clientX) / 2,
            y: (touches[0].clientY + touches[1].clientY) / 2,
        }
    }

    const handleTouchStart = (e: React.TouchEvent) => {
        e.preventDefault()

        // Handle pinch zoom with 2 fingers
        if (e.touches.length === 2) {
            setIsPinching(true)
            setIsDragging(false)
            setIsPanning(false)
            setInitialDistance(getDistance(e.touches))
            setInitialScale(scale)
            // Store the center point of the pinch gesture
            const center = getCenter(e.touches)
            setPinchCenterX(center.x)
            setPinchCenterY(center.y)
            return
        }

        // Single touch
        const touch = e.touches[0]
        const now = Date.now()

        // Check for double tap
        if (now - lastTapTime < 300 && !isPanning) {
            // Double tap detected - toggle zoom
            if (scale > 1) {
                setScale(1)
                setPositionX(0)
                setPositionY(0)
            } else {
                setScale(2.5)
                setPositionX(0)
                setPositionY(0)
            }
            setLastTapTime(0)
            return
        }
        setLastTapTime(now)

        // If zoomed, start panning
        if (scale > 1) {
            setIsPanning(true)
            const panSpeed = 1 + (scale - 1) * 1.2
            setPanStartX(touch.clientX - (positionX / panSpeed))
            setPanStartY(touch.clientY - (positionY / panSpeed))
            return
        }

        // Regular swipe for navigation
        setTouchStartX(touch.clientX)
        setTouchStartY(touch.clientY)
        setTouchStartTime(now)
        setLastTouchX(touch.clientX)
        setLastTouchTime(now)
        setIsDragging(true)
        setIsHorizontalSwipe(false)
    }

    const handleTouchMove = (e: React.TouchEvent) => {
        e.preventDefault()

        // Handle pinch zoom
        if (e.touches.length === 2 && isPinching) {
            const currentDistance = getDistance(e.touches)
            const scaleChange = currentDistance / initialDistance
            const newScale = Math.max(1, Math.min(5, initialScale * scaleChange))

            // Calculate offset to zoom around pinch center instead of image center
            // Get screen center
            const screenCenterX = window.innerWidth / 2
            const screenCenterY = window.innerHeight / 2

            // Calculate offset from screen center to pinch center
            const offsetX = pinchCenterX - screenCenterX
            const offsetY = pinchCenterY - screenCenterY

            // Adjust position to zoom around pinch point
            const scaleDiff = newScale - initialScale
            setPositionX(-offsetX * scaleDiff)
            setPositionY(-offsetY * scaleDiff)
            setScale(newScale)
            return
        }

        // Handle panning when zoomed
        if (isPanning && scale > 1) {
            const touch = e.touches[0]
            // Pan speed increases significantly with zoom level for easier navigation
            const panSpeed = 1 + (scale - 1) * 1.2 // Speed multiplier: 1x at scale 1, 2.2x at scale 2, 5.8x at scale 5
            const deltaX = (touch.clientX - panStartX) * panSpeed
            const deltaY = (touch.clientY - panStartY) * panSpeed
            setPositionX(deltaX)
            setPositionY(deltaY)
            return
        }

        // Handle swipe navigation (only when not zoomed)
        if (!isDragging || scale > 1) return

        const currentTouchX = e.targetTouches[0].clientX
        const currentTouchY = e.targetTouches[0].clientY
        const currentTime = Date.now()

        // Determine swipe direction on first significant move
        if (!isHorizontalSwipe && (Math.abs(currentTouchX - touchStartX) > 10 || Math.abs(currentTouchY - touchStartY) > 10)) {
            const horizontalDiff = Math.abs(currentTouchX - touchStartX)
            const verticalDiff = Math.abs(currentTouchY - touchStartY)

            if (horizontalDiff > verticalDiff) {
                setIsHorizontalSwipe(true)
            } else {
                setIsDragging(false)
                return
            }
        }

        if (!isHorizontalSwipe) return

        let diff = currentTouchX - touchStartX

        // Apply edge resistance at boundaries
        const isAtStart = safeIndex === 0
        const isAtEnd = safeIndex === images.length - 1

        if ((isAtStart && diff > 0) || (isAtEnd && diff < 0)) {
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
            setInitialDistance(0)
            setInitialScale(1)
            return
        }

        // Reset panning state
        if (isPanning) {
            setIsPanning(false)
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
                    {images.map((image, index) => {
                        // Get original quality image URL from Sanity
                        const originalImageUrl = image.asset?.url
                            ? `${image.asset.url}?q=100&auto=format`
                            : '/placeholder.jpg'

                        return (
                            <div
                                key={index}
                                className="relative min-w-full h-screen flex-shrink-0 flex items-center justify-center"
                            >
                                <div
                                    className="relative w-screen h-screen"
                                    style={{
                                        transform: index === safeIndex ? `scale(${scale}) translate(${positionX / scale}px, ${positionY / scale}px)` : 'none',
                                        transition: isDragging || isPinching ? 'none' : 'transform 0.3s ease-out',
                                        transformOrigin: 'center center',
                                    }}
                                >
                                    <Image
                                        src={originalImageUrl}
                                        alt={image.alt || propertyTitle}
                                        fill
                                        className="object-contain"
                                        quality={100}
                                        priority={index === safeIndex}
                                    />
                                </div>
                            </div>
                        )
                    })}
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
                <div className="md:hidden">
                    Pinch to zoom • Double tap to zoom {scale > 1 ? `(${scale.toFixed(1)}x)` : ''}
                </div>
            </div>
        </div>
    )
}