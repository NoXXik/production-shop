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

    // const [items, setItems] = useState([])

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

    // useEffect(() => {console.log(results)}, [results])
    useEffect(() => {
        if(data && isSuccess) {
            setOnSearch(false)
            setResults(data)
        }
    }, [data, isSuccess])
    const items: MenuProps['items'] = results.map((product, id) => ({key: id, label: <><SearchCart props={product}/><Button onClick={() => {
        setSearch('')
        setRelatedProducts(prev => [...prev, product])
    }}><PlusCircleOutlined/></Button></>}))

  return (
    <div>
        <div className="search-block">
            <Search onChange={(e) => setSearch(e.target.value)} placeholder="input search text" value={search} loading={onSearch} enterButton />
            <Dropdown menu={{items}} open={results.length > 0}>
                <a onClick={(e) => e.preventDefault()}>
                </a>
            </Dropdown>
        </div>

        <Swiper modules={[Navigation, Pagination, Scrollbar, A11y]} pagination={{clickable: true}}
        slidesPerView={3} spaceBetween={15}>
            {relatedProducts.map(product => <SwiperSlide key={product.id}>
                <SwiperProductCart product={product}/>
                <Button onClick={() => setRelatedProducts(prev => prev.filter(product_ => product.id !== product_.id))}><DeleteFilled/></Button>
            </SwiperSlide>)}
        </Swiper>
    </div>
  )
}

export async function searchProducts(value: string) {
    return await axios.get<IProduct[]>(`${process.env.API_URL}/api/product/search?request=${value}`)
}
