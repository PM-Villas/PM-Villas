// src/components/site-header.tsx
'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'

export default function SiteHeader() {
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isOpen])

    // Handle scroll event
    useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY
            setScrolled(offset > 50)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <nav
            className={`
                fixed top-0 left-0 right-0 z-50
                bg-white/80 backdrop-blur-md border-b border-gray-100
                transition-all duration-300 ease-in-out
                ${scrolled ? 'py-2' : 'py-4'}
            `}
            ref={menuRef}
        >
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between">
                    <Link
                        href="/"
                        aria-label="PM Villas Home"
                        className="flex items-center transition-all duration-300 ease-in-out"
                        onClick={() => setIsOpen(false)}
                    >
                        <Image
                            src="/images/PM-Villas-Logo.png"
                            alt="PM Villas"
                            width={320}
                            height={85}
                            className={`
                                w-auto transition-all duration-300 ease-in-out
                                ${scrolled ? 'h-10 sm:h-12' : 'h-12 sm:h-16'}
                            `}
                            priority
                        />
                    </Link>

                    {/* Hamburger Toggle */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 text-gray-600 hover:text-gray-900"
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>

                    {/* Single Navigation Menu - Responsive */}
                    <div className={`
                        ${isOpen ? 'flex' : 'hidden'}
                        md:flex
                        absolute md:relative
                        top-full md:top-0
                        left-0 md:left-auto
                        right-0 md:right-auto
                        flex-col md:flex-row
                        md:items-center
                        bg-white md:bg-transparent
                        border-t md:border-t-0
                        border-gray-100
                        md:space-x-8
                        p-6 md:p-0
                        space-y-4 md:space-y-0
                        shadow-lg md:shadow-none
                    `}>
                        <Link
                            href="/properties"
                            className="text-gray-600 hover:text-gray-900 font-medium transition-colors py-2 md:py-0"
                            onClick={() => setIsOpen(false)}
                        >
                            Properties
                        </Link>
                        <Link
                            href="/blog"
                            className="text-gray-600 hover:text-gray-900 font-medium transition-colors py-2 md:py-0"
                            onClick={() => setIsOpen(false)}
                        >
                            Blog
                        </Link>
                        <Link
                            href="/contact"
                            className="text-gray-600 hover:text-gray-900 font-medium transition-colors py-2 md:py-0"
                            onClick={() => setIsOpen(false)}
                        >
                            Contact Us
                        </Link>
                        <Button
                            className={`
                                w-full md:w-auto bg-gray-900 hover:bg-gray-800 text-white
                                transition-all duration-300 ease-in-out
                                ${scrolled ? 'px-5 py-2 text-sm' : 'px-6 py-2.5 text-base'}
                            `}
                            onClick={() => setIsOpen(false)}
                        >
                            Schedule Tour
                        </Button>
                    </div>
                </div>
            </div>
        </nav>
    )
}