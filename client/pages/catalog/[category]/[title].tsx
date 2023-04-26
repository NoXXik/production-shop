import {
    ProductPageProps
} from "../../../common/types/productTypes";
import {useEffect, useState} from "react";
import {useLazyGetProductByTranslitQuery} from "../../../common/store/api/categoryAPI";
import {useRouter} from "next/router";
import {NextPageContext} from "next/types";
import axios from "axios";
import ProductPageComp from "../../../common/shared/ui/ProductPage/ProductPageComp";
import {Skeleton} from "antd";
import Head from "next/head";
import {isDiscountValid, priceWithDiscount} from "../../../common/utils/isDiscountValid";

export default function ProductPage({product}: { product: ProductPageProps | null }) {
    const router = useRouter()
    const [getProduct, {data, isSuccess, isLoading, isError}] = useLazyGetProductByTranslitQuery()
    useEffect(() => {
        if(!product) {
            const req = new RegExp('(/catalog/[\\s\\S]+/)')
            const title = router.asPath.replace(req, '')
            getProduct(title)
        }
    }, [])
    useEffect(() => {
        if(!product || (product && product.title_translit !== router.query.title)) {
            const req = new RegExp('(/catalog/[\\s\\S]+/)')
            const title = router.asPath.replace(req, '')
            getProduct(title)
        }
    }, [router.query])
    if(isLoading) {
        return (
            <div className="_container">
                <Skeleton.Image active={true} style={{width: '100%', maxWidth: '400px', height: '200px'}}/>
                <Skeleton style={{marginTop: 44}} active={true} paragraph={{rows: 3}} title={true} />
                <Skeleton style={{marginTop: 44}} active={true} paragraph={{rows: 3}} title={true} />

                {/*<Skeleton.Image/>*/}
            </div>
        )
    }
    if(data) {
        product = data
    }
    if(!product) {
        <h1>Данного товара не существует</h1>
    }
    let availability = 'SoldOut'
    let price = product?.currently_price

    if (product && product.stock_status === 'В наличии') {
        availability = 'InStock'
    } else if (product && product.stock_status === 'Нет в наличии') {
        availability = 'SoldOut'
    } else if (product && product.stock_status === 'Под заказ') {
        availability = 'PreOrder'
    }

    if (product && product.discount && isDiscountValid(product.discount.startDate, product.discount.expirationDate)) {
        price = Number(priceWithDiscount(product.currently_price, product.discount.discount));
    }
    return (
        <>
            <Head>
                <title>{product?.meta_title}</title>
                <meta name="description"
                      content={product?.meta_description}/>

                <script type="application/ld+json" dangerouslySetInnerHTML={{
                    __html:
                        `{
  "@context": "https://schema.org",
  "@type": "Product",
  "description": ${product?.meta_description},
  "name": ${product?.title},
  "image": ${product?.images[0] || ''},
  "offers": {
    "@type": "Offer",
    "availability": "https://schema.org/${availability}",
    "price": ${price},
    "priceCurrency": "RUB"
  }
}`
                }}
                />

            </Head>
            <div className="_container">
                {product && <ProductPageComp product={product}/>}
            </div>
        </>

    )
}


ProductPage.getInitialProps = async ({req}: NextPageContext) => {
    if (!req) {
        return {product: null}
    }
    const reg = new RegExp('(/catalog/[\\s\\S]+/)')
    const title = req?.url?.replace(reg, '')
    if (title) {
        const response = (await axios.get(`${process.env.API_URL}/api/product/get_by_translit/${title}`)).data as ProductPageProps
        return {product: response}
    }

}
