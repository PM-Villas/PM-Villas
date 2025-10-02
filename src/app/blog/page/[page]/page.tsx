// File: src/app/blog/page/[page]/page.tsx
import { getPaginatedBlogPosts } from '@/lib/blog-queries'
import PostsGrid from '@/components/blog/PostsGrid'
import Pagination from '@/components/blog/Pagination'

const PAGE_SIZE = 12

export const dynamic = 'force-static'
export const revalidate = 120

export default async function BlogPageNumber({ params }: { params: { page: string } }) {
    const n = Number(params.page)
    const page = Number.isFinite(n) && n > 0 ? Math.floor(n) : 1

    const { posts, totalPages } = await getPaginatedBlogPosts(page, PAGE_SIZE)

    if (page > totalPages && totalPages > 0) {
        return (
            <main className="mx-auto max-w-7xl px-6 py-24 text-center">
                <h1 className="text-2xl font-semibold">Page not found</h1>
                <p className="mt-2 text-gray-600">The page number exceeds available content.</p>
            </main>
        )
    }

    return (
        <main>
            <PostsGrid posts={posts} heading="All articles" />
            <div className="mx-auto max-w-7xl px-6">
                <Pagination basePath="/blog" page={page} totalPages={totalPages} />
            </div>
        </main>
    )
}

export async function generateMetadata({ params }: { params: { page: string } }) {
    const page = Math.max(1, Number(params.page || '1'))
    const title = page > 1 ? `Blog — Page ${page} | PM Villas` : 'Blog | PM Villas'
    const description =
        page > 1
            ? `Browse PM Villas blog — page ${page}. Luxury real estate insights, guides, and news from Punta Mita.`
            : 'Browse PM Villas blog. Luxury real estate insights, guides, and news from Punta Mita.'

    const alternates: { canonical?: string } = {
        canonical: page === 1 ? '/blog' : `/blog/page/${page}`,
    }

    return { title, description, alternates }
}
