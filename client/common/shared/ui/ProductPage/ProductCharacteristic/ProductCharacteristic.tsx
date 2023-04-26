import {IProductCharacteristic, ProductPageProps} from "../../../../types/productTypes";
import cls from "../ProductCharacteristic/ProductCharacteristic.module.scss";
import React, {memo} from "react";

export const ProductCharacteristic = memo(({features}: { features: IProductCharacteristic[] }) => {

    return (
        <div className={cls.features__block}>
            <ul className={cls.feature__list}>
                {features && features.map(feature =>
                    <li className={cls.feature__item} key={feature.title}>
                        <span className={cls.feature__name}>{feature.title}</span>
                        <span className={cls.feature__value}>{feature.value}</span>
                    </li>)}
            </ul>
        </div>
    )
})
