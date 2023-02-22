import axios from "axios";
import { NextPageContext } from "next/types";
import { IProduct, IProductRequestData, IProductResponse } from "../../common/types/productTypes";
import ProductList from "../../common/components/ProductList/ProductList";
import FilterList from "../../common/components/FilterList/FilterList";
import { useRouter } from "next/router";
import { IReadyFilter } from "../../common/types/filterTypes";
import FiltersLayout from "../../common/components/FiltersLayout/FiltersLayout";
import { ReactHTMLElement, useEffect, useState } from "react";
import { useGetProuctsV2Mutation } from "../../common/store/api/categoryAPI";
import { ParsedUrlQuery } from "querystring";



export default function Category2({props}: {props: IProductResponse | null}) {
    console.log('render [category]')
    const [filters, setFilters] = useState<IReadyFilter[] | null>(null)
    const [lastFilter, setLastFilter] = useState<IReadyFilter | null>(null)
    const [products, setProducts] = useState<IProduct[]>([])
    const [spaMode, setSpaMode] = useState(false)
    const [getProducts, {data, isSuccess, isLoading, isError}] = useGetProuctsV2Mutation()

    const router = useRouter()
    const reqData = parseQuery(router.query)
    // console.log('router',router)

    const changeFilter = (title: string, value: string, checked: boolean, filter: IReadyFilter,e: any) => {
        e.stopPropagation()
        filter = {...filter, filters: filter.filters.map(filter_ => filter_.translit === value ? {...filter_, checked: !filter_.checked} : {...filter_})}
        if(filters) {
            setFilters(prev => prev && prev.map(prevFilter => prevFilter.translit === filter.translit ? {...filter} : {...prevFilter}))
        }
        if(checked) {
            // Убрать фильтр с url
            console.log('checked', reqData)
            let queryArray: any[] =[]
            reqData.filters.map(filter => {
                filter.filter(filter_ => {
                    if(filter_.key !== `` && filter_.value !== value) {
                        queryArray.push(filter_)
                    }
                })
            })

            // router.push(`${router.query.category}?${router.query}`)
            router.push(`${router.query.category}?${queryArray.map(filter => `_${filter.key}=${filter.value}`).join('&')}${reqData.sort ?`&sort=${reqData.sort[0]}_${reqData.sort[1]}`:''}${reqData.limit ?`&limit=${reqData.limit}`:''}${reqData.page ?`&page=${reqData.page}`:''}`)

        } else {
            // Добавить фильтр в url
            setLastFilter(filter)
            router.push(`${router.query.category}?${reqData.filters.map(filtr => filtr.map(filtr_ => `_${filtr_.key}=${filtr_.value}`).join('&')).join('&')}&_${title}=${value}${reqData.sort ?`&sort=${reqData.sort[0]}_${reqData.sort[1]}`:''}${reqData.limit ?`&limit=${reqData.limit}`:''}${reqData.page ?`&page=${reqData.page}`:''}`)
        }
    }

    useEffect(() => {
        if(spaMode){
            const url = router.asPath.replace('/catalog', '')
            getProducts({url, lastFilter})
            setLastFilter(null)
        }
      }, [router.query])


    useEffect(() => {
      if(!props) {
        const url = router.asPath.replace('/catalog', '')
        getProducts({url, lastFilter})
        setLastFilter(null)
      } else {
        setProducts(props.products)
        setFilters(props.filters)
        setSpaMode(true)
      }
    }, [])

    useEffect(() => {
        if(data && isSuccess) {
            console.log('use effect data response')
            setProducts(data.products)
            setFilters(data.filters)
        }
    }, [data, isSuccess])


    console.log(products, filters)
    // if(products && !props?.products) {
    //     props.products = products
    // }
    if(products && filters){
        return (
            <>
                <div className="catalog__body">
                    <FilterList filters={filters} changeFilter={changeFilter} router={router}/>
                    <div className="catalog__content">
                        <ProductList products={products} router={router}></ProductList>
                    </div>
                </div>
            </>
        )
    }
    if(props?.products && props.filters){
        return (
            <>
                <div className="catalog__body">
                    <FilterList filters={props?.filters} changeFilter={changeFilter} router={router}/>
                    <div className="catalog__content">
                        <ProductList products={props?.products} router={router}></ProductList>
                    </div>
                </div>
            </>
        )
    }
}


Category2.getInitialProps = async({req, res, query}: NextPageContext) => {
    if(!req) {
        return {props: null}
    }
    const reqUrl = req?.url?.replace('/catalog', '')
    if(reqUrl){
        const response = (await axios.post(`http://localhost:5000/api/product/get_products_2${reqUrl}`)).data as IProductResponse
        return {props: {count: response.count, products: response.products, filters: response.filters}}
    }

}


const parseQuery = (query: ParsedUrlQuery): IProductRequestData => {
    const data = { category: query.category } as any;
    if (query.sort) {
        const sort = query.sort as string;
        data.sort = sort.split("_");
    }
    if(query.limit){
        data.limit = query.limit
    }
    if(query.page){
        data.page = query.page
    }
    let filterKeys = Object.keys(query).filter((key) => key[0] == "_");
    let dataFilters = [] as any;
    if (filterKeys) {
    for (let i = 0; i < filterKeys.length; i++) {
      if (typeof query[filterKeys[i]] === "object") {
        // console.log('array', query[filterKeys[i]])
        let out = [] as { key: string; value: string }[];
        const values = query[filterKeys[i]] as string[];
        values.map((val) =>
          out.push({ key: filterKeys[i].replace("_", ""), value: val })
        );
        dataFilters.push(out);
        } else {
            dataFilters.push([
            { key: filterKeys[i].replace("_", ""), value: query[filterKeys[i]] },
            ]);
        }
        }
    }
    data.filters = dataFilters;
    return data
}
