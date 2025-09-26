// src/components/site-footer.tsx
import Link from 'next/link'
import { SiInstagram, SiLinkedin } from 'react-icons/si'
import { Phone } from 'lucide-react'

export default function SiteFooter() {
    return (
        <footer className="bg-white py-16 border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="md:col-span-2">
                        <div className="text-2xl font-bold text-gray-900 mb-4">PM VILLAS</div>
                        <p className="text-gray-600 mb-6 max-w-md">
                            Your trusted partner for luxury real estate in Punta Mita. Discover exceptional properties in Mexico&apos;s most prestigious coastal destination.
                        </p>

                        <div className="flex space-x-4">
                            <a
                                href="https://www.instagram.com/pm.villas"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Instagram"
                                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-colors cursor-pointer"
                                title="Instagram"
                            >
                                <SiInstagram className="w-5 h-5" />
                            </a>

                            <a
                                href="https://www.linkedin.com/company/pm-villas/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="LinkedIn"
                                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-colors cursor-pointer"
                                title="LinkedIn"
                            >
                                <SiLinkedin className="w-5 h-5" />
                            </a>

                            <a
                                href="tel:+18473400338"
                                aria-label="Call +1 847-340-0338"
                                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-colors cursor-pointer"
                                title="Call"
                            >
                                <Phone className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-900 mb-4">Properties</h3>
                        <ul className="space-y-2 text-gray-600">
                            <li><Link href="#" className="hover:text-emerald-600 transition-colors">Luxury Villas</Link></li>
                            <li><Link href="#" className="hover:text-emerald-600 transition-colors">Oceanfront</Link></li>
                            <li><Link href="#" className="hover:text-emerald-600 transition-colors">Golf Course</Link></li>
                            <li><Link href="#" className="hover:text-emerald-600 transition-colors">Investment</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-900 mb-4">Contact</h3>
                        <ul className="space-y-2 text-gray-600">
                            <li>
                                <a
                                    href="https://maps.google.com/?q=Lagos%20Del%20Mar%2026,%20Punta%20de%20Mita,%20Nayarit,%20Mexico%2063734"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-emerald-600 transition-colors"
                                    aria-label="Open address in Google Maps"
                                >
                                    Lagos Del Mar 26, Punta de Mita,
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://maps.google.com/?q=Lagos%20Del%20Mar%2026,%20Punta%20de%20Mita,%20Nayarit,%20Mexico%2063734"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-emerald-600 transition-colors"
                                    aria-label="Open address in Google Maps"
                                >
                                    Nayarit, Mexico 63734
                                </a>
                            </li>
                            <li>
                                <a href="tel:+18473400338" className="hover:text-emerald-600 transition-colors" aria-label="Call +1 847-340-0338">
                                    +1 847-340-0338
                                </a>
                            </li>
                            <li>
                                <a href="mailto:andrew.kubicek@pmvillas.com" className="hover:text-emerald-600 transition-colors" aria-label="Email andrew.kubicek@pmvillas.com">
                                    andrew.kubicek@pmvillas.com
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-200 mt-12 pt-8 text-center text-gray-600">
                    <p>&copy; 2025 PM Villas. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
