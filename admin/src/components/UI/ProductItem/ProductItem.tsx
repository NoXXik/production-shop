import React from "react";
import {IProduct} from "../../../types/productTypes";
import {Link} from "react-router-dom";
import {isDiscountValid, priceWithDiscount} from "../../../utils/helpers/isDiscountValid";
import {Products} from "../../../types/orderTypes";


export default function ProductItem(props: { product: Products }) {
    const {
        id,
        title,
        currently_price,
        images,
        characteristics,
        description,
        files,
        vendor_code,
        stock_status,
        rating,
        new_label,
        hit_label,
        title_translit,
        category_name,
        UserOrderRefProduct,
    } = props.product
    const {discount, quantity, cost, sum} = UserOrderRefProduct
    return (
        <>
            <li className="product-item product-wrapper">
                <div className="product__image">
                    <div className="product__image-link">
                        <img src={`${process.env.API_URL}/productImages/${images[0]}`}
                             alt="" className="product__image-img"/>
                    </div>
                </div>
                {(discount) ? <>
                        <div className="product__discount">
                            <span className="product__discount-label discount-label">-{discount.discount}%</span>
                        </div>
                        <p>{title}</p>
                        <div className="product__price-wrapper">
                            <div className="product__price">
                                {priceWithDiscount(currently_price, discount.discount)} ₽
                                {discount && <span className="product__price-prev">{currently_price} ₽</span>}
                            </div>
                        </div>
                    </>
                    :
                    <>
                        <div className="product__discount">

                        </div>
                        <p>{title}</p>
                        <div className="product__price-wrapper">
                            <div className="product__price">
                                {currently_price} ₽
                            </div>
                        </div>
                    </>
                }
            </li>
        </>
    )
}
