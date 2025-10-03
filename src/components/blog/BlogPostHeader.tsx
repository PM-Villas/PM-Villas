// File: src/components/blog/BlogPostHeader.tsx
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, User } from 'lucide-react'

type BlogPostHeaderProps = {
    post: {
        title: string
        publishedAt?: string
        readingTime?: number
        category?: string
        featured?: boolean
        mainImage?: {
            asset?: { url?: string }
            alt?: string
        }
        author?: {
            name?: string
            image?: {
                asset?: { url?: string }
                alt?: string
            }
        }
    }
}

export default function BlogPostHeader({ post }: BlogPostHeaderProps) {
    const formatDate = (dateString?: string) => {
        if (!dateString) return ''
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    return (
        <header className="relative">
            {/* Hero Image */}
            {post.mainImage?.asset?.url && (
                <div className="relative h-[400px] md:h-[500px] w-full overflow-hidden">
                    <Image
                        src={post.mainImage.asset.url}
                        alt={post.mainImage.alt || post.title}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                    {/* Featured Badge */}
                    {post.featured && (
                        <div className="absolute top-6 right-6">
                            <Badge
                                style={{ backgroundColor: '#e1c098' }}
                                className="text-white font-semibold shadow-lg px-4 py-2"
                            >
                                Featured
                            </Badge>
                        </div>
                    )}
                </div>
            )}

            {/* Content Overlay */}
            <div className="relative -mt-32 mx-auto max-w-4xl px-6">
                <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
                    {/* Category */}
                    {post.category && (
                        <Badge
                            variant="secondary"
                            className="mb-4 bg-amber-100 text-amber-900 font-semibold px-4 py-1"
                        >
                            {post.category}
                        </Badge>
                    )}

                    {/* Title */}
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                        {post.title}
                    </h1>

                    {/* Meta Information */}
                    <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
                        {/* Author */}
                        {post.author?.name && (
                            <div className="flex items-center gap-2">
                                {post.author.image?.asset?.url ? (
                                    <Image
                                        src={post.author.image.asset.url}
                                        alt={post.author.image.alt || post.author.name}
                                        width={32}
                                        height={32}
                                        className="rounded-full"
                                    />
                                ) : (
                                    <User className="w-4 h-4" />
                                )}
                                <span className="font-medium">{post.author.name}</span>
                            </div>
                        )}

                        {/* Published Date */}
                        {post.publishedAt && (
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <time dateTime={post.publishedAt}>
                                    {formatDate(post.publishedAt)}
                                </time>
                            </div>
                        )}

                        {/* Reading Time */}
                        {post.readingTime && (
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span>{post.readingTime} min read</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    )
}