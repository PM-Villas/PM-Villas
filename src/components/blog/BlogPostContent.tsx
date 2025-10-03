// File: src/components/blog/BlogPostContent.tsx
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'

type BlogPostContentProps = {
    post: {
        body?: any
        excerpt?: string
    }
}

const portableTextComponents = {
    types: {
        image: ({ value }: any) => {
            if (!value?.asset?._ref) {
                return null
            }
            return (
                <div className="my-8 rounded-lg overflow-hidden">
                    <Image
                        src={urlFor(value).width(1200).url()}
                        alt={value.alt || 'Blog post image'}
                        width={1200}
                        height={675}
                        className="w-full h-auto"
                    />
                    {value.caption && (
                        <p className="text-sm text-gray-500 text-center mt-2 italic">
                            {value.caption}
                        </p>
                    )}
                </div>
            )
        },
    },
    block: {
        h1: ({ children }: any) => (
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-12 mb-6">
                {children}
            </h1>
        ),
        h2: ({ children }: any) => (
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-10 mb-5">
                {children}
            </h2>
        ),
        h3: ({ children }: any) => (
            <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mt-8 mb-4">
                {children}
            </h3>
        ),
        h4: ({ children }: any) => (
            <h4 className="text-lg md:text-xl font-semibold text-gray-900 mt-6 mb-3">
                {children}
            </h4>
        ),
        normal: ({ children }: any) => (
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
                {children}
            </p>
        ),
        blockquote: ({ children }: any) => (
            <blockquote className="border-l-4 border-amber-500 pl-6 my-8 italic text-gray-700 text-lg">
                {children}
            </blockquote>
        ),
    },
    list: {
        bullet: ({ children }: any) => (
            <ul className="list-disc list-outside ml-6 mb-6 space-y-2 text-lg text-gray-700">
                {children}
            </ul>
        ),
        number: ({ children }: any) => (
            <ol className="list-decimal list-outside ml-6 mb-6 space-y-2 text-lg text-gray-700">
                {children}
            </ol>
        ),
    },
    marks: {
        link: ({ children, value }: any) => {
            const target = value?.href?.startsWith('http') ? '_blank' : undefined
            return (
                <a
                    href={value?.href}
                    target={target}
                    rel={target === '_blank' ? 'noopener noreferrer' : undefined}
                    style={{ color: '#e1c098' }}
                    className="font-semibold hover:opacity-80 underline transition-opacity"
                >
                    {children}
                </a>
            )
        },
        strong: ({ children }: any) => (
            <strong className="font-bold text-gray-900">{children}</strong>
        ),
        em: ({ children }: any) => (
            <em className="italic">{children}</em>
        ),
        code: ({ children }: any) => (
            <code className="bg-gray-100 text-pink-600 px-2 py-1 rounded text-sm font-mono">
                {children}
            </code>
        ),
    },
}

export default function BlogPostContent({ post }: BlogPostContentProps) {
    return (
        <div className="prose prose-lg max-w-none">
            {/* Excerpt/Lead paragraph */}
            {post.excerpt && (
                <p className="text-xl text-gray-600 leading-relaxed mb-8 font-medium">
                    {post.excerpt}
                </p>
            )}

            {/* Main Content */}
            {post.body && (
                <div className="mt-8">
                    <PortableText
                        value={post.body}
                        components={portableTextComponents}
                    />
                </div>
            )}
        </div>
    )
}