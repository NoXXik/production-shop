import Navbar from "../Navbar/Navbar"
import Footer from "../Footer/Footer"
import { INavbarCategory } from "../../types/categoryTypes"
import { Router, useRouter } from "next/router"
import BreadCrumbs from "../BreadCrumbs/BreadCrumbs"
import { useAppDispatch, useAppSelector } from "../../hooks/redux/reduxHooks"
import { setCategory } from "../../store/slices/categorySlice"



export default function MainLayout({ children, navbarCategories, router }: {children: any, navbarCategories: INavbarCategory[]|null, router: Router}) {
    console.log('mainLayout',navbarCategories)
    console.log('Admin',router.asPath.split('/')[1] === 'admin')

    // const router = useRouter()
    const dispatch = useAppDispatch()
    if(navbarCategories) {
        dispatch(setCategory(navbarCategories))
    }
    // if(!navbarCategories) {
    //     navbarCategories = useAppSelector(state => state.categories).categories
    // }
    // console.log('navbar',useAppSelector(state => state.categories).categories)
    navbarCategories = useAppSelector(state => state.categories).categories
    if(router.asPath.split('/')[1] === 'admin'){
      return (
        <>
        {children}
        </>
      )
    } else {
      return (
        <>
          <Navbar navbarCategories={navbarCategories}/>
              <section className="main _container">
                 <BreadCrumbs router={router} navbarCategories={navbarCategories}/>
                {children}
              </section>
          <Footer />
        </>
      )
    }

  }
