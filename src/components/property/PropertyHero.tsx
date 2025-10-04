// File: src/components/property/PropertyHero.tsx
'use client'

import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

type GalleryImage = {
    asset?: { url: string }
    alt?: string
    category?: string
}

type PropertyHeroProps = {
    title: string
    mainImage?: {
        asset?: { url: string }
        alt?: string
    }
    gallery?: GalleryImage[]
    youtubeUrl?: string
    onOpenFullScreen: () => void
    onOpenVideoModal: () => void
    selectedImageIndex: number
    onSelectImage: (index: number) => void
    onNextImage: () => void
    onPrevImage: () => void
    activeTab: 'photos' | '3d-tour' | 'videos'
    onTabChange: (tab: 'photos' | '3d-tour' | 'videos') => void
}

// Helper function to extract YouTube video ID from URL
function getYouTubeVideoId(url: string): string | null {
    if (!url) return null
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
    const match = url.match(regExp)
    return (match && match[7].length === 11) ? match[7] : null
}

export default function PropertyHero({
    title,
    mainImage,
    gallery,
    youtubeUrl,
    onOpenFullScreen,
    onOpenVideoModal,
    selectedImageIndex,
    onSelectImage,
    onNextImage,
    onPrevImage,
    activeTab,
    onTabChange,
}: PropertyHeroProps) {
    // Combined gallery (main image + gallery)
    const allImages = [
        { asset: mainImage?.asset, alt: mainImage?.alt || title, category: 'main' },
        ...(gallery || [])
    ].filter(img => img.asset?.url)

    const youtubeVideoId = getYouTubeVideoId(youtubeUrl || '')

    return (
        <section className="relative">
            <Tabs value={activeTab} onValueChange={(v) => onTabChange(v as any)} className="w-full">
                {/* Media Navigation */}
                <div className="absolute top-4 left-4 z-20">
                    <TabsList className="bg-white/90 backdrop-blur-sm shadow-lg border border-white/20">
                        <TabsTrigger value="photos" className="flex items-center space-x-2 data-[state=active]:bg-emerald-500 data-[state=active]:text-white">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>Photos</span>
                            <Badge variant="secondary" className="ml-1 text-xs bg-gray-100">
                                {gallery ? gallery.length + 1 : 1}
                            </Badge>
                        </TabsTrigger>

                        <TabsTrigger value="3d-tour" className="flex items-center space-x-2 data-[state=active]:bg-emerald-500 data-[state=active]:text-white">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                            </svg>
                            <span>3D Tour</span>
                        </TabsTrigger>

                        {youtubeVideoId && (
                            <TabsTrigger value="videos" className="flex items-center space-x-2 data-[state=active]:bg-emerald-500 data-[state=active]:text-white">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.586a1 1 0 01.707.293L12 11l.707-.707A1 1 0 0113.414 10H15M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" />
                                </svg>
                                <span>Video</span>
                                <Badge variant="secondary" className="ml-1 text-xs bg-gray-100">1</Badge>
                            </TabsTrigger>
                        )}
                    </TabsList>
                </div>

                {/* Photos */}
                <TabsContent value="photos" className="mt-0">
                    <div className="relative h-[100vh] md:h-[89vh] lg:h-[74vh] xl:h-[72vh] overflow-hidden">
                        {/* Main Image */}
                        {allImages[selectedImageIndex] && (
                            <Image
                                src={allImages[selectedImageIndex].asset?.url || '/placeholder.jpg'}
                                alt={allImages[selectedImageIndex].alt || title}
                                fill
                                className="object-cover transition-all duration-300"
                                priority
                            />
                        )}

                        {/* click-to-zoom (image opens fullscreen) */}
                        <button
                            onClick={onOpenFullScreen}
                            className="absolute inset-0 cursor-zoom-in"
                            aria-label="Open full screen"
                            type="button"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>

                        {/* Arrows */}
                        {allImages.length > 1 && (
                            <>
                                <button
                                    onClick={onPrevImage}
                                    className="absolute left-6 top-1/2 -translate-y-1/2 z-30 w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-200 hover:scale-105"
                                    aria-label="Previous image"
                                >
                                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>

                                <button
                                    onClick={onNextImage}
                                    className="absolute right-6 top-1/2 -translate-y-1/2 z-30 w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-200 hover:scale-105"
                                    aria-label="Next image"
                                >
                                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </>
                        )}

                        {/* Counter */}
                        {allImages.length > 1 && (
                            <div className="absolute top-6 right-6 z-30 bg-black/60 backdrop-blur-sm rounded-lg px-4 py-2 text-white text-sm font-medium">
                                {selectedImageIndex + 1} / {allImages.length}
                            </div>
                        )}

                        {/* Category */}
                        {allImages[selectedImageIndex]?.category && allImages[selectedImageIndex].category !== 'main' && (
                            <div className="absolute top-20 right-6 z-30">
                                <Badge className="bg-emerald-500 text-white font-medium">
                                    {allImages[selectedImageIndex].category.replace(/\b\w/g, (l: string) => l.toUpperCase())}
                                </Badge>
                            </div>
                        )}

                        {/* Slide Dots (centered above the button, with extra spacing) */}
                        {allImages.length > 1 && (
                            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2.5">
                                {allImages.map((_, i) => (
                                    <button
                                        key={i}
                                        type="button"
                                        onClick={() => onSelectImage(i)}
                                        aria-label={`Go to slide ${i + 1}`}
                                        className={`w-2.5 h-2.5 rounded-full transition-opacity ${selectedImageIndex === i
                                            ? 'bg-white opacity-100'
                                            : 'bg-white/70 opacity-60 hover:opacity-100'
                                            }`}
                                    />
                                ))}
                            </div>
                        )}

                        {/* View All Photos (centered, nudged lower) */}
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30">
                            <Button
                                onClick={onOpenFullScreen}
                                variant="outline"
                                className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 hover:border-white/50 transition-all duration-200"
                            >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                                </svg>
                                View All {allImages.length} Photos
                            </Button>
                        </div>
                    </div>
                </TabsContent>

                {/* 3D Tour */}
                <TabsContent value="3d-tour" className="mt-0">
                    <div className="relative h-[100vh] md:h-[89vh] lg:h-[74vh] xl:h-[72vh] bg-gray-900 flex items-center justify-center">
                        <div className="text-center text-white space-y-6">
                            <div className="w-24 h-24 mx-auto bg-white/10 rounded-full flex items-center justify-center">
                                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold">3D Virtual Tour</h3>
                            <p className="text-gray-300 max-w-md">Experience this luxury villa with our immersive 3D virtual tour</p>
                            <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white">
                                Launch 3D Tour
                            </Button>
                            <div className="text-sm text-gray-400">Interactive • Full HD • Mobile Compatible</div>
                        </div>
                    </div>
                </TabsContent>

                {/* Videos */}
                {youtubeVideoId && (
                    <TabsContent value="videos" className="mt-0">
                        <div className="relative h-[100vh] md:h-[89vh] lg:h-[74vh] xl:h-[72vh] bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden">
                            {/* Main Hero Image Background */}
                            <div className="absolute inset-0">
                                <Image
                                    src={mainImage?.asset?.url || '/placeholder.jpg'}
                                    alt={mainImage?.alt || title}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                                {/* Overlay for better readability */}
                                <div className="absolute inset-0 bg-black/40"></div>
                            </div>

                            {/* Content Overlay */}
                            <div className="relative z-10 h-full flex flex-col items-center justify-center p-6 text-center">
                                {/* Beautiful Play Button */}
                                <button
                                    onClick={onOpenVideoModal}
                                    className="group relative mb-8 transform transition-all duration-500 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-white/30"
                                    aria-label="Play property video"
                                >
                                    {/* Outer Ring with Pulse Animation */}
                                    <div className="absolute inset-0 w-28 h-28 bg-white/20 rounded-full animate-ping"></div>
                                    <div className="absolute inset-0 w-28 h-28 bg-white/10 rounded-full animate-pulse"></div>

                                    {/* Main Play Button */}
                                    <div className="relative w-28 h-28 bg-gradient-to-br from-white to-white/90 rounded-full flex items-center justify-center shadow-2xl group-hover:shadow-white/30 transition-all duration-300">
                                        <svg
                                            className="w-12 h-12 text-gray-900 ml-1 transform group-hover:scale-110 transition-transform duration-300"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    </div>
                                </button>

                                {/* Video Title and Info */}
                                <div className="max-w-4xl mx-auto text-white space-y-4">
                                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                                        {title}
                                    </h2>
                                    <p className="text-lg md:text-xl text-white/90 font-medium">
                                        Property Video Showcase
                                    </p>
                                    <p className="text-base md:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
                                        Take a virtual tour of this exceptional property through our professional video presentation
                                    </p>
                                </div>

                                {/* Video Features */}
                                <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
                                    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white/80">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                        </svg>
                                        HD Quality
                                    </div>
                                    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white/80">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h12a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V8zm6 2a1 1 0 11-2 0 1 1 0 012 0zm4 0a1 1 0 11-2 0 1 1 0 012 0z" clipRule="evenodd" />
                                        </svg>
                                        Professional Tour
                                    </div>
                                    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white/80">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clipRule="evenodd" />
                                        </svg>
                                        Full Screen
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                )}
            </Tabs>
        </section>
    )
}