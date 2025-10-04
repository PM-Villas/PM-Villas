// File: src/components/property/PropertySidebar.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

type PropertySidebarProps = {
    price?: number
}

export default function PropertySidebar({ price }: PropertySidebarProps) {
    return (
        <div className="space-y-8">
            <Card className="sticky top-8 border-gray-200 shadow-xl">
                <CardHeader className="pb-4">
                    <CardTitle className="text-2xl font-bold text-gray-900">
                        Interested in this{' '}
                        <span style={{ color: '#e1c098' }}>property?</span>
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="text-4xl font-bold text-gray-900 mb-6">
                        ${price?.toLocaleString()}
                    </div>

                    <a href="/contact#schedule-tour" className="block">
                        <Button
                            className="w-full text-white hover:scale-105 transition-all duration-300 shadow-lg"
                            style={{
                                backgroundColor: '#e1c098',
                                borderColor: '#e1c098'
                            }}
                            size="lg"
                        >
                            Schedule Private Tour
                        </Button>
                    </a>

                    <a href="mailto:andrew.kubicek@pmvillas.com?subject=Property Inquiry" className="block">
                        <Button
                            variant="outline"
                            className="w-full border-2 hover:bg-gray-50 transition-all duration-300"
                            size="lg"
                        >
                            Request Information
                        </Button>
                    </a>

                    <div className="border-t border-gray-200 pt-6 mt-6">
                        <div className="text-sm text-gray-600 space-y-2">
                            <p className="flex items-center gap-2">
                                <span className="font-semibold text-gray-900">Contact:</span>
                                Andrew Kubicek
                            </p>
                            <p className="flex items-center gap-2">
                                <span className="font-semibold text-gray-900">Phone:</span>
                                <a
                                    href="tel:+18473400338"
                                    className="hover:text-gray-900 transition-colors"
                                    style={{ color: '#e1c098' }}
                                >
                                    +1 847-340-0338
                                </a>
                            </p>
                            <p className="flex items-center gap-2">
                                <span className="font-semibold text-gray-900">Email:</span>
                                <a
                                    href="mailto:andrew.kubicek@pmvillas.com"
                                    className="hover:text-gray-900 transition-colors break-all"
                                    style={{ color: '#e1c098' }}
                                >
                                    andrew.kubicek@pmvillas.com
                                </a>
                            </p>
                        </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 mt-4">
                        <p className="text-xs text-gray-600 text-center">
                            Your trusted partner for luxury real estate in Punta Mita
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}