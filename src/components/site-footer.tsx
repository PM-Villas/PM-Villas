// src/components/site-footer.tsx
'use client'
import { useState, FormEvent } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { SiInstagram, SiLinkedin } from 'react-icons/si'
import { Phone, Mail, MapPin, ArrowUp } from 'lucide-react'
import ScrollAnimation from '@/components/animations/ScrollAnimation'

export default function SiteFooter() {
    const [email, setEmail] = useState('')
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

    const handleNewsletterSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!email || !email.includes('@')) {
            setStatus('error')
            return
        }
        setStatus('loading')
        // TODO: Implement newsletter subscription
        await new Promise(resolve => setTimeout(resolve, 1000))
        setStatus('success')
        setEmail('')
        setTimeout(() => setStatus('idle'), 3000)
    }

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <footer className="bg-white border-t border-gray-200">
            <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
                {/* Main Footer Grid */}
                <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">

                    {/* Column 1: Brand */}
                    <div>
                        <ScrollAnimation delay={0.1}>
                            {/* Logo */}
                            <Link href="/" className="inline-block mb-6">
                                <Image
                                    src="/images/PM-Villas-Logo.png"
                                    alt="PM Villas"
                                    width={200}
                                    height={50}
                                    className="h-14 w-auto"
                                    priority
                                />
                            </Link>

                            <p className="text-gray-600 text-sm leading-relaxed mb-6">
                                Discover exceptional oceanfront villas and exclusive properties in Punta Mita, Mexico&apos;s most prestigious coastal destination.
                            </p>

                            {/* Social Media */}
                            <div className="flex gap-3">
                                <a
                                    href="https://www.instagram.com/pm.villas"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition hover:bg-[#e1c098] hover:text-white"
                                    aria-label="Instagram"
                                >
                                    <SiInstagram className="h-5 w-5" />
                                </a>
                                <a
                                    href="https://www.linkedin.com/company/pm-villas/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition hover:bg-[#e1c098] hover:text-white"
                                    aria-label="LinkedIn"
                                >
                                    <SiLinkedin className="h-5 w-5" />
                                </a>
                                <a
                                    href="tel:+18473400338"
                                    className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition hover:bg-[#e1c098] hover:text-white"
                                    aria-label="Phone"
                                >
                                    <Phone className="h-5 w-5" />
                                </a>
                            </div>
                        </ScrollAnimation>
                    </div>

                    {/* Column 2: Properties */}
                    <div>
                        <ScrollAnimation delay={0.2}>
                            <h3 className="text-sm font-semibold text-gray-900 mb-4">Properties</h3>
                            <ul className="space-y-3">
                                <li>
                                    <Link href="/properties-for-sale" className="text-sm text-gray-600 hover:text-[#e1c098] transition">
                                        Luxury Villas
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/properties-for-sale" className="text-sm text-gray-600 hover:text-[#e1c098] transition">
                                        Oceanfront Properties
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/properties-for-sale" className="text-sm text-gray-600 hover:text-[#e1c098] transition">
                                        Golf Course Homes
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/properties-for-sale" className="text-sm text-gray-600 hover:text-[#e1c098] transition">
                                        Investment Opportunities
                                    </Link>
                                </li>
                                <li>
                                    <a
                                        href="http://booking.pmvillas.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-gray-600 hover:text-[#e1c098] transition"
                                    >
                                        Vacation Rentals
                                    </a>
                                </li>
                            </ul>
                        </ScrollAnimation>
                    </div>

                    {/* Column 3: Stay Updated */}
                    <div>
                        <ScrollAnimation delay={0.3}>
                            <h3 className="text-sm font-semibold text-gray-900 mb-4">Stay Updated</h3>
                            <p className="text-xs text-gray-600 mb-4">Get exclusive property listings delivered to your inbox.</p>
                            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={status === 'loading' || status === 'success'}
                                    className="w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm focus:border-[#e1c098] focus:outline-none focus:ring-1 focus:ring-[#e1c098] disabled:opacity-50"
                                />
                                <button
                                    type="submit"
                                    disabled={status === 'loading' || status === 'success'}
                                    className="w-full rounded-md px-4 py-2.5 text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-50"
                                    style={{ backgroundColor: '#e1c098' }}
                                >
                                    {status === 'loading' ? 'Subscribing...' : status === 'success' ? 'Subscribed!' : 'Subscribe'}
                                </button>
                            </form>
                            {status === 'error' && (
                                <p className="mt-2 text-xs text-red-600">Please enter a valid email address.</p>
                            )}
                        </ScrollAnimation>
                    </div>

                    {/* Column 4: Get in Touch */}
                    <div>
                        <ScrollAnimation delay={0.4}>
                            <h3 className="text-sm font-semibold text-gray-900 mb-4">Get in Touch</h3>
                            <ul className="space-y-4">
                                <li>
                                    <a
                                        href="https://maps.google.com/?q=Lagos%20Del%20Mar%2026,%20Punta%20de%20Mita,%20Nayarit,%20Mexico%2063734"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group flex items-start gap-3 text-sm text-gray-600 hover:text-[#e1c098] transition"
                                    >
                                        <MapPin className="h-5 w-5 flex-shrink-0 text-[#e1c098] mt-0.5" />
                                        <span>Lagos Del Mar 26, Punta de Mita, Nayarit, Mexico 63734</span>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="tel:+18473400338"
                                        className="group flex items-center gap-3 text-sm text-gray-600 hover:text-[#e1c098] transition"
                                    >
                                        <Phone className="h-5 w-5 flex-shrink-0 text-[#e1c098]" />
                                        <span>+1 847-340-0338</span>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="mailto:andrew.kubicek@pmvillas.com"
                                        className="group flex items-center gap-3 text-sm text-gray-600 hover:text-[#e1c098] transition break-words"
                                    >
                                        <Mail className="h-5 w-5 flex-shrink-0 text-[#e1c098]" />
                                        <span>andrew.kubicek@pmvillas.com</span>
                                    </a>
                                </li>
                            </ul>
                        </ScrollAnimation>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 border-t border-gray-200 pt-8">
                    <p className="text-center text-xs text-gray-500">
                        © {new Date().getFullYear()} PM Villas. All rights reserved.
                    </p>
                </div>
            </div>

            {/* Back to Top Button */}
            <button
                onClick={scrollToTop}
                className="fixed bottom-8 right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition hover:scale-110 hover:shadow-xl"
                style={{ backgroundColor: '#e1c098' }}
                aria-label="Scroll to top"
            >
                <ArrowUp className="h-5 w-5 text-white" />
            </button>
        </footer>
    )
}
