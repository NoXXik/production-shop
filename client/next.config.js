/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'smarthome16.ru',
                port: '',
                pathname: '/productImages/**',
            },
        ],
    }
}
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self';
  child-src smarthome16.ru;
  style-src 'self' smarthome16.ru;
  font-src 'self';  
`

const securityHeaders = [
    {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
    },
    {
        key: 'Referrer-Policy',
        value: 'origin-when-cross-origin'
    },
    {
        key: 'Content-Security-Policy',
        value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim()
    }
]

module.exports = {
    nextConfig,
    output: 'standalone',
    async headers() {
        return [
            {
                // Apply these headers to all routes in your application.
                source: '/:path*',
                headers: securityHeaders,
            },
        ]
    },
}
