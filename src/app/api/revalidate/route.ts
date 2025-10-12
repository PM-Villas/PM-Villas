// src/app/api/revalidate/route.ts
import { NextResponse } from 'next/server'
import { revalidateTag, revalidatePath } from 'next/cache'

export async function POST(req: Request) {
    try {
        // Verify the secret to prevent unauthorized revalidation
        const secret = process.env.SANITY_REVALIDATE_SECRET
        const body = await req.json().catch(() => ({} as any))

        if (!secret || body?.secret !== secret) {
            console.error('Invalid secret provided for revalidation')
            return NextResponse.json(
                { ok: false, message: 'Invalid secret' },
                { status: 401 }
            )
        }

        console.log('Revalidation triggered for:', body._type, body.slug?.current)

        // Revalidate based on document type
        if (body._type === 'property') {
            // Revalidate all property-related tags
            revalidateTag('properties')
            revalidateTag('featured-properties')

            // Revalidate specific paths
            revalidatePath('/')
            revalidatePath('/properties-for-sale')

            // If slug is provided, revalidate the specific property page
            if (body.slug?.current) {
                revalidatePath(`/properties-for-sale/${body.slug.current}`)
            }

            console.log('Property revalidation complete')
        }
        else if (body._type === 'blog') {
            // Revalidate all blog-related tags
            revalidateTag('blog')
            revalidateTag('all-blog-posts')
            revalidateTag('featured-blog-posts')

            // Revalidate specific paths
            revalidatePath('/blog')

            // If slug is provided, revalidate the specific blog post
            if (body.slug?.current) {
                revalidatePath(`/blog/${body.slug.current}`)
                revalidateTag(`blog-post-${body.slug.current}`)
            }

            // If category is provided, revalidate category-specific content
            if (body.category) {
                revalidateTag(`blog-category-${body.category}`)
            }

            console.log('Blog revalidation complete')
        }
        else if (body._type === 'author') {
            // Revalidate blog content when author changes
            revalidateTag('blog')
            revalidateTag('all-blog-posts')
            revalidatePath('/blog')

            console.log('Author revalidation complete')
        }
        else {
            // Generic fallback - revalidate everything
            revalidateTag('properties')
            revalidateTag('blog')
            revalidatePath('/')
            revalidatePath('/properties-for-sale')
            revalidatePath('/blog')

            console.log('Generic revalidation complete')
        }

        return NextResponse.json({
            revalidated: true,
            now: Date.now(),
            type: body._type,
            message: 'Cache revalidated successfully'
        })

    } catch (error) {
        console.error('Revalidation error:', error)
        return NextResponse.json(
            {
                ok: false,
                message: 'Error revalidating cache',
                error: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        )
    }
}