// src/components/sections/StatsSection.tsx

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
        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {statsData.map((stat, index) => (
                        <div key={index} className="text-center">
                            <div className="text-4xl font-bold text-gray-900 mb-2">
                                {stat.value}
                            </div>
                            <div className="text-gray-600">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}