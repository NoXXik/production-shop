import Head from "next/head";
import {useGetProductsByIdsMutation} from "../common/store/api/categoryAPI";
import {useRouter} from "next/router";
import {CartProduct} from "../common/types/productTypes";
import {useEffect, useState} from "react";
import {ICartProduct} from "../common/shared/ui/CartProductList/CartProductList";
import ProductList from "../common/components/ProductList/ProductList";
import {Text} from "../common/shared/ui/Text/Text";

export default function Favorite() {
    const [getProducts, {data, isLoading, isSuccess, isError, error}] = useGetProductsByIdsMutation()
    const [active, setActive] = useState(false)
    const router = useRouter()
    let productIds: string[] = []
    useEffect(() => {
        productIds = JSON.parse(localStorage.getItem('favorite') || '[]');
        getProducts(productIds.map(prod => prod))
    }, []);
    // useEffect(() => {
    //     if (data && isSuccess) {
    //
    //         setCartProducts(arr)
    //     }
    // }, [data, isSuccess])
    return (
        <>
            <Head>
                <title>Избранные товары</title>
            </Head>
            <Text title={'Избранные товары'}/>
            {data && <ProductList isLoading={isLoading}
                                  products={data}
                                  router={router}
                                  count={1}
                                  sortB={false}
                                  paginationB={false}
            />}

        </>
    )
}
