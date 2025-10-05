// src/components/site-footer.tsx
import Link from 'next/link'
import Image from 'next/image'
import { SiInstagram, SiLinkedin } from 'react-icons/si'
import { Phone, Mail, MapPin } from 'lucide-react'

export default function SiteFooter() {
    return (
        <footer className="bg-white border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 sm:py-14 lg:py-16">

                {/* Logo & Description Section */}
                <div className="text-center lg:text-left mb-10 lg:mb-12">
                    <div className="flex justify-center lg:justify-start mb-6">
                        <Image
                            src="/images/PM-Villas-Logo.png"
                            alt="PM Villas"
                            width={280}
                            height={75}
                            className="h-14 sm:h-16 w-auto"
                        />
                    </div>
                    <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                        Your trusted partner for luxury real estate in Punta Mita. Discover exceptional properties in Mexico&apos;s most prestigious coastal destination.
                    </p>
                </div>

                {/* Social Icons - Centered on mobile */}
                <div className="flex justify-center lg:justify-start space-x-4 mb-12 lg:mb-14">
                    <a
                        href="https://www.instagram.com/pm.villas"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram"
                        className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-[#e1c098] hover:text-white transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md"
                        title="Instagram"
                    >
                        <SiInstagram className="w-5 h-5" />
                    </a>

                    <a
                        href="https://www.linkedin.com/company/pm-villas/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                        className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-[#e1c098] hover:text-white transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md"
                        title="LinkedIn"
                    >
                        <SiLinkedin className="w-5 h-5" />
                    </a>

                    <a
                        href="tel:+18473400338"
                        aria-label="Call +1 847-340-0338"
                        className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-[#e1c098] hover:text-white transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md"
                        title="Call"
                    >
                        <Phone className="w-5 h-5" />
                    </a>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12 mb-12">

                    {/* Properties Section */}
                    <div>
                        <h3 className="font-bold text-gray-900 text-lg sm:text-xl mb-5 tracking-tight">
                            Properties
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link
                                    href="/properties"
                                    className="text-gray-600 hover:text-[#e1c098] transition-colors text-base inline-block"
                                >
                                    Luxury Villas
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/properties"
                                    className="text-gray-600 hover:text-[#e1c098] transition-colors text-base inline-block"
                                >
                                    Oceanfront
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/properties"
                                    className="text-gray-600 hover:text-[#e1c098] transition-colors text-base inline-block"
                                >
                                    Golf Course
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/properties"
                                    className="text-gray-600 hover:text-[#e1c098] transition-colors text-base inline-block"
                                >
                                    Investment
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Section */}
                    <div className="sm:col-span-2 lg:col-span-2">
                        <h3 className="font-bold text-gray-900 text-lg sm:text-xl mb-5 tracking-tight">
                            Contact
                        </h3>

                        <div className="space-y-4">
                            {/* Address */}
                            <div className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-[#e1c098] flex-shrink-0 mt-0.5" />
                                <a
                                    href="https://maps.google.com/?q=Lagos%20Del%20Mar%2026,%20Punta%20de%20Mita,%20Nayarit,%20Mexico%2063734"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-600 hover:text-[#e1c098] transition-colors text-base leading-relaxed"
                                    aria-label="Open address in Google Maps"
                                >
                                    Lagos Del Mar 26, Punta de Mita,<br />
                                    Nayarit, Mexico 63734
                                </a>
                            </div>

                            {/* Phone */}
                            <div className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-[#e1c098] flex-shrink-0" />
                                <a
                                    href="tel:+18473400338"
                                    className="text-gray-600 hover:text-[#e1c098] transition-colors text-base"
                                    aria-label="Call +1 847-340-0338"
                                >
                                    +1 847-340-0338
                                </a>
                            </div>

                            {/* Email */}
                            <div className="flex items-start gap-3">
                                <Mail className="w-5 h-5 text-[#e1c098] flex-shrink-0 mt-0.5" />
                                <a
                                    href="mailto:andrew.kubicek@pmvillas.com"
                                    className="text-gray-600 hover:text-[#e1c098] transition-colors text-base break-words"
                                    aria-label="Email andrew.kubicek@pmvillas.com"
                                >
                                    andrew.kubicek@pmvillas.com
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Copyright - Bottom */}
                <div className="border-t border-gray-200 pt-8 text-center">
                    <p className="text-gray-500 text-sm">
                        &copy; {new Date().getFullYear()} PM Villas. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}