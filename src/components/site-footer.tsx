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
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
                    {/* PM Villas - Company Info */}
                    <ScrollAnimation delay={0.1}>
                        <div className="mb-6">
                            <Image
                                src="/images/PM-Villas-Logo.png"
                                alt="PM Villas"
                                width={180}
                                height={45}
                                className="h-12 w-auto mb-4"
                                priority
                            />
                        </div>

                        <p className="text-gray-600 leading-relaxed text-sm mb-6">
                            Your trusted partner for luxury real estate in Punta Mita.
                        </p>

                        {/* Social Links */}
                        <div className="flex gap-3">
                            <a
                                href="https://www.instagram.com/pm.villas"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="Instagram"
                                className="grid h-10 w-10 place-items-center rounded-full bg-gray-100 hover:bg-[#e1c098] hover:text-white transition-all duration-300"
                            >
                                <SiInstagram className="h-5 w-5" />
                            </a>
                            <a
                                href="https://www.linkedin.com/company/pm-villas/"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="LinkedIn"
                                className="grid h-10 w-10 place-items-center rounded-full bg-gray-100 hover:bg-[#e1c098] hover:text-white transition-all duration-300"
                            >
                                <SiLinkedin className="h-5 w-5" />
                            </a>
                            <a
                                href="tel:+18473400338"
                                aria-label="Call +1 847-340-0338"
                                className="grid h-10 w-10 place-items-center rounded-full bg-gray-100 hover:bg-[#e1c098] hover:text-white transition-all duration-300"
                            >
                                <Phone className="h-5 w-5" />
                            </a>
                        </div>
                    </ScrollAnimation>

                    {/* Stay Updated - Newsletter */}
                    <ScrollAnimation delay={0.2}>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Stay Updated</h3>
                        <p className="text-sm text-gray-600 mb-4">Get exclusive property alerts.</p>
                        <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                            <Input
                                type="email"
                                placeholder="Your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={status === 'loading' || status === 'success'}
                                className="w-full bg-white border-gray-300 focus:border-[#e1c098] focus:ring-0"
                            />
                            <Button
                                type="submit"
                                disabled={status === 'loading' || status === 'success'}
                                className="w-full text-white px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 disabled:opacity-50"
                                style={{ backgroundColor: '#e1c098', borderColor: '#e1c098' }}
                            >
                                {status === 'loading' ? 'Sending...' : status === 'success' ? 'Sent!' : 'Subscribe'}
                            </Button>
                            {status === 'error' && (
                                <p className="text-xs text-red-500 mt-1">Please enter a valid email</p>
                            )}
                        </form>
                    </ScrollAnimation>

                    {/* Properties Links */}
                    <ScrollAnimation delay={0.3}>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Properties</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/properties-for-sale" className="text-gray-600 hover:text-[#e1c098] transition-colors text-sm">
                                    Luxury Villas
                                </Link>
                            </li>
                            <li>
                                <Link href="/properties-for-sale" className="text-gray-600 hover:text-[#e1c098] transition-colors text-sm">
                                    Oceanfront
                                </Link>
                            </li>
                            <li>
                                <Link href="/properties-for-sale" className="text-gray-600 hover:text-[#e1c098] transition-colors text-sm">
                                    Golf Course
                                </Link>
                            </li>
                            <li>
                                <Link href="/properties-for-sale" className="text-gray-600 hover:text-[#e1c098] transition-colors text-sm">
                                    Investment
                                </Link>
                            </li>
                        </ul>
                    </ScrollAnimation>

                    {/* Company Links */}
                    <ScrollAnimation delay={0.4}>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Company</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/insights" className="text-gray-600 hover:text-[#e1c098] transition-colors text-sm">
                                    Insights
                                </Link>
                            </li>
                            <li>
                                <Link href="/faq" className="text-gray-600 hover:text-[#e1c098] transition-colors text-sm">
                                    FAQ
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-gray-600 hover:text-[#e1c098] transition-colors text-sm">
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-gray-600 hover:text-[#e1c098] transition-colors text-sm">
                                    Schedule Consultation
                                </Link>
                            </li>
                        </ul>
                    </ScrollAnimation>

                    {/* Contact Info */}
                    <ScrollAnimation delay={0.5}>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact</h3>
                        <ul className="space-y-4">
                            <li className="flex gap-2">
                                <MapPin className="h-5 w-5 text-[#e1c098] flex-shrink-0 mt-0.5" />
                                <a
                                    href="https://maps.google.com/?q=Lagos%20Del%20Mar%2026,%20Punta%20de%20Mita,%20Nayarit,%20Mexico%2063734"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-gray-600 hover:text-[#e1c098] transition-colors leading-relaxed text-sm"
                                >
                                    Lagos Del Mar 26, Punta de Mita, Nayarit, Mexico 63734
                                </a>
                            </li>
                            <li className="flex gap-2">
                                <Phone className="h-5 w-5 text-[#e1c098] flex-shrink-0" />
                                <a href="tel:+18473400338" className="text-gray-600 hover:text-[#e1c098] transition-colors text-sm">
                                    +1 847-340-0338
                                </a>
                            </li>
                            <li className="flex gap-2">
                                <Mail className="h-5 w-5 text-[#e1c098] flex-shrink-0" />
                                <a href="mailto:andrew.kubicek@pmvillas.com" className="text-gray-600 hover:text-[#e1c098] transition-colors break-words text-sm">
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
