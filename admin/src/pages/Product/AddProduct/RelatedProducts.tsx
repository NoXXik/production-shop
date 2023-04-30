import {Swiper, SwiperSlide} from 'swiper/react'
import { Navigation, Pagination, Scrollbar, A11y,  } from 'swiper';
import { PlusCircleOutlined, DeleteFilled} from '@ant-design/icons';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import SwiperProductCart from '../../../components/UI/ProductUI/SwiperProductCart';
import Search from 'antd/es/input/Search';
import { useEffect, useState } from 'react';
import useDebounce from '../../../utils/hooks/useDebounce';
import axios from 'axios';
import { Button, Dropdown, MenuProps, Space } from 'antd';
import produce from 'immer';
import { IProduct } from '../../../types/productTypes';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import SearchCart from '../../../components/UI/SearchCart/SearchCart';
import {useLazySearchProductsQuery} from "../../../store/api/productAPI";
import {Typography} from "antd";
const {Text, Title} = Typography

interface IRelatedProductProps {
    relatedProducts: IProduct[];
    setRelatedProducts: React.Dispatch<React.SetStateAction<IProduct[]>>;
}

export default function RelatedProducts(props: IRelatedProductProps) {
    const [search, setSearch] = useState('')
    const [onSearch, setOnSearch] = useState(false)
    const debounceSearch = useDebounce(search, 500)
    const [results, setResults] = useState<IProduct[]>([])
    const {relatedProducts, setRelatedProducts} = props
    const [searchProduct, {data, isSuccess, isError}] = useLazySearchProductsQuery()
    const [items, setItems] = useState<MenuProps['items']>([])

    useEffect(() => {
        if(debounceSearch) {
            setOnSearch(true)
            searchProduct(debounceSearch)
            // const res = searchProducts(debounceSearch).then((r) => {
            //     setOnSearch(false)
            //     setResults(r.data)})
        } else {
            setResults([])
            setOnSearch(false)
        }

    },[debounceSearch])

    useEffect(() => {
        if(data && isSuccess) {
            setOnSearch(false)
            setResults(data)
        }
    }, [data, isSuccess])
    // useEffect(() => {console.log(results)}, [results])

    useEffect(() => {
        if(results) {
            setItems(results.map((product, id) => ({key: id, label: <><SearchCart props={product}/><Button onClick={() => {
                    setSearch('')
                    setRelatedProducts(prev => [...prev, product])
                }}><PlusCircleOutlined/></Button></>})))
        }
    }, [results])
    // const items: MenuProps['items'] = results.map((product, id) => ({key: id, label: <><SearchCart props={product}/><Button onClick={() => {
    //     setSearch('')
    //     setRelatedProducts(prev => [...prev, product])
    // }}><PlusCircleOutlined/></Button></>}))

  return (
    <div>
        <div className="search-block">
            <Search onChange={(e) => setSearch(e.target.value)} placeholder="input search text" value={search} loading={onSearch} enterButton />
            {(results && results.length > 0) && <div className={'dropdown'}>
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
            {/*<Dropdown menu={{items}} open={results.length > 0}>*/}
            {/*    <a onClick={(e) => e.preventDefault()}>*/}
            {/*    </a>*/}
            {/*</Dropdown>*/}
        </div>
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
  )
}

// export async function searchProducts(value: string) {
//     console.log('search prods')
//     return await axios.get<IProduct[]>(`${process.env.API_URL}/express/product/search?request=${value}`)
// }
// 4c8ad29f-ebcb-4878-a49c-c27d2d590658.jpeg
