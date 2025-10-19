/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'pmvillas.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'www.pmvillas.com', // ✅ Added www version
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'cdn.sanity.io',
                port: '',
                pathname: '/**',
            },
        ],
    },

    async redirects() {
        return [
            // Redirect non-www to www (301 permanent redirect)
            {
                source: '/:path*',
                has: [
                    {
                        type: 'host',
                        value: 'pmvillas.com', // Match non-www domain
                    },
                ],
                destination: 'https://www.pmvillas.com/:path*',
                permanent: true, // 301 redirect (SEO-friendly)
            },
            // Redirect old blog URLs to insights (if you had WordPress blog)
            {
                source: '/blog',
                destination: '/insights',
                permanent: true,
            },
            {
                source: '/blog/:slug*',
                destination: '/insights/:slug*',
                permanent: true,
            },
            // Add any other old WordPress URLs here if needed
        ]
    },
}

export default nextConfig