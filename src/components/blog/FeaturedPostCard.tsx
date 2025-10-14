// File: src/components/blog/FeaturedPostCard.tsx
import Link from 'next/link'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import type { BlogPost } from '@/components/blog/blog-types'

type Props = { post: BlogPost }

export default function FeaturedPostCard({ post }: Props) {
    const href = `/insights/${post.slug?.current ?? ''}`
    const img = post.mainImage?.asset?.url
    const alt = post.mainImage?.alt || post.title

    return (
        <article className="group relative overflow-hidden rounded-xl border border-gray-200/40 bg-white shadow-sm transition">
            {/* Clickable image */}
            <Link href={href} aria-label={`Open: ${post.title}`}>
                <div className="relative aspect-[16/9] w-full overflow-hidden">
                    {img ? (
                        <Image
                            src={img}
                            alt={alt}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                            priority
                        />
                    ) : (
                        <div className="absolute inset-0 grid place-items-center bg-gray-100 text-gray-400">
                            <span>No image</span>
                        </div>
                    )}

                    {post.featured && (
                        <div className="absolute top-3 right-3">
                            <Badge style={{ backgroundColor: '#e1c098' }} className="text-white font-semibold shadow-lg">
                                Featured
                            </Badge>
                        </div>
                    )}
                </div>
            </Link>

            {/* Body */}
            <div className="p-5">
                {post.category && (
                    <span className="inline-block rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-900">
                        {post.category}
                    </span>
                )}

                <h3 className="mt-3 text-xl font-semibold tracking-tight">
                    <Link href={href} className="hover:underline">
                        {post.title}
                    </Link>
                </h3>

                {post.excerpt && <p className="mt-2 line-clamp-3 text-sm text-gray-600">{post.excerpt}</p>}

                <div className="mt-4 flex items-center gap-3 text-sm text-gray-500">
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