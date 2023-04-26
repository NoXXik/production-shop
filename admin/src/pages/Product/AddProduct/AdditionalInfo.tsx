import {Button, Input, Modal, notification, Popconfirm, Spin} from "antd";
import Title from "antd/es/typography/Title";
import React, {useEffect, useState} from "react";
import {DeleteFilled, DeleteOutlined, PlusCircleOutlined, QuestionCircleOutlined} from '@ant-design/icons';
import axios from "axios";
import {
    useCreateTemplateMutation,
    useLazyDeleteTemplateQuery,
    useLazyGetTemplatesQuery
} from "../../../store/api/productAPI";


interface IAdditionalProps {
    characteristics: { title: string; value: string }[];
    setCharacteristics: React.Dispatch<React.SetStateAction<{ title: string; value: string }[]>>;
}

export default function AdditionalInfo(props: IAdditionalProps) {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalSaveOpen, setModalSaveOpen] = useState(false);
    const [templateTitle, setTemplateTitle] = useState('')
    const [api, contextHolder] = notification.useNotification();
    const [getTemplates, {
        data: getData,
        isLoading: getIsLoading,
        isSuccess: getIsSuccess,
        error: getError,
        isError: getIsError
    }] = useLazyGetTemplatesQuery()
    const [deleteTemplate, {
        data: deleteData,
        isLoading: deleteIsLoading,
        isSuccess: deleteIsSuccess,
        error: deleteError,
        isError: deleteIsError
    }] = useLazyDeleteTemplateQuery()
    const [createTemplate, {
        data: createData,
        isLoading: createIsLoading,
        isSuccess: createIsSuccess,
        error: createError,
        isError: createIsError
    }] = useCreateTemplateMutation()

    const openNotification = (message: string, description: string) => {
        api.info({
            message,
            description,
            placement: 'topRight',
        });
    };
    const {characteristics, setCharacteristics} = props

    const addCharacteristic = () => {
        setCharacteristics(prev => [...prev, {title: '', value: ''}])
    }

    const handleTitle = (title: string, id: number) => {
        setCharacteristics(prev => prev.map((char, id_) => id_ === id ? {...char, title: title} : char))
    }
    const handleValue = (value: string, id: number) => {
        setCharacteristics(prev => prev.map((char, id_) => id_ === id ? {...char, value: value} : char))

    }

    const handleDelete = (id: number) => {
        setCharacteristics(prev => prev.filter((_, id_) => id_ !== id))
    }

    const handleCancel = () => {
        setModalOpen(false);
        setModalSaveOpen(false)
    }

// Загрузка шаблонов с бэка
    const handleTemplateModal = () => {
        getTemplates('')
        setModalOpen(true)
    }
    const handleTemplateSaveModal = () => {
        setModalSaveOpen(true)
    }

    const fetchTemplate = () => {

    }
    const handleSaveTemplate = () => {
        if (characteristics.length < 1) {
            openNotification('Невозможно сохранить шаблон', 'Добавьте хотябы одно поле')

        }
        if (templateTitle.length < 1) {
            openNotification('Невозможно сохранить шаблон', 'Проверьте поле Имя шаблона')
        }
        createTemplate({title: templateTitle, template: characteristics})
    }
    const handleDeleteTemplate = (id: number) => {
        deleteTemplate(id)
    }
    useEffect(() => {
        if(createIsSuccess) {
            openNotification('Шаблон успешно сохранен', 'Шаблон успешно сохранен')
            setTemplateTitle('')
            handleCancel()
        }
    }, [createIsSuccess])
    useEffect(() => {
        if(createIsError) {
            openNotification('При сохранении шаблона произошла ошибка', `Ошибка: ${JSON.stringify(createError)}`)
            setTemplateTitle('')
            handleCancel()
        }
    }, [createIsError])
    useEffect(() => {
        if(deleteIsSuccess) {
            openNotification('Шаблон успешно удален', 'Шаблон успешно удален')
            handleCancel()
        }
    }, [deleteIsSuccess])
    useEffect(() => {
        if(deleteIsError) {
            openNotification('При удалении шаблона произошла ошибка', `Ошибка: ${JSON.stringify(deleteError)}`)
        }
    }, [deleteIsError])
    return (
        <div className="continer" style={{display: "flex", "flexDirection": "column"}}>
            {contextHolder}
            <div className="item-list">
                {characteristics.length > 0
                    ? characteristics.map((char, id) =>
                        <React.Fragment key={id}>
                            <div className="item">
                                <Input onChange={(e) => handleTitle(e.target.value, id)} value={char.title}
                                       style={{maxWidth: 300}} placeholder="Характеристика"/><Input
                                onChange={(e) => handleValue(e.target.value, id)} value={char.value}
                                style={{maxWidth: 300}} placeholder="Значение"/>
                                <Button onClick={() => handleDelete(id)}
                                        style={{maxWidth: 300}}><DeleteFilled/></Button>
                            </div>
                        </React.Fragment>
                    )
                    : <Title level={5}>Характеристики отсутсвуют</Title>
                }
            </div>

            <Button onClick={addCharacteristic} style={{maxWidth: 300}}>
                <PlusCircleOutlined/>
                Добавить характеристику
            </Button>
            <Button onClick={handleTemplateModal} style={{maxWidth: 300}}>
                Загрузить шаблон
            </Button>
            <Button onClick={handleTemplateSaveModal} style={{maxWidth: 300}}>
                Сохранить шаблон
            </Button>

            <Modal open={modalOpen} title={'Загрузить шаблон'} footer={null} onCancel={handleCancel}>
                <div className="content">Шаблоны</div>
                {getIsLoading && <Spin size="large" />}
                {getData && getData.map(template => <div className='template-block'>
                    <Button onClick={() => setCharacteristics(template.template)}>{template.title}</Button>
                    <Popconfirm
                        title="Вы действительно хотите удалить шаблон?"
                        icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                        onConfirm={() => handleDeleteTemplate(template.id)}
                    >
                        <Button><DeleteOutlined /></Button>
                    </Popconfirm>
                </div>)}
            </Modal>

            <Modal open={modalSaveOpen} title={'Сохранить шаблон'} footer={null} onCancel={handleCancel}>
                <div className="content">
                    <Input onChange={(e) => setTemplateTitle(e.target.value)} value={templateTitle}
                           style={{maxWidth: 300}} placeholder="Введите имя для шаблоны"/>
                    <Button onClick={handleSaveTemplate} style={{maxWidth: 300}}>Сохранить</Button>
                </div>
            </Modal>
        </div>
    )
}
