import {ProductPageProps} from "../../../types/productTypes";
import React from "react";
import cls from "./ProductPageComp.module.scss"
import Gallery from "../Galery/Galery";
import {ProductSlider} from "../ProductSlider/ProductSlider";
import {ProductDetails} from "./ProductDetails/ProductDetails";
import {ProductCharacteristic} from "./ProductCharacteristic/ProductCharacteristic";
import {Text, TextSize} from "../Text/Text";

export default function ProductPageComp({product}:{product: ProductPageProps}) {
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
        RelProducts,
    } = product
    return (
        <div className={cls.productPage}>
            <div className={cls.productPage__row}>
                <div className={cls.productPage__gallery}>
                    <Gallery images={images} alt={title} />
                </div>
                <div className={cls.productPage__details}>
                    <ProductDetails vendor_code={vendor_code} stock_status={stock_status} title={title} price={currently_price} discount={discount} id={id} />
                </div>
            </div>
            <div className={cls.productPage__info}>
                <div className={cls.productPage__description}>
                    <h2>Описание</h2>
                    <Text text={description} size={TextSize.SIZE_L} />
                </div>
                {(characteristics && characteristics.length > 0) && <div className={cls.productPage__characteristics}>
                    <h2>Характеристики</h2>
                    <ProductCharacteristic features={characteristics}/>
                </div>}

            </div>
            {(RelProducts && RelProducts.length > 0) && <div className={cls.productPage__recommended}>
                <h2>Рекомендуемые товары</h2>
                <div className={cls.productPage__carousel}>
                    <ProductSlider products={RelProducts}/>
                </div>
            </div>}
        </div>
    )
}
