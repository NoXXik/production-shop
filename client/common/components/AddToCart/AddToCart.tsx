import React, {useState} from 'react';
import {CartProduct} from "../../types/productTypes";
import {Button, ButtonTheme} from "../../shared/ui/Button/Button";
import {notification} from "antd";


interface Props {
    id: string;
    className?: string;
    title?: string;
    square?: boolean;
    disabled?: boolean;
}

const AddToCartButton: React.FC<Props> = ({ id , title, className, square, disabled = false}) => {
    const [addedToCart, setAddedToCart] = useState<boolean>(false);
    const [api, contextHolder] = notification.useNotification();
    const openNotification = (message: string) => {
        api.info({
            message,
            placement: 'topRight',
        });
    };
    const handleAddToCartClick = () => {
        let cart: CartProduct[] = JSON.parse(localStorage.getItem('cart') || '[]');
        cart = cart.filter(product => product.id !== id)
        cart.push({id, count: 1});
        localStorage.setItem('cart', JSON.stringify(cart));
        setAddedToCart(true);
        openNotification('Товар добавлен в Корзину')
    };

    return (
        <>
            {contextHolder}
            <Button className={className} square={square} theme={ButtonTheme.PRIMARY} icon={'_icon-cart2'} disabled={addedToCart || disabled} onClick={handleAddToCartClick} ><>{title && title}</></Button>
        </>
    );
};
export default AddToCartButton;
