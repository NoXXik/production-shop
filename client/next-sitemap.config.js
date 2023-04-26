/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://smarthome16.ru',
    generateRobotsTxt: true,
    exclude: ['/server-sitemap-index.xml'], // <= exclude here
    robotsTxtOptions: {
        additionalSitemaps: [
            'https://smarthome16.ru/server-sitemap-index.xml', // <==== Add here
        ],
    },
}
