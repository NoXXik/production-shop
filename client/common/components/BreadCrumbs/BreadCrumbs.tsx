import { NextRouter, Router } from "next/router";
import React, { useEffect, useState } from "react";
import { INavbarCategory } from "../../types/categoryTypes";
import Link from "next/link";


const pages = [
    {page: 'index', title: 'Главная', url: '/', level: 0, childrens: ['about', 'catalog-v2']},

        {page: 'about', title: 'О нас', url: '/about', level: 1, childrens: ['news']},
            {page: 'news', title: 'Новости', url: '/about/news', level: 2, childrens: null},

        {page: 'catalog', title: 'Каталог', url: '/catalog', level: 1, childrens: ['[category]']},
            {page: '[category]', title: '[category]', url: '/catalog/[category]', level: 2, childrens: null},

        {page: 'download', title: 'Скачать', url: '/download', level: 1, childrens: ['documents', 'software']},
            {page: 'documents', title: 'Скачать документы', url: '/download/documents', level: 2, childrens: null},
            {page: 'software', title: 'Скачать ПО', url: '/download/software', level: 2, childrens: null},

        {page: 'service', title: 'Сервисное обслуживание', url: '/service', level: 1, childrens: ['contacts', 'guaranty', 'status']},
            {page: 'contacts', title: 'Контакты', url: '/service/contacts', level: 2, childrens: null},
            {page: 'guaranty', title: 'Гарантии', url: '/service/guaranty', level: 2, childrens: null},
            {page: 'status', title: 'Статус ремонта', url: '/service/status', level: 2, childrens: null},

        {page: 'support', title: 'Поддержка', url: '/support', level: 1, childrens: ['contacts', 'faq', 'order', 'reset-password']},
            {page: 'contacts', title: 'Контакты', url: '/support/contacts', level: 2, childrens: null},
            {page: 'faq', title: 'Частые вопросы', url: '/support/faq', level: 2, childrens: null},
            {page: 'order', title: 'Вопросы в тех.поддержку', url: '/support/order', level: 2, childrens: null},
            {page: 'reset-password', title: 'Сброс пороля', url: '/support/reset-password', level: 2, childrens: null},

        {page: 'cart', title: 'Корзина', url: '/cart', level: 1, childrens: null},
        {page: 'compare', title: 'Сброс пороля', url: '/compare', level: 1, childrens: null},
        {page: 'favorite', title: 'Сброс пороля', url: '/favorite', level: 1, childrens: null},
        {page: 'login', title: 'Сброс пороля', url: '/login', level: 1, childrens: null},
        {page: 'signin', title: 'Сброс пороля', url: '/signin', level: 1, childrens: null},

]

export default function BreadCrumbs({router, navbarCategories}: {router: Router, navbarCategories: INavbarCategory[]|null}) {
    let crumbsArray: {title: string, url: string}[] = []
    const [crumbs, setCrumbs] = useState<{title: string, url: string}[] | null>(null)

    console.log('BreadCrumbs',router)
    const parseRouter = () => {
        console.log('parseRouter')
        let crumbsArray: {title: string, url: string}[] = []
        const path = router.asPath
        const pathArray = path.split('/')
        let pageInfo = pages.filter(page => page.page === 'index')[0]
        crumbsArray.push({title: pageInfo.title, url: pageInfo.url})
        console.log('pathname', router.pathname)
        if(router.pathname.includes('/catalog/[category]')){
            pageInfo = pages.filter(page => page.page === 'catalog')[0]
            crumbsArray.push({title: pageInfo.title, url: pageInfo.url})
            const categotyTitle = pathArray[2].split('?')[0]
            const category = navbarCategories?.filter(cat => cat.translit === categotyTitle)[0]
            if(category) {
                crumbsArray.push({title: category.title, url: `${pageInfo.url}/${category.translit}`})
            }

            console.log('bc category', crumbsArray)
            return crumbsArray
        }
        if(pathArray.length > 0 && pathArray[1] !== '') {
            console.log(pathArray, path)
            pathArray.forEach((path, id) => {
                if(id > 0) {
                    pageInfo = pages.filter(page => page.page === path)[0]
                    crumbsArray.push({title: pageInfo.title, url: pageInfo.url})
                }
            })
        }
        return crumbsArray

    }
    if(!crumbs) {
        crumbsArray = parseRouter()
    }
    useEffect(() => {
        setCrumbs(parseRouter())
    }, [])
    useEffect(() => {
        setCrumbs(parseRouter())
    }, [router.asPath])
    if(crumbs) {
        crumbsArray = crumbs
    }
    return (
        <>
            {/* <div className="block">
                {crumbsArray && crumbsArray.map((crumb, id) => <Link className="_link" key={id} href={crumb.url}>{crumb.title} {' >  '}</Link>)}
            </div> */}
            <div className="breadcrumbs">
                <ol className="breadrumbs__list" itemScope itemType="https://schema.org/BreadcrumbList">
                    {crumbsArray && crumbsArray.map((crumb, id) =>
                    id !== crumbsArray.length-1
                    ? <React.Fragment key={id}>
                        <li className="breadrumbs__item _icon-arrow-down" itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                            <Link className="_link" itemProp="item" href={crumb.url}>
                                <span itemProp="name">{crumb.title}</span>
                            </Link>
                            <meta itemProp="position" content={`${id+1}`} />
                        </li>
                    </React.Fragment>
                    :
                    <React.Fragment key={id}>
                        <li className="breadrumbs__item " itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                            <span className="_link" itemProp="name">{crumb.title}</span>
                            <meta itemProp="position" content={`${id+1}`} />
                        </li>
                    </React.Fragment>
                    )}
                    {/* <Link className="_link" href={crumb.url}>{crumb.title} {' >  '}</Link>) */}

                    {/* <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                        <a itemProp="item" href="https://example.com/dresses">
                        <span itemProp="name">Dresses</span></a>
                        <meta itemProp="position" content="1" />
                    </li> */}
                </ol>
            </div>
        </>
    )
}
