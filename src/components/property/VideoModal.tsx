// File: src/components/property/VideoModal.tsx
'use client'

import React from 'react'

type VideoModalProps = {
    isOpen: boolean
    youtubeVideoId: string | null
    propertyTitle: string
    onClose: () => void
}

export default function VideoModal({
    isOpen,
    youtubeVideoId,
    propertyTitle,
    onClose,
}: VideoModalProps) {
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') {
            onClose()
        }
    }

    if (!isOpen || !youtubeVideoId) return null

    return (
        <div
            className="fixed inset-0 bg-black z-50 flex items-center justify-center"
            onKeyDown={handleKeyDown}
            tabIndex={0}
        >
            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute top-6 right-6 z-[60] w-14 h-14 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/70 transition-all duration-200 border border-white/20"
                aria-label="Close video"
                type="button"
            >
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            {/* Video Player Container */}
            <div className="relative w-full h-full flex items-center justify-center p-4 md:p-8">
                <div className="w-full max-w-7xl aspect-video">
                    <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3&showinfo=0&controls=0&fs=0&cc_load_policy=0&start=0&disablekb=1`}
                        title={`${propertyTitle} - Property Video Tour`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className="w-full h-full rounded-lg shadow-2xl"
                    ></iframe>
                </div>
            </div>
        </div>
    )
}