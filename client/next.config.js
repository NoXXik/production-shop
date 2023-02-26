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
    },
    output: 'standalone',
}
module.exports = nextConfig
