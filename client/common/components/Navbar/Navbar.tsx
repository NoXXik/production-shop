import Link from "next/link"
import {INavbarCategory} from "../../types/categoryTypes"
import React, {Fragment, useEffect, useState} from 'react'
import {SearchInput} from "../../shared/ui/SearchInput/SearchInput";
import {IProduct} from "../../types/productTypes";
import {useLazySearchProductsQuery} from "../../store/api/categoryAPI";
import useDebounce from "../../hooks/useDebounce";
import {AppLink, AppLinkTheme} from "../../shared/ui/Link/Link";
import {Button, ButtonTheme} from "../../shared/ui/Button/Button";

function Navbar({navbarCategories}: { navbarCategories: INavbarCategory[] | null }) {
    const [searchInput, setSearchInput] = useState('')
    const [searchProducts, setSearchProducts] = useState<IProduct[]>([])
    const [searchProduct, {data, isLoading, isError, error, isSuccess}] = useLazySearchProductsQuery()
    const searchValue = useDebounce(searchInput, 700)
    const [focused, setFocus] = useState(false)
    const [menuIsOpened, setMenuOpen] = useState(false)

    useEffect(() => {
        if (searchValue && searchValue.length > 0) {
            searchProduct(searchValue)
        } else if (searchValue.length === 0) {
            setSearchProducts([])
        }
    }, [searchValue])

    useEffect(() => {
        if (data && isSuccess) {
            setSearchProducts(data)
        }
    }, [data, isSuccess])
    const handleBlur = () => {
        setTimeout(() => {
            setFocus(false)
        }, 200)
    }
    return (
        <header className="header">
            <div className="header__wrapper">
                <div className="header__container _container">
                    <div className="header__body">
                        <div className="header__top">
                            <Link className="header__logo _logo" href={'/'}><img src="/logo.svg" alt="logo"/></Link>
                            <div className="header__menu menu">
                                <nav className="menu__body">
                                    <ul className="menu__list">
                                        <li className="menu__item">
                                            {/*<Link type= className="menu__link _link" href={'/about'}>О бренде</Link>*/}
                                            <AppLink href={"tel: +79867240398"}>+7 986 724 03 98</AppLink>
                                        </li>
                                        <li className="menu__item">
                                            <AppLink href={"mailto:kontrol_116@mail.ru"} >kontrol_116@mail.ru</AppLink>
                                        </li>
                                        <li className="menu__item">
                                            <AppLink href={"/about"}>Контакты</AppLink>
                                        </li>
                                        <li className="menu__item">
                                            <AppLink href={"/support/order"}>Обратная связь</AppLink>
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
                                <li className="header__catalog catalog-header">
                                    {/*<Button theme={ButtonTheme.PRIMARY} icon={'_icon-menu'}>*/}
                                    {/*    <Link href={'/catalog'} >Каталог товаров</Link>*/}
                                    {/*</Button>*/}
                                    <AppLink icon={'_icon-menu'} href={'/catalog'} theme={AppLinkTheme.BUTTON}>Каталог
                                        товаров</AppLink>
                                    <ul className="header__catalog-list submenu">
                                        {navbarCategories && navbarCategories.map(category => category.level === 1 &&
                                            <Fragment key={category.id}>
                                                <li className="catalog__item">
                                                    <AppLink className="catalog__item-link _link"
                                                          href={`/catalog/${category.translit}`}>{category.title}</AppLink>
                                                    {category.is_leaf === false &&
                                                        <ul className="catalog__sub-list submenu">
                                                            {navbarCategories && navbarCategories.map(category_ => (category.id === category_.parent_id && category_.level === 2) &&
                                                                <Fragment key={category_.id}>
                                                                    <li className="catalog__sub-item">
                                                                        <AppLink className="catalog__sub-item-link _link"
                                                                              href={`/catalog/${category_.translit}`}>{category_.title}</AppLink>
                                                                    </li>
                                                                </Fragment>)}
                                                        </ul>}
                                                </li>
                                            </Fragment>)}
                                    </ul>
                                </li>
                            </div>
                            <div className="header__search">
                                <div onBlur={() => handleBlur()} onFocus={() => setFocus(true)} className="search__form">
                                    {/*<button type="button" className="search-form__icon _icon-search"></button>*/}
                                    {/*<form action="#" className="search-form__item">*/}
                                    {/*    <input type="text" className="search__form-input" placeholder="Поиск по товарам"/>*/}
                                    {/*    <button type="button" className="search-form__btn _icon-search"></button>*/}
                                    {/*</form>*/}
                                    <SearchInput label={'Поиск товаров'} value={searchInput} onChange={setSearchInput}
                                                 products={searchProducts} focused={focused} setFocus={setFocus}/>
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
                                        {/*<Link className="header-link _link" href={'/compare'}><span className="_icon-stats-dots"></span>Сравнить</Link>*/}
                                        <AppLink href={'/compare'}
                                                 icon={'_icon-menu-compare'}><></>
                                        </AppLink>
                                    </div>
                                    <div className="actions-header__buttons actions-header__buttons_favorite">
                                        {/*<Link className="header-link _link" href={'/favorite'}><span className="_icon-favorite"></span>Избранное</Link>*/}
                                        <AppLink href={'/favorite'} icon={'_icon-menu-favorite'}><></>
                                        </AppLink>
                                    </div>
                                    <div className="actions-header__buttons actions-header__buttons_cart">
                                        {/*<Link className="header-link _link" href={'/cart'}><span className="_icon-cart"></span>Корзина</Link>*/}
                                        <AppLink href={'/cart'} icon={'_icon-menu-cart'}><></>
                                        </AppLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="header__wrapper-mobile">
                <div className="header__top-mobile">
                    <div className={`header__navbar-mobile${menuIsOpened ? ' active': ''}`}>
                        <Button className={'header__close-btn'} onClick={() => setMenuOpen(false)} icon={'_icon-close'}
                                theme={ButtonTheme.CLEAR}></Button>
                        <AppLink theme={AppLinkTheme.MOBILE} href={"tel: +79867240398"}>+7 986 724 03 98</AppLink>
                        <AppLink theme={AppLinkTheme.MOBILE} href={"mailto:kontrol_116@mail.ru"} >kontrol_116@mail.ru</AppLink>
                        <AppLink theme={AppLinkTheme.MOBILE} href={"/catalog"}>Каталог товаров</AppLink>
                        <AppLink theme={AppLinkTheme.MOBILE} href={"/cart"}>Корзина</AppLink>
                        <AppLink theme={AppLinkTheme.MOBILE} href={"/favorite"}>Избранное</AppLink>
                        <AppLink theme={AppLinkTheme.MOBILE} href={"/about"}>Контакты</AppLink>
                        <AppLink theme={AppLinkTheme.MOBILE} href={"/support/order"}>Обратная связь</AppLink>
                    </div>
                    <div className={`header__search-mobile${focused ? ' focused': ''}`}>
                        <SearchInput mobile={true} label={'Поиск товаров'} value={searchInput} onChange={setSearchInput} products={searchProducts} focused={focused} setFocus={setFocus}/>
                    </div>
                    <Button onClick={() => setMenuOpen(true)} className="header__menu_btn" icon={'_icon-menu'} theme={ButtonTheme.CLEAR}></Button>
                    <Link className="header__logo _logo" href={'/'}><img src="/logo.svg" alt="logo"/></Link>
                    <Button onClick={() => setFocus(true)} className="header__search_btn" icon={'_icon-search'} theme={ButtonTheme.CLEAR}></Button>
                </div>
                <div className="header__bottom-mobile">
                    <AppLink href={'/'} icon={'_icon-menu-home'} theme={AppLinkTheme.PRIMARY}><></></AppLink>
                    <AppLink href={'/catalog'} icon={'_icon-menu-catalog'} theme={AppLinkTheme.PRIMARY}><></></AppLink>
                    <AppLink href={'/cart'} icon={'_icon-menu-cart'} theme={AppLinkTheme.PRIMARY}><></></AppLink>
                    <AppLink href={'/compare'} icon={'_icon-menu-compare'} theme={AppLinkTheme.PRIMARY}><></></AppLink>
                    <AppLink href={'/favorite'} icon={'_icon-menu-favorite'} theme={AppLinkTheme.PRIMARY}><></></AppLink>
                </div>
            </div>
        </header>
    )
}

export default React.memo(Navbar)
