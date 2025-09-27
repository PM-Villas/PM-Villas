'use client'

import React from 'react'
import { client } from '@/lib/sanity'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { notFound } from 'next/navigation'

// Get single property by slug
async function getProperty(slug: string) {
    return await client.fetch(`
    *[_type == "property" && slug.current == $slug][0] {
      _id,
      title,
      price,
      bedrooms,
      bathrooms,
      propertyType,
      propertyStatus,
      development,
      neighborhood,
      primaryView,
      staffService,
      lotArea,
      totalConstruction,
      yearBuilt,
      investmentHighlights,
      description,
      featured,
      youtubeUrl,
      mainImage {
        asset->{ _id, url },
        alt
      },
      gallery[] {
        asset->{ _id, url },
        alt,
        category
      },
      "slug": slug.current
    }
  `, { slug })
}

// Get related properties
async function getRelatedProperties(propertyType: string, currentId: string) {
    return await client.fetch(`
    *[_type == "property" && propertyType == $propertyType && _id != $currentId] | order(_createdAt desc) [0...3] {
      _id,
      title,
      price,
      bedrooms,
      bathrooms,
      propertyType,
      mainImage {
        asset->{ _id, url },
        alt
      },
      "slug": slug.current
    }
  `, { propertyType, currentId })
}

// Helper function to extract YouTube video ID from URL
function getYouTubeVideoId(url: string): string | null {
    if (!url) return null

    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
    const match = url.match(regExp)
    return (match && match[7].length === 11) ? match[7] : null
}

export default function PropertyDetailPage({ params }: { params: { slug: string } }) {
    const [selectedImageIndex, setSelectedImageIndex] = React.useState(0)
    const [isFullScreenOpen, setIsFullScreenOpen] = React.useState(false)
    const [isVideoModalOpen, setIsVideoModalOpen] = React.useState(false)
    const [property, setProperty] = React.useState<any>(null)
    const [relatedProperties, setRelatedProperties] = React.useState<any[]>([])
    const [loading, setLoading] = React.useState(true)
    const [activeTab, setActiveTab] = React.useState<'photos' | '3d-tour' | 'videos'>('photos')

    const nextImage = () => {
        if (!property) return
        const totalImages = (property.gallery?.length || 0) + 1
        setSelectedImageIndex(prev => (prev === totalImages - 1 ? 0 : prev + 1))
    }

    const prevImage = () => {
        if (!property) return
        const totalImages = (property.gallery?.length || 0) + 1
        setSelectedImageIndex(prev => (prev === 0 ? totalImages - 1 : prev - 1))
    }

    const openVideoModal = () => setIsVideoModalOpen(true)
    const closeVideoModal = () => setIsVideoModalOpen(false)

    const handleThumbnailClick = (index: number) => setSelectedImageIndex(index)
    const openFullScreen = () => setIsFullScreenOpen(true)
    const closeFullScreen = () => setIsFullScreenOpen(false)

    // Add effect for global ESC key handling
    React.useEffect(() => {
        const handleGlobalKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                if (isVideoModalOpen) {
                    closeVideoModal()
                } else if (isFullScreenOpen) {
                    closeFullScreen()
                }
            }
        }

        document.addEventListener('keydown', handleGlobalKeyDown)
        return () => document.removeEventListener('keydown', handleGlobalKeyDown)
    }, [isVideoModalOpen, isFullScreenOpen])

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (!isVideoModalOpen && e.key === 'ArrowLeft') {
            prevImage()
        } else if (!isVideoModalOpen && e.key === 'ArrowRight') {
            nextImage()
        }
    }

    // ------------------- EFFECTS (before any early return) -------------------

    // Load data
    React.useEffect(() => {
        let cancelled = false
            ; (async () => {
                try {
                    const propertyData = await getProperty(params.slug)
                    if (cancelled) return
                    if (!propertyData) {
                        setProperty(null)
                    } else {
                        setProperty(propertyData)
                        const related = await getRelatedProperties(propertyData.propertyType, propertyData._id)
                        if (!cancelled) setRelatedProperties(related)
                    }
                } catch (err) {
                    console.error('Failed to load property:', err)
                } finally {
                    if (!cancelled) setLoading(false)
                }
            })()
        return () => { cancelled = true }
    }, [params.slug])

    // Auto-advance every 5s on Photos tab (paused in fullscreen / other tabs)
    React.useEffect(() => {
        const totalImages = (property?.gallery?.length || 0) + 1
        if (!property || isFullScreenOpen || activeTab !== 'photos' || totalImages < 2) return
        const id = setInterval(() => {
            setSelectedImageIndex(prev => (prev === totalImages - 1 ? 0 : prev + 1))
        }, 5000)
        return () => clearInterval(id)
    }, [property, isFullScreenOpen, activeTab])

    // ------------------- EARLY RETURNS -------------------

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading property details...</p>
                </div>
            </div>
        )
    }

    if (!property) {
        notFound()
    }

    // Combined gallery (main image + gallery)
    const allImages = [
        { asset: property.mainImage?.asset, alt: property.mainImage?.alt || property.title, category: 'main' },
        ...(property.gallery || [])
    ].filter(img => img.asset?.url)

    // Get YouTube video ID for embedding
    const youtubeVideoId = getYouTubeVideoId(property.youtubeUrl)

    return (
        <main className="min-h-screen bg-white">
            {/* Hero with Tabs */}
            <section className="relative">
                <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="w-full">
                    {/* Media Navigation */}
                    <div className="absolute top-4 left-4 z-20">
                        <TabsList className="bg-white/90 backdrop-blur-sm shadow-lg border border-white/20">
                            <TabsTrigger value="photos" className="flex items-center space-x-2 data-[state=active]:bg-emerald-500 data-[state=active]:text-white">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span>Photos</span>
                                <Badge variant="secondary" className="ml-1 text-xs bg-gray-100">
                                    {property.gallery ? property.gallery.length + 1 : 1}
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
                                    alt={allImages[selectedImageIndex].alt || property.title}
                                    fill
                                    className="object-cover transition-all duration-300"
                                    priority
                                />
                            )}

                            {/* click-to-zoom (image opens fullscreen) */}
                            <button
                                onClick={openFullScreen}
                                className="absolute inset-0 cursor-zoom-in"
                                aria-label="Open full screen"
                                type="button"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>

                            {/* Arrows */}
                            {allImages.length > 1 && (
                                <>
                                    <button
                                        onClick={prevImage}
                                        className="absolute left-6 top-1/2 -translate-y-1/2 z-30 w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-200 hover:scale-105"
                                        aria-label="Previous image"
                                    >
                                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </button>

                                    <button
                                        onClick={nextImage}
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

                            {/* Thumbnails (hidden – removes big dashes) */}
                            {allImages.length > 1 && (
                                <div className="absolute bottom-32 left-6 right-6 z-30 hidden">
                                    <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
                                        {allImages.map((image: any, index: number) => (
                                            <button
                                                key={index}
                                                onClick={() => handleThumbnailClick(index)}
                                                className={`relative w-24 h-18 flex-shrink-0 rounded-lg overflow-hidden border-2 cursor-pointer transition-all duration-200 ${selectedImageIndex === index
                                                    ? 'border-emerald-400 ring-2 ring-emerald-400/50 scale-105'
                                                    : 'border-white/40 hover:border-white/80 hover:scale-102'
                                                    }`}
                                            >
                                                <Image
                                                    src={image.asset?.url || '/placeholder.jpg'}
                                                    alt={image.alt || `Gallery ${index + 1}`}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Slide Dots (centered above the button, with extra spacing) */}
                            {allImages.length > 1 && (
                                <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2.5">
                                    {allImages.map((_, i) => (
                                        <button
                                            key={i}
                                            type="button"
                                            onClick={() => setSelectedImageIndex(i)}
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
                                    onClick={openFullScreen}
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
                                        src={property.mainImage?.asset?.url || '/placeholder.jpg'}
                                        alt={property.mainImage?.alt || property.title}
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
                                        onClick={openVideoModal}
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
                                            {property.title}
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

                {/* Property Info UNDER the image (light card) */}
                <div className="mt-6">
                    <div className="max-w-7xl mx-auto rounded-xl bg-white/90 backdrop-blur-sm border border-gray-200 shadow-sm p-8">
                        <div className="space-y-4">
                            <div className="flex flex-wrap gap-3 mb-4">
                                <Badge className={`text-sm font-semibold ${property.propertyStatus === 'for-sale'
                                    ? 'bg-emerald-500 text-white'
                                    : property.propertyStatus === 'sold'
                                        ? 'bg-red-500 text-white'
                                        : property.propertyStatus === 'under-contract'
                                            ? 'bg-yellow-500 text-white'
                                            : 'bg-blue-500 text-white'
                                    }`}>
                                    {property.propertyStatus?.replace('-', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
                                </Badge>
                                {property.featured && (
                                    <Badge className="bg-orange-500 text-white text-sm font-semibold">Featured Property</Badge>
                                )}
                                <Badge variant="outline" className="bg-white text-gray-900 text-sm font-semibold">
                                    {property.propertyType?.replace(/\b\w/g, (l: string) => l.toUpperCase())}
                                </Badge>
                            </div>

                            <h1 className="text-4xl md:text-6xl font-bold leading-tight text-gray-900">
                                {property.title}
                            </h1>

                            <div className="flex items-center space-x-6 text-lg text-gray-800">
                                {property.bedrooms && (
                                    <div className="flex items-center space-x-2">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                                        </svg>
                                        <span>{property.bedrooms} Bedrooms</span>
                                    </div>
                                )}
                                {property.bathrooms && (
                                    <div className="flex items-center space-x-2">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z" clipRule="evenodd" />
                                        </svg>
                                        <span>{property.bathrooms} Bathrooms</span>
                                    </div>
                                )}
                                {property.primaryView && (
                                    <div className="flex items-center space-x-2">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                        </svg>
                                        <span>{property.primaryView?.replace(/\b\w/g, (l: string) => l.toUpperCase())} View</span>
                                    </div>
                                )}
                            </div>

                            <div className="text-5xl font-bold text-emerald-400">
                                ${property.price?.toLocaleString()}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Property Details */}
            <section className="py-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Description */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-2xl font-bold text-gray-900">Property Description</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-600 leading-relaxed text-lg">{property.description}</p>
                                </CardContent>
                            </Card>

                            {/* Property Features */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-2xl font-bold text-gray-900">Property Details</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {property.bedrooms && (
                                            <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                                <span className="font-medium text-gray-700">Bedrooms</span>
                                                <span className="text-gray-900">{property.bedrooms}</span>
                                            </div>
                                        )}
                                        {property.bathrooms && (
                                            <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                                <span className="font-medium text-gray-700">Bathrooms</span>
                                                <span className="text-gray-900">{property.bathrooms}</span>
                                            </div>
                                        )}
                                        {property.propertyType && (
                                            <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                                <span className="font-medium text-gray-700">Property Type</span>
                                                <span className="text-gray-900 capitalize">{property.propertyType}</span>
                                            </div>
                                        )}
                                        {property.yearBuilt && (
                                            <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                                <span className="font-medium text-gray-700">Year Built</span>
                                                <span className="text-gray-900">{property.yearBuilt}</span>
                                            </div>
                                        )}
                                        {property.primaryView && (
                                            <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                                <span className="font-medium text-gray-700">Primary View</span>
                                                <span className="text-gray-900 capitalize">{property.primaryView}</span>
                                            </div>
                                        )}
                                        {property.lotArea && (
                                            <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                                <span className="font-medium text-gray-700">Lot Area</span>
                                                <span className="text-gray-900">{property.lotArea.value} {property.lotArea.unit}</span>
                                            </div>
                                        )}
                                        {property.totalConstruction && (
                                            <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                                <span className="font-medium text-gray-700">Construction Area</span>
                                                <span className="text-gray-900">{property.totalConstruction.value} {property.totalConstruction.unit}</span>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Location & Development */}
                            {(property.development?.length > 0 || property.neighborhood?.length > 0) && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-2xl font-bold text-gray-900">Location & Development</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        {property.development?.length > 0 && (
                                            <div>
                                                <h4 className="font-semibold text-gray-800 mb-2">Development</h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {property.development.map((dev: string, index: number) => (
                                                        <Badge key={index} variant="secondary" className="text-sm">
                                                            {dev.replace('-', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                        {property.neighborhood?.length > 0 && (
                                            <div>
                                                <h4 className="font-semibold text-gray-800 mb-2">Neighborhood</h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {property.neighborhood.map((neighborhood: string, index: number) => (
                                                        <Badge key={index} variant="outline" className="text-sm">
                                                            {neighborhood.replace('-', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            )}

                            {/* Staff Services */}
                            {property.staffService?.length > 0 && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-2xl font-bold text-gray-900">Staff Services</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                            {property.staffService.map((service: string, index: number) => (
                                                <div key={index} className="flex items-center space-x-2 text-gray-700">
                                                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                                                    <span className="text-sm">{service.replace('-', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            )}

                            {/* Investment Highlights */}
                            {property.investmentHighlights && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-2xl font-bold text-gray-900">Investment Highlights</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-gray-600 leading-relaxed">{property.investmentHighlights}</p>
                                    </CardContent>
                                </Card>
                            )}

                            {/* Property Gallery (includes main; 6th tile overlay to view all) */}
                            {allImages.length > 0 && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-2xl font-bold text-gray-900">Property Gallery</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {(allImages.length > 6 ? allImages.slice(0, 6) : allImages).map((image: any, index: number) => {
                                                const isCappedTile = allImages.length > 6 && index === 5
                                                return (
                                                    <button
                                                        key={image.asset?._id || index}
                                                        type="button"
                                                        onClick={() => { setSelectedImageIndex(index); openFullScreen(); }}
                                                        className="relative h-48 rounded-lg overflow-hidden group text-left"
                                                        aria-label={`Open photo ${index + 1}`}
                                                    >
                                                        <Image
                                                            src={image.asset?.url || '/placeholder.jpg'}
                                                            alt={image.alt || `Gallery image ${index + 1}`}
                                                            fill
                                                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                        />

                                                        {image.category && image.category !== 'main' && (
                                                            <div className="absolute bottom-2 left-2">
                                                                <Badge className="bg-black/70 text-white text-xs">
                                                                    {image.category.replace(/\b\w/g, (l: string) => l.toUpperCase())}
                                                                </Badge>
                                                            </div>
                                                        )}

                                                        {isCappedTile && (
                                                            <div className="absolute inset-0 bg-black/55 backdrop-blur-[1px] flex items-center justify-center">
                                                                <div className="text-center">
                                                                    <Button variant="outline" className="bg-white/90 text-gray-900 hover:bg-white">
                                                                        View all {allImages.length} photos
                                                                    </Button>
                                                                    <div className="mt-2 text-white/90 text-xs">
                                                                        +{allImages.length - 6} more
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </button>
                                                )
                                            })}
                                        </div>
                                    </CardContent>
                                </Card>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-8">
                            <Card className="sticky top-8">
                                <CardHeader>
                                    <CardTitle className="text-xl font-bold text-gray-900">Interested in this property?</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="text-3xl font-bold text-emerald-600">
                                        ${property.price?.toLocaleString()}
                                    </div>
                                    <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white">
                                        Schedule Private Tour
                                    </Button>
                                    <Button variant="outline" className="w-full">
                                        Request Information
                                    </Button>
                                    <div className="border-t pt-4">
                                        <div className="text-sm text-gray-600 space-y-1">
                                            <p><strong>Contact:</strong> Andrew Kubicek</p>
                                            <p><strong>Phone:</strong> +1 847-340-0338</p>
                                            <p><strong>Email:</strong> andrew.kubicek@pmvillas.com</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* Related Properties */}
            {relatedProperties.length > 0 && (
                <section className="py-16 px-6 bg-slate-50">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8">Similar Properties</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {relatedProperties.map((relatedProperty: any) => (
                                <Card key={relatedProperty._id} className="group overflow-hidden border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300">
                                    {relatedProperty.mainImage && (
                                        <div className="relative h-48 overflow-hidden">
                                            <Image
                                                src={relatedProperty.mainImage.asset?.url || '/placeholder.jpg'}
                                                alt={relatedProperty.mainImage.alt || relatedProperty.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                            <div className="absolute top-4 left-4">
                                                <Badge className="bg-white text-gray-900 font-semibold">
                                                    ${relatedProperty.price?.toLocaleString()}
                                                </Badge>
                                            </div>
                                        </div>
                                    )}
                                    <CardContent className="p-4">
                                        <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">{relatedProperty.title}</h3>
                                        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                                            <div className="flex space-x-3">
                                                {relatedProperty.bedrooms && <span>{relatedProperty.bedrooms} Beds</span>}
                                                {relatedProperty.bathrooms && <span>{relatedProperty.bathrooms} Baths</span>}
                                            </div>
                                            <Badge variant="outline" className="capitalize text-xs">
                                                {relatedProperty.propertyType}
                                            </Badge>
                                        </div>
                                        <Link
                                            href={`/properties/${relatedProperty.slug}`}
                                            className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-semibold text-sm"
                                        >
                                            View Details
                                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </Link>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Full Screen Photo Gallery Modal */}
            {isFullScreenOpen && (
                <div
                    className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
                    onKeyDown={handleKeyDown}
                    tabIndex={0}
                >
                    {/* Close Button (z-index fixed) */}
                    <button
                        onClick={closeFullScreen}
                        className="absolute top-6 right-6 z-50 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                        aria-label="Close gallery"
                        type="button"
                    >
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {/* Main Image */}
                    <div className="relative w-full h-full flex items-center justify-center p-4">
                        {allImages[selectedImageIndex] && (
                            <div className="relative max-w-7xl max-h-full">
                                <Image
                                    src={allImages[selectedImageIndex].asset?.url || '/placeholder.jpg'}
                                    alt={allImages[selectedImageIndex].alt || property.title}
                                    width={1200}
                                    height={800}
                                    className="object-contain max-w-full max-h-full"
                                    priority
                                />
                            </div>
                        )}

                        {/* Arrows */}
                        {allImages.length > 1 && (
                            <>
                                <button
                                    onClick={prevImage}
                                    className="absolute left-6 top-1/2 -translate-y-1/2 w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-200"
                                    aria-label="Previous image"
                                >
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>

                                <button
                                    onClick={nextImage}
                                    className="absolute right-6 top-1/2 -translate-y-1/2 w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-200"
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
                                    {allImages[selectedImageIndex]?.alt || `Photo ${selectedImageIndex + 1}`}
                                </div>
                                {allImages[selectedImageIndex]?.category && allImages[selectedImageIndex].category !== 'main' && (
                                    <div className="text-sm text-gray-300 mt-1">
                                        {allImages[selectedImageIndex].category.replace(/\b\w/g, (l: string) => l.toUpperCase())} Photo
                                    </div>
                                )}
                            </div>

                            <div className="text-white text-lg font-medium">
                                {selectedImageIndex + 1} / {allImages.length}
                            </div>
                        </div>

                        {/* Thumbnail Strip in modal */}
                        <div className="max-w-7xl mx-auto mt-4">
                            <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
                                {allImages.map((image: any, index: number) => (
                                    <button
                                        key={index}
                                        onClick={() => handleThumbnailClick(index)}
                                        className={`relative w-16 h-12 flex-shrink-0 rounded overflow-hidden border transition-all duration-200 ${selectedImageIndex === index
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
                                        {selectedImageIndex === index && (
                                            <div className="absolute inset-0 bg-emerald-400/25"></div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Instructions */}
                    <div className="absolute top-6 left-6 text-white/70 text-sm">
                        Press ESC to close • Use arrow keys to navigate
                    </div>
                </div>
            )}

            {/* Full Screen Video Modal */}
            {isVideoModalOpen && youtubeVideoId && (
                <div
                    className="fixed inset-0 bg-black z-50 flex items-center justify-center"
                    onKeyDown={handleKeyDown}
                    tabIndex={0}
                >
                    {/* Close Button */}
                    <button
                        onClick={closeVideoModal}
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
                                title={`${property.title} - Property Video Tour`}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                                className="w-full h-full rounded-lg shadow-2xl"
                            ></iframe>
                        </div>
                    </div>
                </div>
            )}
        </main>
    )
}