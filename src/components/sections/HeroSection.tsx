// File: src/components/sections/HeroSection.tsx
'use client'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'

export default function HeroSection() {
    const [titleDisplayed, setTitleDisplayed] = useState('')
    const [titleIndex, setTitleIndex] = useState(0)
    const [showSecondLine, setShowSecondLine] = useState(false)
    const [secondLineDisplayed, setSecondLineDisplayed] = useState('')
    const [secondLineIndex, setSecondLineIndex] = useState(0)
    const [showSubtitle, setShowSubtitle] = useState(false)

    const firstLine = "Luxury Living in"
    const secondLine = "Punta Mita"
    const subtitleText = "Discover exceptional oceanfront villas and exclusive properties in Mexico&apos;s most prestigious coastal destination."

    // Type first line
    useEffect(() => {
        if (titleIndex < firstLine.length) {
            const timeout = setTimeout(() => {
                setTitleDisplayed(prev => prev + firstLine[titleIndex])
                setTitleIndex(prev => prev + 1)
            }, 80)

            return () => clearTimeout(timeout)
        } else if (titleIndex === firstLine.length && !showSecondLine) {
            // Pause and then start second line
            const timeout = setTimeout(() => {
                setShowSecondLine(true)
            }, 300)

            return () => clearTimeout(timeout)
        }
    }, [titleIndex, firstLine.length, showSecondLine])

    // Type second line
    useEffect(() => {
        if (showSecondLine && secondLineIndex < secondLine.length) {
            const timeout = setTimeout(() => {
                setSecondLineDisplayed(prev => prev + secondLine[secondLineIndex])
                setSecondLineIndex(prev => prev + 1)
            }, 80)

            return () => clearTimeout(timeout)
        } else if (secondLineIndex === secondLine.length && !showSubtitle) {
            // Start subtitle after second line completes
            const timeout = setTimeout(() => {
                setShowSubtitle(true)
            }, 500)

            return () => clearTimeout(timeout)
        }
    }, [showSecondLine, secondLineIndex, secondLine.length, showSubtitle])

    return (
        <section className="relative min-h-screen h-screen portrait:h-screen landscape:min-h-[100vh] landscape:h-auto flex items-center overflow-hidden">
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/70 via-gray-900/50 to-transparent z-10"></div>

            {/* Background Image */}
            <div className="absolute inset-0">
                <Image
                    src="https://cdn.sanity.io/images/canvases/caNo2t7QUntW/06e720bbc93e6afd3701195082454b253a6e3eff-1600x1067.webp"
                    alt="Luxury villa in Punta Mita"
                    fill
                    className="object-cover object-center"
                    priority
                    sizes="100vw"
                />
            </div>

            {/* Content Container */}
            <div className="relative z-20 w-full px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 md:pt-0 landscape:py-16">
                <div className="max-w-3xl mx-auto md:mx-0 md:ml-8 lg:ml-16 xl:ml-20 2xl:ml-24">
                    {/* Main Title */}
                    <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 landscape:mb-4 leading-tight">
                        <div className="min-h-[2em] xs:min-h-[2.5em] sm:min-h-[3em]">
                            <span className="text-white">
                                {titleDisplayed}
                                {titleIndex < firstLine.length && (
                                    <span className="animate-pulse ml-0.5 sm:ml-1 font-bold" style={{ color: '#e1c098' }}>|</span>
                                )}
                            </span>
                            {showSecondLine && (
                                <span className="block mt-1 sm:mt-2" style={{ color: '#e1c098' }}>
                                    {secondLineDisplayed}
                                    {secondLineIndex < secondLine.length && (
                                        <span className="animate-pulse ml-0.5 sm:ml-1 font-bold" style={{ color: '#e1c098' }}>|</span>
                                    )}
                                </span>
                            )}
                        </div>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-base sm:text-lg md:text-xl text-gray-100 mb-6 sm:mb-8 landscape:mb-5 leading-relaxed max-w-xl lg:max-w-2xl">
                        Discover exceptional oceanfront villas and exclusive properties in Mexico&apos;s most prestigious coastal destination.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                        <Link href="/properties-for-sale" className="w-full sm:w-auto">
                            <Button
                                size="lg"
                                className="w-full sm:w-auto text-white px-6 sm:px-8 py-5 sm:py-6 landscape:py-4 text-base sm:text-lg rounded-full shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95"
                                style={{
                                    backgroundColor: '#e1c098',
                                    borderColor: '#e1c098'
                                }}
                            >
                                View Properties
                            </Button>
                        </Link>
                        <Link
                            href="http://booking.pmvillas.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto"
                        >
                            <Button
                                size="lg"
                                className="w-full sm:w-auto text-gray-900 px-6 sm:px-8 py-5 sm:py-6 landscape:py-4 text-base sm:text-lg rounded-full shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95"
                                style={{
                                    backgroundColor: 'white',
                                    borderColor: 'white'
                                }}
                            >
                                Vacation Rentals
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}