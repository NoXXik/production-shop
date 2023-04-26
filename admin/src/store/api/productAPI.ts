
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {
    CreateTemplate,
    ICategory,
    IFilter,
    IProductCreateData,
    ProductPageProps, ProductTemplate,
    UpdateProductDataProps
} from '../../types/productTypes'
import {ICreateCategoryData, IHierarchyCategory} from "../../types/categoryTypes";
import {FilterValues, IFilterCreateData} from "../../types/filterTypes";
import {DeliveryStatus, Order, OrderListResponse} from "../../types/orderTypes";
import {
    AdminData,
    AuthResponse,
    ChangeStatusSupportOrder,
    CreateAdminData,
    ISwiper, SupportOrder,
    SupportOrderResponse
} from "../../types/utilTypes";
import {RootState} from "../index";
import {baseQueryWithReauth} from "./baseQuery";

export const productAPI = createApi({
    reducerPath: 'productApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['HCats', 'Filters', 'Categories', "Swipers", 'Admin', 'SupportOrders'],
    endpoints: (build) => ({
        getCategories: build.query<ICategory[], any>({
            query: () => ({
                url: '/category/all',
                method: "GET"
            }),
            providesTags: ['Categories']
        }),
        getHierarchyCategorys: build.query<IHierarchyCategory[], any>({
            query: () => ({
                url: '/category',
                method: "GET"
            }),
            providesTags: ['HCats'],
        }),
        createCategory: build.mutation<any, ICreateCategoryData>({
            query: (data) => ({
                url: '/category',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['HCats', "Categories"],
        }),
        addFilterCategory: build.mutation<any, {category_id: number, filter_id: number}>({
            query: (data) => ({
                url: '/category/add-filter',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['HCats', 'Categories'],
        }),

        deleteCategory: build.mutation<any, { id: number }>({
            query: (data) => ({
                url: '/category',
                method: 'DELETE',
                body: data
            }),
            invalidatesTags: ['HCats'],
        }),
        getFilters: build.query<IFilter[], void>({
            query: () => ({
                url: '/filter/getFilters',
            }),
            providesTags: ['Filters'],
        }),
        createFilter: build.mutation<any, IFilterCreateData>({
            query: (data) => ({
                url: '/filter',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Filters'],
        }),
        deleteFilter: build.mutation<any, {id: number}>({
            query: (data) => ({
                url: '/filter',
                method: 'DELETE',
                body: data
            }),
            invalidatesTags: ['Filters']
        }),
        addToFilter: build.mutation<any, { id: number, values: FilterValues[] }>({
            query: (data) => ({
                url: '/filter/update',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Filters']
        }),
        createProduct: build.mutation<any, IProductCreateData>({
            query: (data) => ({
                url: '/product',
                method: 'POST',
                body: data
            })
        }),
        getOrders: build.mutation<OrderListResponse, {limit: number, page: number}>({
            query: (data) => ({
                url: '/order/get-all',
                method: 'POST',
                body: data,
            })
        }),
        setDeliveryStatus: build.mutation<Order, {invId: string, status: DeliveryStatus}>({
            query: (data) => ({
                url: '/order/set-delivery-status',
                method: 'POST',
                body: data,
            })
        }),
        getOrderById: build.query<Order, string>({
            query: (id) => ({
                url: `order/get-by-id/${id}`,
                method: 'GET',
            })
        }),
        getProductByTranslit: build.query<ProductPageProps, string>({
            query: (translit) => ({
                url: `product/get_by_translit/${translit}`,
                method: 'GET',
            })
        }),
        updateProduct: build.mutation<any, UpdateProductDataProps>({
            query: (data) => ({
                url: 'product/update-product',
                method: 'POST',
                body: data
            })
        }),
        createTemplate: build.mutation<any, CreateTemplate>({
            query: (data) => ({
                url: 'template/create',
                method: 'POST',
                body: data,
            })
        }),
        getTemplates: build.query<ProductTemplate[], any>({
            query: () => ({
                url: 'template/get-templates'
            })
        }),
        deleteTemplate: build.query<any, number>({
            query: (id) => ({
                url: `template/delete/${id}`,
                method: 'DELETE'
            })
        }),
        deleteProduct: build.query<any, string>({
            query: (id) => ({
                url: `product/delete/${id}`,
                method: 'DELETE'
            })
        }),
        createSwiper: build.mutation<any, {title: string, products: string[]}>({
            query: (data) => ({
                url: 'utils/create-swiper',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Swipers']
        }),
        getSwipers: build.query<ISwiper[], any>({
            query: () => ({
                url: 'utils/get-all-swipers',
                method: 'GET'
            }),
            providesTags: ['Swipers']
        }),
        deleteSwiper: build.mutation<any, number>({
            query: (id) => ({
                url: `utils/delete-swiper/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Swipers']
        }),
        updateSwiper: build.mutation<any, {title: string, products: string[], id: number}>({
            query: (data) => ({
                url: 'utils/update-swiper',
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: ['Swipers']
        }),
        loginAdmin: build.mutation<AuthResponse, {login: string, password: string}>({
            query: (data) => ({
                url: 'admin/login',
                method: 'POST',
                body: data
            })
        }),
        createAdmin: build.mutation<any, CreateAdminData>({
            query: (data) => ({
                url: 'admin/create',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Admin']
        }),
        getAllAdmins: build.query<AdminData[], any>({
            query: () => ({
                url: 'admin/get-all',
                method: 'GET'
            }),
            providesTags: ['Admin']
        }),
        deleteAdminById: build.mutation<any, string>({
            query: (id) => ({
                url: `admin/delete/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Admin']
        }),
        changeStatusSupportOrder: build.mutation<SupportOrder, ChangeStatusSupportOrder>({
            query: (data) => ({
                url: '/support/change-order-status',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['SupportOrders']
        }),
        getAllSupportOrders: build.query<SupportOrderResponse, any>({
            query: () => ({
                url: '/support/get-orders',
            }),
            providesTags: ['SupportOrders']
        })
    }),
})

export const {
    useGetCategoriesQuery,
    useGetHierarchyCategorysQuery,
    useCreateCategoryMutation,
    useDeleteCategoryMutation,
    useGetFiltersQuery,
    useDeleteFilterMutation,
    useAddToFilterMutation,
    useCreateFilterMutation,
    useAddFilterCategoryMutation,
    useLazyGetCategoriesQuery,
    useCreateProductMutation,
    useGetOrdersMutation,
    useSetDeliveryStatusMutation,
    useLazyGetOrderByIdQuery,
    useLazyGetProductByTranslitQuery,
    useUpdateProductMutation,
    useCreateTemplateMutation,
    useLazyGetTemplatesQuery,
    useLazyDeleteTemplateQuery,
    useLazyDeleteProductQuery,
    useGetSwipersQuery,
    useDeleteSwiperMutation,
    useCreateSwiperMutation,
    useUpdateSwiperMutation,
    useLoginAdminMutation,
    useGetAllAdminsQuery,
    useDeleteAdminByIdMutation,
    useCreateAdminMutation,
    useChangeStatusSupportOrderMutation,
    useLazyGetAllSupportOrdersQuery,
} = productAPI
