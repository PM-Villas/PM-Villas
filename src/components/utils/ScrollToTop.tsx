// File: src/components/utils/ScrollToTop.tsx
'use client'
import { useEffect } from 'react'

export default function ScrollToTop() {
    useEffect(() => {
        // Scroll to top on page load/refresh
        window.scrollTo(0, 0)

        // Also handle browser back/forward navigation
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual'
        }
    }, [])

    return null
}
