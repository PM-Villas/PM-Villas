// File: src/components/contact/HubSpotForm.tsx
'use client'

import { useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'

export default function HubSpotForm() {
    useEffect(() => {
        // Load HubSpot form script
        const script = document.createElement('script')
        script.src = 'https://js-na2.hsforms.net/forms/embed/243319180.js'
        script.async = true
        document.body.appendChild(script)

        // Handle scroll to form if hash is present
        if (window.location.hash === '#schedule-tour') {
            setTimeout(() => {
                const element = document.querySelector('#schedule-tour')
                if (element) {
                    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
                    const offsetPosition = elementPosition - 100
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    })
                }
            }, 100)
        }

        return () => {
            if (document.body.contains(script)) {
                document.body.removeChild(script)
            }
        }
    }, [])

    return (
        <section id="schedule-tour" className="py-20 bg-gradient-to-b from-gray-50 to-white scroll-mt-24">
            <div className="max-w-4xl mx-auto px-6">
                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Schedule <span style={{ color: '#e1c098' }}>Tour</span>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Fill out the form below and we'll get back to you as soon as possible
                    </p>
                </div>

                <Card className="bg-white border-gray-200 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                    <CardContent className="p-8 md:p-10">
                        <div
                            className="hs-form-frame"
                            data-region="na2"
                            data-form-id="1d638d8e-7273-495f-912b-7e35a8e2b886"
                            data-portal-id="243319180"
                        ></div>
                    </CardContent>
                </Card>
            </div>
        </section>
    )
}