import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {IProduct, IProductResponse, IProducts, ProductPageProps} from '../../types/productTypes'
import {IFilter, IReadyFilter} from '../../types/filterTypes'
import {Carousels, CreateSupportOrder, SubmitOrder} from "../../types/utilTypes";


export const categoryAPI = createApi({
    reducerPath: 'categoryAPI',
    baseQuery: fetchBaseQuery({baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`}),
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
        getProuctsV2: builder.mutation<IProductResponse, { url: string, lastFilter: IReadyFilter | null }>({
            query: ({url, lastFilter}) => ({
                url: `/product/get_products_2${url}`,
                method: 'POST',
                body: {lastFilter}
            })
        }),
        getProductsByIds: builder.mutation<IProduct[], string[]>({
            query: (ids) => ({
                url: 'product/get-products-ids',
                method: 'POST',
                body: {ids}
            })
        }),
        getProductByTranslit: builder.query<ProductPageProps, string>({
            query: (translit) => ({
                url: `product/get_by_translit/${translit}`,
                method: 'GET',
            })
        }),
        searchProducts: builder.query<IProduct[], string>({
            query: (data) => ({
                url: `product/search?request=${data}`,
                method: 'GET'
            })
        })
        ,
        getProductSliders: builder.query<Carousels, null>({
            query: () => ({
                url: '/utils/get-all-swipers',
                method: 'GET'
            })
        }),
        submitOrder: builder.mutation<{ paymentUrl: string }, SubmitOrder>({
            query: (data) => ({
                url: '/payment/create',
                method: 'POST',
                body: data
            })
        }),
        createSupportOrder: builder.mutation<any, CreateSupportOrder>({
            query: (data) => ({
                url: '/support/create-order',
                method: 'POST',
                body: data,
            })
        }),
        orderFail: builder.mutation<any, {OutSum: string, InvId:string}>({
            query: (data) => ({
                url: '/payment/failure',
                method: 'POST',
                body: data,
            })
        }),
    })
})

export const {
    useGetProductsByIdsMutation,
    useGetProductsMutation,
    useLazyGetFiltersQuery,
    useGetProuctsV2Mutation,
    useLazyGetProductByTranslitQuery,
    useLazySearchProductsQuery,
    useLazyGetProductSlidersQuery,
    useSubmitOrderMutation,
    useCreateSupportOrderMutation,
    useOrderFailMutation,
} = categoryAPI
