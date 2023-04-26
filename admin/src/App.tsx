import './index.scss'
import React, {useEffect, useMemo, useState} from "react";
import type {MenuProps} from 'antd';
import {
    AppstoreAddOutlined,
    UserOutlined,
    TeamOutlined,
    ContainerOutlined,
    ShoppingCartOutlined,
    BarChartOutlined,
    PoweroffOutlined,
    MailOutlined,
} from "@ant-design/icons";
import {Breadcrumb, Layout, Menu, theme, Typography} from "antd";
import MenuItem from 'antd/es/menu/MenuItem';
import {
    useNavigate,
    redirect,
    Routes,
    Route,
    createBrowserRouter,
    RouterProvider,
    useRoutes,
    useHref, useLocation, Link
} from 'react-router-dom';
import CreateProduct from "./pages/Product/AddProduct/CreateProduct";
import Category from './pages/Product/Category/Category';
import Filter from "./pages/Product/Filter/Filter";
import OrderList from './pages/Orders/OrderList/OrderList';
import OrderPage from "./pages/Orders/OrderPage/OrderPage";
import ProductsPage from "./pages/Product/Products/ProductsPage";
import ChangeProduct from "./pages/Product/ChangeProduct/ChangeProduct";
import AddSwiper from "./pages/Content/AddSwiper/AddSwiper";
import Login from "./pages/Login/Login";
import {AdminData} from "./types/utilTypes";
import {logout, setAuth} from "./store/authSlice";
import {useAppDispatch, useAppSelector} from "./utils/hooks/reduxHooks";
import SuperAdminRoutes from "./utils/helpers/superAdminRoutes";
import AdminPage from "./pages/Admin/AdminPage";
import SupportOrderList from "./pages/Support/Orders/SupportOrdersPage";

const {Header, Content, Footer, Sider} = Layout;
type MenuItem = Required<MenuProps>['items'][number];
const {Text} = Typography;

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}


function App({children}: any) {
    const {data: authData, token} = useAppSelector(state => state.auth)
    const [items, setItems] = useState([
        getItem('Управление товарами', 'products', <AppstoreAddOutlined/>, [
            getItem('Товары', '/products'),
            getItem('Добавить товар', '/create-product'),
            getItem('Изменить товар', '/change-product'),
            getItem('Управление категориями', '/categories'),
            getItem('Управление фильтрами', '/filters'),
        ]),
        getItem('Контент', 'content', <ContainerOutlined/>, [
            getItem('Добавить карусель товаров', '/create-carousel'),
        ]),
        getItem('Заказы', '/orders', <ShoppingCartOutlined/>),
        getItem('Пользователи', '/users', <TeamOutlined/>),
        getItem('Статистика', '/dashboard', <BarChartOutlined/>),
        getItem('Тех.поддержка', '/support', <UserOutlined/>),
        getItem('E-mail рассылки', '/email-spam', <MailOutlined/>),
        getItem('Выйти', 'logout', <PoweroffOutlined/>),
    ])
    // const items: MenuItem[] = useMemo(() =>
    //     [
    //         getItem('Управление товарами', 'products', <AppstoreAddOutlined/>, [
    //             getItem('Товары', '/products'),
    //             getItem('Добавить товар', '/create-product'),
    //             getItem('Изменить товар', '/change-product'),
    //             getItem('Управление категориями', '/categories'),
    //             getItem('Управление фильтрами', '/filters'),
    //         ]),
    //         getItem('Контент', 'content', <ContainerOutlined/>, [
    //             getItem('Добавить карусель товаров', '/create-carousel'),
    //         ]),
    //         getItem('Заказы', '/orders', <ShoppingCartOutlined/>),
    //         getItem('Пользователи', '/users', <TeamOutlined/>),
    //         getItem('Статистика', '/dashboard', <BarChartOutlined/>),
    //         getItem('Тех.поддержка', '/support', <UserOutlined/>),
    //         getItem('E-mail рассылки', '/email-spam', <MailOutlined/>),
    //         getItem('Выйти', 'logout', <PoweroffOutlined/>),
    //
    //     ], [authData])
    const {token: {colorBgContainer},} = theme.useToken();
    const navigate = useNavigate()
    const route = useLocation()
    const dispatch = useAppDispatch()
    const toggleMenu = (key: string) => {
        if (key[0] === '/') {
            navigate(key)
        } else if (key === 'logout') {
            dispatch(logout())
            navigate('/login')
        }
    }
    useEffect(() => {
        const token = localStorage.getItem('access_token')
        if (!token) {
            navigate('/login')
        }
        const data = localStorage.getItem('auth_data')
        let auth_data: AdminData | null = null
        if (data) {
            auth_data = JSON.parse(data)
        } else {
            navigate('/login')
        }
        if (auth_data && token) {
            dispatch(setAuth({token, data: auth_data}))
            navigate('/')
            if(auth_data.is_super_admin === true) {
                setItems(prev => [...prev, getItem(`Администраторы`, '/admins')])
            }
            if(auth_data) {
                setItems(prev => [...prev, getItem(`${auth_data?.first_name} ${auth_data?.last_name}`, 'admin')])
            }

        }
        if(route.pathname) {
            navigate(route.pathname)
        }
    }, [])

    if (route.pathname === '/login') {
        return (
            <div className='container-center'>
                <Login/>
            </div>
        )
    }


    return (
        <>
            <Layout>
                <Content style={{padding: "0 10px", height: '100%'}}>
                    <Layout style={{padding: "24px 0", background: colorBgContainer, height: '100%'}}>
                        <Sider style={{background: colorBgContainer}} width={250}>
                            <Menu
                                mode="inline"
                                defaultSelectedKeys={["/dashboard"]}
                                style={{height: "100%"}}
                                items={items}
                                onClick={({key}) => toggleMenu(key)}
                            />
                        </Sider>
                        <Content style={{padding: "0 24px"}}>
                            <Routes>
                                <Route path={'/'} element={'Hello'}/>
                                <Route path={'/create-product'} element={<CreateProduct/>}/>
                                <Route path={'/products'} element={<ProductsPage/>}/>
                                <Route path={'/products/:productTranslit'} element={<ChangeProduct/>}/>
                                <Route path={'/change-product'} element={'Изменить товар'}/>
                                <Route path={'/categories'} element={<Category/>}/>
                                <Route path={'/filters'} element={<Filter/>}/>
                                <Route path={'/create-carousel'} element={<AddSwiper/>}/>
                                <Route path={'/orders'} element={<OrderList/>}/>
                                <Route path={'/orders/:orderId'} element={<OrderPage/>}/>
                                <Route path={'/users'} element={'Пользователи'}/>
                                <Route path={'/dashboard'} element={'Статистка'}/>
                                <Route path={'/support'} element={<SupportOrderList/>}/>
                                <Route path={'/email-spam'} element={'E-mail рассылка'}/>
                                <Route path={'/admins'} element={<SuperAdminRoutes><AdminPage /></SuperAdminRoutes>}/>
                            </Routes>
                        </Content>
                    </Layout>
                </Content>
            </Layout>
        </>
    );
}

export default App;
