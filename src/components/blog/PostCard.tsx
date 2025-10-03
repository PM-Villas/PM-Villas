// File: src/components/blog/PostCard.tsx
import Link from 'next/link'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import type { BlogPost } from '@/components/blog/blog-types'

type Props = {
    post: BlogPost
}

export default function PostCard({ post }: Props) {
    const href = `/blog/${post.slug?.current ?? ''}`
    const img = post.mainImage?.asset?.url
    const alt = post.mainImage?.alt || post.title

    return (
        <article className="group relative overflow-hidden rounded-lg border border-gray-200/50 bg-white shadow-sm transition">
            {/* Image */}
            <div className="relative aspect-[16/10] w-full overflow-hidden">
                {img ? (
                    <Image
                        src={img}
                        alt={alt}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                        sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 100vw"
                    />
                ) : (
                    <div className="absolute inset-0 grid place-items-center bg-gray-100 text-gray-400">
                        <span>No image</span>
                    </div>
                )}

                {post.featured && (
                    <div className="absolute top-3 right-3">
                        <Badge
                            style={{ backgroundColor: '#e1c098' }}
                            className="text-white font-semibold shadow-lg"
                        >
                            Featured
                        </Badge>
                    </div>
                )}
            </div>

            {/* Body */}
            <div className="p-4">
                {post.category && (
                    <span className="inline-block rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700">
                        {post.category}
                    </span>
                )}

                <h3 className="mt-2 text-lg font-semibold tracking-tight">
                    <Link href={href} className="hover:underline">
                        {post.title}
                    </Link>
                </h3>

                {post.excerpt && (
                    <p className="mt-2 line-clamp-2 text-sm text-gray-600">{post.excerpt}</p>
                )}

                <div className="mt-3 flex items-center gap-3 text-xs text-gray-500">
                    {post.author?.name && <span>{post.author.name}</span>}
                    {post.readingTime ? (
                        <>
                            <span aria-hidden>•</span>
                            <span>{post.readingTime} min read</span>
                        </>
                    ) : null}
                </div>

                <div className="mt-4">
                    <Link
                        href={href}
                        style={{ color: '#e1c098' }}
                        className="inline-flex items-center gap-2 font-semibold hover:opacity-80 transition-opacity"
                        aria-label={`Read more: ${post.title}`}
                    >
                        Read more →
                    </Link>
                </div>
            </div>
        </article>
    )
}