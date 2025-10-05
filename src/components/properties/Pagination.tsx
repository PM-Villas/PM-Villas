// src/components/properties/Pagination.tsx
'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationProps {
    currentPage: number
    totalPages: number
    hasMore: boolean
}

export default function Pagination({ currentPage, totalPages, hasMore }: PaginationProps) {
    const searchParams = useSearchParams()

    const createPageUrl = (page: number) => {
        const params = new URLSearchParams(searchParams.toString())
        if (page === 1) {
            params.delete('page')
        } else {
            params.set('page', String(page))
        }
        const queryString = params.toString()
        return queryString ? `?${queryString}` : ''
    }

    const getVisiblePages = () => {
        const delta = 2 // Pages to show on each side of current
        const pages: (number | 'ellipsis')[] = []

        for (let i = 1; i <= totalPages; i++) {
            if (
                i === 1 || // Always show first page
                i === totalPages || // Always show last page
                (i >= currentPage - delta && i <= currentPage + delta) // Show pages around current
            ) {
                pages.push(i)
            } else if (pages[pages.length - 1] !== 'ellipsis') {
                pages.push('ellipsis')
            }
        }

        return pages
    }

    if (totalPages <= 1) return null

    const visiblePages = getVisiblePages()

    return (
        <div className="flex items-center justify-center gap-2 py-8">
            {/* Previous Button */}
            <Link href={createPageUrl(currentPage - 1)} aria-disabled={currentPage === 1}>
                <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === 1}
                    className="gap-1"
                >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                </Button>
            </Link>

            {/* Page Numbers */}
            <div className="flex items-center gap-1">
                {visiblePages.map((page, idx) => {
                    if (page === 'ellipsis') {
                        return (
                            <span key={`ellipsis-${idx}`} className="px-2 text-gray-400">
                                ...
                            </span>
                        )
                    }

                    const isActive = page === currentPage

                    return (
                        <Link key={page} href={createPageUrl(page)}>
                            <Button
                                variant={isActive ? 'default' : 'outline'}
                                size="sm"
                                className={`min-w-[40px] ${isActive
                                    ? 'bg-emerald-600 hover:bg-emerald-700'
                                    : ''
                                    }`}
                            >
                                {page}
                            </Button>
                        </Link>
                    )
                })}
            </div>

            {/* Next Button */}
            <Link href={createPageUrl(currentPage + 1)} aria-disabled={!hasMore}>
                <Button
                    variant="outline"
                    size="sm"
                    disabled={!hasMore}
                    className="gap-1"
                >
                    Next
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </Link>
        </div>
    )
}