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
// SCHEMA 1B: LocalBusiness Schema
// This helps with local SEO and Google Maps visibility
// Optimized for local search results
// ==========================================
export function LocalBusinessSchema() {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        '@id': 'https://www.pmvillas.com/#localbusiness',
        name: 'PM Villas',
        description: 'Premier luxury real estate agency specializing in villa sales and rentals in Punta Mita, Mexico. Expert concierge services and property management.',
        url: 'https://www.pmvillas.com',
        logo: 'https://pmvillas.com/images/PM-Villas-Logo.png',
        image: [
            'https://pmvillas.com/images/PM-Villas-Logo.png',
        ],
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
            latitude: 20.7685,
            longitude: -105.5200,
        },
        hasMap: 'https://www.google.com/maps/place/20.7685,-105.5200',
        openingHoursSpecification: [
            {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                opens: '09:00',
                closes: '18:00',
            },
            {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: 'Saturday',
                opens: '10:00',
                closes: '16:00',
            },
        ],
        areaServed: [
            {
                '@type': 'City',
                name: 'Punta Mita',
                containedIn: {
                    '@type': 'State',
                    name: 'Nayarit',
                },
            },
            {
                '@type': 'City',
                name: 'Riviera Nayarit',
            },
        ],
        priceRange: '$$$',
        sameAs: [
            'https://www.instagram.com/pm.villas',
            'https://www.linkedin.com/company/pm-villas/',
        ],
        knowsAbout: [
            'Luxury Real Estate',
            'Villa Rentals',
            'Property Management',
            'Punta Mita Properties',
            'Beachfront Villas',
            'Concierge Services',
        ],
        slogan: 'Your gateway to luxury living in Punta Mita',
        serviceArea: {
            '@type': 'GeoCircle',
            geoMidpoint: {
                '@type': 'GeoCoordinates',
                latitude: 20.7685,
                longitude: -105.5200,
            },
            geoRadius: '15000', // 15km radius
        },
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
// Using House schema for better real estate SEO
// ==========================================
export function PropertySchema({ property }: { property: any }) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'House',
        '@id': `https://pmvillas.com/properties-for-sale/${property.slug}`,
        name: property.title,
        description: property.description,
        image: property.mainImage?.asset?.url,
        address: {
            '@type': 'PostalAddress',
            addressLocality: property.neighborhood?.[0] || 'Punta Mita',
            addressRegion: 'Nayarit',
            addressCountry: 'MX',
        },
        geo: {
            '@type': 'GeoCoordinates',
            latitude: '20.7685',
            longitude: '-105.5200',
        },
        ...(property.bedrooms && {
            numberOfRooms: property.bedrooms,
            numberOfBedrooms: property.bedrooms,
        }),
        ...(property.bathrooms && {
            numberOfBathroomsTotal: property.bathrooms,
        }),
        ...(property.totalConstruction && {
            floorSize: {
                '@type': 'QuantitativeValue',
                value: property.totalConstruction,
                unitCode: 'SQM',
            },
        }),
        ...(property.yearBuilt && {
            yearBuilt: property.yearBuilt,
        }),
        offers: {
            '@type': 'Offer',
            price: property.price,
            priceCurrency: 'USD',
            availability: property.propertyStatus === 'sold-out'
                ? 'https://schema.org/SoldOut'
                : 'https://schema.org/InStock',
            url: `https://pmvillas.com/properties-for-sale/${property.slug}`,
            seller: {
                '@type': 'RealEstateAgent',
                name: 'PM Villas',
                telephone: '+1-847-340-0338',
                email: 'andrew.kubicek@pmvillas.com',
            },
        },
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