import {Button, Modal, notification, Select, Table, TablePaginationConfig, Tag} from "antd";
import {useGetOrdersMutation, useSetDeliveryStatusMutation} from "../../../store/api/productAPI";
import React, {useEffect, useState} from "react";
import {Delivery, DeliveryStatus} from "../../../types/orderTypes";
import {ColumnsType} from "antd/es/table";
import {Link, NavLink} from "react-router-dom";
import {EyeOutlined} from "@ant-design/icons";
import Search from "antd/es/input/Search";
import useDebounce from "../../../utils/hooks/useDebounce";
import {IProduct} from "../../../types/productTypes";
import {searchProducts} from "../AddProduct/RelatedProducts";

interface DataType {
    key: React.Key;
    title: string;
    price: number;
    article: string;
    category: string;
    img: string;
    stock_count: number;
    translit: string;
}
const OrderList = () => {
    const [api, contextHolder] = notification.useNotification();
    const [getOrders, {data, error, isSuccess, isError, isLoading}] = useGetOrdersMutation()
    const [dataSource, setDataSource] = useState<DataType[]>([])
    const [search, setSearch] = useState('')
    const [onSearch, setOnSearch] = useState(false)
    const debounceSearch = useDebounce(search, 500)
    const [results, setResults] = useState<IProduct[]>([])
    // const [page, setPage] = useState<number>(1)
    // const [pagination, setPagination] = useState<TablePaginationConfig>({pageSize: 10, current: 1})
    // const [modalOpen, setModalOpen] = useState(false);
    // const [selecetedOrder, setSelectedOrder] = useState('')
    // const [selecetedStatus, setSelectedStatus] = useState<DeliveryStatus | null>(null)
    // const deliveryStatusOptions: DeliveryStatus[] = ['В пути', 'Доставлен', 'Ожидает отправки', 'Отменен']
    // const handleCancel = () => setModalOpen(false);
    const openNotification = (message: string, description: string) => {
        api.info({
            message,
            description,
            placement: 'topRight',
        });
    };
    const columns: ColumnsType<DataType> = [
        {
            title: 'Фото товара',
            width: 10,
            dataIndex: 'img',
            key: 'img',
            render: (_, {img}) => {
                return (
                    <img className='productList-img' src={`${process.env.API_URL}/productImages/${img}`}/>
                )
            }
        },
        {
            title: 'Название',
            width: 10,
            dataIndex: 'title',
            key: 'title',
            render: (_, {translit, title}) => {
                return (
                    <Link to={`/products/${translit}`}>{title}</Link>
                )
            }
        },
        {
            title: 'Цена',
            width: 10,
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Артикул',
            dataIndex: 'article',
            key: 'article',
            width: 10,
        },
        {
            title: 'Остаток',
            dataIndex: 'stock_count',
            key: 'stock_count',
            width: 10,
        },
    ];
    useEffect(() => {
        if(debounceSearch) {
            setOnSearch(true)
            const res = searchProducts(debounceSearch).then((r) => {
                setOnSearch(false)
                setResults(r.data)})
        } else {
            setResults([])
            setOnSearch(false)
        }

    },[debounceSearch])

    useEffect(() => {
        if(results) {
            let arr: DataType[] = []
            results.forEach(product => {
                arr.push({
                    key: product.title,
                    title: product.title,
                    article: product.vendor_code,
                    category: product.category_name,
                    price: product.currently_price,
                    translit: product.title_translit,
                    img: product.images[0],
                    stock_count: product.stock_count
                })
            })
            setDataSource(arr)
        }
    }, [results])

    return (
        <div>
            {contextHolder}
            <Search onChange={(e) => setSearch(e.target.value)} placeholder="input search text" value={search} loading={onSearch} enterButton />
            <Table loading={isLoading} bordered={true} style={{height: '100vh', maxHeight: '100%'}} columns={columns} dataSource={dataSource} scroll={{ x: 1500, y: 300 }} />
            {/*<Modal open={modalOpen} title={'Загрузить шаблон'} footer={null} onCancel={handleCancel}>*/}
            {/*    <div className="content">Изменить статус доставки заказа</div>*/}
            {/*    <Select defaultValue={deliveryStatusOptions[0]} style={{width: 200}} onChange={e => setSelectedStatus(e)}>*/}
            {/*        {deliveryStatusOptions.map(option => <Option key={option} value={option}>{option}</Option>)}*/}
            {/*    </Select>*/}
            {/*    <Button onClick={() => selecetedStatus && handleSaveDeliveryStatus(selecetedOrder, selecetedStatus)} color={'green'}>Сохранить</Button>*/}
            {/*    <Button onClick={handleCancel} color={'red'}>Отмена</Button>*/}
            {/*</Modal>*/}
        </div>
    );
};

export default OrderList;
