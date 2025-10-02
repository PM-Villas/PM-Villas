// src/components/sections/HeroSection.tsx
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
    const subtitleText = "Discover exceptional oceanfront villas and exclusive properties in Mexico's most prestigious coastal destination."

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
        <section className="relative h-screen flex items-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/50 to-transparent z-10"></div>
            <div className="absolute inset-0">
                <Image
                    src="https://pmvillas.com/wp-content/uploads/2025/08/Primary-Bedroom-More-Photos.webp"
                    alt="Luxury villa in Punta Mita"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            <div className="relative z-20 w-full px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl ml-4 sm:ml-8 md:ml-12 lg:ml-16 xl:ml-20 2xl:ml-24">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                        <div className="min-h-[2.5em] sm:min-h-[3em]">
                            <span className="text-white">
                                {titleDisplayed}
                                {titleIndex < firstLine.length && (
                                    <span className="animate-pulse ml-1 font-bold" style={{ color: '#e1c098' }}>|</span>
                                )}
                            </span>
                            {showSecondLine && (
                                <span className="block" style={{ color: '#e1c098' }}>
                                    {secondLineDisplayed}
                                    {secondLineIndex < secondLine.length && (
                                        <span className="animate-pulse ml-1 font-bold" style={{ color: '#e1c098' }}>|</span>
                                    )}
                                </span>
                            )}
                        </div>
                    </h1>

                    <p className="text-lg sm:text-xl text-gray-200 mb-6 sm:mb-8 leading-relaxed max-w-xl lg:max-w-2xl">
                        Discover exceptional oceanfront villas and exclusive properties in Mexico's most prestigious coastal destination.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button
                            size="lg"
                            className="text-white px-8 py-6 text-lg rounded-full shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
                            style={{
                                backgroundColor: '#e1c098',
                                borderColor: '#e1c098'
                            }}
                        >
                            <Link href="/properties">View Properties</Link>
                        </Button>
                        <Button
                            size="lg"
                            className="text-gray-900 px-8 py-6 text-lg rounded-full shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
                            style={{
                                backgroundColor: 'white',
                                borderColor: 'white'
                            }}
                        >
                            <Link href="http://booking.pmvillas.com" target="_blank" rel="noopener noreferrer">
                                Vacation Rentals
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}