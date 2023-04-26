import React from "react";
import { IProduct } from "../../../types/productTypes";

export default function SwiperProductCart({product}: {product: IProduct}) {
  const {images, discount, title, currently_price} = product
  return (
    <>
      <div className="card">
        {/* <!-- Верхняя часть --> */}
        <div className="card__top">
          {/* <!-- Изображение-ссылка товара --> */}
          <a href="#" className="card__image">
            <img
              src={`${process.env.API_URL}/productImages/${images[0]}`}
              alt={title}
            />
          </a>
          {/* <!-- Скидка на товар --> */}
          {discount && <div className="card__label">-{discount.discount}%</div>}
        </div>
        {/* <!-- Нижняя часть --> */}
        <div className="card__bottom">
          {/* <!-- Цены на товар (с учетом скидки и без)--> */}
          <div className="card__prices">
            {discount && <div className="card__price card__price--discount">{(currently_price * (1 - (discount.discount / 100))).toFixed(2)}</div>}
            <div className="card__price card__price--common">{currently_price}</div>
          </div>
          {/* <!-- Ссылка-название товара --> */}
          <a href="#" className="card__title">
            {title}
          </a>
          {/* <!-- Кнопка добавить в корзину --> */}
          <button className="card__add">В корзину</button>
        </div>
      </div>
    </>
  );
}

// <div className='product-item'>
//         <div className="product-item__container">
//             <div className="product-item__body">
//                 <div className="product-item__image item-image">
//                     <div className="item-image__container">
//                         <a className='item-image__href' href='#'>
//                             <img className='item-image__img' src='https://cdn.citilink.ru/87VypeB1r3yjayx66XLCZOATi0BzMlQmnTyNMTDWAA4/resizing_type:fit/gravity:sm/width:1200/height:1200/plain/items/420251_v01_b.jpg'></img>
//                         </a>
//                     </div>
//                 </div>
//                 <div className="product-item__title">
//                     <a className='product-item__href' href='#'>Title</a>
//                 </div>
//                 <div className="product-item__actions item-actions">
//                     <div className="item-actions__favorite">
//                         <button>Favorite</button>
//                         <button>Sravnit</button>
//                     </div>
//                     <div className="item-actions__cart">
//                         <button>Add to cart</button>
//                     </div>
//                     <div className="item-actions__price">
//                         <button className='price'>14563</button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </div>
