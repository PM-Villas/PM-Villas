// File: src/components/property/PropertyHero.tsx
'use client'

import React from 'react'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import PhotoGalleryView from './PhotoGalleryView'
import VirtualTour3D from './VirtualTour3D'
import VideoPreview from './VideoPreview'

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
    matterportUrl?: string
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
    matterportUrl,
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
                        <TabsTrigger
                            value="photos"
                            className="flex items-center space-x-2 data-[state=active]:bg-emerald-500 data-[state=active]:text-white"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>Photos</span>
                            <Badge variant="secondary" className="ml-1 text-xs bg-gray-100">
                                {gallery ? gallery.length + 1 : 1}
                            </Badge>
                        </TabsTrigger>

                        <TabsTrigger
                            value="3d-tour"
                            className="flex items-center space-x-2 data-[state=active]:bg-emerald-500 data-[state=active]:text-white"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                            </svg>
                            <span>3D Tour</span>
                        </TabsTrigger>

                        {youtubeVideoId && (
                            <TabsTrigger
                                value="videos"
                                className="flex items-center space-x-2 data-[state=active]:bg-emerald-500 data-[state=active]:text-white"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.586a1 1 0 01.707.293L12 11l.707-.707A1 1 0 0113.414 10H15M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" />
                                </svg>
                                <span>Video</span>
                                <Badge variant="secondary" className="ml-1 text-xs bg-gray-100">1</Badge>
                            </TabsTrigger>
                        )}
                    </TabsList>
                </div>

                {/* Photos Tab */}
                <TabsContent value="photos" className="mt-0">
                    <PhotoGalleryView
                        images={allImages}
                        selectedIndex={selectedImageIndex}
                        propertyTitle={title}
                        onOpenFullScreen={onOpenFullScreen}
                        onSelectImage={onSelectImage}
                        onNextImage={onNextImage}
                        onPrevImage={onPrevImage}
                    />
                </TabsContent>

                {/* 3D Tour Tab */}
                <TabsContent value="3d-tour" className="mt-0">
                    <VirtualTour3D matterportUrl={matterportUrl} />
                </TabsContent>

                {/* Videos Tab */}
                {youtubeVideoId && (
                    <TabsContent value="videos" className="mt-0">
                        <VideoPreview
                            propertyTitle={title}
                            mainImageUrl={mainImage?.asset?.url}
                            mainImageAlt={mainImage?.alt}
                            onOpenVideoModal={onOpenVideoModal}
                        />
                    </TabsContent>
                )}
            </Tabs>
        </section>
    )
}