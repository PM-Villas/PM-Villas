// File: sanity/schemas/blog.ts
import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'blog',
    title: 'Blog Post',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'author',
            title: 'Author',
            type: 'reference',
            to: [{ type: 'author' }],
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'publishedAt',
            title: 'Published Date',
            type: 'datetime',
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'mainImage',
            title: 'Main Image',
            type: 'image',
            options: {
                hotspot: true,
            },
            fields: [
                {
                    name: 'alt',
                    type: 'string',
                    title: 'Alternative text',
                }
            ],
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'excerpt',
            title: 'Excerpt',
            type: 'text',
            rows: 3,
            description: 'Short summary of the blog post (shown in blog listing)',
            validation: Rule => Rule.required().max(200)
        }),
        defineField({
            name: 'body',
            title: 'Body Content',
            type: 'array',
            of: [
                {
                    type: 'block',
                    styles: [
                        { title: 'Normal', value: 'normal' },
                        { title: 'H2', value: 'h2' },
                        { title: 'H3', value: 'h3' },
                        { title: 'H4', value: 'h4' },
                        { title: 'Quote', value: 'blockquote' }
                    ],
                    marks: {
                        decorators: [
                            { title: 'Bold', value: 'strong' },
                            { title: 'Italic', value: 'em' },
                            { title: 'Underline', value: 'underline' }
                        ],
                        annotations: [
                            {
                                name: 'link',
                                type: 'object',
                                title: 'Link',
                                fields: [
                                    {
                                        name: 'href',
                                        type: 'url',
                                        title: 'URL',
                                        validation: Rule => Rule.uri({
                                            scheme: ['http', 'https', 'mailto', 'tel']
                                        })
                                    },
                                    {
                                        name: 'openInNewTab',
                                        type: 'boolean',
                                        title: 'Open in new tab',
                                        initialValue: true
                                    }
                                ]
                            }
                        ]
                    }
                },
                {
                    type: 'image',
                    options: {
                        hotspot: true,
                    },
                    fields: [
                        {
                            name: 'alt',
                            type: 'string',
                            title: 'Alternative text',
                            validation: Rule => Rule.required()
                        },
                        {
                            name: 'caption',
                            type: 'string',
                            title: 'Caption',
                        }
                    ]
                },
                {
                    type: 'object',
                    name: 'videoEmbed',
                    title: 'Video Embed',
                    fields: [
                        {
                            name: 'url',
                            type: 'url',
                            title: 'Video URL',
                            description: 'YouTube or Vimeo URL',
                            validation: Rule => Rule.required().custom((url: string) => {
                                if (!url) return true;
                                if (url.includes('youtube.com') || url.includes('youtu.be') || url.includes('vimeo.com')) {
                                    return true;
                                }
                                return 'Please enter a valid YouTube or Vimeo URL';
                            })
                        },
                        {
                            name: 'caption',
                            type: 'string',
                            title: 'Video Caption',
                        }
                    ],
                    preview: {
                        select: {
                            url: 'url',
                            caption: 'caption'
                        },
                        prepare({ url, caption }) {
                            return {
                                title: caption || 'Video Embed',
                                subtitle: url
                            }
                        }
                    }
                }
            ],
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'string',
            options: {
                list: [
                    { title: 'Market Updates', value: 'market-updates' },
                    { title: 'Lifestyle', value: 'lifestyle' },
                    { title: 'Investment Tips', value: 'investment-tips' },
                    { title: 'Area Guides', value: 'area-guides' },
                    { title: 'Property Spotlight', value: 'property-spotlight' },
                ]
            },
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'tags',
            title: 'Tags',
            type: 'array',
            of: [{ type: 'string' }],
            options: {
                layout: 'tags'
            }
        }),
        defineField({
            name: 'featured',
            title: 'Featured Post',
            type: 'boolean',
            description: 'Display on blog homepage',
            initialValue: false
        }),
        defineField({
            name: 'readingTime',
            title: 'Reading Time (minutes)',
            type: 'number',
            description: 'Estimated reading time. Leave empty for auto-calculation.',
        }),
        defineField({
            name: 'metaDescription',
            title: 'Meta Description',
            type: 'text',
            rows: 2,
            description: 'SEO description (recommended: 150-160 characters)',
            validation: Rule => Rule.max(160)
        }),
    ],
    preview: {
        select: {
            title: 'title',
            author: 'author.name',
            media: 'mainImage',
            category: 'category'
        },
        prepare(selection) {
            const { author, category } = selection;
            return {
                ...selection,
                subtitle: `${category ? category.replace('-', ' ').toUpperCase() : ''} ${author ? `• by ${author}` : ''}`
            }
        }
    },
    orderings: [
        {
            title: 'Published Date, New',
            name: 'publishedAtDesc',
            by: [
                { field: 'publishedAt', direction: 'desc' }
            ]
        },
        {
            title: 'Published Date, Old',
            name: 'publishedAtAsc',
            by: [
                { field: 'publishedAt', direction: 'asc' }
            ]
        },
        {
            title: 'Title, A-Z',
            name: 'titleAsc',
            by: [
                { field: 'title', direction: 'asc' }
            ]
        }
    ]
})