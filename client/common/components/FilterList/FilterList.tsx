import React from "react";
import { IReadyFilter } from "../../types/filterTypes";
import { NextRouter } from "next/router";


export default function FilterList({filters, changeFilter, router}: {filters: IReadyFilter[] | null, changeFilter: Function, router: NextRouter}){


    const filterActive = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault()
        const target = e.currentTarget
        if(target.classList.contains('_active')) {
            target.classList.remove('_active')
        } else {
            target.classList.add('_active')
        }
    }

    const resetFilters = () => {
        router.push(`${router.query.category}?${router.query.sort ?`&sort=${router.query.sort}`:''}${router.query.limit ?`&limit=${router.query.limit}`:''}${router.query.page ?`&page=${router.query.page}`:''}`)
    }
    
    return (
        <>
            <div className="filters-layout">
                <div className="filters-layout__container">
                    <div className="filters-layout__body">
                        <div className="filters-layout__title">
                            <div className="filters-layout__title-content">Фильтры</div>
                            <div className="filters-layout__title-clear"><span className="_link" onClick={() => resetFilters()}>Очистить</span></div>
                        </div>
                        <div className="filters-layout__filter-list filter-list">
                            {filters && filters.map((filter, id) => <React.Fragment key={id}>
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
                                                                    <input onChange={(e) => changeFilter(filter.translit, filter_.translit, filter_.checked, filter, e)} checked={filter_.checked} type="checkbox" className="filter-checkbox__input _form-checkbox" />
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