import { NextRouter, Router } from "next/router";
import React, { useEffect, useState } from "react";
import { INavbarCategory } from "../../types/categoryTypes";
import Link from "next/link";


const pages = {
    index: {
        title: 'Главная',
        level: 0,
        url: '/',
        childrens: {
            about: {
                title: 'О нас',
                level: 1,
                url: '/about',
                childrens: {
                    news: {
                        title: 'Новости',
                        level: 2,
                        url: '/about/news',
                        childrens: null
                    }
                }
            }

        }
    }
}
const pages2 = [
    {page: 'index', title: 'Главная', url: '/', level: 0, childrens: ['about', 'catalog-v2']},

        {page: 'about', title: 'О нас', url: '/about', level: 1, childrens: ['news']},
            {page: 'news', title: 'Новости', url: '/about/news', level: 2, childrens: null},

        {page: 'catalog', title: 'Каталог', url: '/catalog', level: 1, childrens: ['[category]']},
            {page: '[category]', title: '[category]', url: '/catalog/[category]', level: 2, childrens: null},

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
        let pageInfo = pages2.filter(page => page.page === 'index')[0]
        crumbsArray.push({title: pageInfo.title, url: pageInfo.url})
        console.log('pathname', router.pathname)
        if(router.pathname.includes('/catalog/[category]')){
            pageInfo = pages2.filter(page => page.page === 'catalog')[0]
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
                    pageInfo = pages2.filter(page => page.page === path)[0]
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