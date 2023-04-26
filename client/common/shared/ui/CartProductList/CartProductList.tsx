import React, {useEffect, useState} from "react";
import cls from "./CartProductList.module.scss"
import {IProductDiscount} from "../../../types/productTypes";
import QuantityControllButton from "../QuantityControllButton/QuantityControllButton";
import AddToList from "../../../components/AddToList/AddToList";
import {Button, ButtonSize, ButtonTheme} from "../Button/Button";
import {Text, TextColor, TextSize} from "../Text/Text";
import {discountValue, isDiscountValid, priceWithDiscount} from "../../../utils/isDiscountValid";
import {useRouter} from "next/router";
import {useAppDispatch} from "../../../hooks/redux/reduxHooks";
import {setProducts} from "../../../store/slices/cartSlice";

export interface ICartProduct {
    id: string;
    image: string;
    title: string;
    price: number;
    count: number;
    discount: IProductDiscount;
    length: number;
    width: number;
    height: number;
    weight: number;
}

interface Props {
    products: ICartProduct[];
}

const ShoppingCart: React.FC<Props> = ({products}) => {
    const [cartItems, setCartItems] = useState<ICartProduct[]>(products)
    const [totalDiscount, setTotalDiscount] = useState<number>(0)
    const [totalCount, setTotalCount] = useState<number>(0)
    const [totalSum, setTotalSum] = useState<number>(0)
    const dispatch = useAppDispatch()
    const router = useRouter()
    // useEffect(() => {
    //
    // }, [])
    const handleRemoveFromCart = (id: string) => {
        setCartItems(cartItems.filter(item => item.id !== id))
    }
    const handleChangeCount = (id: string, newCount: number) => {
        const updatedCartItems = cartItems.map((item) =>
            item.id === id ? {...item, count: newCount} : item
        );
        setCartItems(updatedCartItems);
    }
    useEffect(() => {
        console.log('use effect cart items')
        let array: { id: string, count: number }[] = []
        cartItems.forEach(item => {
            array.push({id: item.id, count: item.count})
        })
        localStorage.setItem("cart", JSON.stringify(array));
        let count = 0
        let discount = 0
        let summ = 0
        cartItems.forEach(item => {
            count += item.count

            if(item.discount && isDiscountValid(item.discount.startDate, item.discount.expirationDate)){
                discount += Number(discountValue(item.price, item.discount.discount)) * item.count
                summ += Number(priceWithDiscount(item.price, item.discount.discount)) * item.count
            } else {
                summ += item.price * item.count
            }
        })
        setTotalSum(summ)
        setTotalDiscount(discount)
        setTotalCount(count)
    }, [cartItems]);

    const handleSubmit = () => {
        if(cartItems.length > 0) {
            dispatch(setProducts(cartItems))
            router.push('/submit-order')
        }

    }


    if(cartItems.length < 1) {
        return (
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
        )
    }

    return (
        <div className={cls.cartProductListContainer}>
            <div className={cls.cartProductList}>
                {cartItems && cartItems.map(item => <div key={item.id} className={cls.cartProductItem}>
                    <div className={cls.cartItemImage}><img className={cls.cartItemImage_img}
                                                            src={`http://localhost:5000/productImages/${item.image}`}/>
                    </div>
                    <div className={cls.column}>
                        <div className={cls.cartItemTitle}>
                            <Text title={`${item.title}`}/>
                        </div>
                        <div className={cls.cartItemPrice}>{(item.discount && isDiscountValid(item.discount.startDate, item.discount.expirationDate)) ?
                            <>
                                <div className={cls.details__price_discount}>
                                    <span className={cls.discount_price}>{item.price}</span>
                                    <span className={cls.discount_label}>-{item.discount.discount}%</span>
                                </div>
                                <div className={cls.details__price_cur}>
                                    <Text size={TextSize.SIZE_XL} text={`Цена ${priceWithDiscount(item.price, item.discount.discount)} ₽`}/>
                                </div>
                            </>
                            :
                            <div className={cls.details__price_cur}>
                                <Text size={TextSize.SIZE_XL} text={`Цена ${item.price} ₽`}/>
                            </div>
                        }</div>
                        <div className={cls.cartItemButtons}>
                            <AddToList className={cls.favoriteButton} id={item.id} list={'favorite'}/>
                            <Button onClick={() => handleRemoveFromCart(item.id)} className={cls.deleteButton}
                                    size={ButtonSize.XL} icon={'_icon-delete'} theme={ButtonTheme.CLEAR}></Button>
                        </div>
                    </div>
                    <QuantityControllButton className={cls.cartItem__countButton} id={item.id} quantity={item.count} onQuantityChange={handleChangeCount}/>
                    {(item.discount && isDiscountValid(item.discount.startDate, item.discount.expirationDate))
                        ? <div className={cls.cartItemTotalPrice}>
                            <Text title={`${Number(priceWithDiscount(item.price, item.discount.discount)) * item.count} ₽`}/>
                        </div>
                        : <div className={cls.cartItemTotalPrice}>
                            <Text title={`${item.price * item.count} ₽`}/>
                        </div>
                    }
                </div>)
                }
            </div>
            <div className={cls.cartDetails}>
                <div className={cls.cartDetails__title}><Text title={'В корзине'}/></div>
                <div className={cls.cartDetails__count}><Text color={TextColor.GRAY} size={TextSize.SIZE_L} text={`${totalCount} товара`}/></div>
                <div className={cls.cartDetails__discount}><Text color={TextColor.GRAY} size={TextSize.SIZE_L} text={`Скидка: ${totalDiscount} ₽`}/></div>
                <div className={cls.cartDetails__summ}><Text color={TextColor.GRAY} size={TextSize.SIZE_L} text={`Общая сумма: ${totalSum} ₽`}/></div>
                <Button onClick={handleSubmit} className={cls.cartDetails__button}>К оформлению</Button>
            </div>
        </div>
    );
};

export default ShoppingCart;

