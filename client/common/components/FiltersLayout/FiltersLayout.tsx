import React, { useEffect, useState } from "react"
import Slider from "../Rc-Slider/Slider"
import { Filter, IFilter, IReadyFilter } from "../../types/filterTypes"
import { NextRouter, useRouter } from "next/router"
import { addSelectedFilter, changeReadyFilter, deleteSelectedFilter, resetSelectedFilter, setReadyFilter } from "../../store/slices/filterSlice"
import { useAppDispatch, useAppSelector } from "../../hooks/redux/reduxHooks"
import { useLazyGetFiltersQuery } from "../../store/api/categoryAPI"
import { IProductFilter, IProductRequestData } from "../../types/productTypes"
import { getOutFilters } from "../../../pages/catalog-prev/[category]"


export default function FiltersLayout({readyFilters, data, router, filters, mainFilters}: {readyFilters: IReadyFilter[] | null, data: IProductRequestData, router: NextRouter, filters: IProductFilter[], mainFilters: IFilter[]}){
    console.log('Filter Layout render')
    const dispatch = useAppDispatch()
    const newRedyFilters: IReadyFilter[] | null = useAppSelector(state => state.filter.readyFilter)
    const [lastFilter, setLastFilter] = useState<IReadyFilter | null>(null)
    
    console.log('start readyFilters', readyFilters)
    const filterActive = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault()
        const target = e.currentTarget
        if(target.classList.contains('_active')) {
            target.classList.remove('_active')
        } else {
            target.classList.add('_active')
        }
    }
    
    const changeFilter = (title: string, filter: string, checked: boolean) => {
        const l = newRedyFilters?.filter(filter => filter.translit === title)
        if(l){
            setLastFilter(l[0])
        }
        dispatch(changeReadyFilter({title, filter}))
        if(checked) {
            // Убрать фильтр с url
            console.log('checked', data, router.asPath, router.query)
            console.log(router.query[`_${title}`])
            let queryArray: any[] =[]
            data.filters.map(filters => {
                filters.filter(filter_ => {
                    console.log(filter_)
                    if(filter_.key !== `` && filter_.value !== filter) {
                        queryArray.push(filter_)
                    }
                })
            })
            router.push(`${router.query.category}?${queryArray.map(filter => `_${filter.key}=${filter.value}`).join('&')}`)

        } else {
            // Добавить фильтр в url
            router.push(`${router.query.category}?${data.filters.map(filtr => filtr.map(filtr_ => `_${filtr_.key}=${filtr_.value}`).join('&')).join('&')}&_${title}=${filter}`)
            
        }
    }

    if(lastFilter && filters) {
        console.log('last filter update')
        const newArray = getReadyFilters(filters, mainFilters, lastFilter, data)
        // dispatch(setReadyFilter(newArray)) 
        setLastFilter(null)
        readyFilters = newArray
    }

    if(!readyFilters) {
        readyFilters = newRedyFilters
    }
    

    console.log('ready filters', readyFilters)
    return (
        <>
            <div className="filters-layout">
                <div className="filters-layout__container">
                    <div className="filters-layout__body">
                        <div className="filters-layout__title">
                            <div className="filters-layout__title-content">Фильтры</div>
                            <div className="filters-layout__title-clear"><span className="_link" onClick={() => dispatch(resetSelectedFilter())}>Очистить</span></div>
                        </div>
                        <div className="filters-layout__filter-list filter-list">
                            {readyFilters && readyFilters.map((filter, id) => <React.Fragment key={id}>
                                <div className="filters-list__dropdown-item item-dropdown">
                                    <div className="item-dropdown__title">
                                        <div className="item-dropdown__title-content _active" onClick={e => filterActive(e)}>
                                            <div className="title-content__block">
                                                <span className="title-content__text">{filter.title}</span>
                                                <span className="title-content__arrow menu__arrow _icon-arrow-down"></span>
                                            </div>
                                        </div>
                                        <div className="item-dropdown__content">
                                                <div className="item-dropdown__filter-list">
                                                    {filter.filters.map((filter_, id) => <React.Fragment key={id}>
                                                        <div className="item-dropdown__filter-item">
                                                            <label  className="filter-label">
                                                                <span className="filter-chekbox">
                                                                    <input onChange={() => changeFilter(filter.translit, filter_.translit, filter_.checked)} checked={filter_.checked} type="checkbox" className="filter-checkbox__input _form-checkbox" />
                                                                    <span className="filter-chekbox__chek-mark _chek-mark _icon-checkmark3"></span>
                                                                </span>
                                                                <span className="filter-title">{filter_.title}</span>
                                                                <span className="filter-count">({filter_.count})</span>
                                                            </label>
                                                        </div>
                                                    </React.Fragment>)}
                                                </div>
                                            </div> 
                                    </div>
                                </div>
                            </React.Fragment>)}
                            {/* <div className="filters-list__dropdown-item item-dropdown">
                                <div className="item-dropdown__title">
                                    <div className="item-dropdown__title-content" onClick={e => filterActive(e)}>
                                        <div className="title-content__block">
                                            <span className="title-content__text">Название фильтра</span>
                                            <span className="title-content__arrow menu__arrow _icon-arrow-down"></span>
                                        </div>
                                    </div>
                                    <div className="item-dropdown__content">
                                            <div className="item-dropdown__filter-list">
                                                <div className="item-dropdown__filter-item">
                                                    <label  className="filter-label">
                                                        <span className="filter-chekbox">
                                                            <input type="checkbox" className="filter-checkbox__input _form-checkbox" />
                                                            <span className="filter-chekbox__chek-mark _chek-mark _icon-checkmark3"></span>
                                                        </span>
                                                        <span className="filter-title">Параметра фильтра</span>
                                                        <span className="filter-count">(34)</span>
                                                    </label>
                                                </div>
                                                <div className="item-dropdown__filter-item">
                                                    <label className="filter-label">
                                                        <span className="filter-chekbox">
                                                            <input type="checkbox" className="filter-checkbox__input _form-checkbox" />
                                                            <span className="filter-chekbox__chek-mark _chek-mark _icon-checkmark3"></span>
                                                        </span>
                                                        <span className="filter-title">Параметра фильтра 2</span>
                                                        <span className="filter-count">(5)</span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div> 
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}



const getReadyFilters = (filters: IProductFilter[], mainFilters: IFilter[], lastFilter: IReadyFilter, data: IProductRequestData): IReadyFilter[] => {
    const filterList = getOutFilters(filters, mainFilters, data)
    filterList.map(filter => {
        if(filter.translit === lastFilter.translit) {
            return lastFilter
        }
        return filter
    })
    console.log('getReadyFilters', filterList)
    return filterList
}


