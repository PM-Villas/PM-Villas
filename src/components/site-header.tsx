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

    useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY
            setScrolled(offset > 50)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleScheduleTourClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        setIsOpen(false)

        if (window.location.pathname === '/contact') {
            const element = document.querySelector('#schedule-tour')
            if (element) {
                const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
                const offsetPosition = elementPosition - 100
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                })
            }
        } else {
            window.location.href = '/contact#schedule-tour'
        }
    }

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 transition-all duration-300 ease-in-out ${scrolled ? 'py-2' : 'py-4'}`}
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
                            className={`w-auto transition-all duration-300 ease-in-out ${scrolled ? 'h-10 sm:h-12' : 'h-12 sm:h-16'}`}
                            priority
                        />
                    </Link>

                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 text-gray-600 hover:text-gray-900"
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>

                    <div className={isOpen ? 'flex flex-col md:flex-row md:items-center absolute md:relative top-full md:top-0 left-0 md:left-auto right-0 md:right-auto bg-white md:bg-transparent border-t md:border-t-0 border-gray-100 md:space-x-8 p-6 md:p-0 space-y-4 md:space-y-0 shadow-lg md:shadow-none' : 'hidden md:flex md:flex-row md:items-center md:space-x-8'}>
                        <Link
                            href="https://booking.pmvillas.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 hover:text-gray-900 font-medium transition-colors py-2 md:py-0"
                            onClick={() => setIsOpen(false)}
                        >
                            Rental Listings
                        </Link>
                        <Link
                            href="/properties-for-sale"
                            className="text-gray-600 hover:text-gray-900 font-medium transition-colors py-2 md:py-0"
                            onClick={() => setIsOpen(false)}
                        >
                            Properties for Sale
                        </Link>
                        <Link
                            href="/insights"
                            className="text-gray-600 hover:text-gray-900 font-medium transition-colors py-2 md:py-0"
                            onClick={() => setIsOpen(false)}
                        >
                            Insights
                        </Link>
                        <Link
                            href="/faq"
                            className="text-gray-600 hover:text-gray-900 font-medium transition-colors py-2 md:py-0"
                            onClick={() => setIsOpen(false)}
                        >
                            FAQ
                        </Link>
                        <Link
                            href="/contact"
                            className="text-gray-600 hover:text-gray-900 font-medium transition-colors py-2 md:py-0"
                            onClick={() => setIsOpen(false)}
                        >
                            Contact Us
                        </Link>
                        <Link
                            href="/contact#schedule-tour"
                            onClick={handleScheduleTourClick}
                            className="block md:inline-block"
                        >
                            <Button className={`w-full md:w-auto bg-gray-900 hover:bg-gray-800 text-white transition-all duration-300 ease-in-out ${scrolled ? 'px-5 py-2 text-sm' : 'px-6 py-2.5 text-base'}`}>
                                Schedule Tour
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}