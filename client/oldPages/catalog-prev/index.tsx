import { NextPageContext } from "next"
import { useAppSelector } from "../../common/hooks/redux/reduxHooks"
import Link from 'next/link'
import SideBar from "../../common/components/CategorySideBar/SideBar"
import CategoryList from "../../common/components/CategoryList/CategoryList"

export default function Catalog({data}: any) {
    const categories = useAppSelector(state => state.categories).categories
    
    console.log('catalog', categories)
    if(!data) {
        data = {name: 'ilmir'}
    }
    return ( 
        <div className="catalog__body">
            <SideBar categories={categories}/>
            <div className="catalog__content">
                <CategoryList categories={categories}/>
            </div>
        </div>
    )
}

Catalog.getInitialProps = async({req, res, query}: NextPageContext) => {
    if(!req) {
        return {}
    }
    const data = {name: "Ildar"}
    return {data}
}


// export async function getServerSideProps({req, res, query, pathname}: NextPageContext) {
//     if(!req) {
//         return {props: {data: {}}}
//     }
//     const data = {name: 'Ildar'}
//     return { props: { data } }
// }