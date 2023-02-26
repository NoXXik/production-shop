/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: '**',
            },
        ],
    },
}

module.exports = {
    // ... rest of the configuration.
    nextConfig,
    output: 'standalone',
}
