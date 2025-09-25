// src/components/site-header.tsx
'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function SiteHeader() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                <Link href="/" aria-label="PM Villas Home" className="flex items-center text-2xl font-bold text-gray-900">
                    <span className="mr-2 inline-flex items-center justify-center">
                        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <path d="M12 3l9 7-1.2 1.6L18 10.7V20a1 1 0 01-1 1h-4v-5H11v5H7a1 1 0 01-1-1v-9.3L4.2 11.6 3 10l9-7z" />
                        </svg>
                    </span>
                    PM VILLAS
                </Link>

                <div className="flex items-center space-x-8">
                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="/properties" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">Properties</Link>
                        <Link href="/blog" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">Blog</Link>
                        <Link href="/contact" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">Contact Us</Link>
                    </div>

                    <Button className="bg-gray-900 hover:bg-gray-800 text-white px-6">Schedule Tour</Button>

                    {/* Mobile shortcuts */}
                    <div className="md:hidden flex items-center space-x-4">
                        <Link href="/properties" className="text-gray-600 hover:text-gray-900 font-medium transition-colors text-sm">Properties</Link>
                        <Link href="/blog" className="text-gray-600 hover:text-gray-900 font-medium transition-colors text-sm">Blog</Link>
                        <Link href="/contact" className="text-gray-600 hover:text-gray-900 font-medium transition-colors text-sm">Contact</Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}
