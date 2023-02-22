import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IProductResponse, IProducts } from '../../types/productTypes'
import { IFilter, IReadyFilter } from '../../types/filterTypes'


export const categoryAPI = createApi({
    reducerPath: 'categoryAPI',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5000/api'}),
    endpoints: builder => ({
        getProducts: builder.mutation<IProducts, any>({
            query: (data) => ({
                url: '/product/get_products',
                method: "POST",
                body: data
            })
        }),
        getFilters: builder.query<IFilter[], any>({
            query: () => ({
                url: '/filter/getAll',
            })
        }),
        getProuctsV2: builder.mutation<IProductResponse, {url: string, lastFilter: IReadyFilter | null}>({
            query: ({url, lastFilter}) => ({
                url: `/product/get_products_2${url}`,
                method: 'POST',
                body: {lastFilter}
            })
        })
    })
})

export const {useGetProductsMutation, useLazyGetFiltersQuery, useGetProuctsV2Mutation} = categoryAPI