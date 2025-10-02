// src/components/sections/FeaturedProperties.tsx
'use client'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { IoBedOutline, IoLocationOutline } from 'react-icons/io5'
import { PiBathtub, PiBuildingApartment } from 'react-icons/pi'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

// Type definition for property data - flexible to match Sanity data
interface Property {
    _id: string;
    title: string;
    price?: number;
    bedrooms?: number;
    bathrooms?: number;
    propertyType?: string;
    slug?: string;
    mainImage?: {
        asset?: {
            url: string;
        };
        alt?: string;
    };
}

interface FeaturedPropertiesProps {
    properties: any[];
}

const formatUSNumber = (n: number | undefined) =>
    typeof n === 'number' ? new Intl.NumberFormat('en-US').format(n) : '';

// Helper function to format area value with unit
const formatArea = (areaObj: any) => {
    if (!areaObj || !areaObj.value) return '';
    const unit = areaObj.unit === 'sqm' ? 'sqm' : 'sqft';
    return `${formatUSNumber(areaObj.value)} ${unit}`;
};

// Helper function to format development array
const formatDevelopment = (developments: string[]) => {
    if (!developments || developments.length === 0) return '';
    return developments.map(dev =>
        dev.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    ).join(', ');
};

export default function FeaturedProperties({ properties }: FeaturedPropertiesProps) {
    return (
        <section className="py-24 px-6 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Featured Properties for{' '}
                        <span style={{ color: '#e1c098' }}>Sale</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Discover exclusive homes for sale in Punta Mita and Riviera Nayarit—Mexico's premier region for luxury villas, oceanfront residences, and prime investments.
                    </p>
                </div>

                {properties.length > 0 ? (
                    <div className="relative">
                        <Carousel className="w-full max-w-7xl">
                            <CarouselContent className="-ml-4">
                                {properties.map((property, index) => (
                                    <CarouselItem key={property._id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                                        <Card className="group overflow-hidden border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-700 bg-white">
                                            {property.mainImage && (
                                                <div className="relative h-80 overflow-hidden">
                                                    <Image
                                                        src={property.mainImage?.asset?.url || '/placeholder.jpg'}
                                                        alt={property.mainImage?.alt || property.title}
                                                        fill
                                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                                                    <div className="absolute top-6 left-6">
                                                        <Badge className="bg-white/90 text-gray-900 font-semibold shadow-lg hover:bg-white/90 hover:scale-110 transition-all duration-300">
                                                            ${formatUSNumber(property.price)}
                                                        </Badge>
                                                    </div>
                                                    {index === 0 && (
                                                        <div className="absolute top-6 right-6">
                                                            <Badge
                                                                style={{ backgroundColor: '#e1c098' }}
                                                                className="text-white font-semibold hover:scale-110 transition-all duration-300"
                                                            >
                                                                Featured
                                                            </Badge>
                                                        </div>
                                                    )}
                                                </div>
                                            )}

                                            <CardContent className="p-8">
                                                <h3 className="text-2xl font-bold text-gray-900 mb-4 transition-colors">
                                                    {property.title}
                                                </h3>

                                                <div className="flex items-center justify-between mb-6">
                                                    <div className="flex items-center space-x-4 text-gray-600 text-sm">
                                                        <div className="flex items-center space-x-1">
                                                            <IoBedOutline className="w-4 h-4" />
                                                            <span className="font-medium">{property.bedrooms || 0}</span>
                                                        </div>
                                                        <div className="flex items-center space-x-1">
                                                            <PiBathtub className="w-4 h-4" />
                                                            <span className="font-medium">{property.bathrooms || 0}</span>
                                                        </div>
                                                        <div className="flex items-center space-x-1">
                                                            <PiBuildingApartment className="w-4 h-4" />
                                                            <span className="font-medium">{formatArea(property.totalConstruction) || 'N/A'}</span>
                                                        </div>
                                                        <div className="flex items-center space-x-1">
                                                            <IoLocationOutline className="w-4 h-4" />
                                                            <span className="font-medium">{formatDevelopment(property.development) || 'N/A'}</span>
                                                        </div>
                                                    </div>

                                                    <Badge variant="secondary" className="capitalize font-medium bg-gray-100">
                                                        {property.propertyType || 'Property'}
                                                    </Badge>
                                                </div>

                                                <div className="flex items-center justify-between">
                                                    <Link
                                                        href={`/properties/${property.slug || ''}`}
                                                        style={{ color: '#e1c098' }}
                                                        className="inline-flex items-center hover:opacity-80 font-semibold group-hover:translate-x-2 transition-transform"
                                                    >
                                                        View Details →
                                                    </Link>

                                                    <button
                                                        className="text-gray-700 border border-gray-300 px-4 py-2 text-sm rounded-md hover:bg-gray-50 transition-all duration-300 font-medium"
                                                    >
                                                        Schedule Tour
                                                    </button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>

                            <CarouselPrevious className="absolute -left-12 top-1/2 -translate-y-1/2 bg-white/90 border-2 border-gray-200 hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-300 shadow-lg" />
                            <CarouselNext className="absolute -right-12 top-1/2 -translate-y-1/2 bg-white/90 border-2 border-gray-200 hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-300 shadow-lg" />
                        </Carousel>

                        <div className="flex justify-center mt-8 space-x-2">
                            {Array.from({ length: Math.ceil(properties.length / 3) }).map((_, index) => (
                                <div
                                    key={index}
                                    className="w-2 h-2 bg-gray-300 rounded-full cursor-pointer hover:bg-emerald-400 transition-colors"
                                />
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gray-100 flex items-center justify-center">
                            <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m0 0h4M9 7h1m-1 4h1m4-4h1m-1 4h1" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">No properties yet</h3>
                    </div>
                )}
            </div>
        </section>
    )
}