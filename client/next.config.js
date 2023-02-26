/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'smarthome16.ru',
                port: '5000',
                pathname: '/productImages/**',
            },
            {
                protocol: 'https',
                hostname: 'klkfavorit.ru',
                port: '',
                pathname: '/wp-content/**',
            },
        ],
    },
}

module.exports = {
    nextConfig,
    output: 'standalone'
}

