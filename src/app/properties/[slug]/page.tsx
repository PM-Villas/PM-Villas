'use client'

import React from 'react'
import { client } from '@/lib/sanity'
import { notFound } from 'next/navigation'

// Import all the new components
import PropertyHero from '@/components/property/PropertyHero'
import PropertyInfo from '@/components/property/PropertyInfo'
import PropertyDescription from '@/components/property/PropertyDescription'
import PropertyFeatures from '@/components/property/PropertyFeatures'
import PropertyLocation from '@/components/property/PropertyLocation'
import PropertyAmenities from '@/components/property/PropertyAmenities'
import PropertyGalleryGrid from '@/components/property/PropertyGalleryGrid'
import PropertySidebar from '@/components/property/PropertySidebar'
import RelatedProperties from '@/components/property/RelatedProperties'
import FullScreenGallery from '@/components/property/FullScreenGallery'
import VideoModal from '@/components/property/VideoModal'

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

    // Loading state
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

    // Not found
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
            <PropertyHero
                title={property.title}
                mainImage={property.mainImage}
                gallery={property.gallery}
                youtubeUrl={property.youtubeUrl}
                onOpenFullScreen={openFullScreen}
                onOpenVideoModal={openVideoModal}
                selectedImageIndex={selectedImageIndex}
                onSelectImage={setSelectedImageIndex}
                onNextImage={nextImage}
                onPrevImage={prevImage}
                activeTab={activeTab}
                onTabChange={setActiveTab}
            />

            {/* Property Info Card */}
            <PropertyInfo
                title={property.title}
                price={property.price}
                bedrooms={property.bedrooms}
                bathrooms={property.bathrooms}
                primaryView={property.primaryView}
                propertyStatus={property.propertyStatus}
                propertyType={property.propertyType}
                featured={property.featured}
                development={property.development}
                neighborhood={property.neighborhood}
                lotArea={property.lotArea}
                totalConstruction={property.totalConstruction}
            />

            {/* Property Details */}
            <section className="py-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-8">
                            <PropertyDescription description={property.description} />

                            <PropertyFeatures
                                bedrooms={property.bedrooms}
                                bathrooms={property.bathrooms}
                                propertyType={property.propertyType}
                                yearBuilt={property.yearBuilt}
                                primaryView={property.primaryView}
                                lotArea={property.lotArea}
                                totalConstruction={property.totalConstruction}
                            />

                            <PropertyLocation
                                development={property.development}
                                neighborhood={property.neighborhood}
                            />

                            <PropertyAmenities
                                staffService={property.staffService}
                                investmentHighlights={property.investmentHighlights}
                            />

                            <PropertyGalleryGrid
                                images={allImages}
                                onImageClick={(index) => {
                                    setSelectedImageIndex(index)
                                    openFullScreen()
                                }}
                            />
                        </div>

                        {/* Sidebar */}
                        <PropertySidebar price={property.price} />
                    </div>
                </div>
            </section>

            {/* Related Properties */}
            <RelatedProperties properties={relatedProperties} />

            {/* Full Screen Photo Gallery Modal */}
            <FullScreenGallery
                isOpen={isFullScreenOpen}
                images={allImages}
                selectedIndex={selectedImageIndex}
                propertyTitle={property.title}
                onClose={closeFullScreen}
                onNext={nextImage}
                onPrev={prevImage}
                onSelectImage={setSelectedImageIndex}
            />

            {/* Full Screen Video Modal */}
            <VideoModal
                isOpen={isVideoModalOpen}
                youtubeVideoId={youtubeVideoId}
                propertyTitle={property.title}
                onClose={closeVideoModal}
            />
        </main>
    )
}