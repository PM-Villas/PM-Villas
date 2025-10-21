// src/components/property/PropertyDetailClient.tsx
'use client'

import React from 'react'
import { BreadcrumbSchema } from '@/components/seo/StructuredData'

// Import all the components
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
import Tour3DModal from '@/components/property/Tour3DModal'

// Helper function to extract YouTube video ID from URL
function getYouTubeVideoId(url: string): string | null {
    if (!url) return null
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
    const match = url.match(regExp)
    return (match && match[7].length === 11) ? match[7] : null
}

interface PropertyDetailClientProps {
    property: any
    relatedProperties: any[]
}

export default function PropertyDetailClient({ property, relatedProperties }: PropertyDetailClientProps) {
    const [selectedImageIndex, setSelectedImageIndex] = React.useState(0)
    const [isFullScreenOpen, setIsFullScreenOpen] = React.useState(false)
    const [isVideoModalOpen, setIsVideoModalOpen] = React.useState(false)
    const [is3DTourModalOpen, setIs3DTourModalOpen] = React.useState(false)
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
    const open3DTourModal = () => setIs3DTourModalOpen(true)
    const close3DTourModal = () => setIs3DTourModalOpen(false)
    const openFullScreen = () => setIsFullScreenOpen(true)
    const closeFullScreen = () => setIsFullScreenOpen(false)

    // Add effect for global ESC key handling
    React.useEffect(() => {
        const handleGlobalKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                if (isVideoModalOpen) {
                    closeVideoModal()
                } else if (is3DTourModalOpen) {
                    close3DTourModal()
                } else if (isFullScreenOpen) {
                    closeFullScreen()
                }
            }
        }

        document.addEventListener('keydown', handleGlobalKeyDown)
        return () => document.removeEventListener('keydown', handleGlobalKeyDown)
    }, [isVideoModalOpen, is3DTourModalOpen, isFullScreenOpen])

    // Auto-advance every 7s on Photos tab (paused in fullscreen / other tabs)
    React.useEffect(() => {
        const totalImages = (property?.gallery?.length || 0) + 1
        if (!property || isFullScreenOpen || activeTab !== 'photos' || totalImages < 2) return
        const id = setInterval(() => {
            setSelectedImageIndex(prev => (prev === totalImages - 1 ? 0 : prev + 1))
        }, 7000)
        return () => clearInterval(id)
    }, [property, isFullScreenOpen, activeTab])

    // Combined gallery (main image + gallery)
    const allImages = [
        { asset: property.mainImage?.asset, alt: property.mainImage?.alt || property.title, category: 'main' },
        ...(property.gallery || [])
    ].filter(img => img.asset?.url)

    // Get YouTube video ID for embedding
    const youtubeVideoId = getYouTubeVideoId(property.youtubeUrl)

    // Breadcrumb items for SEO
    const breadcrumbItems = [
        { name: 'Home', url: 'https://www.pmvillas.com' },
        { name: 'Properties for Sale', url: 'https://www.pmvillas.com/properties-for-sale' },
        { name: property.title, url: `https://www.pmvillas.com/properties-for-sale/${property.slug}` },
    ]

    return (
        <>
            <BreadcrumbSchema items={breadcrumbItems} />
            <main className="min-h-screen bg-white">
                {/* Hero with Tabs */}
                <PropertyHero
                title={property.title}
                mainImage={property.mainImage}
                gallery={property.gallery}
                youtubeUrl={property.youtubeUrl}
                matterportUrl={property.matterportUrl}
                onOpenFullScreen={openFullScreen}
                onOpenVideoModal={openVideoModal}
                onOpen3DTourModal={open3DTourModal}
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

            {/* Full Screen 3D Tour Modal */}
            <Tour3DModal
                isOpen={is3DTourModalOpen}
                matterportUrl={property.matterportUrl}
                propertyTitle={property.title}
                onClose={close3DTourModal}
            />
        </main>
        </>
    )
}
