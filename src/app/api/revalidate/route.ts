// src/app/api/revalidate/route.ts
import { NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'

export async function POST(req: Request) {
    const secret = process.env.SANITY_REVALIDATE_SECRET
    const body = await req.json().catch(() => ({} as any))

    if (!secret || body?.secret !== secret) {
        return NextResponse.json({ ok: false, message: 'Invalid secret' }, { status: 401 })
    }

    // If you only want to revalidate on property changes, you can also check body._type === 'property'
    revalidateTag('properties')
    return NextResponse.json({ revalidated: true, now: Date.now() })
}
