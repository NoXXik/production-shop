import React from "react";
import {IProduct} from "../../../types/productTypes";
import AddToCart from "../../AddToCart/AddToCart";
import {Button, ButtonTheme} from "../../../shared/ui/Button/Button";
import {AppLink, AppLinkTheme} from "../../../shared/ui/Link/Link";
import {isDiscountValid, priceWithDiscount} from "../../../utils/isDiscountValid";


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
        hit_label,
        title_translit,
        category_name,
    } = props.product
    return (
        <>
            <li className="product-item product-wrapper">
                <div className="product__image">
                    <AppLink href={`/catalog/${category_name}/${title_translit}`} className="product__image-link">
                        <img src={`${process.env.NEXT_PUBLIC_STATIC_URL}/productImages/${images[0]}`}
                               alt="" className="product__image-img"/>
                    </AppLink>
                    {(hit_label || new_label) && <div className="product__image-labels">
                        {hit_label && <div className="product__image-label hit-label">
                            <img src="/label-hit.svg" alt={'label hit'} />
                        </div>}
                        {new_label && <div className="product__image-label new-label">
                             <img src="/label-new.svg" alt={'label new'} />
                        </div>}
                    </div>}
                    <div className="product__image-buttons">
                        <div className="product__image-button favorite-button">
                            <Button theme={ButtonTheme.CLEAR} icon={'_icon-favorite'}></Button>
                        </div>
                        <div className="product__image-button compare-button">
                            <Button theme={ButtonTheme.CLEAR} icon={'_icon-compare'}></Button>
                        </div>
                    </div>
                </div>
                {stock_status === 'В наличии' && <>{(discount && isDiscountValid(discount.startDate, discount.expirationDate)) ?
                    <>
                        <div className="product__discount">
                            <span className="product__discount-label discount-label">-{discount.discount}%</span>
                        </div>
                        <AppLink theme={AppLinkTheme.SECONDARY} className="product__name" href={`/catalog/${category_name}/${title_translit}`} ><p>{title}</p></AppLink>
                        <div className="product__price-wrapper">
                            <div className="product__price">
                                {priceWithDiscount(currently_price, discount.discount)} ₽
                                {discount && <span className="product__price-prev">{currently_price} ₽</span>}
                            </div>
                            <AddToCart square={true} className="product__price-cart buy-btn cart-button" id={id} />
                        </div>
                    </>
                    :
                    <>
                        <div className="product__discount">

                        </div>
                        <AppLink theme={AppLinkTheme.SECONDARY} className="product__name" href={`/catalog/${category_name}/${title_translit}`} ><p>{title}</p></AppLink>
                        <div className="product__price-wrapper">
                            <div className="product__price">
                                {currently_price} ₽
                            </div>
                            <AddToCart square={true} className="product__price-cart buy-btn cart-button" id={id} />
                        </div>
                    </>
                }</>
                }
                {stock_status === 'Нет в наличии' && <>
                    <div className="product__discount">

                    </div>
                    <AppLink theme={AppLinkTheme.SECONDARY} className="product__name" href={`/catalog/${category_name}/${title_translit}`} ><p>{title}</p></AppLink>
                    <div className="product__price-wrapper">
                        <div className="product__price">
                            {stock_status}
                        </div>
                        {/*<AddToCart disabled={true} square={true} className="product__price-cart buy-btn cart-button" id={id} />*/}
                    </div>
                </>}
                {stock_status === 'Под заказ' && <>
                    <div className="product__discount">

                    </div>
                    <AppLink theme={AppLinkTheme.SECONDARY} className="product__name" href={`/catalog/${category_name}/${title_translit}`} ><p>{title}</p></AppLink>
                    <div className="product__price-wrapper">
                        <div className="product__price">
                            {stock_status}
                        </div>
                        <AddToCart square={true} className="product__price-cart buy-btn cart-button" id={id} />
                    </div>
                </>}

            </li>
        </>
    )
}
