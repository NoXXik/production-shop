import React from "react";
import { INavbarCategory } from "../../types/categoryTypes";
import Link from "next/link";
import {AppLink, AppLinkTheme} from "../../shared/ui/Link/Link";
import {Button, ButtonTheme} from "../../shared/ui/Button/Button";
import {isDiscountValid, priceWithDiscount} from "../../utils/isDiscountValid";
import AddToCart from "../AddToCart/AddToCart";
import * as process from "process";


export default function CategoryList({categories}: {categories: INavbarCategory[] | null}){
    return (
        <>
            <div className="category-list-block">
                <div className="category-list">
                    {categories && categories.map(category =>
                    <React.Fragment key={category.id}>
                        <div className="category">
                            <AppLink href={`/catalog/${category.translit}`}>
                                <img src={`${process.env.NEXT_PUBLIC_STATIC_URL}/categoryImages/${category.image}`} alt={category.title} />
                                <span>{category.title}</span>
                            </AppLink>
                        </div>
                    </React.Fragment>)}
                </div>
            </div>
        </>
    )
}
