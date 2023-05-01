import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { INavbarCategory } from "../../../common/types/categoryTypes";
import { IProduct, IProductRequestData, IProductResponse } from "../../../common/types/productTypes";
import { IReadyFilter } from "../../../common/types/filterTypes";
import { useAppSelector } from "../../../common/hooks/redux/reduxHooks";
import { useGetProuctsV2Mutation } from "../../../common/store/api/categoryAPI";
import CategoryList from "../../../common/components/CategoryList/CategoryList";
import FilterList from "../../../common/components/FilterList/FilterList";
import ProductList from "../../../common/components/ProductList/ProductList";
import SideBar from "../../../common/components/CategorySideBar/SideBar";
import {NextPageContext} from "next";
import Head from "next/head";
import {isDiscountValid, priceWithDiscount} from "../../../common/utils/isDiscountValid";



interface ListItemElement {
    "@type": "Product",
    "image": string,
    "url": string,
    "name": string,
    "description": string,
    "offers": {
        "@type": "Offer",
        // "availability": "https://schema.org/InStock",
        "availability": string,
        "price": number,
        "priceCurrency": "RUB"

    }
}

export default function Category2({props}: { props: IProductResponse | null }) {
    const [filters, setFilters] = useState<IReadyFilter[] | null>(null)
    const [lastFilter, setLastFilter] = useState<IReadyFilter | null>(null)
    const [products, setProducts] = useState<IProduct[]>([])
    const [count, setCount] = useState(0)
    const [spaMode, setSpaMode] = useState(false)
    const [getProducts, {data, isSuccess, isLoading, isError}] = useGetProuctsV2Mutation()
    const [filterListActive, setFilterListActive] = useState(false)
    const router = useRouter()
    const reqData = parseQuery(router.query)
    const categories = useAppSelector(state => state.categories).categories


    const changeFilter = (title: string, value: string, checked: boolean, filter: IReadyFilter, e: any) => {
        e.stopPropagation()
        filter = {
            ...filter,
            filters: filter.filters.map(filter_ => filter_.translit === value ? {
                ...filter_,
                checked: !filter_.checked
            } : {...filter_})
        }
        if (filters) {
            setFilters(prev => prev && prev.map(prevFilter => prevFilter.translit === filter.translit ? {...filter} : {...prevFilter}))
        }
        if (checked) {
            // Убрать фильтр с url
            let queryArray: any[] = []
            reqData.filters.map(filter => {
                filter.filter(filter_ => {
                    if (filter_.key !== `` && filter_.value !== value) {
                        queryArray.push(filter_)
                    }
                })
            })
            router.push(`${router.query.category}?${queryArray.map(filter => `_${filter.key}=${filter.value}`).join('&')}${reqData.sort ? `&sort=${reqData.sort[0]}_${reqData.sort[1]}` : ''}${reqData.limit ? `&limit=${reqData.limit}` : ''}${reqData.page ? `&page=${reqData.page}` : ''}`, undefined, {shallow: true})

        } else {
            // Добавить фильтр в url
            setLastFilter(filter)
            router.push(`${router.query.category}?${reqData.filters.map(filtr => filtr.map(filtr_ => `_${filtr_.key}=${filtr_.value}`).join('&')).join('&')}&_${title}=${value}${reqData.sort ? `&sort=${reqData.sort[0]}_${reqData.sort[1]}` : ''}${reqData.limit ? `&limit=${reqData.limit}` : ''}${reqData.page ? `&page=${reqData.page}` : ''}`, undefined, {shallow: true})
        }
    }

    useEffect(() => {
        if (spaMode) {
            const url = router.asPath.replace('/catalog', '')
            getProducts({url, lastFilter})
            setLastFilter(null)
        }
    }, [router.query])


    useEffect(() => {
        if (!props) {
            const url = router.asPath.replace('/catalog', '')
            getProducts({url, lastFilter})
            setLastFilter(null)
            setSpaMode(true)
        } else {
            setProducts(props.products)
            setFilters(props.filters)
            setCount(props.count)
            setSpaMode(true)
        }
    }, [])

    useEffect(() => {
        if (data && isSuccess) {
            setProducts(data.products)
            setFilters(data.filters)
            setCount(data.count)
        }
    }, [data, isSuccess])


    let cat: INavbarCategory | undefined = undefined;
    let cats: INavbarCategory[] = [];

    if(categories && categories.length > 0) {
        cat = categories.filter(_cat => _cat.translit === router.query.category)[0]
        if(cat && cat.id) {
            cats = categories.filter(_cat => _cat.parent_id === cat?.id)
        }
    }

    if(cats && cats.length > 0) {
        return (
            <>
                <Head>
                    <title>{`Купить ${cat ? cat.title: 'товары'} в интернет-магазине SmartHome16 | Широкий выбор товаров и выгодные цены`}</title>
                    <meta name="description"
                          content={cat ? cat.description : "В каталоге нашего интернет-магазина вы найдете широкий выбор систем видеонаблюдения для защиты вашего дома, офиса или бизнеса. Мы предлагаем камеры разных типов, форматов и разрешений, видеорегистраторы, мониторы и другие компоненты системы. Гарантируем высокое качество оборудования, удобную доставку и грамотную консультацию при выборе товара."}/>

                </Head>
                <div className="catalog__body">
                    <SideBar categories={cats} category={reqData.category}/>
                    <div className="catalog__content">
                        <CategoryList categories={cats}/>
                    </div>
                </div>
            </>
            )
    }
    if (products && filters) {
        return (
            <>
                <Head>
                    <title>{`Купить ${cat ? cat.title: 'товары'} в интернет-магазине SmartHome16 | Широкий выбор товаров и выгодные цены`}</title>
                    <meta name="description"
                          content={cat ? cat.description : "В каталоге нашего интернет-магазина вы найдете широкий выбор систем видеонаблюдения для защиты вашего дома, офиса или бизнеса. Мы предлагаем камеры разных типов, форматов и разрешений, видеорегистраторы, мониторы и другие компоненты системы. Гарантируем высокое качество оборудования, удобную доставку и грамотную консультацию при выборе товара."}/>

                </Head>
                <div className="catalog__body">
                    <FilterList isActive={filterListActive} setIsActive={setFilterListActive} filters={filters}
                                changeFilter={changeFilter} router={router}/>
                    <div className="catalog__content">
                        <ProductList isLoading={isLoading} setIsActive={setFilterListActive} products={products}
                                     router={router}
                                     count={count}></ProductList>
                    </div>
                </div>
            </>
        )
    }
    if (props?.products && props.filters) {
        const listElements = getItemListElement(props.products)
        return (
            <>
                <Head>
                    <script type="application/ld+json" dangerouslySetInnerHTML={{
                        __html:
                            `{
    "@context": "https://schema.org",
    "@type": "ItemList",
    "url": "${process.env.NEXT_PUBLIC_SITE_URL}${router.asPath}",
    "numberOfItems": "${props.products.length}",
    "itemListElement": ${JSON.stringify(listElements)}
                        }`
                    }}
                    />

                </Head>
                <div className="catalog__body">
                    <FilterList isActive={filterListActive} setIsActive={setFilterListActive} filters={props?.filters}
                                changeFilter={changeFilter} router={router}/>
                    <div className="catalog__content">
                        <ProductList isLoading={isLoading} setIsActive={setFilterListActive} products={props?.products}
                                     router={router}
                                     count={props.count}></ProductList>
                    </div>
                </div>
            </>
        )
    }
}


Category2.getInitialProps = async ({req}: NextPageContext) => {
    if (!req) {
        return {props: null}
    }
    const reqUrl = req?.url?.replace('/catalog', '')
    if (reqUrl) {
        const response = (await axios.post(`${process.env.API_URL}/product/get_products_2${reqUrl}`)).data as IProductResponse
        return {props: {count: response.count, products: response.products, filters: response.filters}}
    }

}


const parseQuery = (query: ParsedUrlQuery): IProductRequestData => {
    const data = {category: query.category} as any;
    if (query.sort) {
        const sort = query.sort as string;
        data.sort = sort.split("_");
    }
    if (query.limit) {
        data.limit = query.limit
    }
    if (query.page) {
        data.page = query.page
    }
    let filterKeys = Object.keys(query).filter((key) => key[0] == "_");
    let dataFilters = [] as any;
    if (filterKeys) {
        for (let i = 0; i < filterKeys.length; i++) {
            if (typeof query[filterKeys[i]] === "object") {
                let out = [] as { key: string; value: string }[];
                const values = query[filterKeys[i]] as string[];
                values.map((val) =>
                    out.push({key: filterKeys[i].replace("_", ""), value: val})
                );
                dataFilters.push(out);
            } else {
                dataFilters.push([
                    {key: filterKeys[i].replace("_", ""), value: query[filterKeys[i]]},
                ]);
            }
        }
    }
    data.filters = dataFilters;
    return data
}
// 'В наличии' | 'Нет в наличии' | 'Под заказ'
const getItemListElement = (products: IProduct[]): ListItemElement[] => {
    const array: ListItemElement[] = []
    products.forEach((product => {
        let availability = 'SoldOut'
        let price = 0

        if (product.stock_status === 'В наличии') {
            availability = 'InStock'
        } else if (product.stock_status === 'Нет в наличии') {
            availability = 'SoldOut'
        } else if (product.stock_status === 'Под заказ') {
            availability = 'PreOrder'
        }

        if (product.discount && isDiscountValid(product.discount.startDate, product.discount.expirationDate)) {
            price = Number(priceWithDiscount(product.currently_price, product.discount.discount))
        } else {
            price = product.currently_price
        }
        array.push({
            "@type": 'Product',
            url: product.title_translit,
            image: `${process.env.NEXT_PUBLIC_STATIC_URL}/productImages/${product.images[0] || ''}`,
            name: product.title || '',
            description: product.description || '',
            offers: {
                "@type": "Offer",
                availability: `https://schema.org/${availability}`,
                price: price,
                priceCurrency: "RUB"
            }
        })
    }))
    return array;
}
// function parseQuery2(query: ParsedUrlQuery) {
//     let filters: any[] = [];
//     if (query.filter) {
//         if (Array.isArray(query.filter)) {
//             filters = query.filter.map(filterString => {
//                 const [key, value] = filterString.split("");
//                 return { key: key, value: value };
//             });
//         } else {
//             const [key, value] = query.filter.split("");
//             filters = [{ key: key, value: value }];
//         }
//     }
//     return {
//         filters: filters,
//         sort: query.sort ? query.sort : null,
//         limit: query.limit ? parseInt(query.limit as string) : null,
//         page: query.page ? parseInt(query.page as string) : null
//     };
// }

