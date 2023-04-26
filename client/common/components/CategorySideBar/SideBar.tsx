import Link from 'next/link'
import React, {ReactHTMLElement} from 'react'
import {INavbarCategory} from '../../types/categoryTypes'
import {AppLink} from "../../shared/ui/Link/Link";

export default function SideBar({categories, category}: { categories: INavbarCategory[] | null , category: string | null}) {
    const sidebarActive = (e: React.MouseEvent<HTMLDivElement, MouseEvent> | React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault()
        const target = e.currentTarget
        if (target.classList.contains('_active')) {
            target.classList.remove('_active')
            target.querySelector('.ui__arrow')?.classList?.remove('_active')
            target.querySelector('._link-sidebar')?.classList?.remove('_active')
        } else {
            target.classList.add('_active')
            target.querySelector('.ui__arrow')?.classList?.add('_active')
            target.querySelector('._link-sidebar')?.classList?.add('_active')


        }
    }
    if(categories && category) {
        return (
            <>
                <div className="sidebar">
                    <div className="sidebar__body _sidebar-container">
                        <div className="sidebar__list">
                            {/*{categories && categories.map(category => category.level === 1 &&*/}
                            {categories && categories.map(category =>
                                <React.Fragment key={category.id}>
                                    <div className="sidebar__item item" onClick={e => sidebarActive(e)}>
                                        {(category.is_leaf === false)
                                            ? <>
                                                <button type="button" className="ui__arrow _icon-small-arrow">
                                                    <AppLink
                                                        className='item__link _link-sidebar'
                                                        href={`/catalog/${category.translit}`}
                                                        onClick={e => sidebarActive(e)}>
                                                        {category.title}
                                                    </AppLink>
                                                </button>
                                                <div className="item__submenu submenu-item">
                                                    {/*{categories && categories.map(category_ => (category_.parent_id === category.id && category_.level === 2) &&*/}
                                                    {categories && categories.map(category_ => (category_.parent_id === category.id) &&

                                                        <React.Fragment key={category_.id}>
                                                            <AppLink className='submenu-item__link _link-sidebar'
                                                                     href={`/catalog/${category_.translit}`}>{category_.title}</AppLink>
                                                        </React.Fragment>)}
                                                </div>
                                            </>

                                            : <div className="sidebar__item item" onClick={e => sidebarActive(e)}>
                                                <AppLink className='item__link _link-sidebar _single-link'
                                                         href={`/catalog/${category.translit}`}>{category.title}</AppLink>
                                            </div>
                                        }
                                    </div>
                                </React.Fragment>)}
                        </div>
                    </div>
                </div>
            </>
        )
    }
    return (
        <>
            <div className="sidebar">
                <div className="sidebar__body _sidebar-container">
                    <div className="sidebar__list">
                        {categories && categories.map(category => category.level === 1 &&
                        // {categories && categories.map(category =>
                            <React.Fragment key={category.id}>
                                <div className="sidebar__item item" onClick={e => sidebarActive(e)}>
                                    {(category.is_leaf === false)
                                        ? <>
                                            <button type="button" className="ui__arrow _icon-small-arrow">
                                                <AppLink
                                                    className='item__link _link-sidebar'
                                                    href={`/catalog/${category.translit}`}
                                                    onClick={e => sidebarActive(e)}>
                                                    {category.title}
                                                </AppLink>
                                            </button>
                                            <div className="item__submenu submenu-item">
                                                {/*{categories && categories.map(category_ => (category_.parent_id === category.id && category_.level === 2) &&*/}
                                                {categories && categories.map(category_ => (category_.parent_id === category.id) &&

                                                    <React.Fragment key={category_.id}>
                                                        <AppLink className='submenu-item__link _link-sidebar'
                                                                 href={`/catalog/${category_.translit}`}>{category_.title}</AppLink>
                                                    </React.Fragment>)}
                                            </div>
                                        </>

                                        : <div className="sidebar__item item" onClick={e => sidebarActive(e)}>
                                            <AppLink className='item__link _link-sidebar _single-link'
                                                     href={`/catalog/${category.translit}`}>{category.title}</AppLink>
                                        </div>
                                    }
                                </div>
                            </React.Fragment>)}
                    </div>
                </div>
            </div>
        </>
    )
}
