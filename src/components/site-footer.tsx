// src/components/site-footer.tsx
// Updated: All recent changes committed
import Link from 'next/link'
import Image from 'next/image'
import { SiInstagram, SiLinkedin } from 'react-icons/si'
import { Phone } from 'lucide-react'

export default function SiteFooter() {
    return (
        <footer className="border-t border-gray-200 bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">

                {/* Desktop/Tablet (md+): 4 aligned columns */}
                <div className="hidden md:grid md:grid-cols-12 md:gap-x-8 items-start">
                    {/* Col 1 - Logo and Social */}
                    <div className="min-w-0 md:col-span-4">
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
                            Your trusted partner for luxury real estate in Punta Mita. Discover exceptional properties in Mexico&apos;s most prestigious coastal destination.
                        </p>
                        <div className="mt-6 flex gap-4">
                            <a href="https://www.instagram.com/pm.villas" target="_blank" rel="noreferrer" aria-label="Instagram" className="grid h-11 w-11 place-items-center rounded-full bg-gray-100 hover:bg-[#e1c098] hover:text-white transition" title="Instagram">
                                <SiInstagram className="h-5 w-5" />
                            </a>
                            <a href="https://www.linkedin.com/company/pm-villas/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="grid h-11 w-11 place-items-center rounded-full bg-gray-100 hover:bg-[#e1c098] hover:text-white transition" title="LinkedIn">
                                <SiLinkedin className="h-5 w-5" />
                            </a>
                            <a href="tel:+18473400338" aria-label="Call +1 847-340-0338" className="grid h-11 w-11 place-items-center rounded-full bg-gray-100 hover:bg-[#e1c098] hover:text-white transition" title="Call">
                                <Phone className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    <div className="min-w-0 md:col-span-2">
                        <h3 className="mb-4 text-xl font-semibold tracking-tight text-gray-900">Properties</h3>
                        <ul className="space-y-3">
                            <li><Link href="/properties-for-sale" className="block text-gray-600 hover:text-[#e1c098] transition">Luxury Villas</Link></li>
                            <li><Link href="/properties-for-sale" className="block text-gray-600 hover:text-[#e1c098] transition">Oceanfront</Link></li>
                            <li><Link href="/properties-for-sale" className="block text-gray-600 hover:text-[#e1c098] transition">Golf Course</Link></li>
                            <li><Link href="/properties-for-sale" className="block text-gray-600 hover:text-[#e1c098] transition">Investment</Link></li>
                        </ul>
                    </div>

                    <div className="min-w-0 md:col-span-2">
                        <h3 className="mb-4 text-xl font-semibold tracking-tight text-gray-900">Company</h3>
                        <ul className="space-y-3">
                            <li><Link href="/insights" className="block text-gray-600 hover:text-[#e1c098] transition">Insights</Link></li>
                            <li><Link href="/faq" className="block text-gray-600 hover:text-[#e1c098] transition">FAQ</Link></li>
                            <li><Link href="/contact" className="block text-gray-600 hover:text-[#e1c098] transition">Contact Us</Link></li>
                            <li><Link href="/contact" className="block text-gray-600 hover:text-[#e1c098] transition">Schedule Consultation</Link></li>
                        </ul>
                    </div>

                    <div className="min-w-0 md:col-span-4">
                        <h3 className="mb-4 text-xl font-semibold tracking-tight text-gray-900">Contact</h3>
                        <div className="space-y-4 text-gray-600">
                            <div>
                                <a href="https://maps.google.com/?q=Lagos%20Del%20Mar%2026,%20Punta%20de%20Mita,%20Nayarit,%20Mexico%2063734" target="_blank" rel="noreferrer" className="hover:text-[#e1c098] leading-relaxed break-words">
                                    Lagos Del Mar 26, Punta de Mita,<br />Nayarit, Mexico 63734
                                </a>
                            </div>
                            <div>
                                <a href="tel:+18473400338" className="hover:text-[#e1c098]">+1 847-340-0338</a>
                            </div>
                            <div>
                                <a href="mailto:andrew.kubicek@pmvillas.com" className="hover:text-[#e1c098] break-words">andrew.kubicek@pmvillas.com</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="md:hidden">
                    <div className="text-center">
                        <div className="mb-4 flex justify-center">
                            <Image src="/images/PM-Villas-Logo.png" alt="PM Villas" width={220} height={56} className="h-12 w-auto" priority />
                        </div>
                        <p className="mx-auto max-w-[30ch] text-gray-600 leading-relaxed">
                            Luxury real estate in Punta Mita—expert guidance and curated properties.
                        </p>
                        <div className="mt-5 flex items-center justify-center gap-4">
                            <a href="https://www.instagram.com/pm.villas" target="_blank" rel="noreferrer" aria-label="Instagram" className="grid h-10 w-10 place-items-center rounded-full bg-gray-100 hover:bg-[#e1c098] hover:text-white transition">
                                <SiInstagram className="h-5 w-5" />
                            </a>
                            <a href="https://www.linkedin.com/company/pm-villas/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="grid h-10 w-10 place-items-center rounded-full bg-gray-100 hover:bg-[#e1c098] hover:text-white transition">
                                <SiLinkedin className="h-5 w-5" />
                            </a>
                            <a href="tel:+18473400338" aria-label="Call +1 847-340-0338" className="grid h-10 w-10 place-items-center rounded-full bg-gray-100 hover:bg-[#e1c098] hover:text-white transition">
                                <Phone className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    <div className="my-8 h-px w-full bg-gradient-to-r from-transparent via-gray-300/60 to-transparent" />

                    <section className="text-center">
                        <h3 className="text-lg font-semibold text-gray-900">Properties</h3>
                        <ul className="mt-4 space-y-2">
                            <li><Link href="/properties-for-sale" className="inline-block px-2 py-1 text-gray-700 hover:text-[#e1c098]">Luxury Villas</Link></li>
                            <li><Link href="/properties-for-sale" className="inline-block px-2 py-1 text-gray-700 hover:text-[#e1c098]">Oceanfront</Link></li>
                            <li><Link href="/properties-for-sale" className="inline-block px-2 py-1 text-gray-700 hover:text-[#e1c098]">Golf Course</Link></li>
                            <li><Link href="/properties-for-sale" className="inline-block px-2 py-1 text-gray-700 hover:text-[#e1c098]">Investment</Link></li>
                        </ul>
                    </section>

                    <div className="my-8 h-px w-full bg-gradient-to-r from-transparent via-gray-300/60 to-transparent" />

                    <section className="text-center">
                        <h3 className="text-lg font-semibold text-gray-900">Company</h3>
                        <ul className="mt-4 space-y-2">
                            <li><Link href="/insights" className="inline-block px-2 py-1 text-gray-700 hover:text-[#e1c098]">Insights</Link></li>
                            <li><Link href="/faq" className="inline-block px-2 py-1 text-gray-700 hover:text-[#e1c098]">FAQ</Link></li>
                            <li><Link href="/contact" className="inline-block px-2 py-1 text-gray-700 hover:text-[#e1c098]">Contact Us</Link></li>
                            <li><Link href="/contact" className="inline-block px-2 py-1 text-gray-700 hover:text-[#e1c098]">Schedule Consultation</Link></li>
                        </ul>
                    </section>

                    <div className="my-8 h-px w-full bg-gradient-to-r from-transparent via-gray-300/60 to-transparent" />

                    <section className="text-center">
                        <h3 className="text-lg font-semibold text-gray-900">Contact</h3>
                        <div className="mt-4 space-y-4 text-gray-700">
                            <div className="mx-auto max-w-[36ch] text-center leading-6">
                                <a href="https://maps.google.com/?q=Lagos%20Del%20Mar%2026,%20Punta%20de%20Mita,%20Nayarit,%20Mexico%2063734" target="_blank" rel="noreferrer" className="hover:text-[#e1c098] tracking-tight">
                                    Lagos Del Mar 26, Punta de Mita, Nayarit, Mexico 63734
                                </a>
                            </div>
                            <div className="text-center leading-6">
                                <a href="tel:+18473400338" className="hover:text-[#e1c098] tracking-tight">+1 847-340-0338</a>
                            </div>
                            <div className="text-center leading-6">
                                <a href="mailto:andrew.kubicek@pmvillas.com" className="hover:text-[#e1c098] break-words tracking-tight">andrew.kubicek@pmvillas.com</a>
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