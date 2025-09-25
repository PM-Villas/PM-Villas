// src/components/site-footer.tsx
import Link from 'next/link'

export default function SiteFooter() {
    return (
        <footer className="bg-white py-16 border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="md:col-span-2">
                        <div className="text-2xl font-bold text-gray-900 mb-4">PM VILLAS</div>
                        <p className="text-gray-600 mb-6 max-w-md">
                            Your trusted partner for luxury real estate in Punta Mita. Discover exceptional properties in Mexico's most prestigious coastal destination.
                        </p>
                        <div className="flex space-x-4">
                            <a href="https://www.instagram.com/pm.villas" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-colors cursor-pointer" aria-label="Instagram">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 6c-3.403 0-6.162 2.759-6.162 6.162S8.597 18.324 12 18.324s6.162-2.759 6.162-6.162S15.403 6 12 6zm6.406-1.845a1.44 1.44 0 110 2.88 1.44 1.44 0 010-2.88z" /></svg>
                            </a>
                            <a href="https://www.linkedin.com/company/pm-villas/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-colors cursor-pointer" aria-label="LinkedIn">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433A2.063 2.063 0 113.274 5.37a2.063 2.063 0 012.063 2.063zM7.119 20.452H3.555V9h3.564v11.452z" /></svg>
                            </a>
                            <a href="tel:+18473400338" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-colors cursor-pointer" aria-label="Call">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
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
