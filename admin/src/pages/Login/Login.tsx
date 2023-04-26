import {Button, Checkbox, Form, Input, notification, Spin} from 'antd';
import React, {useEffect} from 'react';
import Title from "antd/es/typography/Title";
import {useLoginAdminMutation} from "../../store/api/productAPI";
import {useNavigate} from "react-router-dom";
import {logout, setAuth} from "../../store/authSlice";
import {useAppDispatch} from "../../utils/hooks/reduxHooks";



function Login() {
    const [login, {data, isSuccess, isLoading, error, isError}] = useLoginAdminMutation()
    const [api, contextHolder] = notification.useNotification();
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const openNotification = (message: string, description: string) => {
        api.info({
            message,
            description,
            placement: 'topRight',
            duration: 15
        });
    };
    const onFinish = (data: {
        login: string,
        password: string
    }) => {
        login(data)
    };

    const onFinishFailed = (errorInfo: any) => {
    };

    useEffect(() => {
        if(isError) {
            openNotification('Ошибка авторизации!', `Ошибка: ${JSON.stringify(error)}`)
        }
    }, [isError])
    useEffect(() => {
        if(isSuccess && data) {
            dispatch(setAuth({data: data.data, token: data.token}))
            navigate('/')
        }
    }, [isSuccess, data])
    // if(isSuccess && data) {
    //     setAuth({data: data.data, token: data.token})
    // }
    return (
        <div className='login-block'>
            {contextHolder}
            <Title level={5} style={{marginBottom: 22}}>Админ-панель SmartHome16</Title>
            {isLoading && <Spin size={'large'}/>}
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Логин"
                    name="login"
                    rules={[{ required: true, message: 'Пожалуйста введите логин!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Пороль"
                    name="password"
                    rules={[{ required: true, message: 'Пожалуйста введите пороль!' }]}
                >
                    <Input.Password />
                </Form.Item>


                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Войти
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default Login;
