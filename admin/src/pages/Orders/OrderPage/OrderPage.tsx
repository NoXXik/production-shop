import {Button, Card, Modal, notification, Select, Typography, Space, Spin, Table, TablePaginationConfig, Tag} from "antd";
import {
    useGetOrdersMutation,
    useLazyGetOrderByIdQuery,
    useSetDeliveryStatusMutation
} from "../../../store/api/productAPI";
import React, {useEffect, useState} from "react";
import {DeliveryStatus} from "../../../types/orderTypes";
import {ColumnsType} from "antd/es/table";
import {useParams} from "react-router-dom";
import './OrderPage.scss'
import ProductItem from "../../../components/UI/ProductItem/ProductItem";

const {Text, Title} = Typography

const OrderPage = () => {
    let {orderId} = useParams()
    const [getOrder, {data, isLoading, error, isSuccess}] = useLazyGetOrderByIdQuery()

    const [api, contextHolder] = notification.useNotification();
    const [modalOpen, setModalOpen] = useState(false);
    const handleCancel = () => setModalOpen(false);
    const openNotification = (message: string, description: string) => {
        api.info({
            message,
            description,
            placement: 'topRight',
        });
    };

    useEffect(() => {
        if (orderId) {
            getOrder(orderId)
        }
    }, [])

    if (isLoading) {
        return (
            <Spin tip="Loading" size="large">
                <div className="content"/>
            </Spin>
        )
    }

    if (data) {
        const date = new Date(Date.parse(data.created_at)).toLocaleString('ru', {
            dateStyle: 'long',
            timeStyle: 'short'
        })
        return (<div>
            <h3>{`Заказ № ${data.invId}`}</h3>
            {contextHolder}
            <div style={{display: "flex", flexWrap: 'wrap'}}>
                <Card title="Информация о заказе"
                      style={{width: 280, marginRight: 15, marginTop: 15}}>
                    <p>{date}</p>
                    <p>Статус оплаты: <span className='content-data'>{data.payment_status}</span></p>
                    <p>Статус доставки: <span className='content-data'>{data.delivery_status}</span></p>
                    <p>Сумма заказа: <span className='content-data'>{data.total_cost} .руб</span></p>
                </Card>
                <Card title="Покупатель" extra={<a href="#">Подробнее</a>}
                      style={{width: 280, marginRight: 15, marginTop: 15}}>
                    <p>ФИО: <span className='content-data'>{data.User.full_name}</span></p>
                    <p>Телефон: <span className='content-data'>{data.User.phone}</span></p>
                    <p>E-mail: <span className='content-data'>{data.User.email}</span></p>
                </Card>
                <Card title="Информация о доставке" extra={<a href="#">More</a>} style={{width: 280, marginTop: 15}}>
                    <p>Адресс доставки: <span className='content-data'><a target={'_blank'}
                                                                          href={`https://yandex.ru/search/?text=пункт+выдачи+сдэк+${data.delivery.id}`}>{`${data.delivery.cityName} ${data.delivery.address}`}</a></span>
                    </p>
                    <p>Стоимость доставки: <span className='content-data'>{data.delivery.price} .руб</span></p>
                    <p>Контакты: <span className='content-data'>{data.delivery.phone}</span></p>
                </Card>
            </div>
            <Card title="Товары">
                {data.Products && data.Products.map(product =>
                    <Card type="inner" title={product.title} extra={<a href={`${process.env.SITE_URL}/catalog/${product.category_name}/${product.title_translit}`}>Ссылка</a>}>
                        <Space direction={'vertical'}>
                            <Space>
                                <Text>Артикул: </Text>
                                <Text strong>{product.vendor_code}</Text>
                            </Space>
                            <Space>
                                <Text>Цена: </Text>
                                <Text strong>{product.UserOrderRefProduct.cost} Р</Text>
                            </Space>
                            {product.UserOrderRefProduct.discount &&
                                <>
                                    <Space>
                                        <Text>Скидка: </Text>
                                        <Text strong>{product.UserOrderRefProduct.discount.discount} %</Text>
                                    </Space>

                                </>
                            }
                            <Space>
                                <Text>Количество: </Text>
                                <Text strong>{product.UserOrderRefProduct.quantity}</Text>
                            </Space>
                            <Space>
                                <Text>Общая стоимость: </Text>
                                <Text strong>{product.UserOrderRefProduct.sum} Р</Text>
                            </Space>
                        </Space>
                    </Card>)
                }
            </Card>
            <Modal open={modalOpen} title={'Загрузить шаблон'} footer={null} onCancel={handleCancel}>
                <div className="content">Изменить статус доставки заказа</div>
            </Modal>
        </div>)
    }
    return (
        <>
            Пустая страница
        </>
    )
};

export default OrderPage;
