// File: sanity/schemas/author.ts
import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'author',
    title: 'Author',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 96,
            },
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'image',
            title: 'Profile Image',
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
            ]
        }),
        defineField({
            name: 'title',
            title: 'Job Title',
            type: 'string',
            placeholder: 'e.g., Real Estate Specialist, Property Manager'
        }),
        defineField({
            name: 'bio',
            title: 'Biography',
            type: 'text',
            rows: 4,
            description: 'Short bio about the author'
        }),
        defineField({
            name: 'email',
            title: 'Email',
            type: 'string',
        }),
        defineField({
            name: 'phone',
            title: 'Phone',
            type: 'string',
        }),
        defineField({
            name: 'social',
            title: 'Social Media',
            type: 'object',
            fields: [
                {
                    name: 'linkedin',
                    type: 'url',
                    title: 'LinkedIn URL'
                },
                {
                    name: 'instagram',
                    type: 'url',
                    title: 'Instagram URL'
                },
                {
                    name: 'twitter',
                    type: 'url',
                    title: 'Twitter URL'
                }
            ]
        })
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'title',
            media: 'image'
        }
    }
})