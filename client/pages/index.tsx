import Head from 'next/head'
import React, {useEffect, useState} from "react";
import {ProductSlider} from "../common/shared/ui/ProductSlider/ProductSlider";
import {NextPageContext} from "next/types";
import axios from "axios";
import {Carousels} from "../common/types/utilTypes";
import {useLazyGetProductSlidersQuery} from "../common/store/api/categoryAPI";
import {Skeleton} from "antd";
import {INavbarCategory} from "../common/types/categoryTypes";
import {useAppSelector} from "../common/hooks/redux/reduxHooks";
import CategoryList from "../common/components/CategoryList/CategoryList";

interface HomeProps {
    carousels?: Carousels;
}


export default function Home({carousels, categories}: { carousels: Carousels | null, categories: INavbarCategory[] | null}) {
    const [getCarousels, {data, isSuccess, isLoading, isError}] = useLazyGetProductSlidersQuery()
    const categoriesStore = useAppSelector(state => state.categories).categories
    useEffect(() => {
        if (!carousels) {
            getCarousels(null)
        }
    }, [])
    if (isLoading) {
        return (
            <div className={'_container'}>
                <div style={{display: 'flex', overflow: 'hidden', justifyContent: 'space-between'}}>
                    <Skeleton.Image active={true}
                                    style={{width: '90%', maxWidth: '400px', height: '200px', marginRight: 25}}/>
                    <Skeleton.Image active={true}
                                    style={{width: '90%', maxWidth: '400px', height: '200px', marginRight: 25}}/>
                    <Skeleton.Image active={true} style={{width: '90%', maxWidth: '400px', height: '200px'}}/>
                </div>
                <Skeleton style={{marginTop: 44}} active={true} paragraph={{rows: 3}} title={true}/>
                <Skeleton style={{marginTop: 44}} active={true} paragraph={{rows: 3}} title={true}/>

            </div>
        )
    }
    if (data) {
        carousels = data
    }
    if(!categories && categoriesStore) {
        categories = categoriesStore
    }
    if(categories) {
        categories = categories.filter(cat => cat.level === 1)
    }
    console.log(categories)
    return (
        <>
            <Head>
                <title>SmartHome16 - интернет магазин систем видеонаблюдения, сигнализации и домофонии</title>
                <meta name="description" content="Мы рады представить вам широкий ассортимент качественного оборудования для видеонаблюдения от ведущих производителей. Наш магазин предлагает современные системы видеонаблюдения различных конфигураций, начиная от простых решений для дома и малого бизнеса до комплексных систем для больших предприятий и объектов инфраструктуры. Мы гарантируем высокое качество продукции и полную поддержку на всех этапах сотрудничества, начиная от консультации по выбору оборудования и заканчивая установкой и настройкой системы. В нашем магазине вы найдете все, что нужно для создания надежной и эффективной системы видеонаблюдения. Мы ценим наших клиентов и всегда готовы оказать помощь и поддержку в любых вопросах. Будем рады видеть вас в нашем магазине!"/>
            </Head>
            <main className={'_container'}>
                {(categories && categories.length > 0) && <div className={'catalog-list'}>
                    <h2 className="catalog-list__title">Популярные категории</h2>
                    <CategoryList categories={categories} />
                </div>}
                {(carousels && carousels.length > 0) && carousels.map(carousel => <div className="carousel__block"
                                                                                       key={carousel.id}>
                    <h2 className="carousel__title">{carousel.title}</h2>
                    <ProductSlider className="carousel__slider" products={carousel.Products}></ProductSlider>
                </div>)}
            </main>
        </>
    )
}

Home.getInitialProps = async ({req, res, query}: NextPageContext) => {
    if (!req) {
        return {carousels: null, categories: null}
    }
    const navbarCategories = (await (await axios.get(`${process.env.API_URL}/category`)).data) as INavbarCategory[];
    const response = (await axios.get(`${process.env.API_URL}/utils/get-all-swipers`)).data as Carousels
    return {carousels: response, categories: navbarCategories}
}


// Добро пожаловать в наш интернет-магазин видеонаблюдения!
//
// Мы рады представить вам широкий ассортимент качественного оборудования для видеонаблюдения от ведущих производителей. Наш магазин предлагает современные системы видеонаблюдения различных конфигураций, начиная от простых решений для дома и малого бизнеса до комплексных систем для больших предприятий и объектов инфраструктуры.
//
//     Мы гарантируем высокое качество продукции и полную поддержку на всех этапах сотрудничества, начиная от консультации по выбору оборудования и заканчивая установкой и настройкой системы. В нашем магазине вы найдете все, что нужно для создания надежной и эффективной системы видеонаблюдения.
//
//     Мы ценим наших клиентов и всегда готовы оказать помощь и поддержку в любых вопросах. Будем рады видеть вас в нашем магазине!






