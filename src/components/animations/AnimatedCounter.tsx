// File: src/components/animations/AnimatedCounter.tsx
'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'

interface AnimatedCounterProps {
    value: string
    className?: string
}

export default function AnimatedCounter({ value, className = '' }: AnimatedCounterProps) {
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once: true, amount: 0.5 })
    const [displayValue, setDisplayValue] = useState(value)

    // Extract number from string (e.g., "100+" -> 100, "$40M+" -> 40)
    const extractNumber = (str: string): number => {
        const match = str.match(/(\d+\.?\d*)/)
        return match ? parseFloat(match[1]) : 0
    }

    const targetNumber = extractNumber(value)
    const motionValue = useMotionValue(0)
    const springValue = useSpring(motionValue, {
        damping: 30,
        stiffness: 150
    })

    useEffect(() => {
        if (isInView) {
            motionValue.set(targetNumber)
        }
    }, [isInView, targetNumber, motionValue])

    useEffect(() => {
        const unsubscribe = springValue.on('change', (latest) => {
            // Format the number back to the original format
            // Use Math.round instead of Math.floor to avoid pause at final digit
            const formatted = Math.round(latest)

            if (value.includes('$') && value.includes('M')) {
                setDisplayValue(`$${formatted}M${value.includes('+') ? '+' : ''}`)
            } else if (value.includes('%')) {
                setDisplayValue(`${formatted}%`)
            } else if (value.includes('+')) {
                setDisplayValue(`${formatted}+`)
            } else {
                setDisplayValue(formatted.toString())
            }
        })

        return () => unsubscribe()
    }, [springValue, value])

    return (
        <motion.div
            ref={ref}
            className={className}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
        >
            {displayValue}
        </motion.div>
    )
}
