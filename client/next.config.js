/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: false,
    images: {
        domains: ['smarthome16.ru', 'klkfavorit.ru']
    }
}

module.exports = {
    output: 'standalone',
    nextConfig
}

