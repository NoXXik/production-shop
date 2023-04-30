import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../utils/hooks/reduxHooks";
import {
    useAddFilterCategoryMutation,
    useCreateCategoryMutation,
    useDeleteCategoryMutation,
    useGetCategoriesQuery,
    useGetFiltersQuery,
    useGetHierarchyCategorysQuery,
} from "../../../store/api/productAPI";
import {ICategory, IFilter} from "../../../types/productTypes";
import {Button, Cascader, Modal, notification, Popconfirm, Select, Space, Upload, UploadFile} from "antd";
import { DefaultOptionType } from 'antd/es/cascader';
import {ICreateCategoryData, IHierarchyCategory} from "../../../types/categoryTypes";
import Input from "antd/es/input/Input";
import Title from "antd/es/typography/Title";
import TextArea from "antd/es/input/TextArea";
import {translit} from "../../../utils/helpers/utilFunctions";
import { PlusOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import {RcFile, UploadProps} from "antd/es/upload";
import {getBase64} from "../AddProduct/MainInfo";
import {v4 as uuidV4} from "uuid";
import {uploadCategoryImage} from "../../../utils/api/categoryImageReq";

const {Option} = Select

interface Option {
    value: string;
    // value: object;

    label: string;
    children?: Option[];
}
const Category = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalFilterOpen, setModalFilterOpen] = useState(false);
    const {
        data: FilterData,
        isSuccess: FilterIsSuccess,
        isLoading: FilterIsLoading,
        isError: FilterIsError
    } = useGetFiltersQuery()
    const [AddFilterCategory, {
        data: AddFilterData,
        isSuccess: AddFilterIsSuccess,
        isLoading: AddFilterIsLoading,
        isError: AddFilterIsError}] = useAddFilterCategoryMutation()
    const {data, isError, isSuccess, isLoading} = useGetHierarchyCategorysQuery('')
    const {
        data: CatWithFilterData,
        isSuccess: CatWithFilterIsSuccess,
        isLoading: CatWithFilterIsLoading,
        isError: CatWithFilterIsError
    } = useGetCategoriesQuery('')
    const [addCategory, {data: dataAddCat, isError: isErrorAddCat, isSuccess: isSuccessAddCat, isLoading: isLoadingAddCat}] = useCreateCategoryMutation()
    const [delCategory, {data: dataDeleteCat, isError: isErrorDeleteCat, isSuccess: isSuccessDeleteCat, isLoading: isLoadingDeleteCat}] = useDeleteCategoryMutation()
    const [filterList, setFilterList] = useState<IFilter[]>([])
    const [catWithFilter, setCatWithFilter] = useState<ICategory[]>([])
    const dispatch = useAppDispatch()
    const [hCategories, setHCategories] = useState<IHierarchyCategory[]>([])
    const [selectCategory, setSelectCategory] = useState<number | null>(null)
    const [selectFilter, setSelectFilter] = useState<number | null>(null)

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [api, contextHolder] = notification.useNotification();

    const [fileList, setFileList] = useState<UploadFile[]>([])
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');

    useEffect(()=> {
        if(data){
            setHCategories(data)
        }
    }, [data])

    const getOptions = (categories: IHierarchyCategory[]): Option[] => {
        const options: Option[] = []
        for (let i = 0; i < categories.length; i++) {
            if(categories[i].level === 1 && categories[i].is_leaf){
                options.push({value: String(categories[i].id), label: categories[i].title})
                // options.push({value: categories[i], label: categories[i].title})

            } else if(categories[i].level === 1 && !categories[i].is_leaf) {
                let children: Option[] = []
                for (let j = 0; j < categories.length; j++) {
                    if(categories[j].parent_id === categories[i].id && categories[j].level === 2) {
                        children.push({value: String(categories[j].id), label: categories[j].title})
                        // children.push({value: categories[j], label: categories[j].title})

                    }
                }
                options.push({value: String(categories[i].id), label: categories[i].title, children})

            }
        }
        return options
    }
    const options: Option[] = getOptions(hCategories)
    const displayRender = (labels: string[]) => labels[labels.length - 1];
    const changeCategory = (value: any) => {
        if(value && value.length > 0) {
            setSelectCategory(value.at(-1))
        } else {
            setSelectCategory(null)
        }
    }
    const filter = (inputValue: string, path: DefaultOptionType[]) =>
        path.some(
            (option) => (option.label as string).toLowerCase().indexOf(inputValue.toLowerCase()) > -1,
        );
    const handleCancel = () => {
        setModalOpen(false)
        setModalFilterOpen(false)
    };

    const createCategory = () => {
        const validate = validateDatas()
        if(validate === true) {
            const image = uploadImage()[0]
            const data: ICreateCategoryData = {title: title, parent_id: selectCategory, translit: translit(title), description: description, image: image}
            addCategory(data)
        }
        setTitle('')
        setDescription('')
        handleCancel()
    }
    const openNotification = (message: string, description: string ) => {
        api.info({
            message,
            description,
            placement: 'topRight',
        });
    };
    const validateDatas = () => { // Проверка данных перед отправкой запроса
        const sel_cat = hCategories.filter(cat => cat.id === selectCategory)[0]
        if(sel_cat && sel_cat.level === 2) {
            openNotification('Не возможно добавить категорию!', 'Название данный момент невозможно создать категорию в подкатегории!')
            return false
        }
        if(title.length === 0) {
            openNotification('Не возможно добавить категорию!', 'Проверте поле Название категории!')
            return false
        } else if(description.length === 0) {
            openNotification('Не возможно добавить категорию!', 'Проверте поле Описание категории!')
            return false
        } else if(fileList.length < 1) {
            openNotification('Не возможно добавить категорию!', 'Проверте наличие Фото категории!')
            return false
        } else {
            return true // Если прошел все проверки
        }
    }
    const deleteCategory = () => {
        if(!selectCategory) {
            openNotification('Не возможно удалить категорию!', 'Выберите категорию которую хотите удалить')
        } else {
            const child = hCategories.filter(cat => cat.parent_id === Number(selectCategory))
            if(child.length > 0) {
                openNotification('Не возможно удалить категорию!', 'Невозможно удалить категорию у которой есть дочерние категории')
            } else {
                delCategory({id: Number(selectCategory)})
            }
        }
        setSelectCategory(null)
    }

    const addFilterCategory = () => {
        if(!selectFilter){
            openNotification('Не возможно добавить фильтр!', 'Выберите фильтр которую хотите добавить')
        } else {
            AddFilterCategory({category_id: Number(selectCategory), filter_id: selectFilter})
        }
    }

    useEffect(() => {
        if(isSuccessAddCat) {
            openNotification('Категория успешно создана', 'Категория успешно создана')
        }
    }, [isSuccessAddCat])
    useEffect(() => {
        if(AddFilterIsSuccess) {
            openNotification('Фильтр успешно добавлен', 'Фильтр успешно добавлен')
        }
    }, [AddFilterIsSuccess])
    useEffect(() => {
        if(AddFilterIsError) {
            openNotification('Возникла ошибка при добавлении фильтра', `Возникла ошибка при добавлении фильтра: ${AddFilterData?.message}`)
        }
    }, [AddFilterIsError])
    useEffect(() => {
        if (FilterData) {
            setFilterList(FilterData)
        }
    }, [FilterData])
    useEffect(() => {
        if (CatWithFilterData) {
            setCatWithFilter(CatWithFilterData)
        }
    }, [CatWithFilterData])

    let categoryFilters = null
    if(catWithFilter.length > 0 && selectCategory) {
        const categoryWithFilter = catWithFilter.filter(filter => filter.id === Number(selectCategory))[0]
        if(categoryWithFilter.Filters?.length){
            categoryFilters = categoryWithFilter.Filters
        }
    }
    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as RcFile);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
    };
    const handleFileChange: UploadProps['onChange'] = ({fileList: newFileList}) => {
        setFileList(newFileList);

    }
    const uploadButton = (
        <div>
            <PlusOutlined/>
            <div style={{marginTop: 8}}>Upload</div>
        </div>
    );

    const uploadImage = (): string[] => {
        if (fileList.length === 0) {
            return []
        }
        let file;
        let tag;
        let newName;
        let filesList: string[] = []
        fileList.forEach(file_ => {
            tag = file_.originFileObj?.name.split('.').at(-1)
            newName = `${uuidV4()}.${tag}`
            filesList.push(newName)
            file = file_.originFileObj as Blob
            uploadCategoryImage(file, newName)
        })
        return filesList
    }
    return (
        <div>
            {contextHolder}
            <Space direction={"vertical"} align={"start"}>
                <Title level={3}>Управление категориями</Title>
                <Cascader
                    options={options}
                    expandTrigger="hover"
                    displayRender={displayRender}
                    style={{minWidth: 250}}
                    showSearch={{ filter }}
                    onChange={(val) => changeCategory(val)}
                    changeOnSelect
                />
                <Button onClick={() => setModalOpen(true)}>Создать категорию</Button>
                <Button onClick={() => {
                    if(selectCategory) {
                        setModalFilterOpen(true)
                    } else {
                        openNotification('Невозможно добавить фильтр!', 'Выберите категорию для добавления фильтра')
                    }
                }}>Добавить фильтр</Button>
            </Space>


            {/*<Popconfirm*/}
            {/*    title="Удалить категорию?"*/}
            {/*    description="Вы действительно хотите удалить выбранную категорию?"*/}
            {/*    icon={<QuestionCircleOutlined style={{ color: 'red' }} />}*/}
            {/*    onConfirm={deleteCategory}*/}
            {/*>*/}
            {/*    <Button>Удалить категорию</Button>*/}
            {/*</Popconfirm>*/}

            <Modal open={modalFilterOpen} title={`Добавить фильтр в ${selectCategory ? `в ${hCategories.filter(cat => cat.id === Number(selectCategory))[0]?.title}` : ''}`} footer={null} onCancel={handleCancel}>
                <div className="content">
                    <div className="discount-input">
                        <Space direction={"vertical"} align={"start"}>
                            <Select onSelect={(value) => setSelectFilter(Number(value))} value={selectFilter} style={{width: "100%", minWidth: 400}}>
                                {filterList && filterList.map(filter => <Option key={filter.id} value={filter.id}>{filter.title}</Option>)}
                            </Select>
                            <Popconfirm
                                title="Добавить фильтр в категорию?"
                                description="Вы действительно хотите добавить фильтр в выбранную категорию?"
                                icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                                onConfirm={addFilterCategory}
                            >
                                <Button>Добавить фильтр</Button>
                            </Popconfirm>
                            <div className="">
                                <Title level={3}>Список фильтров</Title>
                                {categoryFilters && categoryFilters.map(filter => <Title level={4}>{filter.title}</Title>)}
                            </div>


                        </Space>
                    </div>
                </div>
            </Modal>

            <Modal open={modalOpen} title={`Создать категорию ${selectCategory ? `в ${hCategories.filter(cat => cat.id === Number(selectCategory))[0]?.title}` : ''}`} footer={null} onCancel={handleCancel}>
                <div className="content">
                    <div className="discount-input">
                        <Space direction={'vertical'}>
                            <Title level={5}>Название категории</Title>
                            <Input status={title.length > 0 ? '': 'error'} value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Название категории' style={{maxWidth: 300}} required={true}/>
                            <Title level={5}>Описание категории</Title>
                            <TextArea status={description.length > 0 ? '': 'error'} value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Описание категории' style={{maxWidth: 300}} required={true}/>
                            <Title level={5}>Фото категории</Title>
                            <Upload
                                // action={'http://localhost:3000/api/upload'}
                                listType="picture-card"
                                multiple={false}
                                fileList={fileList}
                                onPreview={handlePreview}
                                onChange={handleFileChange}
                                beforeUpload={() => {
                                    return false
                                }}
                                accept='.png, .jpeg, .jpg'
                            >
                                {fileList.length === 1 ? null : uploadButton}
                            </Upload>
                            <Button onClick={createCategory}>Создать категорию</Button>
                        </Space>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default Category;
