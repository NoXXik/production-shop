import React from "react";
import { INavbarCategory } from "../../types/categoryTypes";
import Link from "next/link";


export default function CategoryList({categories}: {categories: INavbarCategory[] | null}){
    return (
        <>
            <div className="category-list__body">
                <ul className="category-list__item category-item">
                    {categories && categories.map(category => 
                    (category.level === 2 || (category.level === 1 && category.is_leaf === true))
                    && 
                    <React.Fragment key={category.id}>
                        <li className="category-item__body">
                            <div className="category-item__content">
                                <img className="category-item__image" width={80} height={80} src='https://optimus-cctv.ru/images/prev/db4f827455d158594308322e4dd11327_s80x80.png'></img>
                                <Link className="category-item__link _link" href={`/catalog/${category.translit}`}>{category.title}</Link>
                            </div>
                        </li>
                    </React.Fragment>)}
                    {/* <div className="category-item__body">
                        <img className="category-item__image"></img>
                        <a className="category-item__link _link"></a>
                    </div> */}
                </ul>
            </div>
        </>
    )
}