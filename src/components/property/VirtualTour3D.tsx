// File: src/components/property/VirtualTour3D.tsx
import { Button } from '@/components/ui/button'

export default function VirtualTour3D() {
    return (
        <div className="relative h-[100vh] md:h-[89vh] lg:h-[74vh] xl:h-[72vh] bg-gray-900 flex items-center justify-center">
            <div className="text-center text-white space-y-6">
                <div className="w-24 h-24 mx-auto bg-white/10 rounded-full flex items-center justify-center">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                    </svg>
                </div>
                <h3 className="text-2xl font-bold">3D Virtual Tour</h3>
                <p className="text-gray-300 max-w-md">
                    Experience this luxury villa with our immersive 3D virtual tour
                </p>
                <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white">
                    Launch 3D Tour
                </Button>
                <div className="text-sm text-gray-400">
                    Interactive • Full HD • Mobile Compatible
                </div>
            </div>
        </div>
    )
}