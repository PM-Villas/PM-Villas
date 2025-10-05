// src/app/actions/loadMoreProperties.ts
'use server'

import { client } from '@/lib/sanity'

interface LoadMoreParams {
    offset: number
    limit: number
    bedrooms?: string
    bathrooms?: string
    priceMin?: string
    priceMax?: string
    type?: string
    development?: string
    neighborhood?: string
}

function buildSanityFilter(params: LoadMoreParams) {
    const filters: string[] = ['_type == "property"']

    if (params.bedrooms) {
        filters.push(`bedrooms >= ${Number(params.bedrooms)}`)
    }
    if (params.bathrooms) {
        filters.push(`bathrooms >= ${Number(params.bathrooms)}`)
    }
    if (params.priceMin) {
        filters.push(`price >= ${Number(params.priceMin)}`)
    }
    if (params.priceMax) {
        filters.push(`price <= ${Number(params.priceMax)}`)
    }
    if (params.type) {
        filters.push(`lower(propertyType) == "${params.type.toLowerCase()}"`)
    }
    if (params.development) {
        const devs = params.development.split(',').map(d => `"${d.trim()}"`).join(',')
        filters.push(`count((development[])[@ in [${devs}]]) > 0`)
    }
    if (params.neighborhood) {
        const hoods = params.neighborhood.split(',').map(n => `"${n.trim()}"`).join(',')
        filters.push(`count((neighborhood[])[@ in [${hoods}]]) > 0`)
    }

    return filters.join(' && ')
}

export async function loadMoreProperties(params: LoadMoreParams) {
    const filter = buildSanityFilter(params)
    const start = params.offset
    const end = start + params.limit

    const query = `
        *[${filter}] | order(_createdAt desc) [${start}...${end}] {
            _id,
            title,
            price,
            bedrooms,
            bathrooms,
            propertyType,
            propertyStatus,
            development,
            neighborhood,
            primaryView,
            mainImage {
                asset->{ _id, url },
                alt
            },
            "slug": slug.current,
            featured,
            description,
            staffService,
            lotAreaSqFt,
            lotAreaSqM,
            totalConstructionSqFt,
            totalConstructionSqM,
            totalConstruction
        }
    `

    const properties = await client.fetch(query)

    return {
        properties,
        hasMore: properties.length === params.limit,
    }
}