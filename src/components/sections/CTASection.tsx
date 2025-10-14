// src/components/sections/CTASection.tsx
import { Button } from '@/components/ui/button'

interface CTASectionProps {
    title?: string;
    subtitle?: string;
    primaryButtonText?: string;
    primaryButtonHref?: string;
    secondaryButtonText?: string;
    secondaryButtonHref?: string;
}

export default function CTASection({
    title = "Ready to Find Your Dream Home?",
    subtitle = "Let our experts guide you through Punta Mita's most exclusive properties",
    primaryButtonText = "Schedule Consultation",
    primaryButtonHref = "/contact#schedule-tour",
    secondaryButtonText = "Browse All Properties",
    secondaryButtonHref = "/properties-for-sale"
}: CTASectionProps) {
    return (
        <section className="py-24 bg-gray-900">
            <div className="max-w-4xl mx-auto text-center px-6">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                    {title}
                </h2>
                <p className="text-xl text-gray-300 mb-8">
                    {subtitle}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                        size="lg"
                        className="text-white px-8 py-4 text-base rounded-full shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
                        style={{
                            backgroundColor: '#e1c098',
                            borderColor: '#e1c098'
                        }}
                    >
                        <a href={primaryButtonHref}>{primaryButtonText}</a>
                    </Button>
                    <Button
                        size="lg"
                        className="text-gray-900 px-8 py-4 text-base rounded-full shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
                        style={{
                            backgroundColor: 'white',
                            borderColor: 'white'
                        }}
                    >
                        <a href={secondaryButtonHref}>{secondaryButtonText}</a>
                    </Button>
                </div>
            </div>
        </section>
    )
}