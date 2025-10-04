// File: src/components/property/PropertySidebar.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

type PropertySidebarProps = {
    price?: number
}

export default function PropertySidebar({ price }: PropertySidebarProps) {
    return (
        <div className="space-y-8">
            <Card className="sticky top-8">
                <CardHeader>
                    <CardTitle className="text-xl font-bold text-gray-900">
                        Interested in this property?
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="text-3xl font-bold text-emerald-600">
                        ${price?.toLocaleString()}
                    </div>
                    <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white">
                        Schedule Private Tour
                    </Button>
                    <Button variant="outline" className="w-full">
                        Request Information
                    </Button>
                    <div className="border-t pt-4">
                        <div className="text-sm text-gray-600 space-y-1">
                            <p><strong>Contact:</strong> Andrew Kubicek</p>
                            <p><strong>Phone:</strong> +1 847-340-0338</p>
                            <p><strong>Email:</strong> andrew.kubicek@pmvillas.com</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}