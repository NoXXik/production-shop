import {getServerSideSitemapLegacy, ISitemapField} from 'next-sitemap'
import { GetServerSideProps } from 'next'
import axios from "axios";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    // Method to source urls from cms
    // const urls = await fetch('https//example.com/api')
    // (await axios.get(`http://${process.env.API_HOST}:${process.env.API_PORT}/api/product/get_by_translit/${title}`)).data as
    const products = (await axios.get(`${process.env.API_URL}/api/utils/get-sitemap-product`)).data as {category_name: string, title_translit: string, updated_at: string}[]
    let currentDate = new Date();

// вычитание 7 дней из текущей даты
    let weekAgoDate = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();

    let fields: ISitemapField[] = [
        {
            loc: `https//smarthome16.ru/`,
            priority: 1,
            changefreq: 'always',
            lastmod: weekAgoDate,
        },
        {
            loc: `https//smarthome16.ru/catalog`,
            priority: 0.9,
            changefreq: 'monthly',
            lastmod: weekAgoDate,
        },
        {
            loc: `https//smarthome16.ru/about`,
            priority: 0.6,
            changefreq: 'monthly',
        },

    ]
    if(products) {
        products.forEach((prod) => {
            fields.push({
                loc: `https//smarthome16.ru/catalog/${prod.category_name}/${prod.title_translit}`,
                priority: 0.8,
                changefreq: 'hourly',
                lastmod: new Date(prod.updated_at).toISOString().concat('+03:00')
            })
        })
    }
    return getServerSideSitemapLegacy(ctx, [...fields])
}

// Default export to prevent next.js errors
export default function SitemapIndex() {}
