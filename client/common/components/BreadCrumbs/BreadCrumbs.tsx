import {NextRouter, Router} from "next/router";
import React, {useEffect, useState} from "react";
import {INavbarCategory} from "../../types/categoryTypes";
import Link from "next/link";
import {continueFromInitialStream} from "next/dist/server/node-web-streams-helper";
import {AppLink} from "../../shared/ui/Link/Link";




const pages = [
    {page: 'index', title: 'Главная', url: '/', level: 0, childrens: ['about', 'catalog-v2']},

    {page: 'about', title: 'Контакты', url: '/about', level: 1, childrens: null},

    {page: 'catalog', title: 'Каталог', url: '/catalog', level: 1, childrens: ['[category]']},
    {page: '[category]', title: '[category]', url: '/catalog/[category]', level: 2, childrens: ['[title]']},
    {page: '[title]', title: '[title]', url: '/catalog/[category]/[title]', level: 3, childrens: null},

    {page: 'order', title: 'Вопросы в тех.поддержку', url: '/support/order', level: 1, childrens: null},

    {page: 'cart', title: 'Корзина', url: '/cart', level: 1, childrens: null},
    {page: 'compare', title: 'Сравнить', url: '/compare', level: 1, childrens: null},
    {page: 'favorite', title: 'Избранное', url: '/favorite', level: 1, childrens: null},

    {page: 'order', title: 'Заказ', url: '/order', level: 1, childrens: ['success', 'failure']},

    {page: 'success', title: 'Успешная оплата', url: '/order/success', level: 2, childrens: null},
    {page: 'failure', title: 'Отмена оплаты', url: '/order/failure', level: 2, childrens: null},

    {page: 'submit-order', title: 'Оформление заявки', url: '/submit-order', level: 1, childrens: null},

    {page: 'privacy-policy', title: 'Политикой обработки персональных данных', url: '/privacy-policy', level: 1, childrens: null},
    {page: 'public-offer', title: 'Публичная оферта', url: '/public-offer', level: 1, childrens: null},
]

export default function BreadCrumbs({
                                        router,
                                        navbarCategories
                                    }: { router: Router, navbarCategories: INavbarCategory[] | null }) {
    let crumbsArray: { title: string, url: string }[] = []
    const [crumbs, setCrumbs] = useState<{ title: string, url: string }[] | null>(null)
    const getCrumbs = (translit: string): { title: string, url: string }[] => {
        let crumbs: { title: string, url: string }[] = []
        const category = navbarCategories?.filter(cat => cat.translit === translit)[0]
        if (category && !category.parent_id) {
            crumbs.push({title: category.title, url: `/catalog/${category.translit}`})
            return crumbs
        }
        const recCat = (parentId: number) => {
            const category = navbarCategories?.filter(cat => cat.id === parentId)[0]
            if (category && category.parent_id === parentId) {
                crumbs.push({title: category.title, url: `/catalog/${category.translit}`})
                recCat(category.parent_id)
            } else if (category && !category.parent_id) {
                crumbs.push({title: category.title, url: `/catalog/${category.translit}`})
                return
            }
        }
        if (category && category.parent_id) {
            recCat(category.parent_id)
            crumbs.push({title: category.title, url: `/catalog/${category.translit}`})
        }
        return crumbs
    }
    const parseRouter = () => {
        let crumbsArray: { title: string, url: string }[] = []
        const path = router.asPath
        const pathArray = path.split('/')
        let pageInfo = pages.filter(page => page.page === 'index')[0]
        if(pageInfo && pageInfo.title && pageInfo.url) {
            crumbsArray.push({title: pageInfo.title, url: pageInfo.url})
        }
        if (router.pathname.includes('/catalog/[category]/[title]')) {
            pageInfo = pages.filter(page => page.page === 'catalog')[0]
            if(pageInfo && pageInfo.title && pageInfo.url) {
                crumbsArray.push({title: pageInfo.title, url: pageInfo.url})
            }
            if (typeof (router.query.category) === 'string') {
                const arr = getCrumbs(router.query.category)
                crumbsArray.push(...arr)
            }
            crumbsArray.push({title: '', url: ''})
            return crumbsArray
        }
        if (router.pathname.includes('/catalog/[category]')) {
            pageInfo = pages.filter(page => page.page === 'catalog')[0]
            if(pageInfo && pageInfo.title && pageInfo.url) {
                crumbsArray.push({title: pageInfo.title, url: pageInfo.url})
            }
            if (typeof (router.query.category) === 'string') {
                const arr = getCrumbs(router.query.category)
                crumbsArray.push(...arr)
            }
            return crumbsArray
        }

        if (pathArray.length > 0 && pathArray[1] !== '') {
            pathArray.forEach((path, id) => {
                if (id > 0) {
                    pageInfo = pages.filter(page => page.page === path)[0]
                    if(pageInfo && pageInfo.title && pageInfo.url) {
                        crumbsArray.push({title: pageInfo.title, url: pageInfo.url})
                    }
                }
            })
        }
        return crumbsArray

    }
    if (!crumbs) {
        crumbsArray = parseRouter()
    }
    useEffect(() => {
        setCrumbs(parseRouter())
    }, [])
    useEffect(() => {
        setCrumbs(parseRouter())
    }, [router.asPath])
    if (crumbs) {
        crumbsArray = crumbs
    }
    return (
        <>
            <div className="breadcrumbs">
                <div className="_container">
                    <ol className="breadcrumbs__list" itemScope itemType="https://schema.org/BreadcrumbList">
                        {crumbsArray && crumbsArray.map((crumb, id) =>
                            (id !== crumbsArray.length - 1)
                                ? <React.Fragment key={id}>
                                    <li className="breadcrumbs__item black-crumb" itemProp="itemListElement" itemScope
                                        itemType="https://schema.org/ListItem">
                                        <AppLink  className="breadcrumbs__link _link" itemProp="item" href={crumb.url}>
                                            <span itemProp="name">{crumb.title}</span>
                                        </AppLink>
                                        <meta itemProp="position" content={`${id + 1}`}/>
                                    </li>
                                    <span className='breadcrumbs-arrow _icon-small-arrow'></span>
                                </React.Fragment>
                                :
                                <React.Fragment key={id}>
                                    <li className="breadcrumbs__item grey-crumb" itemProp="itemListElement" itemScope
                                        itemType="https://schema.org/ListItem">
                                        <span className="breadcrumbs__link _link" itemProp="name">{crumb.title}</span>
                                        <meta itemProp="position" content={`${id + 1}`}/>
                                    </li>
                                </React.Fragment>
                        )}
                    </ol>
                </div>
            </div>
        </>
    )
}


// {page: 'product', title: 'Товар', url: '/product', level: 1, childrens: ['[title]']},
//         {page: '[title]', title: '[title]', url: '/product/[title]', level: 2, childrens: null},
// {
//     page: 'support',
//     title: 'Поддержка',
//     url: '/support',
//     level: 1,
//     childrens: ['contacts', 'faq', 'order', 'reset-password']
// },
// {page: 'login', title: 'Войти', url: '/login', level: 1, childrens: null},
// {page: 'signin', title: 'Зарегестрироваться', url: '/signin', level: 1, childrens: null},
// {page: 'auth-test', title: 'Auth test', url: '/auth-test', level: 1, childrens: null},
