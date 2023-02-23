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
import Head from "next/head";
import { NextRouter, Router } from "next/router";

// import 'antd/dist/reset.css';


export default function MyApp({ Component, pageProps, navbarCategories, router }: {Component: NextComponentType<NextPageContext, any, any>, pageProps: AppProps, navbarCategories: INavbarCategory[], router: Router}) {

  return (
    <Provider store={store}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#fe7201',
        },
      }}>
        <MainLayout navbarCategories={navbarCategories} router={router}>
          <Component {...pageProps}/>
        </MainLayout>
    </ConfigProvider>
    </Provider>
  );
}

MyApp.getInitialProps = async(context: AppContext) => {
  if(!context.ctx.req) {
    return {navbarCategories: null, router: context.router}
  }

  const pageProps = await App.getInitialProps(context); // Retrieves page's `getInitialProps`
  const navbarCategories = (await (await axios.get(`http://${process.env.API_HOST}:${process.env.API_PORT}/api/category`)).data) as INavbarCategory[];
  return {...pageProps, navbarCategories, router: context.router}
}

