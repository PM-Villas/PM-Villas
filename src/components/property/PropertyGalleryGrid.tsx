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
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900">
                    Property Gallery
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {(images.length > 6 ? images.slice(0, 6) : images).map((image: GalleryImage, index: number) => {
                        const isCappedTile = images.length > 6 && index === 5
                        return (
                            <button
                                key={image.asset?._id || index}
                                type="button"
                                onClick={() => onImageClick(index)}
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
                                                View all {images.length} photos
                                            </Button>
                                            <div className="mt-2 text-white/90 text-xs">
                                                +{images.length - 6} more
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