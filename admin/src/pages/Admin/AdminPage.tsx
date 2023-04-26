import React, {useEffect, useState} from 'react';
import {useCreateAdminMutation, useDeleteAdminByIdMutation, useGetAllAdminsQuery} from "../../store/api/productAPI";
import {ColumnsType} from "antd/es/table";
import {Button, Checkbox, Dropdown, Form, Input, Modal, Popconfirm, Table, Tag} from "antd";
import {NavLink} from "react-router-dom";
import {DeleteFilled, EyeOutlined, QuestionCircleOutlined} from "@ant-design/icons";
import {Delivery} from "../../types/orderTypes";
import Search from "antd/es/input/Search";
import {Swiper, SwiperSlide} from "swiper/react";
import {A11y, Navigation, Pagination, Scrollbar} from "swiper";
import SwiperProductCart from "../../components/UI/ProductUI/SwiperProductCart";
import {CreateAdminData} from "../../types/utilTypes";

interface DataType {
    id: string;
    key: React.Key;
    login: string;
    full_name: string;
    email: string;
    is_super_admin: string;
    created_at: string;
}

function AdminPage() {
    const {data, isLoading, isError, error, isSuccess} = useGetAllAdminsQuery('')
    const [deleteAdmin, {
        data: deleteData,
        isLoading: deleteIsLoading,
        isError: deleteIsError,
        isSuccess: deleteIsSuccess,
        error: deleteError
    }] = useDeleteAdminByIdMutation()
    const [createAdmin, {
        data: createData,
        isLoading: createIsLoading,
        isError: createIsError,
        isSuccess: createIsSuccess,
        error: createError
    }] = useCreateAdminMutation()

    const [dataSource, setDataSource] = useState<DataType[]>()
    const [modalSaveOpen, setModalSaveOpen] = useState(false);

    const handleCancel = () => {
        setModalSaveOpen(false)
    }

    const handleCreateAdmin = (data: CreateAdminData) => {
        createAdmin(data)
        setModalSaveOpen(false)
    }
    const columns: ColumnsType<DataType> = [
        {
            title: 'Логин',
            dataIndex: 'login',
            key: 'login',
            fixed: 'left',
            width: '10%',
        },
        {
            title: 'Имя Фамилия',
            dataIndex: 'full_name',
            key: 'full_name',
            width: '10%',
        },
        {
            title: 'E-mail',
            dataIndex: 'email',
            key: 'email',
            width: '15%',
        },
        {
            title: 'Главный админ?',
            dataIndex: 'is_super_admin',
            key: 'is_super_admin',
            width: '10%',
        },
        {
            title: 'Дата регистрации',
            dataIndex: 'created_at',
            key: 'created_at',
            width: '48%',
        },
        {
            title: 'Удалить',
            key: 'delete',
            fixed: 'right',
            width: '7%',
            render: (_, {id}) => {
                return <>
                    {/*<NavLink to={`/orders/${id}`} >*/}
                    {/*    <EyeOutlined />*/}
                    {/*</NavLink>*/}
                    <Popconfirm
                        title="Вы действительно хотите удалить карусель?"
                        icon={<QuestionCircleOutlined style={{color: 'red'}}/>}
                        onConfirm={() => deleteAdmin(id)}
                    >
                        <Button>
                            <DeleteFilled/>
                        </Button>
                    </Popconfirm>
                </>
            },
        },
    ];
    useEffect(() => {
        if (data && isSuccess) {
            let arr: DataType[] = []
            data.forEach(admin => {
                const date = new Date(Date.parse(admin.created_at)).toLocaleString('ru', {
                    dateStyle: 'long',
                    timeStyle: 'short'
                })
                arr.push({
                    id: admin.id,
                    key: admin.id,
                    login: admin.login,
                    is_super_admin: admin.is_super_admin ? 'Да' : 'Нет',
                    email: admin.email,
                    full_name: `${admin.first_name} ${admin.last_name}`,
                    created_at: date
                })
            })
            setDataSource(arr)
        }
    }, [data, isSuccess])
    return (
        <div>
            Admins
            <Button onClick={() => setModalSaveOpen(true)}>Добавить Админа</Button>

            <Table loading={isLoading} bordered={true} style={{height: '100vh', maxHeight: '100%'}} columns={columns}
                   dataSource={dataSource} scroll={{x: 1500, y: 50}}/>
            <Modal open={modalSaveOpen} title={'Добавление администратора'} footer={null} onCancel={handleCancel}>
                <div className="content">
                    <Form
                        labelCol={{span: 4}}
                        wrapperCol={{span: 14}}
                        layout="horizontal"
                        style={{maxWidth: 600}}
                        initialValues={{ is_super_admin: false }}
                        onFinish={handleCreateAdmin}
                    >
                        <Form.Item label="Логин" required={true} name={'login'}
                                   rules={[{required: true, message: 'Пожалуйста введите логин!'}]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item label="Пороль" required={true} name={'password'}
                                   rules={[{required: true, message: 'Пожалуйста введите пороль!'}]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item label="Email" required={true} name={'email'}
                                   rules={[{required: true, message: 'Пожалуйста введите email!'}]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item label="Имя" required={true} name={'first_name'}
                                   rules={[{required: true, message: 'Пожалуйста введите Имя!'}]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item label="Фамилия" required={true} name={'last_name'}
                                   rules={[{required: true, message: 'Пожалуйста введите Фамилию!'}]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item name="is_super_admin" valuePropName="checked">
                            <Checkbox>Главный админ</Checkbox>
                        </Form.Item>
                        <Form.Item wrapperCol={{offset: 8, span: 16}}>
                            <Button type="primary" htmlType="submit">
                                Добавить
                            </Button>
                            {/*<Popconfirm*/}
                            {/*    title="Вы действительно хотите создать Администратора?"*/}
                            {/*    icon={<QuestionCircleOutlined style={{ color: 'red' }} />}*/}
                            {/*    onConfirm={() => console.log('handle save')}*/}
                            {/*>*/}
                            {/*    */}
                            {/*</Popconfirm>*/}
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
            {/*{data && data.map(admin => <div>{admin.first_name}</div>)}*/}

        </div>
    );
}

export default AdminPage;
