import Link from "next/link"
import { INavbarCategory } from "../../types/categoryTypes"
import {useEffect, Fragment, memo} from 'react'
import { useAppDispatch, useAppSelector } from "../../hooks/redux/reduxHooks"
import { setCategory } from "../../store/slices/categorySlice"
import React from "react"

function Navbar({ navbarCategories }: {navbarCategories: INavbarCategory[]|null}) {
    console.log('Render Navbar')
    return (
      <header className="header">
        <div className="header__wrapper">
            <div className="header__container _container">
                <div className="header__body">
                    <div className="header__top">
                        <Link className="header__logo _logo" href={'/'}><h1>E-commerce</h1></Link>
                        <div className="header__menu menu">
                            <nav className="menu__body">
                                <ul className="menu__list">
                                    <li className="menu__item">
                                        <Link className="menu__link _link" href={'/about'} >О бренде</Link>
                                        <button type="button" className="menu__arrow _icon-arrow-down"></button>
                                        <ul className="menu__sub-list">
                                            <li className="menu__sub-item">
                                                <Link className="menu__sub-link _link" href={'/about/news'} >Новости</Link>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="menu__item">
                                        <Link className="menu__link _link" href={'/support'} >Тех.поддержка</Link>
                                        <button type="button" className="menu__arrow _icon-arrow-down"></button>
                                        <ul className="menu__sub-list">
                                            <li className="menu__sub-item">
                                                <Link className="menu__sub-link _link" href={'/support/order'} >Вопросы в тех.поддержку</Link>
                                            </li>
                                            <li className="menu__sub-item">
                                                <Link className="menu__sub-link _link" href={'/support/faq'} >Частые вопросы</Link>
                                            </li>
                                            <li className="menu__sub-item">
                                                <Link className="menu__sub-link _link" href={'/support/contacts'} >Контакты</Link>
                                            </li>
                                            <li className="menu__sub-item">
                                                <Link className="menu__sub-link _link" href={'/support/reset-password'} >Сброс пороля</Link>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="menu__item">
                                        <Link className="menu__link _link" href={'/service'} >Сервис</Link>
                                        <button type="button" className="menu__arrow _icon-arrow-down"></button>
                                        <ul className="menu__sub-list">
                                            <li className="menu__sub-item">
                                                <Link className="menu__sub-link _link" href={'/service'} >Сервисное обслуживание</Link>
                                            </li>
                                            <li className="menu__sub-item">
                                                <Link className="menu__sub-link _link" href={'/service/status'} >Проверка статуса ремонта</Link>
                                            </li>
                                            <li className="menu__sub-item">
                                                <Link className="menu__sub-link _link" href={'/service/guaranty'} >Гарантия</Link>
                                            </li>
                                            <li className="menu__sub-item">
                                                <Link className="menu__sub-link _link" href={'/service/contacts'} >Контакты</Link>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="menu__item">
                                        <Link className="menu__link _link" href={'/download'} >Скачать</Link>
                                        <button type="button" className="menu__arrow _icon-arrow-down"></button>
                                        {/*<ul className="menu__sub-list">*/}
                                        {/*    <li className="menu__sub-item">*/}
                                        {/*        <Link className="menu__sub-link _link" href={'/download/software'} >Прошивки и ПО</Link>*/}
                                        {/*    </li>*/}
                                        {/*    <li className="menu__sub-item">*/}
                                        {/*        <Link className="menu__sub-link _link" href={'/download/documents'} >Документация</Link>*/}
                                        {/*    </li>*/}
                                        {/*</ul>*/}
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                    <div className="header__bottom">
                        <div className="header__catalog-block ">
                            {/* <div className="header__catalog catalog-header">
                                <Link className="catalog-header__link _link" href={'/catalog'}>Каталог товаров</Link>
                            </div> */}
                            <li className="header__catalog catalog-header _button-orange">
                                <Link className="catalog-header__link _link " href={'/catalog'}>Каталог товаров</Link>

                                    <ul className="header__catalog-list submenu">
                                        {navbarCategories && navbarCategories.map(category => category.level === 1 && <Fragment key={category.id}>
                                            <li className="catalog__item">
                                                <Link className="catalog__item-link _link" href={`/catalog/${category.translit}`}>{category.title}</Link>
                                                {category.is_leaf === false &&
                                                <ul className="catalog__sub-list submenu">
                                                    {navbarCategories && navbarCategories.map(category_ => (category.id === category_.parent_id && category_.level === 2) && <Fragment key={category_.id}>
                                                        <li className="catalog__sub-item">
                                                            <Link className="catalog__sub-item-link _link" href={`/catalog/${category_.translit}`}>{category_.title}</Link>
                                                        </li>
                                                    </Fragment>)}
                                                </ul>}
                                            </li>
                                        </Fragment>)}
                                    </ul>
                            </li>
                        </div>
                        <div className="header__search">
                            <div className="search__form">
                                <button type="button" className="search-form__icon _icon-search"></button>
                                <form action="#" className="search-form__item">
                                    <input type="text" className="search__form-input" placeholder="Поиск по товарам"/>
                                    <button type="button" className="search-form__btn _icon-search"></button>
                                </form>
                            </div>
                        </div>
                        <div className="header__actions actions-header">
                            <div className="actions-header__buttons">
                                {/*<div className="actions-header__buttons actions-header__buttons_home">*/}
                                {/*    <Link className="header-link _link" href={'/'}><span className="_icon-home2"></span>Главная</Link>*/}
                                {/*</div>*/}
                                {/*<div className="actions-header__buttons actions-header__buttons_catalog">*/}
                                {/*    <Link className="header-link _link" href={'/catalog'}><span className="_icon-list2"></span>Каталог</Link>*/}
                                {/*</div>*/}
                                <div className="actions-header__buttons actions-header__buttons_compare">
                                    <Link className="header-link _link" href={'/compare'}><span className="_icon-stats-dots"></span>Сравнить</Link>
                                </div>
                                <div className="actions-header__buttons actions-header__buttons_favorite">
                                    <Link className="header-link _link" href={'/favorite'}><span className="_icon-favorite"></span>Избранное</Link>
                                </div>
                                <div className="actions-header__buttons actions-header__buttons_cart">
                                    <Link className="header-link _link" href={'/cart'}><span className="_icon-cart"></span>Корзина</Link>
                                </div>
                                <div className="actions-header__buttons actions-header__buttons_login">
                                    <Link className="header-link _link" href={'/login'}><span className="_icon-user"></span>Войти</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </header>
    )
}

export default React.memo(Navbar)
// export default Navbar
