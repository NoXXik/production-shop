import React from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined,  } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
const { Header, Content, Footer, Sider } = Layout;


const items1: MenuProps['items'] = ['1', '2', '3'].map((key) => ({
    key,
    label: `nav ${key}`,
  }));
  const items3: MenuProps['items'] = [
    {key: 1, label: 'Главная'},
    {key: 1, label: 'Контент'},
    {key: 1, label: 'Статистика'},
]
const items2: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
    (icon, index) => {
      const key = String(index + 1);
  
      return {
        key: `sub${key}`,
        icon: React.createElement(icon),
        label: `Товар`,
  
        children: new Array(4).fill(null).map((_, j) => {
          const subKey = index * 4 + j + 1;
          return {
            key: subKey,
            label: `option${subKey}`,
          };
        }),
      };
    },
  );
export default function Admin(){
    const {
        token: { colorBgContainer },
      } = theme.useToken();
    return (
        <>
                <Layout>
                    <Header className="header">
                        <div className="logo" />
                        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={items3} />
                    </Header>
                    <Content style={{ padding: '0 50px' }}>
                        <Layout style={{ padding: '24px 0', background: colorBgContainer }}>
                        <Sider style={{ background: colorBgContainer }} width={200}>
                            <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{ height: '100%' }}
                            items={items3}
                            />
                        </Sider>
                        <Content style={{ padding: '0 24px', minHeight: 280 }}>Content</Content>
                        </Layout>
                    </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
            </Layout>
        </>
    )
}