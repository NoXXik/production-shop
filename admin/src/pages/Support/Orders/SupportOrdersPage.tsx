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
import {
    useChangeStatusSupportOrderMutation,
    useGetOrdersMutation, useLazyGetAllSupportOrdersQuery,
    useSetDeliveryStatusMutation
} from "../../../store/api/productAPI";
import {ColumnsType} from "antd/es/table";
import {PaginationConfig} from "antd/es/pagination";
import {Delivery, DeliveryStatus} from "../../../types/orderTypes";
import {NavLink} from "react-router-dom";
import {EyeOutlined} from '@ant-design/icons';
import {OrderStatusOptions} from "../../../types/utilTypes";
const {Option} = Select

interface DataType {
    key: React.Key;
    id: string;
    title: string;
    full_name: string;
    email: string;
    text: string;
    status: string;
    date: string;
}


const SupportOrderList = () => {
    const [api, contextHolder] = notification.useNotification();
    const [getOrders, {data, error, isSuccess, isError, isLoading}] = useLazyGetAllSupportOrdersQuery()
    const [setOrderStatus, {data: orderStatusData, error: orderStatusError, isSuccess: orderStatusIsSuccess, isLoading: orderStatusIsLoading}] = useChangeStatusSupportOrderMutation()
    const [dataSource, setDataSource] = useState<DataType[]>()
    const [page, setPage] = useState<number>(1)
    const [pagination, setPagination] = useState<TablePaginationConfig>({pageSize: 10, current: 1})
    const [modalOpen, setModalOpen] = useState(false);
    const [selecetedOrder, setSelectedOrder] = useState('')
    const [selecetedStatus, setSelectedStatus] = useState<OrderStatusOptions | null>(null)
    const orderStatusOptions: OrderStatusOptions[] = ['Отменен', 'Завершен', 'В очереди', "В обработке"]
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
            dataIndex: 'id',
            key: 'id',
            fixed: 'left',
        },
        {
            title: 'Тема',
            width: 85,
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Имя',
            dataIndex: 'full_name',
            key: 'full_name',
            width: 80,
        },
        {
            title: 'Почта',
            dataIndex: 'email',
            key: 'email',
            width: 80,
        },
        {
            title: 'Текст',
            dataIndex: 'text',
            key: 'text',
            width: 150,
        },
        {
            title: 'Дата создания',
            dataIndex: 'date',
            key: 'date',
            width: 100,
        },
        {
            title: 'Статус заявки',
            dataIndex: 'status',
            key: '3',
            width: 60,
            render: (_, { status, id }) => {
                let color = 'blue';
                if(status === 'В обработке') {
                    color = 'orange'
                } else if (status === 'Завершен' || status === 'Отменен') {
                    color = 'green'
                } else if (status === 'В очереди') {
                    color = 'red'
                }
                return <>
                    <Tag onClick={e => changeOrderStatus(id)} color={color} key={status}>
                        {status}
                    </Tag>
                </>
            },
            fixed: 'right'
        },
        //
        // {
        //     title: 'Action',
        //     key: 'operation',
        //     fixed: 'right',
        //     width: 65,
        //     render: (_, {id }) => {
        //         return <>
        //             <NavLink to={`/orders/${id}`} >
        //                 <EyeOutlined />
        //             </NavLink>
        //         </>
        //     },
        // },
    ];
    const changeOrderStatus = (id: string) => {
        setSelectedOrder(id)
        setModalOpen(true)
    }
    const handleSaveOrderStatus = (id: string, status: OrderStatusOptions) => {
        setOrderStatus({id, status})
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
                arr.push({
                    key: order.id,
                    date: order.created_at,
                    status: order.status,
                    text: order.text,
                    full_name: order.full_name,
                    email: order.email,
                    title: order.title,
                    id: order.id,
                })
            })
            setDataSource(arr)
        }
        getOrders('')
    }, [data, isSuccess])
    useEffect(() => {
        if(orderStatusData && orderStatusIsSuccess) {
            setDataSource(prev => prev && prev.map(order => order.id === orderStatusData.id ? {...order, status: orderStatusData.status} : order))
            openNotification('Статус заявки успешно изменен', 'Статус заявки успешно изменен')
        }
    }, [orderStatusData, orderStatusIsSuccess])
    useEffect(() => {
        if(orderStatusError) {
            openNotification('При изменении статсуса доставки произошла ошибка', `Ошибка: ${JSON.stringify(orderStatusError)}`)
        }
    }, [orderStatusError])
    return (
        <div>
            {contextHolder}
            <Table onChange={handleOnChange} loading={isLoading || orderStatusIsLoading} pagination={pagination} bordered={true} style={{height: '100vh', maxHeight: '100%'}} columns={columns} dataSource={dataSource} scroll={{ x: 1500, y: 300 }} />
            <Modal open={modalOpen} title={'Загрузить шаблон'} footer={null} onCancel={handleCancel}>
                <div className="content">Изменить статус заявки заказа</div>
                <Select defaultValue={orderStatusOptions[0]} style={{width: 200}} onChange={e => setSelectedStatus(e)}>
                    {orderStatusOptions.map(option => <Option key={option} value={option}>{option}</Option>)}
                </Select>
                <Button onClick={() => selecetedStatus && handleSaveOrderStatus(selecetedOrder, selecetedStatus)} color={'green'}>Сохранить</Button>
                <Button onClick={handleCancel} color={'red'}>Отмена</Button>
            </Modal>
        </div>
    );
};

export default SupportOrderList;
