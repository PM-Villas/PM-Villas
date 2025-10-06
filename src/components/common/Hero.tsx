// File: src/components/common/Hero.tsx (or src/components/Hero.tsx)
import Image from 'next/image'
import { ReactNode } from 'react'

type HeroProps = {
    title: string | ReactNode
    subtitle?: string | ReactNode
    imageUrl?: string
}

export default function Hero({
    title,
    subtitle,
    imageUrl = 'https://cdn.sanity.io/images/canvases/caNo2t7QUntW/06e720bbc93e6afd3701195082454b253a6e3eff-1600x1067.webp',
}: HeroProps) {
    return (
        <section className="relative isolate py-24 px-6 bg-gradient-to-r from-gray-900/70 via-gray-900/50 to-gray-900/70">
            {/* Background image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={imageUrl}
                    alt={typeof title === 'string' ? title : 'Page hero'}
                    fill
                    className="object-cover opacity-20 pointer-events-none"
                    priority
                />
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto text-center relative z-10">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                    {title}
                </h1>
                {subtitle && (
                    <p className="text-xl text-gray-100 max-w-3xl mx-auto leading-relaxed">
                        {subtitle}
                    </p>
                )}
            </div>
        </section>
    )
}