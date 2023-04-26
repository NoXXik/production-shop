import React, {useEffect, useRef, useState} from 'react';
import {PlusOutlined, QuestionCircleOutlined} from '@ant-design/icons';
import type {InputRef} from 'antd';
import {Space, Input, Tag, Tooltip, theme, notification, List, Skeleton, Button, Modal, Popconfirm} from 'antd';
import Title from "antd/es/typography/Title";
import {translit} from "../../../utils/helpers/utilFunctions";
import {FilterValues, IFilterCreateData} from "../../../types/filterTypes";
import {
    useAddToFilterMutation,
    useCreateFilterMutation,
    useDeleteFilterMutation,
    useGetFiltersQuery
} from "../../../store/api/productAPI";
import {IFilter} from "../../../types/productTypes";
import TextArea from "antd/es/input/TextArea";
import EditFilter from "./EditFilter";

const Filter: React.FC = () => {
    const {
        data: FilterData,
        isSuccess: FilterIsSuccess,
        isLoading: FilterIsLoading,
        isError: FilterIsError
    } = useGetFiltersQuery()
    const [deleteFilter, {
        data: DeleteFilterData,
        isSuccess: DeleteFilterIsSuccess,
        isLoading: DeleteFilterIsLoading,
        isError: DeleteFilterIsError
    }] = useDeleteFilterMutation()

    const [createFilter, {
        data: CreateFilterData,
        isSuccess: CreateFilterIsSuccess,
        isLoading: CreateFilterIsLoading,
        isError: CreateFilterIsError
    }] = useCreateFilterMutation()
    // Для  создания фильтра
    const {token} = theme.useToken();
    const [tags, setTags] = useState<string[]>([]);
    const [inputVisible, setInputVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [editInputIndex, setEditInputIndex] = useState(-1);
    const [editInputValue, setEditInputValue] = useState('');
    const inputRef = useRef<InputRef>(null);
    const editInputRef = useRef<InputRef>(null);

//===================================
    const [api, contextHolder] = notification.useNotification();
    const [filterList, setFilterList] = useState<IFilter[]>([])
    const [title, setTitle] = useState('')

    const [modalCreateOpen, setModalCreateOpen] = useState(false);
    const [modalEditOpen, setModalEditOpen] = useState(false);

    const [editFilter, setEditFilter] = useState<IFilter | null>(null)
    const handleCancel = () => {
        setModalCreateOpen(false);
        setModalEditOpen(false)
    }


    const openNotification = (message: string, description: string) => {
        api.info({
            message,
            description,
            placement: 'topRight',
        });
    };

    useEffect(() => {
        if (inputVisible) {
            inputRef.current?.focus();
        }
    }, [inputVisible]);

    useEffect(() => {
        editInputRef.current?.focus();
    }, [inputValue]);

    const handleClose = (removedTag: string) => {
        const newTags = tags.filter((tag) => tag !== removedTag);
        setTags(newTags);
    };

    const showInput = () => {
        setInputVisible(true);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleInputConfirm = () => {
        if (inputValue && tags.indexOf(inputValue) === -1) {
            setTags([...tags, inputValue]);
        }
        setInputVisible(false);
        setInputValue('');
    };

    const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditInputValue(e.target.value);
    };

    const handleEditInputConfirm = () => {
        const newTags = [...tags];
        newTags[editInputIndex] = editInputValue;
        setTags(newTags);
        setEditInputIndex(-1);
        setInputValue('');
    };

    const handleEditFilter = (filter: IFilter) => {
        setEditFilter(filter)
        setModalEditOpen(true)
    }

    const tagInputStyle: React.CSSProperties = {
        width: 78,
        verticalAlign: 'top',
    };

    const tagPlusStyle: React.CSSProperties = {
        background: token.colorBgContainer,
        borderStyle: 'dashed',
    };

    const addFilter = () => {
        const validate = validateDatas()
        if (validate) {
            let paramValues: FilterValues[] = []
            for (let i = 0; i < tags.length; i++) {
                let param = tags[i]
                paramValues.push({value_title: param, value_translit: translit(param)})
            }
            const data: IFilterCreateData = {title: title, translit: translit(title), values: paramValues}
            createFilter(data)
        }
    }
    const validateDatas = () => { // Проверка данных перед отправкой запроса
        if (title.length === 0) {
            openNotification('Не возможно добавить фильтр!', 'Проверте поле Название фильтра!')
            return false
        } else if (tags.length === 0) {
            openNotification('Не возможно добавить фильтр!', 'Добавьте хотя бы одно значение к фильтру!')
            return false
        } else {
            return true // Если прошел все проверки
        }
    }

    useEffect(() => {
        if (FilterData) {

            setFilterList(FilterData)
        }
    }, [FilterData])
    useEffect(() => {
        if(CreateFilterIsSuccess){
            openNotification('Фильтр успешно создан!', 'Фильтр успешно создан!')
            setTitle('')
            setTags([])
            setModalCreateOpen(false)
        }
    }, [CreateFilterIsSuccess])
    useEffect(() => {
        if(CreateFilterIsError){
            openNotification('Возникла ошибка при создании фильтра!', `Возникла ошибка при создании фильтра:${CreateFilterData && CreateFilterData.message}`)
        }
    }, [CreateFilterIsError])
    useEffect(() => {
        if(DeleteFilterIsSuccess){
            openNotification('Фильтр успешно удален!', 'Фильтр успешно удален!')
        }
    }, [DeleteFilterIsSuccess])
    useEffect(() => {
        if(DeleteFilterIsError){
            openNotification('Возникла ошибка при удалении фильтра!', `Возникла ошибка при удалении фильтра: ${DeleteFilterData && DeleteFilterData?.message}`)
        }
    }, [DeleteFilterIsError])

    return (
        <>
            {contextHolder}

            <Title level={5}>Управление фильтрами</Title>
            <Modal open={modalCreateOpen} title={'Добавить фильтр'} footer={null} onCancel={handleCancel}>
                <div className="content">
                    <div className="filter-input" style={{display: 'flex', flexDirection: 'column'}}>
                        <Space size={[0, 8]} wrap>
                            <div className="" style={{display: 'flex', flexDirection: 'column', width: 400}}>
                                <div className="block" style={{display: 'flex', flexDirection: 'column'}}>
                                    <Title level={5}>Название фильтра</Title>
                                    <Input value={title} onChange={(e) => setTitle(e.target.value)}></Input>
                                </div>
                                <div className="block" style={{display: 'flex', flexDirection: 'column'}}>
                                    <Title level={5}>Значения фильтра</Title>
                                    <Space size={[0, 8]} wrap>
                                        {tags.map((tag, index) => {
                                            if (editInputIndex === index) {
                                                return (
                                                    <Input
                                                        ref={editInputRef}
                                                        key={tag}
                                                        size="small"
                                                        style={tagInputStyle}
                                                        value={editInputValue}
                                                        onChange={handleEditInputChange}
                                                        onBlur={handleEditInputConfirm}
                                                        onPressEnter={handleEditInputConfirm}
                                                    />
                                                );
                                            }
                                            const isLongTag = tag.length > 20;
                                            const tagElem = (
                                                <Tag
                                                    key={tag}
                                                    closable={true}
                                                    style={{userSelect: 'none'}}
                                                    onClose={() => handleClose(tag)}
                                                >
                                      <span
                                          onDoubleClick={(e) => {
                                              if (index !== 0) {
                                                  setEditInputIndex(index);
                                                  setEditInputValue(tag);
                                                  e.preventDefault();
                                              }
                                          }}
                                      >
                                        {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                                      </span>
                                                </Tag>
                                            );
                                            return isLongTag ? (
                                                <Tooltip title={tag} key={tag}>
                                                    {tagElem}
                                                </Tooltip>
                                            ) : (
                                                tagElem
                                            );
                                        })}
                                    </Space>
                                    {inputVisible ? (
                                        <Input
                                            ref={inputRef}
                                            type="text"
                                            size="small"
                                            style={tagInputStyle}
                                            value={inputValue}
                                            onChange={handleInputChange}
                                            onBlur={handleInputConfirm}
                                            onPressEnter={handleInputConfirm}
                                        />
                                    ) : (
                                        <Tag style={tagPlusStyle} onClick={showInput}>
                                            <PlusOutlined/> New Tag
                                        </Tag>
                                    )}
                                </div>
                            </div>
                        </Space>
                        <Popconfirm
                            title="Создать фильтр"
                            description="Вы уверены что хотите создать фильтры с текущими значениями?"
                            icon={<QuestionCircleOutlined style={{color: 'red'}}/>}
                            onConfirm={addFilter}
                        >
                            <Button style={{marginTop: 50}}>Создать фильтр</Button>
                        </Popconfirm>
                    </div>
                </div>
            </Modal>

            <Modal open={modalEditOpen} title={'Изменить фильтр'} footer={null} onCancel={handleCancel}>
                <div className="content">
                    <div className="edit-input">
                        <EditFilter filter={editFilter} openNotification={openNotification} setModalEditOpen={setModalEditOpen}/>
                    </div>
                </div>
            </Modal>

            <Button onClick={() => setModalCreateOpen(true)}>Добавить фильтр</Button>
            <List
                className="demo-loadmore-list"
                loading={FilterIsLoading}
                itemLayout="horizontal"
                dataSource={filterList}
                renderItem={(item) => (
                    <List.Item
                        actions={[<a onClick={() => handleEditFilter(item)} key="list-loadmore-edit">Изменить</a>, <Popconfirm
                            title="Удалить фильтр"
                            description="Вы уверены что хотите удалить выбраный фильтр?"
                            icon={<QuestionCircleOutlined style={{color: 'red'}}/>}
                            onConfirm={() => deleteFilter({id: item.id})}
                        >
                            <a key="list-loadmore-more">Удалить</a>
                        </Popconfirm>]}
                    >
                        <Skeleton avatar title={false} loading={FilterIsLoading} active>
                            <List.Item.Meta
                                title={<a>{item.title}</a>}
                                description={item.values.map(val => val.value_title).join(' ')}
                            />
                            {/*<div>content</div>*/}
                        </Skeleton>
                    </List.Item>
                )}
            />
        </>


    );
};


export default Filter;
