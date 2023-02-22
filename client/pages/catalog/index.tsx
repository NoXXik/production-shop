import CategoryList from "../../common/components/CategoryList/CategoryList"
import SideBar from "../../common/components/CategorySideBar/SideBar"
import { useAppSelector } from "../../common/hooks/redux/reduxHooks"



export default function Catalog2() {

    const categories = useAppSelector(state => state.categories).categories
    return ( 
        <div className="catalog__body">
            <SideBar categories={categories}/>
            <div className="catalog__content">
                <CategoryList categories={categories}/>
            </div>
        </div>
    )
}