import React, {useEffect, useState} from "react";

import {ICategory, IFilter} from "../../../types/productTypes";
import {useAppDispatch} from "../../../utils/hooks/reduxHooks";
import {ICreateCategoryData, IHierarchyCategory} from "../../../types/categoryTypes";
import {Button, Cascader, Modal, notification, Popconfirm, Select, Table, TablePaginationConfig, Tag} from "antd";
import {DefaultOptionType} from "antd/es/cascader";
import {translit} from "../../../utils/helpers/utilFunctions";
import Title from "antd/es/typography/Title";
import {QuestionCircleOutlined} from "@ant-design/icons";
import Input from "antd/es/input/Input";
import TextArea from "antd/es/input/TextArea";
import {useGetOrdersMutation, useSetDeliveryStatusMutation} from "../../../store/api/productAPI";
import {ColumnsType} from "antd/es/table";
import {PaginationConfig} from "antd/es/pagination";
import "./OrderList.scss"
import {Delivery, DeliveryStatus} from "../../../types/orderTypes";
import {NavLink} from "react-router-dom";
import {EyeOutlined} from '@ant-design/icons';
const {Option} = Select

interface DataType {
    key: React.Key;
    id: string;
    invId: string;
    date: string;
    order_sum: number;
    payment_status: string;
    delivery_status: string;
    full_name: string;
    email: string;
    phone: string;
    delivery: Delivery;
}


const OrderList = () => {
    const [api, contextHolder] = notification.useNotification();
    const [getOrders, {data, error, isSuccess, isError, isLoading}] = useGetOrdersMutation()
    const [setDeliveryStatus, {data: deliveryStatusData, error: deliveryStatusError, isSuccess: deliveryStatusIsSuccess, isLoading: deliveryStatusIsLoading}] = useSetDeliveryStatusMutation()
    const [dataSource, setDataSource] = useState<DataType[]>()
    const [page, setPage] = useState<number>(1)
    const [pagination, setPagination] = useState<TablePaginationConfig>({pageSize: 10, current: 1})
    const [modalOpen, setModalOpen] = useState(false);
    const [selecetedOrder, setSelectedOrder] = useState('')
    const [selecetedStatus, setSelectedStatus] = useState<DeliveryStatus | null>(null)
    const deliveryStatusOptions: DeliveryStatus[] = ['В пути', 'Доставлен', 'Ожидает отправки', 'Отменен']
    const handleCancel = () => setModalOpen(false);
    const openNotification = (message: string, description: string) => {
        api.info({
            message,
            description,
            placement: 'topRight',
        });
    };
    const columns: ColumnsType<DataType> = [
        {
            title: 'ID',
            width: 50,
            dataIndex: 'invId',
            key: 'invId',
            fixed: 'left',
        },
        {
            title: 'Дата',
            width: 185,
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Сумма заказа',
            dataIndex: 'order_sum',
            key: '1',
            width: 80,
        },
        {
            title: 'Статус оплаты',
            dataIndex: 'payment_status',
            key: '2',
            width: 100,
            align: 'center',
            render: (_, { payment_status }) => {
                let color = 'blue';
                if(payment_status === 'В процессе') {
                    color = 'orange'
                } else if (payment_status === 'Оплачен') {
                    color = 'green'
                } else if (payment_status === 'Отменен') {
                    color = 'red'
                }
                return <>
                    <Tag color={color} key={payment_status}>
                        {payment_status}
                    </Tag>
                </>
            },
        },
        {
            title: 'Статус доставки',
            dataIndex: 'delivery_status',
            key: '3',
            width: 135,
            render: (_, { delivery_status, invId }) => {
                let color = 'blue';
                if(delivery_status === 'Ожидает отправки') {
                    color = 'orange'
                } else if (delivery_status === 'Доставлен') {
                    color = 'green'
                } else if (delivery_status === 'Отменен') {
                    color = 'red'
                }
                return <>
                    <Tag onClick={e => changeDeliveryStatus(invId)} color={color} key={delivery_status}>
                        {delivery_status}
                    </Tag>
                </>
            },
        },
        {
            title: 'ФИО заказчика',
            dataIndex: 'full_name',
            key: '4',
            width: 150,
        },
        {
            title: 'E-mail',
            dataIndex: 'email',
            key: '5',
            width: 125,
        },
        {
            title: 'Телефон',
            dataIndex: 'phone',
            key: '6',
            width: 125,
        },
        {
            title: 'Адрес доставки',
            dataIndex: 'delivery',
            key: '7',
            width: 200,
        },
        {
            title: 'Action',
            key: 'operation',
            fixed: 'right',
            width: 65,
            render: (_, {id }) => {
                return <>
                    <NavLink to={`/orders/${id}`} >
                        <EyeOutlined />
                    </NavLink>
                </>
            },
        },
    ];
    const changeDeliveryStatus = (invId: string) => {
        setSelectedOrder(invId)
        setModalOpen(true)
    }
    const handleSaveDeliveryStatus = (invId: string, status: DeliveryStatus) => {
        setDeliveryStatus({invId, status})
        setSelectedOrder('')
        handleCancel()
    }
    const handleOnChange = (pagination: TablePaginationConfig,) => {
        const page = pagination.current
        if(page){
            setPage(page)
        }
    }
    useEffect(() => {
        getOrders({limit: 8, page: page})
        setPagination({...pagination, current: page})
    }, [page])
    useEffect(() => {
        if(data && isSuccess) {
            setPagination({...pagination, total: data.count})
            let arr: DataType[] = []
            data.rows.forEach(order => {
                let sum = 0;
                order.Products.forEach(prod => {
                    sum += prod.UserOrderRefProduct.sum
                })
                arr.push({
                    key: order.id,
                    id: order.id,
                    invId: order.invId,
                    date: order.created_at,
                    payment_status: order.payment_status,
                    delivery_status: order.delivery_status,
                    full_name: order.User.full_name,
                    email: order.User.email,
                    phone: order.User.phone,
                    order_sum: order.total_cost,
                    delivery: order.delivery
                })
            })
            setDataSource(arr)
        }
    }, [data, isSuccess])
    useEffect(() => {
        if(deliveryStatusIsSuccess && deliveryStatusData) {
            setDataSource(prev => prev && prev.map(order => order.invId === deliveryStatusData.invId ? {...order, delivery_status: deliveryStatusData.delivery_status} : order))
            openNotification('Статус доставки успешно изменен', 'Статус доставки успешно изменен')
        }
    }, [deliveryStatusData, deliveryStatusIsSuccess])
    if(deliveryStatusError) {
        openNotification('При изменении статсуса доставки произошла ошибка', `Ошибка: ${JSON.stringify(deliveryStatusError)}`)
    }
    return (
        <div>
            {contextHolder}
            <Table onChange={handleOnChange} loading={isLoading || deliveryStatusIsLoading} pagination={pagination} bordered={true} style={{height: '100vh', maxHeight: '100%'}} columns={columns} dataSource={dataSource} scroll={{ x: 1500, y: 300 }} />
            <Modal open={modalOpen} title={'Загрузить шаблон'} footer={null} onCancel={handleCancel}>
                <div className="content">Изменить статус доставки заказа</div>
                <Select defaultValue={deliveryStatusOptions[0]} style={{width: 200}} onChange={e => setSelectedStatus(e)}>
                    {deliveryStatusOptions.map(option => <Option key={option} value={option}>{option}</Option>)}
                </Select>
                <Button onClick={() => selecetedStatus && handleSaveDeliveryStatus(selecetedOrder, selecetedStatus)} color={'green'}>Сохранить</Button>
                <Button onClick={handleCancel} color={'red'}>Отмена</Button>
            </Modal>
        </div>
    );
};

export default OrderList;
