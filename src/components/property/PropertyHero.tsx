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
    onOpen3DTourModal: () => void
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
    onOpen3DTourModal,
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
                    <TabsList className="bg-white/95 backdrop-blur-md shadow-xl border border-gray-200/50">
                        <TabsTrigger
                            value="photos"
                            className="flex items-center space-x-2 transition-all duration-300 data-[state=active]:text-white data-[state=active]:shadow-lg"
                            style={{
                                backgroundColor: activeTab === 'photos' ? '#e1c098' : 'transparent',
                            }}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className="font-semibold hidden md:inline">Photos</span>
                            <Badge
                                variant="secondary"
                                className="ml-1 text-xs hidden md:inline-flex"
                                style={{
                                    backgroundColor: activeTab === 'photos' ? 'rgba(255,255,255,0.2)' : '#f3f4f6',
                                    color: activeTab === 'photos' ? 'white' : '#374151'
                                }}
                            >
                                {gallery ? gallery.length + 1 : 1}
                            </Badge>
                        </TabsTrigger>

                        {matterportUrl && (
                            <TabsTrigger
                                value="3d-tour"
                                className="flex items-center space-x-2 transition-all duration-300 data-[state=active]:text-white data-[state=active]:shadow-lg"
                                style={{
                                    backgroundColor: activeTab === '3d-tour' ? '#e1c098' : 'transparent',
                                }}
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                                </svg>
                                <span className="font-semibold hidden md:inline">3D Tour</span>
                            </TabsTrigger>
                        )}

                        {youtubeVideoId && (
                            <TabsTrigger
                                value="videos"
                                className="flex items-center space-x-2 transition-all duration-300 data-[state=active]:text-white data-[state=active]:shadow-lg"
                                style={{
                                    backgroundColor: activeTab === 'videos' ? '#e1c098' : 'transparent',
                                }}
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="font-semibold hidden md:inline">Video</span>
                                <Badge
                                    variant="secondary"
                                    className="ml-1 text-xs hidden md:inline-flex"
                                    style={{
                                        backgroundColor: activeTab === 'videos' ? 'rgba(255,255,255,0.2)' : '#f3f4f6',
                                        color: activeTab === 'videos' ? 'white' : '#374151'
                                    }}
                                >
                                    1
                                </Badge>
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
                {matterportUrl && (
                    <TabsContent value="3d-tour" className="mt-0">
                        <VirtualTour3D
                            matterportUrl={matterportUrl}
                            propertyTitle={title}
                            mainImageUrl={mainImage?.asset?.url}
                            mainImageAlt={mainImage?.alt}
                            onOpen3DTour={onOpen3DTourModal}
                        />
                    </TabsContent>
                )}

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