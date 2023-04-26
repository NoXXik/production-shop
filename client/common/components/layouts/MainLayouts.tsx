import Navbar from "../Navbar/Navbar"
import Footer from "../Footer/Footer"
import { INavbarCategory } from "../../types/categoryTypes"
import { Router, useRouter } from "next/router"
import BreadCrumbs from "../BreadCrumbs/BreadCrumbs"
import { useAppDispatch, useAppSelector } from "../../hooks/redux/reduxHooks"
import { setCategory } from "../../store/slices/categorySlice"
import {login} from "../../store/slices/userSlicer";
import {User, UserData} from "../../types/userTypes";



export default function MainLayout({ children, navbarCategories, router, user }: {children: any, navbarCategories: INavbarCategory[]|null, router: Router, user: UserData | null}) {
    const dispatch = useAppDispatch()
    if(navbarCategories) {
        dispatch(setCategory(navbarCategories))
    }
    if(user && user.db_user && user.token) {
        dispatch(login({user: user.db_user, token: user.token, isAuth: true}))
    }
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
