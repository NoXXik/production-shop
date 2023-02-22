import {useAppDispatch, useAppSelector} from "../../hooks/redux/reduxHooks"
import {Divider, Select} from 'antd';
import {IProduct, IProducts} from "../../types/productTypes";
import React, {useEffect, useState} from "react";
import {setLimit, setSort, setView} from "../../store/slices/categoryPanelSlice";
import {NextRouter} from "next/router";
import {ILimitValues, ISortValues, IViewValues} from "../../types/settingsTypes";
import ProductItem from "./ProductItem/ProductItem";

const sortList: { label: string, value: ISortValues }[] =
    [
        {label: 'По названию (А-Я)', value: 'title_asc'},
        {label: 'По названию (Я-А)', value: 'title_desc'},
        {label: 'По цене (сначала дорогие)', value: 'price_desc'},
        {label: 'По цене (сначала дешевые)', value: 'price_asc'},
    ]


const mock_products: { id: number, title: string, image: string }[] = [
    {id: 1, title: 'qwerty1', image: '3b87a60f-8e98-42b8-888c-4b3e98c9a902.jpeg'},
    {id: 2, title: 'qwerty2', image: '25c472a7-81bd-41d4-a806-9666e4713ce6.jpeg'},
    {id: 3, title: 'qwerty3', image: '810af9a6-d952-4749-985d-fc07b1adab17.jpeg'},
    {id: 4, title: 'qwerty4', image: '1177283e-c6f7-4046-b31f-8c1276b3d7a7.jpeg'},
    {id: 5, title: 'qwerty5', image: '25c472a7-81bd-41d4-a806-9666e4713ce6.jpeg'},
    {id: 6, title: 'qwerty6', image: '3b87a60f-8e98-42b8-888c-4b3e98c9a902.jpeg'},
    {id: 7, title: 'qwerty7', image: '810af9a6-d952-4749-985d-fc07b1adab17.jpeg'},
    {id: 8, title: 'qwerty8', image: '1177283e-c6f7-4046-b31f-8c1276b3d7a7.jpeg'},
    {id: 9, title: 'qwerty9', image: '25c472a7-81bd-41d4-a806-9666e4713ce6.jpeg'},
    {id: 10, title: 'qwerty10', image: '3b87a60f-8e98-42b8-888c-4b3e98c9a902.jpeg'},
    {id: 11, title: 'qwerty11', image: '1177283e-c6f7-4046-b31f-8c1276b3d7a7.jpeg'},
    {id: 12, title: 'qwerty12', image: '25c472a7-81bd-41d4-a806-9666e4713ce6.jpeg'},
    {id: 13, title: 'qwerty13', image: '810af9a6-d952-4749-985d-fc07b1adab17.jpeg'},
    {id: 14, title: 'qwerty14', image: '1177283e-c6f7-4046-b31f-8c1276b3d7a7.jpeg'}
]

export default function ProductList({products, router}: { products: IProduct[] | null, router: NextRouter }) {
    const dispatch = useAppDispatch()
    // const {maxPages} = useAppSelector(state => state.settings)
    const [view, setView] = useState<IViewValues>('plate')
    const [sort, setSort] = useState<ISortValues>('title_asc')
    const [limit, setLimit] = useState<ILimitValues>('21')
    const [page, setPage] = useState<string>('1')
    const [maxPage, setMaxPage] = useState<string>('1')


    const handleSort = (item: ISortValues) => {
        setSort(item)

        const newUrl = router.asPath.replaceAll(/((?:&|\?)sort=(?:title|price)_(?:desc|asc))/g, '')
        if (newUrl.includes('?')) {
            router.push(`${newUrl}&sort=${item}`)
        } else {
            router.push(`${newUrl}?sort=${item}`)
        }

    }
    const handleView = (view: IViewValues) => {
        setView(view)
    }
    const handleLimit = (limit: ILimitValues) => {
        setLimit(limit)

        const newUrl = router.asPath.replaceAll(/((?:&|\?)limit=[0-9]*)/g, '')
        if (newUrl.includes('?')) {
            router.push(`${newUrl}&limit=${limit}`)
        } else {
            router.push(`${newUrl}?limit=${limit}`)
        }

    }
    useEffect(() => {
        if (router.query.sort) {
            setSort(router.query.sort as ISortValues)
        }
        if (router.query.limit) {
            setLimit(router.query.limit as ILimitValues)
        }
    }, [])

    return (
        <div className="product-list__body">
            <div className="product-list__container">
                <div className="product-list__setting-panel setting-panel">
                    <div className="setting-panel__sort-block">
                        <form action='sort' className="sort-block__body">
                            <label className="sort-block__title">
                                Сортировка
                            </label>
                            <Select className="sort-blok__select" size="middle" style={{width: '225px'}}
                                    placeholder="Select a person" optionFilterProp="children" onChange={handleSort}
                                    filterOption={(input, option) =>
                                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                                    options={sortList}
                                    value={sortList.filter(filter => filter.value === sort)[0].value}/>
                            {/* <select className="sort-block__list">
                                    {sortList.map(item => <option key={item.value} onChange={() => handleSort(item)} value={item.value}>{item.label}</option>)}
                            </select> */}
                        </form>
                    </div>
                    <div className="setting-panel__view-block">
                        <label className="view-block__title">
                            Вид
                        </label>
                        <div className="view-block__btn-group btn-group">
                            <button className={`view-block__button btn-group-item ${view === 'plate' ? '_active' : ''}`}
                                    onClick={() => handleView('plate')}><span className="_icon-grid6"></span></button>
                            <button className={`view-block__button btn-group-item ${view === 'list' ? '_active' : ''}`}
                                    onClick={() => handleView('list')}><span className="_icon-list2"></span></button>
                        </div>
                    </div>
                    <div className="setting-panel__limit-block">
                        <label className="limit-block__title">
                            Вид
                        </label>
                        <div className="limit-block__btn-group btn-group">
                            <button
                                className={`limit-block__button btn-group-item _button-orange ${limit === '21' ? '_active' : ''}`}
                                onClick={() => handleLimit('21')}>21
                            </button>
                            <button
                                className={`limit-block__button btn-group-item _button-orange${limit === '42' ? '_active' : ''}`}
                                onClick={() => handleLimit('42')}>42
                            </button>
                        </div>
                    </div>
                </div>
                <div className="product-list__items product-items">
                    {products ?
                        <ul className="product-items__container">
                            {products.map(item =>
                                <React.Fragment key={item.id}>
                                    <ProductItem product={item}/>
                                </React.Fragment>)}
                        </ul>
                        :
                        <div>Товаров не найдено</div>}
                </div>
            </div>
        </div>
    )
}



