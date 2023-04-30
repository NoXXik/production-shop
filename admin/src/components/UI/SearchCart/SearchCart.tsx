import React from 'react'
import { IProduct } from '../../../types/productTypes'

import './SearchCart.scss'

export default function SearchCart({props}: {props: IProduct}) {
    const {title, currently_price, stock_count, vendor_code, images} = props

  return (
    <div className='product-item'>
        <div className="product-image">
            <img src={`${import.meta.env.VITE_API_URL}/productImages/${images[0]}`} alt={title} className="product-img" />
        </div>
        <div className="product-content">
            <span className="product-title">{title}</span>
            <span className="product-price">Цена: {currently_price}</span>
            <span className="product-stock">Остаток: {stock_count}</span>
            <span className="product-vandor">Артикул: {vendor_code}</span>
        </div>
    </div>
  )
}
