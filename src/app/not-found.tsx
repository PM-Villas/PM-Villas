'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Home, Search } from 'lucide-react'

export default function NotFound() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-amber-50/30 flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-amber-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="max-w-2xl w-full relative z-10">
                {/* Main Content Card */}
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 p-8 md:p-12 relative overflow-hidden">
                    {/* Decorative corner accent */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-100 to-transparent rounded-bl-full opacity-50"></div>

                    <div className="relative z-10">
                        {/* 404 Number - Smaller, Inside Card */}
                        <div className="mb-6 relative">
                            <h1 className="text-7xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-gray-900 via-gray-600 to-gray-400 leading-none text-center select-none animate-pulse" style={{
                                textShadow: '0 0 40px rgba(225, 192, 152, 0.3)',
                                WebkitTextStroke: '1px rgba(0,0,0,0.1)'
                            }}>
                                404
                            </h1>
                            {/* Glow effect behind number */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
                                <div className="w-32 h-32 bg-gradient-to-br from-amber-200 to-orange-200 rounded-full filter blur-3xl opacity-30"></div>
                            </div>
                        </div>

                        {/* Title with accent line */}
                        <div className="text-center mb-6">
                            <div className="w-16 h-1 rounded-full mx-auto mb-4" style={{ backgroundColor: '#e1c098' }}></div>
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                                Oops! Page Not Found
                            </h2>
                            <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                                The page you&apos;re looking for seems to have wandered off. Let&apos;s get you back on track to finding your dream property.
                            </p>
                        </div>

                        {/* Decorative divider */}
                        <div className="my-6 flex items-center justify-center gap-3">
                            <div className="h-px w-20 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                            <div className="flex gap-1">
                                <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: '#e1c098' }}></div>
                                <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: '#e1c098', animationDelay: '0.2s' }}></div>
                                <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: '#e1c098', animationDelay: '0.4s' }}></div>
                            </div>
                            <div className="h-px w-20 bg-gradient-to-l from-transparent via-gray-300 to-transparent"></div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center mb-6">
                            <Link href="/" className="flex-1 sm:flex-initial">
                                <Button
                                    size="lg"
                                    className="w-full text-white px-8 py-6 text-base font-semibold rounded-2xl shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl group relative overflow-hidden"
                                    style={{ backgroundColor: '#e1c098' }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                                    <Home className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform relative z-10" />
                                    <span className="relative z-10">Return Home</span>
                                </Button>
                            </Link>
                            <Link href="/properties-for-sale" className="flex-1 sm:flex-initial">
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="w-full px-8 py-6 text-base font-semibold rounded-2xl shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl border-2 group relative overflow-hidden bg-white"
                                    style={{ borderColor: '#e1c098', color: '#e1c098' }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                                    <Search className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform relative z-10" />
                                    <span className="relative z-10">View Properties</span>
                                </Button>
                            </Link>
                        </div>

                        {/* Alternative links */}
                        <div className="pt-6 border-t border-gray-200/50">
                            <p className="text-sm text-gray-500 mb-3 text-center">Or explore these sections:</p>
                            <div className="flex flex-wrap justify-center gap-3">
                                <Link
                                    href="/insights"
                                    className="text-sm font-medium px-4 py-2 rounded-full transition-all duration-300 hover:scale-105"
                                    style={{
                                        color: '#e1c098',
                                        backgroundColor: 'rgba(225, 192, 152, 0.1)',
                                    }}
                                >
                                    Insights & News
                                </Link>
                                <Link
                                    href="/contact"
                                    className="text-sm font-medium px-4 py-2 rounded-full transition-all duration-300 hover:scale-105"
                                    style={{
                                        color: '#e1c098',
                                        backgroundColor: 'rgba(225, 192, 152, 0.1)',
                                    }}
                                >
                                    Contact Us
                                </Link>
                                <Link
                                    href="https://booking.pmvillas.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm font-medium px-4 py-2 rounded-full transition-all duration-300 hover:scale-105"
                                    style={{
                                        color: '#e1c098',
                                        backgroundColor: 'rgba(225, 192, 152, 0.1)',
                                    }}
                                >
                                    Rental Listings
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Additional Help Text - Subtle */}
                <p className="text-sm text-gray-500 italic text-center mt-6">
                    Lost? We&apos;re here to help you find the perfect property in Punta Mita
                </p>
            </div>
        </div>
    )
}