import React, { useEffect, useState } from 'react'
import { IProductDiscount } from '../../../types/productTypes';
import { Button, Input, Modal, notification } from 'antd';
import { DatePicker, Space } from 'antd';
import { RangePickerProps } from 'antd/es/date-picker';
import dayjs from 'dayjs';
import { NotificationPlacement } from 'antd/es/notification/interface';

const {RangePicker} = DatePicker


interface IProductDiscountProps {
    price: string;
    discount: IProductDiscount | null;
    setDiscount: React.Dispatch<React.SetStateAction<IProductDiscount | null>>;
}



export default function ProductDiscount(props: IProductDiscountProps) {
    const {price, discount, setDiscount} = props
    const [modalOpen, setModalOpen] = useState(false);
    const [discountInput, setDiscountInput] = useState('')
    const [days, setDays] = useState<any [] | null>(null)

    const disabledDate: RangePickerProps['disabledDate'] = (current) => {
        // Can not select days before today and today

        return current && current <= dayjs().endOf('day');
      };
    const handleCancel = () => setModalOpen(false);

    const saveDiscount = () => {
        if(Number(price) <= 0){
            openNotification('Не возможно добавить скидку!', 'Для добавления скидки установите цену товара')
        } else if(!days || days[0] == null || days[1] == null) {
            openNotification('Не возможно добавить скидку!', 'Для добавления скидки установите дату начала и окончания скидки')
        } else if(Number(discountInput) <= 0) {
            openNotification('Не возможно добавить скидку!', 'Для добавления скидки установите размер скидки в поле в виде числа')
        } else {
            setDiscount({discount: Number(discountInput), expirationDate: new Date(Date.parse(days[1].$d)).toJSON(), startDate: new Date(Date.parse(days[0].$d)).toJSON() })
            setDiscountInput('')
            setModalOpen(false)
        }
    }

    useEffect(() => {
        if(Number(price) <= 0) {
            setDiscount(null)
        }
    }, [price])

    const [api, contextHolder] = notification.useNotification();

    const openNotification = (message: string, description: string ) => {
        api.info({
                message,
                description,
                placement: 'topRight',
        });
  };
    return (
    <div className='container'>
        {contextHolder}
        {!discount
        ? <div className="add-discount">
            <h3>Скидка на товар отсутсвует</h3>
            <Button onClick={() => setModalOpen(true)}>Добавить Скидку</Button>
            <Modal open={modalOpen} title={'Добавить скидку'} footer={null} onCancel={handleCancel}>
                <div className="content">
                    <div className="discount-input">
                        <h5>Скидка в процентах</h5>
                        <Input type='number' onChange={(e) => setDiscountInput(e.target.value)}></Input>
                        <h4>Цена товара со скидкой: {(Number(price) * (1 - (Number(discountInput) / 100))).toFixed(2)}</h4>
                        <RangePicker onCalendarChange={(days) => setDays(days)} />
                        <Button onClick={saveDiscount}>Сохранить</Button>
                    </div>
                </div>
            </Modal>
        </div>
    : <div className="discount">
        <h4>Скидка: {discount.discount}%</h4>
        <h4>Цена товара: {price}</h4>
        <h4>Цена товара со скидкой: {(Number(price) * (1 - (discount.discount / 100))).toFixed(2)}</h4>
        <h4>Дата начала скидки: {discount.startDate}</h4>
        <h4>Дата окончания скидки: {discount.expirationDate}</h4>
                <Button onClick={() => setDiscount(null)}>Удалить скидку</Button>
    </div>
    }
    </div>
  )
}


// new Date(Date.parse('Tue Feb 14 2023 19:11:23 GMT+0300')).toJSON()
