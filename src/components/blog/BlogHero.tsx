// File: src/components/blog/BlogHero.tsx
import Image from 'next/image'

type Props = {
    title: string
    subtitle?: string
    imageUrl?: string
}

export default function BlogHero({
    title,
    subtitle,
    imageUrl = 'https://pmvillas.com/wp-content/uploads/2025/08/Primary-Bedroom-More-Photos.webp',
}: Props) {
    return (
        <section className="relative py-24 px-6 bg-gradient-to-r from-gray-900/70 via-gray-900/50 to-gray-900/70">
            <div className="absolute inset-0 -z-10">
                <Image
                    src={imageUrl}
                    alt={title}
                    fill
                    className="object-cover opacity-20"
                    priority
                />
            </div>
            <div className="max-w-7xl mx-auto text-center relative z-10">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                    {title}
                </h1>
                {subtitle && (
                    <p className="text-xl text-gray-100 max-w-3xl mx-auto leading-relaxed">{subtitle}</p>
                )}
            </div>
        </section>
    )
}
