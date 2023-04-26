import React, {Dispatch, SetStateAction} from "react";
import {IReadyFilter} from "../../types/filterTypes";
import {NextRouter} from "next/router";
import {Text, TextSize} from "../../shared/ui/Text/Text";
import {Button, ButtonTheme} from "../../shared/ui/Button/Button";


export default function FilterList({filters, changeFilter, router, isActive, setIsActive}: {filters: IReadyFilter[] | null, changeFilter: Function, router: NextRouter, isActive: boolean, setIsActive: Dispatch<SetStateAction<boolean>>}){
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
        router.push(`${router.query.category}?${router.query.sort ?`&sort=${router.query.sort}`:''}${router.query.limit ?`&limit=${router.query.limit}`:''}${router.query.page ?`&page=${router.query.page}`:''}`, undefined, {shallow: true})
    }

    return (
        <>
            <div className={`filters-layout${isActive? ' active': ''}`}>
                <div className="filters-layout__container">
                    <div className="filters-layout__body">
                        <div className="filters-layout__title">
                            {/*<div className="filters-layout__title-content">Фильтры</div>*/}
                            <Button className="filters-layout__close-btn" theme={ButtonTheme.CLEAR} icon={'_icon-close'} onClick={() => setIsActive(false)}/>
                            <Text className="filters-layout__title-content" title={'Фильтры'} size={TextSize.SIZE_L} />
                            <div className="filters-layout__title-clear"><span className="_link" onClick={() => resetFilters()}>Очистить</span></div>
                        </div>
                        <div className="filters-layout__filter-list filter-list">
                            {filters && filters.map((filter, id) => <React.Fragment key={id}>
                                <div className="filters-list__dropdown-item item-dropdown">
                                    <div className="item-dropdown__title">
                                        <div className="item-dropdown__title-content _active" onClick={e => filterActive(e)}>
                                            <div className="title-content__block">
                                                {/*<span className="title-content__text">{filter.title}</span>*/}
                                                <Text className="title-content__text" text={filter.title} size={TextSize.SIZE_L} />
                                                <span className="title-content__arrow menu__arrow _icon-small-arrow"></span>
                                            </div>
                                        </div>
                                        <div className="item-dropdown__content">
                                                <div className="item-dropdown__filter-list">
                                                    {filter.filters.map((filter_, id) => <React.Fragment key={id}>
                                                        <div className="item-dropdown__filter-item">
                                                            <label  className="filter-label">
                                                                <span className="filter-checkbox">
                                                                    <input type="checkbox" className="filter-checkbox__input _form-checkbox" onChange={(e) => changeFilter(filter.translit, filter_.translit, filter_.checked, filter, e)} checked={filter_.checked}  />
                                                                    <span className="filter-checkbox__check-mark _check-mark _icon-check"></span>
                                                                </span>
                                                                <Text size={TextSize.SIZE_M} text={`${filter_.title} (${filter_.count})`}/>
                                                                {/*<span className="filter-title">{filter_.title}</span>*/}
                                                                {/*<span className="filter-count">({filter_.count})</span>*/}
                                                            </label>
                                                        </div>
                                                    </React.Fragment>)}
                                                </div>
                                            </div>
                                    </div>
                                </div>
                            </React.Fragment>)}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
