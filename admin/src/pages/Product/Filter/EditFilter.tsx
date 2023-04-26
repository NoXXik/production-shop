import React, {useEffect, useRef, useState} from 'react';
import Title from "antd/es/typography/Title";
import {Button, Input, InputRef, Popconfirm, Space, Tag, Tooltip} from "antd";
import {PlusOutlined, QuestionCircleOutlined} from "@ant-design/icons";
import {IFilter} from "../../../types/productTypes";
import {useAddToFilterMutation} from "../../../store/api/productAPI";
import {FilterValues} from "../../../types/filterTypes";
import {translit} from "../../../utils/helpers/utilFunctions";

const EditFilter = (props: {filter: IFilter | null, openNotification: (message: string, description: string) => void, setModalEditOpen: (value: (((prevState: boolean) => boolean) | boolean)) => void}) => {
    const {filter, openNotification, setModalEditOpen} = props
    const [AddToFilter, {
        data: AddToFilterData,
        isSuccess: AddToFilterIsSuccess,
        isLoading: AddToFilterIsLoading,
        isError: AddToFilterIsError
    }] = useAddToFilterMutation()

    const [tagsEdit, setTagsEdit] = useState<string[]>([]);
    const [closeTags, setCloseTags] = useState<number>(0)
    const [inputEditVisible, setInputEditVisible] = useState(false);
    const [inputEditValue, setInputEditValue] = useState('');
    const [editInputEditIndex, setEditInputEditIndex] = useState(-1);
    const [editInputEditValue, setEditInputEditValue] = useState('');
    const inputRefEdit = useRef<InputRef>(null);
    const editInputRefEdit = useRef<InputRef>(null);



    useEffect(() => {
        if(AddToFilterIsSuccess){
            openNotification('Фильтр успешно изменен!', 'Фильтр успешно изменен!')
            setModalEditOpen(false)
        }
    }, [AddToFilterIsSuccess])
    useEffect(() => {
        if(AddToFilterIsError){
            openNotification('Возникла ошибка при изменении фильтра!', `Возникла ошибка при изменении фильтра: ${AddToFilterData && AddToFilterData?.message}`)
        }
    }, [AddToFilterIsError])

    useEffect(() => {
        if (inputEditVisible) {
            inputRefEdit.current?.focus();
        }
    }, [inputEditVisible]);

    useEffect(() => {
        editInputRefEdit.current?.focus();
    }, [inputEditValue]);

    useEffect(() => {
        if(filter) {
            setTagsEdit(filter.values.map(val => val.value_title))
            setCloseTags(filter.values.length-1)
        }
    }, [filter])

    const handleClose = (removedTag: string) => {
        const newTags = tagsEdit.filter((tag) => tag !== removedTag);
        setTagsEdit(newTags);
    };

    const showInput = () => {
        setInputEditVisible(true);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputEditValue(e.target.value);
    };

    const handleInputConfirm = () => {
        if (inputEditValue && tagsEdit.indexOf(inputEditValue) === -1) {
            setTagsEdit([...tagsEdit, inputEditValue]);
        }
        setInputEditVisible(false);
        setInputEditValue('');
    };

    const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputEditValue(e.target.value);
    };

    const handleEditInputConfirm = () => {
        const newTags = [...tagsEdit];
        newTags[editInputEditIndex] = inputEditValue;
        setTagsEdit(newTags);
        setEditInputEditIndex(-1);
        setInputEditValue('');
    };


    const tagInputStyle: React.CSSProperties = {
        width: 78,
        verticalAlign: 'top',
    };

    const tagPlusStyle: React.CSSProperties = {
        borderStyle: 'dashed',
    };

    const addToFilter = () => {
        if(tagsEdit.length === closeTags+1) {
            openNotification('Невозможно изменить фильтр!', 'Добавьте хотябы одно значение в список!')
        } else {
            if(filter) {
                let paramValues: FilterValues[] = []
                for (let i = 0; i < tagsEdit.length; i++) {
                    let param = tagsEdit[i]
                    paramValues.push({value_title: param, value_translit: translit(param)})
                }
                const data = {id: filter.id, values: paramValues}
                AddToFilter(data)
            }
        }
    }
    return (
        <>
            <Title level={3}>{filter && filter.title}</Title>
            <Space size={[0, 8]} wrap>
                {tagsEdit.map((tag, index) => {
                    if (editInputEditIndex === index) {
                        return (
                            <Input
                                ref={editInputRefEdit}
                                key={tag}
                                size="small"
                                style={tagInputStyle}
                                value={editInputEditValue}
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
                            closable={index > closeTags}
                            style={{userSelect: 'none'}}
                            onClose={() => handleClose(tag)}
                        >
                                      <span
                                          onDoubleClick={(e) => {
                                              if (index !== 0) {
                                                  setEditInputEditIndex(index);
                                                  setEditInputEditValue(tag);
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
            {inputEditVisible ? (
                <Input
                    ref={inputRefEdit}
                    type="text"
                    size="small"
                    style={tagInputStyle}
                    value={inputEditValue}
                    onChange={handleInputChange}
                    onBlur={handleInputConfirm}
                    onPressEnter={handleInputConfirm}
                />
            ) : (
                <Tag style={tagPlusStyle} onClick={showInput}>
                    <PlusOutlined/> New Tag
                </Tag>
            )}
            <Popconfirm
                title="Добавить значения в фильтр?"
                description="Вы уверены что хотите Добавить значения в выбраный фильтр?"
                icon={<QuestionCircleOutlined style={{color: 'red'}}/>}
                onConfirm={addToFilter}
            >
                <Button>Добавить фильтры</Button>
            </Popconfirm>
        </>
    );
};

export default EditFilter;

