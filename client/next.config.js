/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: false,
    images: {
        domains: ['smarthome16.ru']
    }
}

module.exports = {
    nextConfig,
    output: 'standalone',
}
