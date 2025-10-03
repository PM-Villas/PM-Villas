// File: src/components/contact/ContactHero.tsx
import React from 'react'

type Props = {
    title: string
    subtitle?: string
    imageUrl?: string
}

export default function ContactHero({
    title,
    subtitle,
    imageUrl = 'https://pmvillas.com/wp-content/uploads/2025/08/Punta-Mita-Coastline-Hero.webp',
}: Props) {
    return (
        <section
            // New stacking context + very high z to sit above any page overlays
            className="relative isolate z-[100] pt-36 pb-24 px-6"
            style={{
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundColor: '#0b0b0b', // fallback
            }}
        >
            {/* Dark overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60" />

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
