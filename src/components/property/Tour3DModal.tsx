// File: src/components/property/Tour3DModal.tsx
'use client'

import React from 'react'

type Tour3DModalProps = {
    isOpen: boolean
    matterportUrl: string | null
    propertyTitle: string
    onClose: () => void
}

export default function Tour3DModal({
    isOpen,
    matterportUrl,
    propertyTitle,
    onClose,
}: Tour3DModalProps) {
    const containerRef = React.useRef<HTMLDivElement>(null)
    const [isFullscreen, setIsFullscreen] = React.useState(false)

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') {
            onClose()
        }
    }

    // Auto-request fullscreen when modal opens
    React.useEffect(() => {
        if (!isOpen || !containerRef.current) return

        const requestFullscreen = async () => {
            try {
                // Small delay to ensure modal is fully rendered
                await new Promise(resolve => setTimeout(resolve, 100))

                if (containerRef.current) {
                    // Try to enter fullscreen
                    if (containerRef.current.requestFullscreen) {
                        await containerRef.current.requestFullscreen()
                    } else if ((containerRef.current as any).webkitRequestFullscreen) {
                        await (containerRef.current as any).webkitRequestFullscreen()
                    } else if ((containerRef.current as any).mozRequestFullScreen) {
                        await (containerRef.current as any).mozRequestFullScreen()
                    } else if ((containerRef.current as any).msRequestFullscreen) {
                        await (containerRef.current as any).msRequestFullscreen()
                    }
                    setIsFullscreen(true)
                }
            } catch (error) {
                // User denied fullscreen or browser doesn't support it
                console.log('Fullscreen request denied or not supported:', error)
            }
        }

        requestFullscreen()

        // Listen for fullscreen changes
        const handleFullscreenChange = () => {
            const isCurrentlyFullscreen = !!(
                document.fullscreenElement ||
                (document as any).webkitFullscreenElement ||
                (document as any).mozFullScreenElement ||
                (document as any).msFullscreenElement
            )
            setIsFullscreen(isCurrentlyFullscreen)

            // If user exits fullscreen, close the modal
            if (!isCurrentlyFullscreen && isOpen) {
                onClose()
            }
        }

        document.addEventListener('fullscreenchange', handleFullscreenChange)
        document.addEventListener('webkitfullscreenchange', handleFullscreenChange)
        document.addEventListener('mozfullscreenchange', handleFullscreenChange)
        document.addEventListener('MSFullscreenChange', handleFullscreenChange)

        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange)
            document.removeEventListener('webkitfullscreenchange', handleFullscreenChange)
            document.removeEventListener('mozfullscreenchange', handleFullscreenChange)
            document.removeEventListener('MSFullscreenChange', handleFullscreenChange)

            // Exit fullscreen when modal closes
            if (document.fullscreenElement) {
                document.exitFullscreen()
            } else if ((document as any).webkitFullscreenElement) {
                (document as any).webkitExitFullscreen()
            } else if ((document as any).mozFullScreenElement) {
                (document as any).mozCancelFullScreen()
            } else if ((document as any).msFullscreenElement) {
                (document as any).msExitFullscreen()
            }
        }
    }, [isOpen, onClose])

    const handleClose = () => {
        // Exit fullscreen first if active
        if (document.fullscreenElement) {
            document.exitFullscreen().then(() => onClose())
        } else if ((document as any).webkitFullscreenElement) {
            (document as any).webkitExitFullscreen()
            onClose()
        } else if ((document as any).mozFullScreenElement) {
            (document as any).mozCancelFullScreen()
            onClose()
        } else if ((document as any).msFullscreenElement) {
            (document as any).msExitFullscreen()
            onClose()
        } else {
            onClose()
        }
    }

    if (!isOpen || !matterportUrl) return null

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 bg-black z-50 flex items-center justify-center"
            onKeyDown={handleKeyDown}
            tabIndex={0}
        >
            {/* Close Button */}
            <button
                onClick={handleClose}
                className="absolute top-6 right-6 z-[60] w-14 h-14 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/70 transition-all duration-200 border border-white/20"
                aria-label="Close 3D tour"
                type="button"
            >
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            {/* 3D Tour Container */}
            <div className="relative w-full h-full flex items-center justify-center">
                <div className="w-full h-full">
                    <iframe
                        src={matterportUrl}
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        allowFullScreen
                        allow="xr-spatial-tracking; fullscreen"
                        title={`${propertyTitle} - 3D Virtual Tour`}
                        className="w-full h-full"
                    ></iframe>
                </div>
            </div>

            {/* Fullscreen Hint */}
            {!isFullscreen && (
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 text-sm bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full">
                    Press ESC to exit
                </div>
            )}
        </div>
    )
}