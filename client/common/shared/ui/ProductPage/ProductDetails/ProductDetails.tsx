import {IProductDiscount} from "../../../../types/productTypes";
import React, {memo} from "react";
import {Text, TextSize} from "../../Text/Text";
import {isDiscountValid, priceWithDiscount} from "../../../../utils/isDiscountValid";
import AddToCart from "../../../../components/AddToCart/AddToCart";
import AddToListModule from "../../../../components/AddToList/AddToList";
import cls from "./ProductDetails.module.scss";

export const ProductDetails = memo(({discount, price, title, id, stock_status, vendor_code}: {title: string, price: number, discount: IProductDiscount | null, id: string, stock_status: string, vendor_code: string}) => {
    let validDiscount = false
    if(discount) {
        validDiscount = isDiscountValid(discount.startDate, discount.expirationDate)
    }

    return (
        <div className={cls.details__block}>
            <h1 className={cls.details__title}>{title}</h1>
            <Text className={cls.details__vendor} size={TextSize.SIZE_L} text={`Артикул: ${vendor_code}`} />
            <div className={cls.details__price}>
                {(discount && validDiscount && stock_status === 'В наличии') ?
                    <>
                        <div className={cls.details__price_discount}>
                            <span className={cls.discount_price}>{price}</span>
                            <span className={cls.discount_label}>-{discount.discount}%</span>
                        </div>
                        <div className={cls.details__price_cur}>
                            <Text title={`${priceWithDiscount(price, discount.discount)} ₽`} />
                        </div>
                    </>
                    :
                    <div className={cls.details__price_cur}>
                        <Text title={`${price} ₽`} />
                    </div>
                }
                {stock_status === 'Нет в наличии' && <>
                    <div className={cls.details__price_cur}>
                        <Text title={`${stock_status}`} />
                    </div>
                </>}
                {stock_status === 'Под заказ' && <>
                    <div className={cls.details__price_cur}>
                        <Text title={`${stock_status}`} />
                    </div>
                </>}
            </div>
            <div className={cls.details__buttons}>
                <AddToCart disabled={stock_status === 'Нет в наличии'? true: false} className={cls.details__cart_button} id={id}></AddToCart>
                <AddToListModule className={cls.details__compare_button} id={id} list={"compare"}></AddToListModule>
                <AddToListModule className={cls.details__favorite_button} id={id} list={"favorite"}></AddToListModule>
            </div>
        </div>
    )
})
