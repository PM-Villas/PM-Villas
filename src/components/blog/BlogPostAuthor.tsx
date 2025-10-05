// File: src/components/blog/BlogPostAuthor.tsx
import Image from 'next/image'
import { Mail, Phone } from 'lucide-react'

type BlogPostAuthorProps = {
    author: {
        name?: string
        title?: string
        bio?: string
        email?: string
        phone?: string
        image?: {
            asset?: { url?: string }
            alt?: string
        }
        social?: {
            linkedin?: string
            twitter?: string
            facebook?: string
        }
    }
}

export default function BlogPostAuthor({ author }: BlogPostAuthorProps) {
    return (
        <div className="border-t border-b border-gray-200 py-8">
            <div className="flex flex-col md:flex-row gap-6 items-start">
                {/* Author Image */}
                {author.image?.asset?.url && (
                    <div className="flex-shrink-0">
                        <Image
                            src={author.image.asset.url}
                            alt={author.image.alt || author.name || 'Author'}
                            width={120}
                            height={120}
                            className="rounded-full"
                        />
                    </div>
                )}

                {/* Author Info */}
                <div className="flex-1">
                    <div className="mb-2">
                        <h3 className="text-2xl font-bold text-gray-900">
                            {author.name}
                        </h3>
                        {author.title && (
                            <p className="text-lg text-gray-600 mt-1">
                                {author.title}
                            </p>
                        )}
                    </div>

                    {author.bio && (
                        <p className="text-gray-700 leading-relaxed mb-4">
                            {author.bio}
                        </p>
                    )}

                    {/* Contact Information */}
                    <div className="flex flex-wrap gap-4 text-sm">
                        {author.email && (
                            <a
                                href={`mailto:${author.email}`}
                                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                            >
                                <Mail className="w-4 h-4" />
                                <span>{author.email}</span>
                            </a>
                        )}

                        {author.phone && (
                            <a
                                href={`tel:${author.phone}`}
                                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                            >
                                <Phone className="w-4 h-4" />
                                <span>{author.phone}</span>
                            </a>
                        )}
                    </div>

                    {/* Social Links */}
                    {author.social && (
                        <div className="flex gap-4 mt-4">
                            {author.social.linkedin && (
                                <a
                                    href={author.social.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-600 hover:text-blue-600 transition-colors"
                                    aria-label="LinkedIn"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                    </svg>
                                </a>
                            )}

                            {author.social.twitter && (
                                <a
                                    href={author.social.twitter}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-600 hover:text-blue-400 transition-colors"
                                    aria-label="Twitter"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                                    </svg>
                                </a>
                            )}

                            {author.social.facebook && (
                                <a
                                    href={author.social.facebook}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-600 hover:text-blue-700 transition-colors"
                                    aria-label="Facebook"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </svg>
                                </a>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}