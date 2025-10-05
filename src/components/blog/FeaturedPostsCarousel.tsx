// File: src/components/blog/FeaturedPostsCarousel.tsx
'use client'

import { useState, useEffect } from 'react'
import FeaturedPostCard from '@/components/blog/FeaturedPostCard'
import type { BlogPost } from '@/components/blog/blog-types'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel'

type Props = {
    posts: BlogPost[]
    heading?: string
    subheading?: string
}

export default function FeaturedPostsCarousel({ posts, heading = 'Featured Articles', subheading }: Props) {
    const [api, setApi] = useState<any>()

    useEffect(() => {
        if (!api) {
            return
        }

        const intervalId = setInterval(() => {
            api.scrollNext()
        }, 7000) // Auto-slide every 7 seconds

        return () => clearInterval(intervalId)
    }, [api])

    if (!posts?.length) return null

    return (
        <section className="mx-auto max-w-7xl px-6 py-12">
            <div className="mb-8 text-center">
                <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">{heading}</h2>
                {subheading && (
                    <p className="mt-2 text-gray-600 max-w-2xl mx-auto">{subheading}</p>
                )}
            </div>

            <div className="relative">
                <Carousel setApi={setApi} className="w-full max-w-7xl">
                    <CarouselContent className="-ml-4">
                        {posts.map((post) => (
                            <CarouselItem key={post._id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                                <FeaturedPostCard post={post} />
                            </CarouselItem>
                        ))}
                    </CarouselContent>

                    <CarouselPrevious className="absolute -left-12 top-1/2 -translate-y-1/2 bg-white/90 border-2 border-gray-200 hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-300 shadow-lg" />
                    <CarouselNext className="absolute -right-12 top-1/2 -translate-y-1/2 bg-white/90 border-2 border-gray-200 hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-300 shadow-lg" />
                </Carousel>
            </div>
        </section>
    )
}