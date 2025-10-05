// File: src/components/property/PropertyGalleryGrid.tsx
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

type GalleryImage = {
    asset?: { _id?: string; url: string }
    alt?: string
    category?: string
}

type PropertyGalleryGridProps = {
    images: GalleryImage[]
    onImageClick: (index: number) => void
}

export default function PropertyGalleryGrid({ images, onImageClick }: PropertyGalleryGridProps) {
    if (!images || images.length === 0) return null

    return (
        <Card className="border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="border-b border-gray-100 pb-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div
                            className="w-1 h-8 rounded-full"
                            style={{ backgroundColor: '#e1c098' }}
                        />
                        <CardTitle className="text-2xl md:text-3xl font-bold text-gray-900">
                            Property <span style={{ color: '#e1c098' }}>Gallery</span>
                        </CardTitle>
                    </div>
                    <Badge
                        className="text-sm font-semibold"
                        style={{ backgroundColor: '#e1c098', color: 'white' }}
                    >
                        {images.length} Photos
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {(images.length > 6 ? images.slice(0, 6) : images).map((image: GalleryImage, index: number) => {
                        const isCappedTile = images.length > 6 && index === 5
                        return (
                            <button
                                key={image.asset?._id || index}
                                type="button"
                                onClick={() => onImageClick(index)}
                                className="relative h-64 rounded-xl overflow-hidden group text-left shadow-md hover:shadow-xl transition-all duration-300 ring-1 ring-gray-200 hover:ring-2"
                                style={{
                                    ['--hover-ring-color' as any]: '#e1c098'
                                }}
                                aria-label={`Open photo ${index + 1}`}
                            >
                                <Image
                                    src={image.asset?.url || '/placeholder.jpg'}
                                    alt={image.alt || `Gallery image ${index + 1}`}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />

                                {/* Gradient Overlay on Hover */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                {/* Image Number Badge */}
                                <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <Badge className="bg-white/90 text-gray-900 font-semibold text-xs backdrop-blur-sm">
                                        Photo {index + 1}
                                    </Badge>
                                </div>

                                {/* Category Badge */}
                                {image.category && image.category !== 'main' && (
                                    <div className="absolute bottom-3 left-3">
                                        <Badge
                                            className="text-xs font-semibold"
                                            style={{ backgroundColor: '#e1c098', color: 'white' }}
                                        >
                                            {image.category.replace(/\b\w/g, (l: string) => l.toUpperCase())}
                                        </Badge>
                                    </div>
                                )}

                                {/* Zoom Icon on Hover */}
                                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div
                                        className="w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm"
                                        style={{ backgroundColor: 'rgba(225, 192, 152, 0.9)' }}
                                    >
                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                        </svg>
                                    </div>
                                </div>

                                {/* "View All" Overlay for 6th Image */}
                                {isCappedTile && (
                                    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center">
                                        <div className="text-center space-y-3 p-4">
                                            <div
                                                className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-2"
                                                style={{ backgroundColor: 'rgba(225, 192, 152, 0.2)' }}
                                            >
                                                <svg className="w-8 h-8" style={{ color: '#e1c098' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                            <Button
                                                variant="outline"
                                                className="text-white border-white/50 hover:bg-white/10 backdrop-blur-sm"
                                                style={{ borderColor: '#e1c098', color: '#e1c098' }}
                                            >
                                                View All {images.length} Photos
                                            </Button>
                                            <div className="text-white/90 text-sm font-medium">
                                                +{images.length - 6} more photos
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
    )
}