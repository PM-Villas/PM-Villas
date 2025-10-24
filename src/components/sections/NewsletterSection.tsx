// File: src/components/sections/NewsletterSection.tsx
'use client'
import { useState, FormEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function NewsletterSection() {
    const [email, setEmail] = useState('')
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
    const [message, setMessage] = useState('')

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!email || !email.includes('@')) {
            setStatus('error')
            setMessage('Please enter a valid email address')
            return
        }

        setStatus('loading')

        // TODO: Implement actual newsletter subscription logic
        // For now, simulate an API call
        try {
            await new Promise(resolve => setTimeout(resolve, 1000))

            setStatus('success')
            setMessage('Thank you for subscribing! Check your email for confirmation.')
            setEmail('')

            // Reset status after 5 seconds
            setTimeout(() => {
                setStatus('idle')
                setMessage('')
            }, 5000)
        } catch (error) {
            setStatus('error')
            setMessage('Something went wrong. Please try again.')
        }
    }

    return (
        <section className="py-16 md:py-24 bg-gradient-to-br from-gray-900 to-gray-800">
            <div className="max-w-4xl mx-auto text-center px-4 sm:px-6">
                {/* Icon or decorative element */}
                <div className="mb-6 flex justify-center">
                    <svg
                        className="w-12 h-12 md:w-16 md:h-16 text-[#e1c098]"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                </div>

                {/* Heading */}
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 md:mb-6">
                    Stay Updated
                </h2>

                {/* Subtitle */}
                <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 md:mb-10 max-w-2xl mx-auto">
                    Subscribe to our newsletter for exclusive property listings, market insights, and luxury lifestyle content from Punta Mita.
                </p>

                {/* Newsletter Form */}
                <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4">
                        <Input
                            type="email"
                            placeholder="Enter your email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={status === 'loading' || status === 'success'}
                            className="flex-1 h-12 sm:h-14 text-base px-4 sm:px-6 rounded-full bg-white/95 border-2 border-transparent focus:border-[#e1c098] focus:ring-0 focus:ring-offset-0 placeholder:text-gray-500"
                        />
                        <Button
                            type="submit"
                            size="lg"
                            disabled={status === 'loading' || status === 'success'}
                            className="w-full sm:w-auto text-white px-6 sm:px-8 py-3 h-12 sm:h-14 text-base sm:text-lg rounded-full shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                            style={{
                                backgroundColor: '#e1c098',
                                borderColor: '#e1c098'
                            }}
                        >
                            {status === 'loading' ? 'Subscribing...' : status === 'success' ? 'Subscribed!' : 'Subscribe'}
                        </Button>
                    </div>

                    {/* Status Messages */}
                    {message && (
                        <div className={`text-sm sm:text-base mt-3 animate-fade-in ${
                            status === 'success' ? 'text-green-400' : 'text-red-400'
                        }`}>
                            {message}
                        </div>
                    )}
                </form>

                {/* Privacy note */}
                <p className="text-xs sm:text-sm text-gray-400 mt-6 md:mt-8">
                    We respect your privacy. Unsubscribe at any time.
                </p>
            </div>
        </section>
    )
}
