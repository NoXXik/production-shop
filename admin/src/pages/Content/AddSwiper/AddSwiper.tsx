import React, {useEffect, useState} from 'react';
import useDebounce from "../../../utils/hooks/useDebounce";
import {IProduct} from "../../../types/productTypes";
import {Button, Dropdown, Input, MenuProps, Modal, notification, Popconfirm, Space, Spin} from "antd";
import SearchCart from "../../../components/UI/SearchCart/SearchCart";
import {DeleteFilled, PlusCircleOutlined, EyeOutlined, QuestionCircleOutlined} from "@ant-design/icons";
import Search from "antd/es/input/Search";
import {A11y, Navigation, Pagination, Scrollbar} from "swiper";
import SwiperProductCart from "../../../components/UI/ProductUI/SwiperProductCart";
import {Swiper, SwiperSlide} from "swiper/react";
import {
    useCreateSwiperMutation,
    useGetSwipersQuery,
    useDeleteSwiperMutation,
    useUpdateSwiperMutation, useLazySearchProductsQuery
} from "../../../store/api/productAPI";
import {ISwiper} from "../../../types/utilTypes";
import {Typography} from "antd";
const {Text, Title} = Typography;

function AddSwiper() {
    const [search, setSearch] = useState('')
    const [onSearch, setOnSearch] = useState(false)
    const [updateSwiperId, setUpdateSwiperId] = useState(0)
    const debounceSearch = useDebounce(search, 500)
    const [results, setResults] = useState<IProduct[]>([])
    const [relatedProducts, setRelatedProducts] = useState<IProduct[]>([])
    const [modalSaveOpen, setModalSaveOpen] = useState(false);
    const [modalUpdateOpen, setModalUpdateOpen] = useState(false);
    const [swiperTitle, setSwiperTitle] = useState('')
    const [swipers, setSwipers] = useState<ISwiper[]>([])
    const [api, contextHolder] = notification.useNotification();
    const {data, isLoading, isError, error, isSuccess} = useGetSwipersQuery('')
    const [deleteSwiper, {data: deleteData, isLoading: deleteIsLoading, isError: deleteIsError, error: deleteError, isSuccess: deleteIsSuccess}] = useDeleteSwiperMutation()
    const [updateSwiper, {data: updateData, isLoading: updateIsLoading, isError: updateIsError, error: updateError, isSuccess: updateIsSuccess}] = useUpdateSwiperMutation()
    const [createSwiper, {data: createData, isLoading: createIsLoading, isError: createIsError, error: createError, isSuccess: createIsSuccess}] = useCreateSwiperMutation()
    const [searchProduct, {data: dataSearch, isSuccess: isSuccessSearch, isError: isErrorSearch}] = useLazySearchProductsQuery()

    // const [items, setItems] = useState([])
    const handleCancel = () => {
        setModalSaveOpen(false)
        setModalUpdateOpen(false)
        setSearch('')
    }

    useEffect(() => {
        if (debounceSearch) {
            setOnSearch(true)
            searchProduct(debounceSearch)

            // const res = searchProducts(debounceSearch).then((r) => {
            //     setOnSearch(false)
            //     setResults(r.data)
            // })
        } else {
            setResults([])
            setOnSearch(false)
        }

    }, [debounceSearch])
    useEffect(() => {
        if(dataSearch && isSuccessSearch) {
            setOnSearch(false)
            setResults(dataSearch)
        }
    }, [dataSearch, isSuccessSearch])
    useEffect(() => {
    }, [results])
    const openNotification = (message: string, description: string) => {
        api.info({
            message,
            description,
            placement: 'topRight',
            duration: 15
        });
    };

    const items: MenuProps['items'] = results.map((product, id) => ({
        key: id,
        label: <>
            <SearchCart props={product}/>
            <Button onClick={() => {
                setRelatedProducts(prev => [...prev, product])
            }}><PlusCircleOutlined/></Button>
        </>
    }))

    const handleSaveSwiper = () => {
        let products = relatedProducts.map(prod => prod.id)
        if(swiperTitle.length < 1) {
            return false
        }
        createSwiper({title: swiperTitle, products})
    }
    const handleDeleteSwiper = (id: number) => {
        deleteSwiper(id)
    }

    const handleUpdateSwiper = (swiper: ISwiper) => {
        setRelatedProducts(swiper.Products)
        setSwiperTitle(swiper.title)
        setModalUpdateOpen(true)
        setUpdateSwiperId(swiper.id)
    }
    const updateSwiperReq = (id: number) => {
        const products = relatedProducts.map(prod => prod.id)
        updateSwiper({title: swiperTitle, products, id})
    }
    useEffect(() => {
        if(data && isSuccess) {
            setSwipers(data)
        }
    }, [data, isSuccess])
    useEffect(() => {
        if(updateIsSuccess) {
            openNotification('Карусель успешно обнавлен', 'Карусель успешно обнавлен!')
        }
    }, [updateIsSuccess])
    useEffect(() => {
        if(updateIsError && updateError) {
            openNotification('При обнавлении карусели произошла ошибка', `Ошибка: ${JSON.stringify(updateError)}`)
        }
    }, [updateIsError, updateError])
    useEffect(() => {
        if(createIsSuccess) {
            openNotification('Карусель успешно создан', 'Карусель успешно создан!')
        }
    }, [createIsSuccess])
    useEffect(() => {
        if(createIsError && createError) {
            openNotification('При создании карусели произошла ошибка', `Ошибка: ${JSON.stringify(createError)}`)
        }
    }, [createIsError, createError])
    useEffect(() => {
        if(deleteIsSuccess) {
            openNotification('Карусель успешно удален', 'Карусель успешно удален!')
        }
    }, [deleteIsSuccess])
    useEffect(() => {
        if(deleteIsError && deleteError) {
            openNotification('При удалении карусели произошла ошибка', `Ошибка: ${JSON.stringify(deleteError)}`)
        }
    }, [deleteIsError, deleteError])
    return (
        <div>
            {contextHolder}
            <div className="search-block">
                <Title level={3}>Добавление карусели с товарами на Главной странице</Title>
                <Button onClick={() => setModalSaveOpen(true)}>Создать</Button>
                {isLoading && <Spin size={'large'}/>}
                {(swipers && swipers.length > 0) && swipers.map(swiper => <div className={'swiper-block'}>
                    <h3>{swiper.title}</h3>
                    <Popconfirm
                        title="Вы действительно хотите удалить карусель?"
                        icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                        onConfirm={() => handleDeleteSwiper(swiper.id)}
                    >
                        <Button>
                            <DeleteFilled/>
                        </Button>
                    </Popconfirm>

                    <Button
                        onClick={() => handleUpdateSwiper(swiper)}>
                        <EyeOutlined/>
                    </Button>
                    <Swiper modules={[Navigation, Pagination, Scrollbar, A11y]} pagination={{clickable: true}} slidesPerView={3} spaceBetween={15}>
                        {swiper.Products.map(product => <SwiperSlide key={product.id}>
                            <SwiperProductCart product={product}/>
                        </SwiperSlide>)}
                    </Swiper>
                </div>)}
            </div>


            <Modal open={modalSaveOpen} title={'Сохранить шаблон'} footer={null} onCancel={handleCancel} width={'80%'}>
                <div className="content">
                    <Space direction={"vertical"} align={"start"}>
                        <Input onChange={(e) => setSwiperTitle(e.target.value)} value={swiperTitle}
                               style={{minWidth: 500}} placeholder="Введите имя для шаблоны"/>
                        <Search onChange={(e) => setSearch(e.target.value)} placeholder="input search text" value={search}
                                loading={onSearch} style={{minWidth: 500}} enterButton/>
                        <Popconfirm
                            title="Вы действительно хотите сохранить карусель?"
                            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                            onConfirm={handleSaveSwiper}
                        >
                            <Button style={{maxWidth: 300}}>Сохранить</Button>
                        </Popconfirm>
                    </Space>
                    {(results && results.length > 0) && <div className={'dropdown dropdown-2'}>
                        {results.map(item => <div className={'dropdown__item'}>
                            <Button className={'dropdown__button'} onClick={() => {
                                setSearch('')
                                setRelatedProducts(prev => [...prev, item])
                            }}><PlusCircleOutlined/></Button>
                            <img className={'dropdown__img sub-item'}
                                 src={`${import.meta.env.VITE_STATIC_URL}/productImages/${item.images[0]}`} alt=""/>
                            <Text className={'dropdown__title sub-item'}>{item.title}</Text>
                            <Text className={'dropdown__article sub-item'}>Артикул: {item.vendor_code}</Text>
                            <Text className={'dropdown__price sub-item'}>Цена: {item.currently_price}</Text>
                            <Text className={'dropdown__stock sub-item'}>Остаток: {item.stock_count}</Text>
                            <Text className={'dropdown__stock-status sub-item'}>Наличие: {item.stock_status}</Text>
                        </div>)}
                    </div>}
                    {(relatedProducts && relatedProducts.length > 0) && <div className={'swiper-block'}>
                        <Swiper modules={[Navigation, Pagination, Scrollbar, A11y]} pagination={{clickable: true}}
                                slidesPerView={3} spaceBetween={15}>
                            {relatedProducts.map(product => <SwiperSlide key={product.id}>
                                <SwiperProductCart product={product}/>
                                <Button
                                    onClick={() => setRelatedProducts(prev => prev.filter(product_ => product.id !== product_.id))}><DeleteFilled/></Button>
                            </SwiperSlide>)}
                        </Swiper>
                    </div>}
                </div>
            </Modal>

            <Modal open={modalUpdateOpen} title={'Изменить карусель товаров'} footer={null} onCancel={handleCancel}>
                <div className="content">
                    <Input onChange={(e) => setSwiperTitle(e.target.value)} value={swiperTitle}
                           style={{maxWidth: 300}} placeholder="Введите имя для шаблоны"/>
                    <Search onChange={(e) => setSearch(e.target.value)} placeholder="input search text" value={search}
                            loading={onSearch} enterButton/>
                    <Dropdown menu={{items}} open={results.length > 0}>
                        <a onClick={(e) => e.preventDefault()}>
                        </a>
                    </Dropdown>
                    <Swiper modules={[Navigation, Pagination, Scrollbar, A11y]} pagination={{clickable: true}}
                            slidesPerView={3} spaceBetween={15}>
                        {relatedProducts.map(product => <SwiperSlide key={product.id}>
                            <SwiperProductCart product={product}/>
                            <Button
                                onClick={() => setRelatedProducts(prev => prev.filter(product_ => product.id !== product_.id))}><DeleteFilled/></Button>
                        </SwiperSlide>)}
                    </Swiper>
                    <Popconfirm
                        title="Вы действительно хотите изменить карусель?"
                        icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                        onConfirm={() => updateSwiperReq(updateSwiperId)}
                    >
                        <Button style={{maxWidth: 300}}>Сохранить</Button>
                    </Popconfirm>
                </div>
            </Modal>
        </div>
    )
}

export default AddSwiper;
