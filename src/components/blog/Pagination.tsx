// File: src/components/blog/Pagination.tsx
import Link from 'next/link'

export type PaginationProps = {
    basePath: string
    page: number
    totalPages: number
}

function buildHref(basePath: string, page: number) {
    return page <= 1 ? `${basePath}` : `${basePath}/page/${page}`
}

function getPageItems(page: number, totalPages: number) {
    const items: Array<number | '…'> = []
    const window = 2
    const start = Math.max(1, page - window)
    const end = Math.min(totalPages, page + window)

    items.push(1)
    if (start > 2) items.push('…')
    for (let p = start; p <= end; p++) {
        if (p !== 1 && p !== totalPages) items.push(p)
    }
    if (end < totalPages - 1) items.push('…')
    if (totalPages > 1) items.push(totalPages)
    return items.filter((v, i, a) => (i === 0 ? true : v !== a[i - 1]))
}

export default function Pagination({ basePath, page, totalPages }: PaginationProps) {
    if (totalPages <= 1) return null

    const hasPrev = page > 1
    const hasNext = page < totalPages
    const prevHref = buildHref(basePath, page - 1)
    const nextHref = buildHref(basePath, page + 1)
    const items = getPageItems(page, totalPages)

    return (
        <nav className="mt-10 flex flex-col items-center gap-4" aria-label="Pagination">
            <div className="flex items-center justify-center gap-4">
                <Link
                    href={hasPrev ? prevHref : '#'}
                    aria-disabled={!hasPrev}
                    className={`rounded-md border px-4 py-2 text-sm ${!hasPrev ? 'pointer-events-none opacity-50' : 'hover:bg-gray-50'}`}
                >
                    Previous
                </Link>

                <span className="text-sm text-gray-600">
                    Page {page} of {totalPages}
                </span>

                <Link
                    href={hasNext ? nextHref : '#'}
                    aria-disabled={!hasNext}
                    className={`rounded-md border px-4 py-2 text-sm ${!hasNext ? 'pointer-events-none opacity-50' : 'hover:bg-gray-50'}`}
                >
                    Next
                </Link>
            </div>

            <ol className="flex flex-wrap items-center justify-center gap-1" aria-label="Pagination pages">
                {items.map((it, idx) => {
                    if (it === '…') {
                        return (
                            <li key={`e${idx}`} className="px-2 text-gray-400" aria-hidden>
                                …
                            </li>
                        )
                    }
                    const href = buildHref(basePath, it)
                    const isCurrent = it === page
                    return (
                        <li key={it}>
                            {isCurrent ? (
                                <span
                                    aria-current="page"
                                    className="inline-flex min-w-[2.25rem] items-center justify-center rounded-md border px-3 py-2 text-sm font-medium text-white bg-gray-900"
                                >
                                    {it}
                                </span>
                            ) : (
                                <Link
                                    href={href}
                                    className="inline-flex min-w-[2.25rem] items-center justify-center rounded-md border px-3 py-2 text-sm hover:bg-gray-50"
                                    aria-label={`Go to page ${it}`}
                                >
                                    {it}
                                </Link>
                            )}
                        </li>
                    )
                })}
            </ol>
        </nav>
    )
}