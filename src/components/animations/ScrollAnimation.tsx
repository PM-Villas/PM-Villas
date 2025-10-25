// File: src/components/animations/ScrollAnimation.tsx
'use client'
import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface ScrollAnimationProps {
    children: ReactNode
    delay?: number
    direction?: 'up' | 'down' | 'left' | 'right'
    duration?: number
    className?: string
}

export default function ScrollAnimation({
    children,
    delay = 0,
    direction = 'up',
    duration = 0.6,
    className = ''
}: ScrollAnimationProps) {
    const directionOffset = {
        up: { y: 40 },
        down: { y: -40 },
        left: { x: 40 },
        right: { x: -40 }
    }

    return (
        <motion.div
            className={className}
            initial={{
                opacity: 0,
                ...directionOffset[direction]
            }}
            whileInView={{
                opacity: 1,
                x: 0,
                y: 0
            }}
            viewport={{
                once: true,
                amount: 0.2
            }}
            transition={{
                duration,
                delay,
                ease: [0.25, 0.4, 0.25, 1]
            }}
        >
            {children}
        </motion.div>
    )
}
