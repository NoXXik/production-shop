import "../styles/globals.scss";
import type { AppContext, AppProps } from "next/app";
import App from "next/app";
import MainLayout from "../common/components/layouts/MainLayouts";
import { NextComponentType, NextPageContext } from "next";
import axios from "axios";
import { INavbarCategory } from "../common/types/categoryTypes";
import { Provider } from 'react-redux'
import {store} from "../common/store/index"
import { ConfigProvider } from 'antd';
import { Router } from "next/router";
import {UserData} from "../common/types/userTypes";

export default function MyApp({ Component, pageProps, navbarCategories, router, user }: {Component: NextComponentType<NextPageContext, any, any>, pageProps: AppProps, navbarCategories: INavbarCategory[], router: Router, user: UserData | null}) {
  if(router.asPath.includes('404')) {
    return (<Component {...pageProps}/>)
  }
  if(router.asPath.includes('500')) {
    return (<Component {...pageProps} />)
  }
  return (
    <Provider store={store}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#fe7201',
        },
      }}>
        <MainLayout navbarCategories={navbarCategories} router={router} user={user}>
          <Component {...pageProps}/>
        </MainLayout>
    </ConfigProvider>
    </Provider>
  );
}

MyApp.getInitialProps = async(context: AppContext) => {
  // let isAuthenticated = null;
  // let user = null;
  // let token = null
  // if(context.ctx.req) {
  //   const cookie = context.ctx.req.headers?.cookie || ''
  //   token = parse(cookie)?.auth
  //   if(token){
  //     isAuthenticated = jwt.verify(token, 'secretkey13245');
  //     user = isAuthenticated?.db_user;
  //   }
  //   console.log('_app auth', user)
  // }
  if(!context.ctx.req) {
    return {navbarCategories: null, router: context.router, user: null}
  }

  const pageProps = await App.getInitialProps(context); // Retrieves page's `getInitialProps`
  const navbarCategories = (await (await axios.get(`${process.env.API_URL}/category`)).data) as INavbarCategory[];
  // if (user && typeof (user) === 'object' && token) {
  //   return {...pageProps, navbarCategories, router: context.router, user: {db_user: user, token}}
  // }
  return {...pageProps, navbarCategories, router: context.router, user: null}
}

