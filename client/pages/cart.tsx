import React, {useEffect, useState} from 'react';
import {useGetProductsByIdsMutation} from "../common/store/api/categoryAPI";
import {CartProduct, IProduct} from "../common/types/productTypes";
import {useRouter} from 'next/router';
import CartProductList, {ICartProduct} from "../common/shared/ui/CartProductList/CartProductList";
import {Skeleton} from "antd";
import {Text, TextColor} from "../common/shared/ui/Text/Text";
import {Button} from "../common/shared/ui/Button/Button";
import Head from "next/head";

export interface OrderProduct extends IProduct {
    count: number
}

const Cart: React.FC = () => {
    const [cartItems, setCartItems] = useState<CartProduct[]>([]);
    const [cartProducts, setCartProducts] = useState<ICartProduct[]>([]);
    const [getProducts, {data, isLoading, isSuccess, isError, error}] = useGetProductsByIdsMutation()
    const router = useRouter()
    let productIds: CartProduct[] = []
    useEffect(() => {
        productIds = JSON.parse(localStorage.getItem('cart') || '[]');
        setCartItems(productIds);
        getProducts(productIds.map(prod => prod.id))
    }, []);
    useEffect(() => {
        if (data && isSuccess) {
            let arr: ICartProduct[] = []
            data.forEach(item => {
                cartItems.forEach((_item => {
                    if (item.id === _item.id && item.stock_status !== 'Нет в наличии') {
                        arr.push({
                            id: item.id,
                            count: _item.count,
                            discount: item.discount,
                            image: item.images[0],
                            price: item.currently_price,
                            title: item.title,
                            length: item.length,
                            width: item.width,
                            height: item.height,
                            weight: item.weight,
                        })
                    }
                }))

            })
            setCartProducts(arr)
        }
    }, [data, isSuccess])
    const handleRemoveFromCartClick = (productId: string) => {
        const updatedCart = cartProducts.filter((item) => item.id !== productId);
        let cart: CartProduct[] = JSON.parse(localStorage.getItem('cart') || '[]');
        cart = cart.filter(product => product.id !== productId)
        localStorage.setItem('cart', JSON.stringify(cart));
        setCartProducts(updatedCart);
    };
    const handleSubCountProduct = (productId: string) => {
        const updatedCartItems = cartItems.map((item) => item.id === productId ? {
            ...item,
            count: item.count - 1
        } : {...item});
        localStorage.setItem('cart', JSON.stringify(updatedCartItems));
        setCartItems(updatedCartItems);
    };
    const handleAddCountProduct = (productId: string) => {

        const updatedCartItems = cartItems.map((item) => item.id === productId ? {
            ...item,
            count: item.count + 1
        } : {...item});
        localStorage.setItem('cart', JSON.stringify(updatedCartItems));
        setCartItems(updatedCartItems);
    };


    return (
        <div className={'_container'}>
            <Head>
                <title>Корзина товаров</title>
            </Head>
            <h1>Корзина</h1>
            {isLoading && [0, 1, 2, 3, 4, 5].map(item => <div style={{
                width: 270,
                marginTop: 24,
                marginLeft: 24,
                border: '1px #E0E0E0 solid',
                borderRadius: 12,
                padding: 12,
                boxSizing: 'border-box'
            }}
                                                              key={item}>
                <Skeleton.Image style={{width: 200, height: 200}} active={true}/>
                <Skeleton style={{marginTop: 14}} active={true} paragraph={{rows: 3}}/>
                <Skeleton.Button style={{marginTop: 14}} active={true}/>
            </div>)}

            {(cartProducts && cartProducts.length > 0) ? <CartProductList products={cartProducts}/> :
                <div className={'empty-cart__container'}>
                    <div className={'empty-cart'}>
                        <div className={'empty-cart__image'}>
                            <img className={'empty-cart__image_img'} src={"./empty-cart.png"} alt={'cart empty'}/>
                        </div>
                        <div className={'empty-cart__title'}>
                            <Text color={TextColor.GRAY}
                                  text={'К сожалению, ваша корзина пуста. Вы можете начать покупки, добавляя товары в корзину из нашего каталога.'}/>
                        </div>
                        <div className={'empty-cart__button'}>
                            <Button onClick={() => router.push('/')}>Каталог</Button>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default Cart;


