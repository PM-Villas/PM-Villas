// src/components/faq/FAQAccordion.tsx
'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface FAQ {
    question: string
    answer: string
}

function FAQItem({ faq }: { faq: FAQ }) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="border-b border-gray-200 last:border-b-0">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-6 px-6 flex items-center justify-between text-left hover:bg-gray-50 transition-colors group"
                aria-expanded={isOpen}
            >
                <span className="text-lg font-semibold text-gray-900 pr-8 transition-colors" style={{ color: isOpen ? '#e1c098' : undefined }}>
                    {faq.question}
                </span>
                <ChevronDown
                    className={`w-6 h-6 flex-shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                    }`}
                    style={{ color: '#e1c098' }}
                />
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
            >
                <div className="px-6 pb-6 text-gray-700 leading-relaxed">
                    {faq.answer}
                </div>
            </div>
        </div>
    )
}

export default function FAQAccordion({ faqs }: { faqs: FAQ[] }) {
    return (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            {faqs.map((faq, index) => (
                <FAQItem key={index} faq={faq} />
            ))}
        </div>
    )
}
