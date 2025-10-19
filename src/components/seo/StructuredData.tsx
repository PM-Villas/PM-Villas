// src/components/seo/StructuredData.tsx

// ==========================================
// SCHEMA 1: Organization Schema
// This tells all search engines about your business
// Supported by: Google, Bing, Yandex, and others
// ==========================================
export function OrganizationSchema() {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'RealEstateAgent',
        name: 'PM Villas',
        description: 'Luxury real estate sales and villa rentals in Punta Mita, Mexico',
        url: 'https://www.pmvillas.com',
        logo: 'https://pmvillas.com/images/PM-Villas-Logo.png',
        image: 'https://pmvillas.com/images/PM-Villas-Logo.png',
        telephone: '+1-847-340-0338',
        email: 'andrew.kubicek@pmvillas.com',
        address: {
            '@type': 'PostalAddress',
            streetAddress: 'Lagos Del Mar 26',
            addressLocality: 'Punta de Mita',
            addressRegion: 'Nayarit',
            postalCode: '63734',
            addressCountry: 'MX',
        },
        geo: {
            '@type': 'GeoCoordinates',
            latitude: '20.7685',
            longitude: '-105.5200',
        },
        areaServed: {
            '@type': 'City',
            name: 'Punta Mita',
        },
        priceRange: '$$$',
        sameAs: [
            'https://www.instagram.com/pm.villas',
            'https://www.linkedin.com/company/pm-villas/',
        ],
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    )
}

// ==========================================
// SCHEMA 2: Property Schema
// This tells all search engines about each property
// ==========================================
export function PropertySchema({ property }: { property: any }) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        '@id': `https://pmvillas.com/properties-for-sale/${property.slug}`,
        name: property.title,
        description: property.description,
        image: property.mainImage?.asset?.url,
        offers: {
            '@type': 'Offer',
            price: property.price,
            priceCurrency: 'USD',
            availability: property.propertyStatus === 'sold-out'
                ? 'https://schema.org/SoldOut'
                : 'https://schema.org/InStock',
            url: `https://pmvillas.com/properties-for-sale/${property.slug}`,
        },
        category: 'Real Estate',
        brand: {
            '@type': 'Brand',
            name: 'PM Villas',
        },
        ...(property.bedrooms && {
            numberOfRooms: property.bedrooms,
        }),
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    )
}

// Rest of the schemas...
export function BreadcrumbSchema({ items }: { items: { name: string; url: string }[] }) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    )
}

export function ArticleSchema({ post }: { post: any }) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description: post.excerpt || post.metaDescription,
        image: post.mainImage?.asset?.url,
        datePublished: post.publishedAt,
        dateModified: post._updatedAt || post.publishedAt,
        author: {
            '@type': 'Person',
            name: post.author?.name || 'PM Villas',
        },
        publisher: {
            '@type': 'Organization',
            name: 'PM Villas',
            logo: {
                '@type': 'ImageObject',
                url: 'https://pmvillas.com/images/PM-Villas-Logo.png',
            },
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `https://pmvillas.com/insights/${post.slug?.current}`,
        },
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    )
}