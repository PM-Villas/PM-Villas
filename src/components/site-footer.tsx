// src/components/site-footer.tsx
'use client'
import { useState, FormEvent } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { SiInstagram, SiLinkedin } from 'react-icons/si'
import { Phone, Mail, MapPin, ArrowUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
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
        <footer className="border-t border-gray-200 bg-white">
            {/* Main Footer Content */}
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
                    {/* Company Info & Newsletter */}
                    <ScrollAnimation delay={0.1}>
                        <div className="mb-6">
                            <Image
                                src="/images/PM-Villas-Logo.png"
                                alt="PM Villas"
                                width={240}
                                height={60}
                                className="h-14 w-auto"
                                priority
                            />
                        </div>

                        <p className="text-gray-600 leading-relaxed mb-6">
                            Your trusted partner for luxury real estate in Punta Mita. Discover exceptional properties in Mexico&apos;s most prestigious coastal destination.
                        </p>

                        {/* Social Links */}
                        <div className="flex gap-3 mb-8">
                            <a
                                href="https://www.instagram.com/pm.villas"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="Instagram"
                                className="grid h-11 w-11 place-items-center rounded-full bg-gray-100 hover:bg-[#e1c098] hover:text-white transition-all duration-300"
                            >
                                <SiInstagram className="h-5 w-5" />
                            </a>
                            <a
                                href="https://www.linkedin.com/company/pm-villas/"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="LinkedIn"
                                className="grid h-11 w-11 place-items-center rounded-full bg-gray-100 hover:bg-[#e1c098] hover:text-white transition-all duration-300"
                            >
                                <SiLinkedin className="h-5 w-5" />
                            </a>
                            <a
                                href="tel:+18473400338"
                                aria-label="Call +1 847-340-0338"
                                className="grid h-11 w-11 place-items-center rounded-full bg-gray-100 hover:bg-[#e1c098] hover:text-white transition-all duration-300"
                            >
                                <Phone className="h-5 w-5" />
                            </a>
                        </div>

                        {/* Newsletter Signup */}
                        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                            <h4 className="text-lg font-semibold text-gray-900 mb-3">Stay Updated</h4>
                            <p className="text-sm text-gray-600 mb-4">Get exclusive property alerts and market insights.</p>
                            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2">
                                <Input
                                    type="email"
                                    placeholder="Your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={status === 'loading' || status === 'success'}
                                    className="flex-1 bg-white border-gray-300 focus:border-[#e1c098] focus:ring-0"
                                />
                                <Button
                                    type="submit"
                                    disabled={status === 'loading' || status === 'success'}
                                    className="text-white px-6 rounded-lg transition-all duration-300 hover:scale-105 disabled:opacity-50"
                                    style={{ backgroundColor: '#e1c098', borderColor: '#e1c098' }}
                                >
                                    {status === 'loading' ? 'Sending...' : status === 'success' ? 'Sent!' : 'Subscribe'}
                                </Button>
                            </form>
                            {status === 'error' && (
                                <p className="text-xs text-red-500 mt-2">Please enter a valid email</p>
                            )}
                        </div>
                    </ScrollAnimation>

                    {/* Properties & Company Links */}
                    <ScrollAnimation delay={0.2}>
                        <div className="space-y-8">
                            {/* Properties */}
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">Properties</h3>
                                <ul className="space-y-3">
                                    <li>
                                        <Link href="/properties-for-sale" className="text-gray-600 hover:text-[#e1c098] transition-colors">
                                            Luxury Villas
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/properties-for-sale" className="text-gray-600 hover:text-[#e1c098] transition-colors">
                                            Oceanfront
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/properties-for-sale" className="text-gray-600 hover:text-[#e1c098] transition-colors">
                                            Golf Course
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/properties-for-sale" className="text-gray-600 hover:text-[#e1c098] transition-colors">
                                            Investment
                                        </Link>
                                    </li>
                                </ul>
                            </div>

                            {/* Company */}
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">Company</h3>
                                <ul className="space-y-3">
                                    <li>
                                        <Link href="/insights" className="text-gray-600 hover:text-[#e1c098] transition-colors">
                                            Insights
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/faq" className="text-gray-600 hover:text-[#e1c098] transition-colors">
                                            FAQ
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/contact" className="text-gray-600 hover:text-[#e1c098] transition-colors">
                                            Contact Us
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/contact" className="text-gray-600 hover:text-[#e1c098] transition-colors">
                                            Schedule Consultation
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </ScrollAnimation>

                    {/* Contact Info */}
                    <ScrollAnimation delay={0.3}>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Contact</h3>
                        <ul className="space-y-4">
                            <li className="flex gap-3">
                                <MapPin className="h-5 w-5 text-[#e1c098] flex-shrink-0 mt-0.5" />
                                <a
                                    href="https://maps.google.com/?q=Lagos%20Del%20Mar%2026,%20Punta%20de%20Mita,%20Nayarit,%20Mexico%2063734"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-gray-600 hover:text-[#e1c098] transition-colors leading-relaxed"
                                >
                                    Lagos Del Mar 26, Punta de Mita, Nayarit, Mexico 63734
                                </a>
                            </li>
                            <li className="flex gap-3">
                                <Phone className="h-5 w-5 text-[#e1c098] flex-shrink-0" />
                                <a href="tel:+18473400338" className="text-gray-600 hover:text-[#e1c098] transition-colors">
                                    +1 847-340-0338
                                </a>
                            </li>
                            <li className="flex gap-3">
                                <Mail className="h-5 w-5 text-[#e1c098] flex-shrink-0" />
                                <a href="mailto:andrew.kubicek@pmvillas.com" className="text-gray-600 hover:text-[#e1c098] transition-colors break-words">
                                    andrew.kubicek@pmvillas.com
                                </a>
                            </li>
                        </ul>
                    </ScrollAnimation>
                </div>

                {/* Copyright */}
                <div className="mt-12 pt-8 border-t border-gray-200 text-center">
                    <p className="text-sm text-gray-500">
                        © {new Date().getFullYear()} PM Villas. All rights reserved.
                    </p>
                </div>
            </div>

            {/* Back to Top Button */}
            <button
                onClick={scrollToTop}
                aria-label="Scroll to top"
                className="fixed bottom-8 right-8 z-50 grid h-12 w-12 place-items-center rounded-full bg-[#e1c098] text-white shadow-lg hover:scale-110 transition-all duration-300 hover:shadow-xl"
            >
                <ArrowUp className="h-5 w-5" />
            </button>
        </footer>
    )
}
