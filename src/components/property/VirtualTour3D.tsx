// File: src/components/property/VirtualTour3D.tsx
'use client'

import React from 'react'
import Image from 'next/image'

type VirtualTour3DProps = {
    matterportUrl?: string
    propertyTitle: string
    mainImageUrl?: string
    mainImageAlt?: string
    onOpen3DTour: () => void
}

export default function VirtualTour3D({
    matterportUrl,
    propertyTitle,
    mainImageUrl,
    mainImageAlt,
    onOpen3DTour
}: VirtualTour3DProps) {
    // If Matterport URL exists, show preview
    if (matterportUrl) {
        return (
            <div className="relative h-[100vh] md:h-[89vh] lg:h-[74vh] xl:h-[72vh] bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden">
                {/* Main Hero Image Background */}
                <div className="absolute inset-0">
                    <Image
                        src={mainImageUrl || '/placeholder.jpg'}
                        alt={mainImageAlt || propertyTitle}
                        fill
                        className="object-cover"
                        priority
                    />
                    {/* Overlay for better readability */}
                    <div className="absolute inset-0 bg-black/50"></div>
                </div>

                {/* Content Overlay */}
                <div className="relative z-10 h-full flex flex-col items-center justify-center p-6 text-center">
                    {/* Beautiful Play Button */}
                    <button
                        onClick={onOpen3DTour}
                        className="group relative mb-8 transform transition-all duration-500 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-white/30"
                        aria-label="Start 3D virtual tour"
                    >
                        {/* Outer Ring with Pulse Animation */}
                        <div className="absolute inset-0 w-28 h-28 bg-emerald-500/20 rounded-full animate-ping"></div>
                        <div className="absolute inset-0 w-28 h-28 bg-emerald-500/10 rounded-full animate-pulse"></div>

                        {/* Main Play Button */}
                        <div className="relative w-28 h-28 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center shadow-2xl group-hover:shadow-emerald-500/30 transition-all duration-300">
                            <svg
                                className="w-12 h-12 text-white ml-1 transform group-hover:scale-110 transition-transform duration-300"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        </div>
                    </button>

                    {/* Tour Title and Info */}
                    <div className="max-w-4xl mx-auto text-white space-y-4">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                            {propertyTitle}
                        </h2>
                        <p className="text-lg md:text-xl text-white/90 font-medium">
                            Interactive 3D Virtual Tour
                        </p>
                        <p className="text-base md:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
                            Explore every corner of this property with our immersive 3D walkthrough
                        </p>
                    </div>

                    {/* Tour Features */}
                    <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white/80">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                            </svg>
                            360° View
                        </div>
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white/80">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                            </svg>
                            Interactive
                        </div>
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white/80">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h12a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V8zm6 2a1 1 0 11-2 0 1 1 0 012 0zm4 0a1 1 0 11-2 0 1 1 0 012 0z" clipRule="evenodd" />
                            </svg>
                            HD Quality
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    // Fallback: Show placeholder if no Matterport URL
    return (
        <div className="relative h-[100vh] md:h-[89vh] lg:h-[74vh] xl:h-[72vh] bg-gray-900 flex items-center justify-center">
            <div className="text-center text-white space-y-6">
                <div className="w-24 h-24 mx-auto bg-white/10 rounded-full flex items-center justify-center">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                    </svg>
                </div>
                <h3 className="text-2xl font-bold">3D Virtual Tour</h3>
                <p className="text-gray-300 max-w-md">
                    3D virtual tour coming soon for this property
                </p>
                <div className="text-sm text-gray-400">
                    Interactive • Full HD • Mobile Compatible
                </div>
            </div>
        </div>
    )
}