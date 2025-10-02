// File: src/app/contact/page.tsx
"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Phone, Mail, Clock, Send, MessageSquare } from 'lucide-react';

const ContactUs = () => {
    const [formData, setFormData] = useState({
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
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1000));

        console.log('Form submitted:', formData);
        alert('Thank you for your inquiry! We will contact you within 24 hours.');

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
        });

        setIsSubmitting(false);
    };

    const contactInfo = [
        {
            icon: MapPin,
            title: "Visit Our Office",
            content: "Lagos Del Mar 26, Punta de Mita, Nayarit, Mexico 63734",
            action: "Get Directions",
            link: "https://maps.google.com/?q=Lagos+Del+Mar+26+Punta+de+Mita"
        },
        {
            icon: Phone,
            title: "Call Us",
            content: "+1 847-340-0338",
            action: "Call Now",
            link: "tel:+18473400338"
        },
        {
            icon: Mail,
            title: "Email Us",
            content: "andrew.kubicek@pmvillas.com",
            action: "Send Email",
            link: "mailto:andrew.kubicek@pmvillas.com"
        },
        {
            icon: Clock,
            title: "Office Hours",
            content: "Monday - Sunday: 8:00 AM - 8:00 PM (CST)",
            action: "Schedule Tour"
        }
    ];

    return (
        <main className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative h-[500px] md:h-[600px] bg-cover bg-no-repeat" style={{
                backgroundImage: 'url(https://pmvillas.com/wp-content/uploads/2024/11/565F684A-F251-43F0-BD89-F2B05ED4A2CF_1_105_c.jpeg)',
                backgroundPosition: 'center 60%'
            }}>
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="relative h-full flex items-center justify-center">
                    <div className="text-center text-white">
                        <h1 className="text-5xl md:text-6xl font-bold">
                            Who We Are?
                        </h1>
                    </div>
                </div>
            </section>

            {/* Services Overview Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Your Local Punta Mita Experts
                        </h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            We understand every neighborhood and community — from Kupuri to Tau Residences, Lagos del Mar, Las Palmas, Porta Fortuna, and beyond. Our local presence means we know the owners, amenities, view corridors, and even sunset angles.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                        {/* Luxury Villa Rentals */}
                        <Card className="hover:shadow-lg transition-shadow duration-300">
                            <CardContent className="p-6">
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">Luxury Villa Rentals</h3>
                                <ul className="space-y-2 text-gray-600 text-sm mb-4">
                                    <li>• Personalized Villa Matching</li>
                                    <li>• Direct Owner Access</li>
                                    <li>• Concierge Services</li>
                                    <li>• On-Call Support</li>
                                </ul>
                                <p className="text-sm text-gray-500">
                                    Hand-selected luxury villas, condos, and estates carefully vetted for quality and guest experience.
                                </p>
                            </CardContent>
                        </Card>

                        {/* Real Estate Sales */}
                        <Card className="hover:shadow-lg transition-shadow duration-300">
                            <CardContent className="p-6">
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">Real Estate Sales</h3>
                                <ul className="space-y-2 text-gray-600 text-sm mb-4">
                                    <li>• Market Analysis</li>
                                    <li>• Private Property Tours</li>
                                    <li>• Negotiation Support</li>
                                    <li>• Closing Support</li>
                                </ul>
                                <p className="text-sm text-gray-500">
                                    Expert guidance for vacation condos, second homes, and rental investment properties.
                                </p>
                            </CardContent>
                        </Card>

                        {/* Why Choose PM Villas */}
                        <Card className="hover:shadow-lg transition-shadow duration-300">
                            <CardContent className="p-6">
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">Why Choose PM Villas</h3>
                                <ul className="space-y-2 text-gray-600 text-sm mb-4">
                                    <li>• Local Knowledge</li>
                                    <li>• Direct Relationships</li>
                                    <li>• End-to-End Service</li>
                                    <li>• Fair, Transparent Pricing</li>
                                    <li>• Bicultural Advantage</li>
                                </ul>
                                <p className="text-sm text-gray-500">
                                    Years of living and working in Punta Mita with English and Spanish fluency.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Contact Form Section */}
            <section className="py-16 bg-white">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Tell Us About Your Needs
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Whether you're buying, selling, or visiting - we understand every neighborhood from Kupuri to Las Palmas, Porta Fortuna, and beyond.
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

            {/* Contact Information Cards */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Get In Touch
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            From luxury villa rentals to real estate sales and investment opportunities - we're your trusted local experts in Mexico's most prestigious coastal destination.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {contactInfo.map((info, index) => (
                            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-center w-12 h-12 bg-emerald-100 rounded-lg mb-4">
                                        <info.icon className="h-6 w-6 text-emerald-600" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{info.title}</h3>
                                    <p className="text-gray-600 mb-4 text-sm">{info.content}</p>
                                    {info.link ? (
                                        <a
                                            href={info.link}
                                            target={info.link.startsWith('http') ? '_blank' : '_self'}
                                            rel={info.link.startsWith('http') ? 'noopener noreferrer' : ''}
                                        >
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="w-full border-emerald-200 text-emerald-600 hover:bg-emerald-50"
                                            >
                                                {info.action}
                                            </Button>
                                        </a>
                                    ) : (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="w-full border-emerald-200 text-emerald-600 hover:bg-emerald-50"
                                        >
                                            {info.action}
                                        </Button>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
};

export default ContactUs;