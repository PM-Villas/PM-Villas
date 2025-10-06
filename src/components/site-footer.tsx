// src/components/site-footer.tsx
import Link from 'next/link'
import Image from 'next/image'
import { SiInstagram, SiLinkedin } from 'react-icons/si'
import { Phone, Mail, MapPin } from 'lucide-react'

export default function SiteFooter() {
    return (
        <footer className="border-t border-gray-200 bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">

                {/* Desktop/Tablet (md+): 3 aligned columns (5/3/4) */}
                <div className="hidden md:grid md:grid-cols-12 md:gap-x-12 items-start">
                    {/* Col 1 */}
                    <div className="min-w-0 md:col-span-5">
                        <div className="mb-6 flex">
                            <Image
                                src="/images/PM-Villas-Logo.png"
                                alt="PM Villas"
                                width={240}
                                height={60}
                                className="h-16 w-auto"
                                priority
                            />
                        </div>

                        <p className="text-gray-600 leading-relaxed">
                            Your trusted partner for luxury real estate in Punta Mita. Discover
                            exceptional properties in Mexico&apos;s most prestigious coastal destination.
                        </p>

                        <div className="mt-6 flex gap-4">
                            <a
                                href="https://www.instagram.com/pm.villas"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="Instagram"
                                className="grid h-11 w-11 place-items-center rounded-full bg-gray-100 hover:bg-[#e1c098] hover:text-white transition"
                                title="Instagram"
                            >
                                <SiInstagram className="h-5 w-5" />
                            </a>
                            <a
                                href="https://www.linkedin.com/company/pm-villas/"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="LinkedIn"
                                className="grid h-11 w-11 place-items-center rounded-full bg-gray-100 hover:bg-[#e1c098] hover:text-white transition"
                                title="LinkedIn"
                            >
                                <SiLinkedin className="h-5 w-5" />
                            </a>
                            <a
                                href="tel:+18473400338"
                                aria-label="Call +1 847-340-0338"
                                className="grid h-11 w-11 place-items-center rounded-full bg-gray-100 hover:bg-[#e1c098] hover:text-white transition"
                                title="Call"
                            >
                                <Phone className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Col 2 */}
                    <div className="min-w-0 md:col-span-3">
                        <h3 className="mb-4 text-xl font-semibold tracking-tight text-gray-900">Properties</h3>
                        <ul className="space-y-3">
                            <li><Link href="/properties" className="block text-gray-600 hover:text-[#e1c098] transition">Luxury Villas</Link></li>
                            <li><Link href="/properties" className="block text-gray-600 hover:text-[#e1c098] transition">Oceanfront</Link></li>
                            <li><Link href="/properties" className="block text-gray-600 hover:text-[#e1c098] transition">Golf Course</Link></li>
                            <li><Link href="/properties" className="block text-gray-600 hover:text-[#e1c098] transition">Investment</Link></li>
                        </ul>
                    </div>

                    {/* Col 3 */}
                    <div className="min-w-0 md:col-span-4">
                        <h3 className="mb-4 text-xl font-semibold tracking-tight text-gray-900">Contact</h3>
                        <div className="space-y-4 text-gray-600">
                            <div className="flex items-start gap-3">
                                <MapPin className="mt-0.5 h-5 w-5 text-[#e1c098] flex-shrink-0" />
                                <a
                                    href="https://maps.google.com/?q=Lagos%20Del%20Mar%2026,%20Punta%20de%20Mita,%20Nayarit,%20Mexico%2063734"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="hover:text-[#e1c098] leading-relaxed break-words"
                                >
                                    Lagos Del Mar 26, Punta de Mita,<br />Nayarit, Mexico 63734
                                </a>
                            </div>

                            <div className="flex items-center gap-3">
                                <Phone className="h-5 w-5 text-[#e1c098] flex-shrink-0" />
                                <a href="tel:+18473400338" className="hover:text-[#e1c098]">+1 847-340-0338</a>
                            </div>

                            <div className="flex items-start gap-3">
                                <Mail className="mt-0.5 h-5 w-5 text-[#e1c098] flex-shrink-0" />
                                <a href="mailto:andrew.kubicek@pmvillas.com" className="hover:text-[#e1c098] break-words">
                                    andrew.kubicek@pmvillas.com
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile (sm): centered; soft fade separators; refined contact alignment */}
                <div className="md:hidden">
                    {/* Brand + social */}
                    <div className="text-center">
                        <div className="mb-4 flex justify-center">
                            <Image
                                src="/images/PM-Villas-Logo.png"
                                alt="PM Villas"
                                width={220}
                                height={56}
                                className="h-12 w-auto"
                                priority
                            />
                        </div>
                        <p className="mx-auto max-w-[30ch] text-gray-600 leading-relaxed">
                            Luxury real estate in Punta Mita—expert guidance and curated properties.
                        </p>

                        <div className="mt-5 flex items-center justify-center gap-4">
                            <a
                                href="https://www.instagram.com/pm.villas"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="Instagram"
                                className="grid h-10 w-10 place-items-center rounded-full bg-gray-100 hover:bg-[#e1c098] hover:text-white transition"
                            >
                                <SiInstagram className="h-5 w-5" />
                            </a>
                            <a
                                href="https://www.linkedin.com/company/pm-villas/"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="LinkedIn"
                                className="grid h-10 w-10 place-items-center rounded-full bg-gray-100 hover:bg-[#e1c098] hover:text-white transition"
                            >
                                <SiLinkedin className="h-5 w-5" />
                            </a>
                            <a
                                href="tel:+18473400338"
                                aria-label="Call +1 847-340-0338"
                                className="grid h-10 w-10 place-items-center rounded-full bg-gray-100 hover:bg-[#e1c098] hover:text-white transition"
                            >
                                <Phone className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Fade divider */}
                    <div className="my-8 h-px w-full bg-gradient-to-r from-transparent via-gray-300/60 to-transparent" />

                    {/* Properties */}
                    <section className="text-center">
                        <h3 className="text-lg font-semibold text-gray-900">Properties</h3>
                        <ul className="mt-4 space-y-2">
                            <li><Link href="/properties" className="inline-block px-2 py-1 text-gray-700 hover:text-[#e1c098]">Luxury Villas</Link></li>
                            <li><Link href="/properties" className="inline-block px-2 py-1 text-gray-700 hover:text-[#e1c098]">Oceanfront</Link></li>
                            <li><Link href="/properties" className="inline-block px-2 py-1 text-gray-700 hover:text-[#e1c098]">Golf Course</Link></li>
                            <li><Link href="/properties" className="inline-block px-2 py-1 text-gray-700 hover:text-[#e1c098]">Investment</Link></li>
                        </ul>
                    </section>

                    {/* Fade divider */}
                    <div className="my-8 h-px w-full bg-gradient-to-r from-transparent via-gray-300/60 to-transparent" />

                    {/* Contact — tightened alignment */}
                    <section className="text-center">
                        <h3 className="text-lg font-semibold text-gray-900">Contact</h3>

                        <div className="mt-4 space-y-4 text-gray-700">
                            {/* Address row — tighter spacing */}
                            <div className="mx-auto flex max-w-[36ch] items-start justify-center gap-2 text-center leading-6">
                                <MapPin className="mt-[2px] h-5 w-5 text-[#e1c098] flex-shrink-0" />
                                <a
                                    href="https://maps.google.com/?q=Lagos%20Del%20Mar%2026,%20Punta%20de%20Mita,%20Nayarit,%20Mexico%2063734"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="hover:text-[#e1c098] tracking-tight"
                                >
                                    Lagos Del Mar 26, Punta de Mita, Nayarit, Mexico 63734
                                </a>
                            </div>

                            {/* Phone */}
                            <div className="flex items-center justify-center gap-2 leading-6">
                                <Phone className="h-5 w-5 text-[#e1c098]" />
                                <a href="tel:+18473400338" className="hover:text-[#e1c098] tracking-tight">
                                    +1 847-340-0338
                                </a>
                            </div>

                            {/* Email */}
                            <div className="flex items-center justify-center gap-2 leading-6">
                                <Mail className="h-5 w-5 text-[#e1c098]" />
                                <a
                                    href="mailto:andrew.kubicek@pmvillas.com"
                                    className="hover:text-[#e1c098] break-words tracking-tight"
                                >
                                    andrew.kubicek@pmvillas.com
                                </a>
                            </div>
                        </div>
                    </section>
                </div>

                <div className="mt-10 border-t border-gray-200 pt-6 text-center text-sm text-gray-500">
                    © {new Date().getFullYear()} PM Villas. All rights reserved.
                </div>
            </div>
        </footer>
    )
}
