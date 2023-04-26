/** @type {import('next').NextConfig} */
// const withSitemap = require('next-sitemap')({
//     // Опции конфигурации
//     siteUrl: 'https://smarthome16.ru',
//     changefreq: 'daily',
//     priority: 0.7,
//     excludeIndex: true,
//     sitemapSize: 5000,
//     generateRobotsTxt: true,
//
// });

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
// module.exports = withSitemap({
//     // Конфигурация Next.js
//     nextConfig,
//     output: 'standalone'
// });
module.exports = {
    // Конфигурация Next.js
    nextConfig,
    output: 'standalone'
};


