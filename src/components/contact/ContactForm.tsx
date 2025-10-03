// File: src/components/contact/ContactForm.tsx
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Send } from 'lucide-react'

type FormData = {
    firstName: string
    lastName: string
    email: string
    phone: string
    inquiryType: string
    propertyType: string
    budget: string
    checkIn: string
    checkOut: string
    guests: string
    message: string
}

type ContactFormProps = {
    heading: string
    subheading: string
}

export default function ContactForm({ heading, subheading }: ContactFormProps) {
    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        inquiryType: '',
        propertyType: '',
        budget: '',
        checkIn: '',
        checkOut: '',
        guests: '',
        message: ''
    })

    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleInputChange = (field: keyof FormData, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1000))

        console.log('Form submitted:', formData)
        alert('Thank you for your inquiry! We will contact you within 24 hours.')

        // Reset form
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            inquiryType: '',
            propertyType: '',
            budget: '',
            checkIn: '',
            checkOut: '',
            guests: '',
            message: ''
        })

        setIsSubmitting(false)
    }

    return (
        <section className="py-16 bg-white">
            <div className="max-w-4xl mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        {heading}
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        {subheading}
                    </p>
                </div>

                <Card>
                    <CardContent className="p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Personal Information */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                                        First Name *
                                    </label>
                                    <input
                                        id="firstName"
                                        type="text"
                                        required
                                        value={formData.firstName}
                                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                        placeholder="Your first name"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                                        Last Name *
                                    </label>
                                    <input
                                        id="lastName"
                                        type="text"
                                        required
                                        value={formData.lastName}
                                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                        placeholder="Your last name"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                        Email Address *
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => handleInputChange('email', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                        placeholder="your.email@example.com"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                        Phone Number
                                    </label>
                                    <input
                                        id="phone"
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => handleInputChange('phone', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                        placeholder="+1 (555) 123-4567"
                                    />
                                </div>
                            </div>

                            {/* Inquiry Type */}
                            <div>
                                <label htmlFor="inquiryType" className="block text-sm font-medium text-gray-700 mb-2">
                                    Type of Inquiry *
                                </label>
                                <select
                                    value={formData.inquiryType}
                                    onChange={(e) => handleInputChange('inquiryType', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                    required
                                >
                                    <option value="">Select inquiry type</option>
                                    <option value="rental">Luxury Villa Rental</option>
                                    <option value="purchase">Real Estate Purchase</option>
                                    <option value="selling">Property Sale</option>
                                    <option value="investment">Investment Property</option>
                                    <option value="concierge">Concierge Services</option>
                                    <option value="market-analysis">Market Analysis</option>
                                    <option value="property-tours">Property Tours</option>
                                    <option value="closing-support">Closing Support</option>
                                    <option value="other">Other Inquiry</option>
                                </select>
                            </div>

                            {/* Conditional Fields */}
                            {(formData.inquiryType === 'rental' || formData.inquiryType === 'purchase') && (
                                <div className="space-y-6 p-4 bg-gray-50 rounded-lg">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700 mb-2">
                                                Property Type
                                            </label>
                                            <select
                                                value={formData.propertyType}
                                                onChange={(e) => handleInputChange('propertyType', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white"
                                            >
                                                <option value="">Select property type</option>
                                                <option value="beachfront-estate">Beachfront Estate</option>
                                                <option value="luxury-villa">Luxury Villa</option>
                                                <option value="vacation-condo">Vacation Condo</option>
                                                <option value="second-home">Second Home</option>
                                                <option value="rental-investment">Rental Investment Property</option>
                                                <option value="golf-course">Golf Course Property</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
                                                Budget Range
                                            </label>
                                            <select
                                                value={formData.budget}
                                                onChange={(e) => handleInputChange('budget', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white"
                                            >
                                                <option value="">Select budget range</option>
                                                {formData.inquiryType === 'rental' ? (
                                                    <>
                                                        <option value="under-5k">Under $5,000/night</option>
                                                        <option value="5k-10k">$5,000 - $10,000/night</option>
                                                        <option value="10k-20k">$10,000 - $20,000/night</option>
                                                        <option value="over-20k">Over $20,000/night</option>
                                                    </>
                                                ) : (
                                                    <>
                                                        <option value="under-1m">Under $1M</option>
                                                        <option value="1m-3m">$1M - $3M</option>
                                                        <option value="3m-5m">$3M - $5M</option>
                                                        <option value="5m-10m">$5M - $10M</option>
                                                        <option value="over-10m">Over $10M</option>
                                                    </>
                                                )}
                                            </select>
                                        </div>
                                    </div>

                                    {formData.inquiryType === 'rental' && (
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            <div>
                                                <label htmlFor="checkIn" className="block text-sm font-medium text-gray-700 mb-2">
                                                    Check-in Date
                                                </label>
                                                <input
                                                    id="checkIn"
                                                    type="date"
                                                    value={formData.checkIn}
                                                    onChange={(e) => handleInputChange('checkIn', e.target.value)}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="checkOut" className="block text-sm font-medium text-gray-700 mb-2">
                                                    Check-out Date
                                                </label>
                                                <input
                                                    id="checkOut"
                                                    type="date"
                                                    value={formData.checkOut}
                                                    onChange={(e) => handleInputChange('checkOut', e.target.value)}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-2">
                                                    Number of Guests
                                                </label>
                                                <select
                                                    value={formData.guests}
                                                    onChange={(e) => handleInputChange('guests', e.target.value)}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white"
                                                >
                                                    <option value="">Guests</option>
                                                    <option value="1-2">1-2 guests</option>
                                                    <option value="3-4">3-4 guests</option>
                                                    <option value="5-8">5-8 guests</option>
                                                    <option value="9-12">9-12 guests</option>
                                                    <option value="13-16">13-16 guests</option>
                                                    <option value="17+">17+ guests</option>
                                                </select>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Message */}
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                    Additional Details
                                </label>
                                <textarea
                                    id="message"
                                    value={formData.message}
                                    onChange={(e) => handleInputChange('message', e.target.value)}
                                    rows={6}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                    placeholder="Tell us about your requirements: preferred neighborhoods (Kupuri, Tau Residences, Lagos del Mar, etc.), specific amenities, view preferences, group size, or timeline..."
                                />
                            </div>

                            {/* Submit Button */}
                            <div className="text-center pt-4">
                                <Button
                                    type="submit"
                                    size="lg"
                                    disabled={isSubmitting}
                                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-12"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="mr-2 h-5 w-5" />
                                            Send Inquiry
                                        </>
                                    )}
                                </Button>
                                <p className="text-sm text-gray-500 mt-4">
                                    We typically respond within 24 hours. For urgent inquiries, please call us directly.
                                </p>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </section>
    )
}