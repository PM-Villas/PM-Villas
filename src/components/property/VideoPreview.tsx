// File: src/components/property/VideoPreview.tsx
import Image from 'next/image'

type VideoPreviewProps = {
    propertyTitle: string
    mainImageUrl?: string
    mainImageAlt?: string
    onOpenVideoModal: () => void
}

export default function VideoPreview({
    propertyTitle,
    mainImageUrl,
    mainImageAlt,
    onOpenVideoModal,
}: VideoPreviewProps) {
    return (
        <div className="relative h-[100vh] md:h-[89vh] lg:h-[74vh] xl:h-[72vh] bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden">
            {/* Main Hero Image Background */}
            <div className="absolute inset-0">
                <Image
                    src={mainImageUrl || '/placeholder.jpg'}
                    alt={mainImageAlt || propertyTitle}
                    fill
                    className="object-cover"
                    priority
                />
                {/* Overlay for better readability */}
                <div className="absolute inset-0 bg-black/40"></div>
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 h-full flex flex-col items-center justify-center p-6 text-center">
                {/* Beautiful Play Button */}
                <button
                    onClick={onOpenVideoModal}
                    className="group relative mb-8 transform transition-all duration-500 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-white/30"
                    aria-label="Play property video"
                >
                    {/* Outer Ring with Pulse Animation */}
                    <div className="absolute inset-0 w-28 h-28 bg-white/20 rounded-full animate-ping"></div>
                    <div className="absolute inset-0 w-28 h-28 bg-white/10 rounded-full animate-pulse"></div>

                    {/* Main Play Button */}
                    <div className="relative w-28 h-28 bg-gradient-to-br from-white to-white/90 rounded-full flex items-center justify-center shadow-2xl group-hover:shadow-white/30 transition-all duration-300">
                        <svg
                            className="w-12 h-12 text-gray-900 ml-1 transform group-hover:scale-110 transition-transform duration-300"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    </div>
                </button>

                {/* Video Title */}
                <div className="max-w-4xl mx-auto text-white space-y-4">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                        {propertyTitle}
                    </h2>
                </div>

                {/* Video Features */}
                <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
                    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white/80">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clipRule="evenodd" />
                        </svg>
                        Full Screen
                    </div>
                    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white/80">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h12a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V8zm6 2a1 1 0 11-2 0 1 1 0 012 0zm4 0a1 1 0 11-2 0 1 1 0 012 0z" clipRule="evenodd" />
                        </svg>
                        Professional Tour
                    </div>
                    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white/80">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                        HD Quality
                    </div>
                </div>
            </div>
        </div>
    )
}