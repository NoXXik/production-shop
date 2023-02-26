import React from "react";
import {IProduct} from "../../../types/productTypes";
import {Rate} from "antd";
import Image from 'next/image';


export default function ProductItem(props: { product: IProduct }) {
    const {
        id,
        title,
        currently_price,
        images,
        discount,
        characteristics,
        description,
        files,
        vendor_code,
        stock_status,
        rating,
        new_label,
        hit_label
    } = props.product
    return (
        <>
            <li className="product-item product-wrapper">
                <div className="product__image">
                    <a className="product__image-link">
                        <Image src={`http://smarthome16.ru:5000/productImages/${images[0]}`} fill
                               alt="" className="product__image-img"/>
                    </a>
                    <div className="product__image-labels">
                    </div>
                </div>
                <a className="product__name _link">
                    <span>{title}</span>
                </a>
                <div className="product__stat">
                        <span className="compare-checkbox">
                            <label htmlFor={String(id)}>
                                <span className="filter-chekbox">
                                    <input id={String(id)} type="checkbox" className="filter-checkbox__input _form-checkbox"/>
                                    <span className="filter-chekbox__chek-mark _chek-mark _icon-checkmark3">
                                </span>
                                </span>
                                <span>Сравнить</span>
                            </label>
                        </span>
                    <a href="" className="product__rating">
                        <span><Rate disabled defaultValue={rating}/></span>
                    </a>
                </div>
                <div className="product__price-wrapper">
                    <div className="product__price">
                        {currently_price} ₽
                        {discount && <span className="product__price-prev">{(currently_price*((100-discount.discount)/100)).toFixed(0)}</span>}
                    </div>
                    <button className="_button-gray favorite-btn _icon-favorite"></button>
                    <button className="_button-gray buy-btn _icon-cart"></button>
                </div>
            </li>
        </>
    )
}
