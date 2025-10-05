// File: src/components/property/PropertyAmenities.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FaUserTie, FaBroom, FaUtensils, FaCar, FaConciergeBell, FaShieldAlt } from 'react-icons/fa'
import { MdSecurity, MdCleaningServices } from 'react-icons/md'
import { GiVacuumCleaner, GiCookingPot } from 'react-icons/gi'
import { BiSpa } from 'react-icons/bi'

type PropertyAmenitiesProps = {
    staffService?: string[]
    investmentHighlights?: string
}

// Helper function to get icon based on service name
function getServiceIcon(service: string) {
    const serviceLower = service.toLowerCase()

    if (serviceLower.includes('concierge')) return FaConciergeBell
    if (serviceLower.includes('security')) return MdSecurity
    if (serviceLower.includes('housekeeping') || serviceLower.includes('cleaning')) return MdCleaningServices
    if (serviceLower.includes('chef') || serviceLower.includes('cook')) return GiCookingPot
    if (serviceLower.includes('driver') || serviceLower.includes('car')) return FaCar
    if (serviceLower.includes('spa') || serviceLower.includes('massage')) return BiSpa
    if (serviceLower.includes('butler') || serviceLower.includes('staff')) return FaUserTie

    // Default icon
    return FaConciergeBell
}

export default function PropertyAmenities({ staffService, investmentHighlights }: PropertyAmenitiesProps) {
    return (
        <>
            {/* Staff Services */}
            {staffService && staffService.length > 0 && (
                <Card className="border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardHeader className="border-b border-gray-100 pb-4">
                        <div className="flex items-center gap-3">
                            <div
                                className="w-1 h-8 rounded-full"
                                style={{ backgroundColor: '#e1c098' }}
                            />
                            <CardTitle className="text-2xl md:text-3xl font-bold text-gray-900">
                                Staff <span style={{ color: '#e1c098' }}>Services</span>
                            </CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {staffService.map((service: string, index: number) => {
                                const Icon = getServiceIcon(service)
                                return (
                                    <div
                                        key={index}
                                        className="flex items-center gap-3 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200 group"
                                    >
                                        <div
                                            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                                            style={{ backgroundColor: 'rgba(225, 192, 152, 0.15)' }}
                                        >
                                            <Icon
                                                className="w-5 h-5"
                                                style={{ color: '#e1c098' }}
                                            />
                                        </div>
                                        <span className="text-sm md:text-base font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                                            {service.replace('-', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
                                        </span>
                                    </div>
                                )
                            })}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Investment Highlights */}
            {investmentHighlights && (
                <Card className="border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardHeader className="border-b border-gray-100 pb-4">
                        <div className="flex items-center gap-3">
                            <div
                                className="w-1 h-8 rounded-full"
                                style={{ backgroundColor: '#e1c098' }}
                            />
                            <CardTitle className="text-2xl md:text-3xl font-bold text-gray-900">
                                Investment <span style={{ color: '#e1c098' }}>Highlights</span>
                            </CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="prose prose-lg max-w-none">
                            <p className="text-gray-700 leading-relaxed text-base md:text-lg whitespace-pre-line">
                                {investmentHighlights}
                            </p>
                        </div>
                    </CardContent>
                </Card>
            )}
        </>
    )
}