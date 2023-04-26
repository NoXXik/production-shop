import CategoryList from "../../common/components/CategoryList/CategoryList"
import SideBar from "../../common/components/CategorySideBar/SideBar"
import {useAppSelector} from "../../common/hooks/redux/reduxHooks"
import Head from "next/head";
import {INavbarCategory} from "../../common/types/categoryTypes";


export default function Catalog2() {
    let sidebar_categories: INavbarCategory[] = []
    const categories = useAppSelector(state => state.categories).categories
    if (categories) {
        sidebar_categories = categories.filter(cat => cat.level === 1)
    }
    return (
        <>
            <Head>
                <title>Каталог товаров | SmartHome16</title>
                <meta name="description"
                      content="В каталоге нашего интернет-магазина вы найдете широкий выбор систем видеонаблюдения для защиты вашего дома, офиса или бизнеса. Мы предлагаем камеры разных типов, форматов и разрешений, видеорегистраторы, мониторы и другие компоненты системы. Гарантируем высокое качество оборудования, удобную доставку и грамотную консультацию при выборе товара."/>
                <meta name="keywords"
                      content={`SmartHome16, каталог товаров, интернет-магазин, категории товаров, ${categories && categories.map(cat => cat.title)}`}/>
                <meta property="og:title" content="Каталог товаров | SmartHome16"/>
                <meta property="og:description"
                      content="В каталоге нашего интернет-магазина вы найдете широкий выбор систем видеонаблюдения для защиты вашего дома, офиса или бизнеса. Мы предлагаем камеры разных типов, форматов и разрешений, видеорегистраторы, мониторы и другие компоненты системы. Гарантируем высокое качество оборудования, удобную доставку и грамотную консультацию при выборе товара."/>
            </Head>
            <div className="catalog__body">
                <SideBar categories={categories} category={null}/>
                <div className="catalog__content">
                    <CategoryList categories={sidebar_categories}/>
                </div>
            </div>
        </>

    )
}
