import {useAppDispatch} from "../../hooks/redux/reduxHooks"
import {Pagination, Select, Skeleton} from 'antd';
import {IProduct} from "../../types/productTypes";
import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {NextRouter} from "next/router";
import {ILimitValues, ISortValues, IViewValues} from "../../types/settingsTypes";
import ProductItem from "./ProductItem/ProductItem";
import {Button} from "../../shared/ui/Button/Button";

const sortList: { label: string, value: ISortValues }[] =
    [
        {label: 'По названию (А-Я)', value: 'title_asc'},
        {label: 'По названию (Я-А)', value: 'title_desc'},
        {label: 'По цене (сначала дорогие)', value: 'price_desc'},
        {label: 'По цене (сначала дешевые)', value: 'price_asc'},
    ]

export default function ProductList({
                                        products,
                                        router,
                                        count,
                                        setIsActive,
                                        isLoading,
                                        sortB = true,
                                        paginationB = true,
                                    }: { products: IProduct[] | null, router: NextRouter, count: number, setIsActive?: Dispatch<SetStateAction<boolean>>, isLoading: boolean, sortB?: boolean, paginationB?: boolean }) {
    let _limit = Number(router.query.limit || '21')

    const [view, setView] = useState<IViewValues>('plate')
    const [sort, setSort] = useState<ISortValues>('title_asc')
    const [limit, setLimit] = useState<number>(Number(_limit))
    const [page, setPage] = useState<number>(1)
    const [maxPage, setMaxPage] = useState<string>('1')
    let _page = Number(router.query.page || '1')
    const handleSort = (item: ISortValues) => {
        setSort(item)

        const newUrl = router.asPath.replaceAll(/((?:&|\?)sort=(?:title|price)_(?:desc|asc))/g, '')

        if (newUrl.includes('?')) {
            router.push(`${newUrl}&sort=${item}`, undefined, {shallow: true})
        } else {
            router.push(`${newUrl}?sort=${item}`, undefined, {shallow: true})
        }

    }

    useEffect(() => {
        if (router.query.sort) {
            setSort(router.query.sort as ISortValues)
        }
        if (router.query.limit) {
            setLimit(Number(router.query.limit) as ILimitValues)
        }
    }, [])

    const handlePagination = (page: number, pageSize: number) => {
        setPage(page)
        const newUrl = router.asPath.replaceAll(/((?:&|\?)page=[0-9]*)/g, '')

        if (newUrl.includes('?')) {
            router.push(`${newUrl}&page=${page}`, undefined, {shallow: true})
        } else {
            router.push(`${newUrl}?page=${page}`, undefined, {shallow: true})
        }
    }
    return (
        <div className="product-list__body">
            <div className="product-list__container">
                <div className="product-list__setting-panel setting-panel">
                    {sortB && <div className="setting-panel__sort-block">
                        <form action='sort' className="sort-block__body">
                            {/*<label className="sort-block__title">*/}
                            {/*    <Text title={'Сортировка'} size={TextSize.SIZE_M} />*/}
                            {/*</label>*/}
                            <Select className="sort-block__select" size="middle" style={{width: '225px'}}
                                    placeholder="Select a person" optionFilterProp="children" onChange={handleSort}
                                    filterOption={(input, option) =>
                                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                                    options={sortList}
                                    value={sortList.filter(filter => filter.value === sort)[0].value}/>
                            {/* <select className="sort-block__list">
                                    {sortList.map(item => <option key={item.value} onChange={() => handleSort(item)} value={item.value}>{item.label}</option>)}
                            </select> */}
                        </form>
                        <Button onClick={() => setIsActive && setIsActive(true)} small={true} className={'sort-block__filters'}
                                title={'Фильтры'}>Фильтры</Button>
                    </div>}
                </div>
                <div className="product-list__items product-items">
                    {isLoading
                        ? <div className={'skeleton'} style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            {[0, 1, 2, 3, 4, 5].map(item => <div style={{
                                width: 270,
                                marginTop: 24,
                                marginLeft: 24,
                                border: '1px #E0E0E0 solid',
                                borderRadius: 12,
                                padding: 12,
                                boxSizing: 'border-box'
                            }}
                                                                 key={item}>
                                <Skeleton.Image style={{width: 200, height: 200}} active={true}/>
                                <Skeleton style={{marginTop: 14}} active={true} paragraph={{rows: 3}}/>
                                <Skeleton.Button style={{marginTop: 14}} active={true}/>
                            </div>)}
                        </div>
                        : <>{(products && products.length > 0) ?
                            <ul className="product-items__container">
                                {products.map(item =>
                                    <React.Fragment key={item.id}>
                                        <ProductItem product={item}/>
                                    </React.Fragment>)}
                            </ul>
                            :
                            <h1>Товаров не найдено</h1>
                        }</>
                    }
                </div>
                {paginationB && <div className="setting-panel__pagination">
                    <Pagination style={{alignItems: 'center'}}
                                onChange={(page, pageSize) => handlePagination(page, pageSize)} pageSize={limit}
                                current={_page} total={count}/>
                </div>}
            </div>
        </div>
    )
}


{/*<div className="setting-panel__view-block">*/
}
{/*    <label className="view-block__title">*/
}
{/*        Вид*/
}
{/*    </label>*/
}
{/*    <div className="view-block__btn-group btn-group">*/
}
{/*        <button className={`view-block__button btn-group-item ${view === 'plate' ? '_active' : ''}`}*/
}
{/*                onClick={() => handleView('plate')}><span className="_icon-grid6"></span></button>*/
}
{/*        <button className={`view-block__button btn-group-item ${view === 'list' ? '_active' : ''}`}*/
}
{/*                onClick={() => handleView('list')}><span className="_icon-list2"></span></button>*/
}
{/*    </div>*/
}
{/*</div>*/
}
{/*<div className="setting-panel__limit-block">*/
}
{/*    <label className="limit-block__title">*/
}
{/*        Вид*/
}
{/*    </label>*/
}
{/*    <div className="limit-block__btn-group btn-group">*/
}
{/*        <button*/
}
{/*            className={`limit-block__button btn-group-item _button-orange ${limit === 21 ? '_active' : ''}`}*/
}
{/*            onClick={() => handleLimit(21)}>21*/
}
{/*        </button>*/
}
{/*        <button*/
}
{/*            className={`limit-block__button btn-group-item _button-orange${limit === 42 ? '_active' : ''}`}*/
}
{/*            onClick={() => handleLimit(42)}>42*/
}
{/*        </button>*/
}
{/*    </div>*/
}
{/*</div>*/
}

// const handleView = (view: IViewValues) => {
//     setView(view)
// }
// const handleLimit = (limit: ILimitValues) => {
//     setLimit(limit)
//
//     const newUrl = router.asPath.replaceAll(/((?:&|\?)limit=[0-9]*)/g, '')
//     if (newUrl.includes('?')) {
//         router.push(`${newUrl}&limit=${limit}`, undefined, {shallow: true})
//     } else {
//         router.push(`${newUrl}?limit=${limit}`, undefined, {shallow: true})
//     }
//
// }
