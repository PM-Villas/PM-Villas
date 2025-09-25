import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'property',
    title: 'Property',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Property Title',
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
        // Core Property Details
        defineField({
            name: 'price',
            title: 'Price (USD)',
            type: 'number',
            validation: Rule => Rule.required().min(0)
        }),
        defineField({
            name: 'propertyType',
            title: 'Type',
            type: 'string',
            options: {
                list: [
                    { title: 'Villa', value: 'villa' },
                    { title: 'Condo', value: 'condo' },
                    { title: 'Land', value: 'land' },
                ]
            },
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'bedrooms',
            title: 'Bedrooms',
            type: 'number',
            validation: Rule => Rule.min(0)
        }),
        defineField({
            name: 'bathrooms',
            title: 'Bathrooms',
            type: 'number',
            validation: Rule => Rule.min(0)
        }),
        // Area Fields
        defineField({
            name: 'lotArea',
            title: 'Lot Area',
            type: 'object',
            fields: [
                { name: 'value', type: 'number', title: 'Area' },
                {
                    name: 'unit',
                    type: 'string',
                    title: 'Unit',
                    options: {
                        list: [
                            { title: 'Square Feet', value: 'sqft' },
                            { title: 'Square Meters', value: 'sqm' }
                        ]
                    },
                    initialValue: 'sqft'
                }
            ]
        }),
        defineField({
            name: 'totalConstruction',
            title: 'Total Construction',
            type: 'object',
            fields: [
                { name: 'value', type: 'number', title: 'Area' },
                {
                    name: 'unit',
                    type: 'string',
                    title: 'Unit',
                    options: {
                        list: [
                            { title: 'Square Feet', value: 'sqft' },
                            { title: 'Square Meters', value: 'sqm' }
                        ]
                    },
                    initialValue: 'sqft'
                }
            ]
        }),
        // Location - Multi Select
        defineField({
            name: 'development',
            title: 'Development',
            type: 'array',
            of: [{ type: 'string' }],
            options: {
                list: [
                    { title: 'Four Seasons Resort', value: 'four-seasons' },
                    { title: 'St. Regis Resort', value: 'st-regis' },
                    { title: 'Kupuri', value: 'kupuri' },
                    { title: 'Pacifico', value: 'pacifico' },
                    { title: 'La Punta Estates', value: 'la-punta' },
                    { title: 'Ranchos Estates', value: 'ranchos' },
                    { title: 'Las Marietas', value: 'las-marietas' },
                    { title: 'Litibú', value: 'litibu' },
                ]
            }
        }),
        defineField({
            name: 'neighborhood',
            title: 'Neighborhood',
            type: 'array',
            of: [{ type: 'string' }],
            options: {
                list: [
                    { title: 'Kupuri', value: 'kupuri' },
                    { title: 'La Punta Estates', value: 'la-punta-estates' },
                    { title: 'Pacifico Estates', value: 'pacifico-estates' },
                    { title: 'Las Marietas', value: 'las-marietas' },
                    { title: 'Ranchos Estates', value: 'ranchos-estates' },
                    { title: 'Litibú Bay', value: 'litibu-bay' },
                    { title: 'El Banco', value: 'el-banco' },
                    { title: 'Punta Mita Resort', value: 'punta-mita-resort' },
                ]
            }
        }),
        defineField({
            name: 'primaryView',
            title: 'Primary View',
            type: 'string',
            options: {
                list: [
                    { title: 'Ocean', value: 'ocean' },
                    { title: 'Golf', value: 'golf' },
                    { title: 'Jungle', value: 'jungle' },
                    { title: 'Mountain', value: 'mountain' },
                ]
            }
        }),
        // Staff Services - Checkbox
        defineField({
            name: 'staffService',
            title: 'Staff Services',
            type: 'array',
            of: [{ type: 'string' }],
            options: {
                list: [
                    { title: 'Concierge Service', value: 'concierge' },
                    { title: 'Private Chef', value: 'chef' },
                    { title: 'Housekeeping', value: 'housekeeping' },
                    { title: 'Butler Service', value: 'butler' },
                    { title: 'Security', value: 'security' },
                    { title: 'Pool Service', value: 'pool-service' },
                    { title: 'Garden Maintenance', value: 'garden' },
                ]
            }
        }),
        // Images - Main + Up to 49 Additional
        defineField({
            name: 'mainImage',
            title: 'Main Property Image',
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
            name: 'gallery',
            title: 'Property Gallery (up to 49 images)',
            type: 'array',
            of: [
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
                        }
                    ]
                }
            ],
            options: {
                layout: 'grid'
            },
            validation: Rule => Rule.max(49)
        }),
        defineField({
            name: 'description',
            title: 'Property Description',
            type: 'text',
            rows: 4,
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'featured',
            title: 'Featured',
            type: 'boolean',
            description: 'Display on homepage',
            initialValue: false
        }),
    ]
})