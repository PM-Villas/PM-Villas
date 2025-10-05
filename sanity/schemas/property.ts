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
        // Status Field
        defineField({
            name: 'status',
            title: 'Status',
            type: 'string',
            options: {
                list: [
                    { title: 'Available', value: 'available' },
                    { title: 'Sold Out', value: 'sold-out' },
                ]
            },
            initialValue: 'available',
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
                    { title: 'Aubierge', value: 'aubierge' },
                    { title: 'Litibu', value: 'litibu' },
                    { title: 'Nauka', value: 'nauka' },
                    { title: 'Punta Mita', value: 'punta-mita' },
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
                    // Litibu neighborhoods
                    { title: 'Litibu Bay Club', value: 'litibu-bay-club' },
                    { title: 'Uavi', value: 'uavi' },
                    // Punta Mita neighborhoods
                    { title: 'Bahia Estates', value: 'bahia-estates' },
                    { title: 'Bella Vista', value: 'bella-vista' },
                    { title: 'El Encanto', value: 'el-encanto' },
                    { title: 'Four Seasons', value: 'four-seasons' },
                    { title: 'Hacienda De Mita', value: 'hacienda-de-mita' },
                    { title: 'Iyari', value: 'iyari' },
                    { title: 'Kupuri Estates', value: 'kupuri-estates' },
                    { title: 'La Punta', value: 'la-punta' },
                    { title: 'La Serenata', value: 'la-serenata' },
                    { title: 'Lagos Del Mar', value: 'lagos-del-mar' },
                    { title: 'Las Marietas', value: 'las-marietas' },
                    { title: 'Las Palmas', value: 'las-palmas' },
                    { title: 'Las Terrazas', value: 'las-terrazas' },
                    { title: 'Las Vistas', value: 'las-vistas' },
                    { title: 'Montage', value: 'montage' },
                    { title: 'Pacifico Estates', value: 'pacifico-estates' },
                    { title: 'Porta Fortuna', value: 'porta-fortuna' },
                    { title: 'Ranchos', value: 'ranchos' },
                    { title: 'Seven & Eight Residences', value: 'seven-eight-residences' },
                    { title: 'Surf Residences', value: 'surf-residences' },
                    { title: 'Tau', value: 'tau' },
                ]
            },
            validation: Rule => Rule.custom((neighborhoods, context) => {
                const development = context.parent?.development || [];

                if (!neighborhoods || neighborhoods.length === 0) return true;

                const litibusNeighborhoods = ['litibu-bay-club', 'uavi'];
                const puntaMitaNeighborhoods = [
                    'bahia-estates', 'bella-vista', 'el-encanto', 'four-seasons',
                    'hacienda-de-mita', 'iyari', 'kupuri-estates', 'la-punta',
                    'la-serenata', 'lagos-del-mar', 'las-marietas', 'las-palmas',
                    'las-terrazas', 'las-vistas', 'montage', 'pacifico-estates',
                    'porta-fortuna', 'ranchos', 'seven-eight-residences',
                    'surf-residences', 'tau'
                ];

                for (const neighborhood of neighborhoods) {
                    // Check Litibu neighborhoods
                    if (litibusNeighborhoods.includes(neighborhood) && !development.includes('litibu')) {
                        const neighborhoodTitle = neighborhood.split('-').map(word =>
                            word.charAt(0).toUpperCase() + word.slice(1)
                        ).join(' ');
                        return `"${neighborhoodTitle}" can only be selected when Litibu development is selected`;
                    }

                    // Check Punta Mita neighborhoods
                    if (puntaMitaNeighborhoods.includes(neighborhood) && !development.includes('punta-mita')) {
                        const neighborhoodTitle = neighborhood.split('-').map(word =>
                            word.charAt(0).toUpperCase() + word.slice(1)
                        ).join(' ');
                        return `"${neighborhoodTitle}" can only be selected when Punta Mita development is selected`;
                    }
                }

                return true;
            }),
            description: 'Select neighborhoods based on development. Litibu: Litibu Bay Club, Uavi. Punta Mita: All other options listed above.'
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
        // Matterport 3D Tour URL - NEW
        defineField({
            name: 'matterportUrl',
            title: 'Matterport 3D Tour URL',
            type: 'url',
            description: 'Matterport embed URL for 3D virtual tour (e.g., https://my.matterport.com/show/?m=XXXXXXXXXX)',
            validation: Rule => Rule.uri({
                allowRelative: false,
                scheme: ['http', 'https']
            }).custom(url => {
                if (!url) return true; // Allow empty
                if (url.includes('matterport.com')) {
                    return true;
                }
                return 'Please enter a valid Matterport URL';
            })
        }),
        // YouTube URL Field
        defineField({
            name: 'youtubeUrl',
            title: 'YouTube Video URL',
            type: 'url',
            description: 'YouTube video URL for this property',
            validation: Rule => Rule.uri({
                allowRelative: false,
                scheme: ['http', 'https']
            }).custom(url => {
                if (!url) return true; // Allow empty
                if (url.includes('youtube.com/watch') || url.includes('youtu.be/') || url.includes('youtube.com/embed/')) {
                    return true;
                }
                return 'Please enter a valid YouTube URL';
            })
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