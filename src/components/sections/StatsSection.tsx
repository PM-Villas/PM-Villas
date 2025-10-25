// src/components/sections/StatsSection.tsx
'use client'
import AnimatedCounter from '@/components/animations/AnimatedCounter'
import ScrollAnimation from '@/components/animations/ScrollAnimation'

interface StatItem {
    value: string;
    label: string;
}

const statsData: StatItem[] = [
    {
        value: "100+",
        label: "Luxury Properties"
    },
    {
        value: "$40M+",
        label: "Properties Sold"
    },
    {
        value: "6+",
        label: "Years Experience"
    },
    {
        value: "100%",
        label: "Client Satisfaction"
    }
];

export default function StatsSection() {
    return (
        <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12">
                    {statsData.map((stat, index) => (
                        <ScrollAnimation
                            key={index}
                            delay={index * 0.1}
                            className="text-center p-6 rounded-lg hover:bg-white transition-all duration-300 hover:shadow-lg"
                        >
                            <div style={{ color: '#e1c098' }}>
                                <AnimatedCounter
                                    value={stat.value}
                                    className="text-4xl sm:text-5xl md:text-6xl font-bold mb-3 sm:mb-4"
                                />
                            </div>
                            <div className="text-base sm:text-lg text-gray-600 font-medium">
                                {stat.label}
                            </div>
                        </ScrollAnimation>
                    ))}
                </div>
            </div>
        </section>
    )
}