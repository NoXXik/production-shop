import React, {useState} from 'react';
import {CartProduct} from "../../types/productTypes";
import {Button, ButtonTheme} from "../../shared/ui/Button/Button";
import {notification} from "antd";


interface Props {
    id: string;
    className?: string;
    list: 'compare' | 'favorite';
}

const AddToList: React.FC<Props> = ({ id , list, className}) => {
    const icon = list === 'compare'? '_icon-compare': '_icon-favorite';
    const [api, contextHolder] = notification.useNotification();
    const openNotification = (message: string) => {
        api.info({
            message,
            placement: 'topRight',
        });
    };
    const handleAddToListClick = () => {
        let array: string[] = JSON.parse(localStorage.getItem(list) || '[]');
        if(array.includes(id)) {
            array = array.filter(_id => _id !== id)
            if(list === 'compare') {
                openNotification('Товар удален из Сравнения')
            } else if(list === 'favorite') {
                openNotification('Товар удален из Избранных товаров')
            } else {
                openNotification('Товар добавлен')
            }
        } else {
            if(list === 'compare') {
                openNotification('Товар добавлен в Сравнение')
            } else if(list === 'favorite') {
                openNotification('Товар добавлен в Избранное')
            } else {
                openNotification('Товар добавлен')
            }
            array.push(id)
        }
        let set = new Set(array)
        localStorage.setItem(list, JSON.stringify(Array.from(set)));
    };

    return (
        <>
            {contextHolder}
            <Button className="buy-btn cart-button" square={true} theme={ButtonTheme.CLEAR} icon={icon} onClick={handleAddToListClick} ><></></Button>
        </>
    );
};

export default AddToList;
