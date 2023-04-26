import axios from "axios";
import { NextPageContext } from "next"
import { IProductFilter, IProductRequestData, IProducts } from "../../common/types/productTypes";
import { IFilter, IReadyFilter } from "../../common/types/filterTypes";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../common/hooks/redux/reduxHooks";
import { setFilter, setReadyFilter } from "../../common/store/slices/filterSlice";
import { useGetProductsMutation, useLazyGetFiltersQuery } from "../../common/store/api/categoryAPI";
import { setProducts } from "../../common/store/slices/productSlice";
import { ParsedUrlQuery } from "querystring";
import ProductList from "../../common/components/ProductList/ProductList";
import { setSpaMode } from "../../common/store/slices/utilSlice";
import { read } from "fs";

export default function Category({products, filters, readyFilters}: { products: IProducts | null, filters: IFilter[] | null, readyFilters: IReadyFilter[] | null}) {
    console.log('[category] render')
    const [getProducts, {data: productData, isLoading: productIsLoading, isSuccess: productIsSuccess}] = useGetProductsMutation()
    const [getFilters, {data: filterData, isLoading: filterIsLoading, isSuccess: filterIsSuccess}] = useLazyGetFiltersQuery()

    const dispatch = useAppDispatch()
    const router = useRouter()
    const data = parseQuery(router.query)

    const [productsSPA, setProductsSPA] = useState<IProducts | null>(null)
    const spaMode = useAppSelector(state => state.utils.spaMode)
    const filter = useAppSelector(state => state.filter.filters)


    if(productsSPA) {
        products = productsSPA
    }

    useEffect(() => {
        if(productData && productIsSuccess) {
            setProductsSPA(productData)
        }
    }, [productData, productIsSuccess])

    useEffect(() => {
        if(filterData && filterIsSuccess) {
            dispatch(setFilter(filterData))
        }
    }, [filterData, filterIsSuccess])

    useEffect(() => {
        if(!products && !filters && !readyFilters) {
            const data = parseQuery(router.query)
            if(!productIsSuccess && !productIsLoading) {
                getProducts(data)

            }

            if(!filter && !filterIsLoading) {
                getFilters(true)
            }
        } else if(products && filters && readyFilters) {
            dispatch(setFilter(filters))
            dispatch(setReadyFilter(readyFilters))
            dispatch(setSpaMode(true))

        }
    }, [])

    useEffect(() => {
        console.log('get products router.query', spaMode)
        if(!productIsLoading && spaMode) {
            getProducts(parseQuery(router.query))
        }
    }, [router.query])

    if(!readyFilters && products && filter) {
        readyFilters = getOutFilters(products.filters, filter, data)
    }

    if(!filters) {
        filters = filter
    }

    console.log('end [category] render', products, filters)
    console.log('end [category] render', readyFilters)
    return (
        <>
            <div className="catalog__body">
                <div className="catalog__content">
                    {/* <ProductList products={products}></ProductList> */}
                </div>
            </div>
        </>
    )
}

Category.getInitialProps = async({req, res, query, pathname}: NextPageContext) => {
    if(!req){
        return {products: null, filters: null, readyFilters: null, data: null}
    }
    const data = parseQuery(query)
    const url = `http://localhost:5000/api/product/get_products`;

    // console.log('data',data.filters)
    const products = (await (await axios.post(url, data)).data) as IProducts;
    const filters = (await (
        await axios.get(`http://localhost:5000/api/filter/getAll`)
    ).data) as IFilter[];
    const readyFilters = getOutFilters(products.filters, filters, data)

    return {products, filters, readyFilters, data}
}



export const getOutFilters = (productFilters: IProductFilter[], filters: IFilter[], data: IProductRequestData): IReadyFilter[] => {
    console.log('info',productFilters, filters, data)
    let outList: any[] = []
    if(productFilters && filters) {
        for(let j = 0; j < filters.length; j++) {
            for(let i = 0; i < productFilters.length; i++) {
                if(productFilters[i].key === filters[j].translit && productFilters[i].value === filters[j].values.value_translit){
                    if(data.filters.length > 0) {
                        // console.log('getOutFilters data > 0')
                        for(let d = 0; d < data.filters.length; d++) {
                            for(let f = 0; f < data.filters[d].length; f++) {
                                // console.log(data.filters[d][f],filters[j].translit,productFilters[i].value)
                                if(data.filters[d][f].key === filters[j].translit && data.filters[d][f].value === productFilters[i].value) {
                                    outList.push({title: filters[j].title, translit: filters[j].translit, filter:{title: filters[j].values.value_title, translit: productFilters[i].value, count: productFilters[i].count, checked: true}})
                                }
                                // else {
                                //     outList.push({title: filters[j].title, translit: filters[j].translit, filter:{title: filters[j].values.value_title, translit: productFilters[i].value, count: productFilters[i].count, checked: false}})
                                // }
                            }
                        }
                    } else {
                        // console.log('getOutFilters else')
                        outList.push({title: filters[j].title, translit: filters[j].translit, filter:{title: filters[j].values.value_title, translit: productFilters[i].value, count: productFilters[i].count, checked: false}})
                    }
                }
            }
        }
    }
    console.log('outList',outList)
    let readyFilters: IReadyFilter[] = []
    let g = 0
    readyFilters.push({title: outList[0].title, translit: outList[0].translit, filters: [outList[0].filter]})
    for(let i = 1; i < outList.length; i++) {
        if(outList[i].title !== readyFilters[g].title) {
            g++
            readyFilters.push({title: outList[i].title, translit: outList[i].translit, filters: [outList[i].filter]})
        } else if(outList[i].title === readyFilters[g].title){
            readyFilters[g].filters.push(outList[i].filter)
        }

    }
    console.log('getOutFilters', readyFilters)
    return readyFilters
}

const parseQuery = (query: ParsedUrlQuery): IProductRequestData => {
    const data = { category: query.category } as any;
    if (query.sort) {
        const sort = query.sort as string;
        data.sort = sort.split("_");
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


// filterArray.push({title: mainFilters[j].title, translit: mainFilters[j].translit, filter: {title: mainFilters[j].title, translit: mainFilters[j].values.value_translit, count: productFilters[i].count, checked: true}})
