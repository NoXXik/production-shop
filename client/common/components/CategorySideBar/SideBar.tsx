
import Link from 'next/link'
import React, { ReactHTMLElement } from 'react'
import { INavbarCategory } from '../../types/categoryTypes'

export default function SideBar({categories}: {categories: INavbarCategory[] | null}) {
    const sidebarActive = (e: React.MouseEvent<HTMLDivElement, MouseEvent> | React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault()
        const target = e.currentTarget
        if(target.classList.contains('_active')) {
            target.classList.remove('_active')
            target.querySelector('.ui__arrow')?.classList?.remove('_active')
            target.querySelector('._link-sidebar')?.classList?.remove('_active')
        } else {
            target.classList.add('_active')
            target.querySelector('.ui__arrow')?.classList?.add('_active')
            target.querySelector('._link-sidebar')?.classList?.add('_active')


        }
        console.log(target)
    }

    return (
        <>
            <div className="sidebar">
                <div className="sidebar__body _sidebar-container">
                    <div className="sidebar__list">
                        {categories && categories.map(category => category.level === 1 && <React.Fragment key={category.id}>
                            <div className="sidebar__item item" onClick={e => sidebarActive(e)}>
                                {(category.is_leaf === false)
                                ? <>
                                    <button type="button" className="ui__arrow _icon-arrow-down">                                    <Link className='item__link _link-sidebar' href={`/catalog/${category.translit}`} onClick={e => sidebarActive(e)}>{category.title}</Link></button>
                                    <div className="item__submenu submenu-item">
                                        {categories && categories.map(category_ => (category_.parent_id === category.id && category_.level === 2) && <React.Fragment key={category_.id}>
                                            <Link className='submenu-item__link _link-sidebar' href={`/catalog/${category_.translit}`}>{category_.title}</Link>
                                        </React.Fragment>)}
                                    </div>
                                </>
                                
                                : <div className="sidebar__item item" onClick={e => sidebarActive(e)}>
                                    <Link className='item__link _link-sidebar _single-link' href={`/catalog/${category.translit}`}>{category.title}</Link>
                                </div> 
                                }
                            </div>
                        </React.Fragment>)}
                        {/* <div className="sidebar__item item">
                            <Link className='item__link _link-sidebar' href={'/'} onClick={e => sidebarActive(e)}>Катагория 1</Link>
                            <button type="button" className="ui__arrow _icon-arrow-down"></button>
                            <div className="item__submenu submenu-item">
                                <Link className='submenu-item__link _link-sidebar' href={'/'}>Подкатагория 1</Link>
                                <Link className='submenu-item__link _link-sidebar' href={'/'}>Подкатагория 2</Link>
                            </div>
                        </div>
                        <div className="sidebar__item item">
                            <Link className='item__link _link-sidebar' href={'/'} onClick={e => sidebarActive(e)}>Катагория 2</Link>
                            <button type="button" className="item__arrow _icon-arrow-down"></button>
                            <div className="item__submenu submenu-item">
                                <Link className='submenu-item__link _link-sidebar' href={'/'}>Подкатагория 1</Link>
                                <Link className='submenu-item__link _link-sidebar' href={'/'}>Подкатагория 2</Link>
                            </div>
                        </div> */}
                        <div className="sidebar__item item">
                            <Link className='submenu-item__link _link-sidebar _single-link' href={'/'}>Катагория 3</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}