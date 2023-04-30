import {
    Button,
    Input,
    Modal,
    Radio,
    Select,
    Space,
    Switch,
    Tabs,
    TabsProps,
    Typography,
    Upload,
    UploadFile,
    notification,
    Spin
} from 'antd';
import {useEffect, useRef, useState} from 'react';
import {
    useCreateCategoryMutation,
    useCreateProductMutation,
    useLazyGetCategoriesQuery
} from '../../../store/api/productAPI';
import {useAppDispatch, useAppSelector} from '../../../utils/hooks/reduxHooks';
import {setCategories} from '../../../store/productSlice';
import {
    ICategory,
    IFilter,
    IProduct,
    IProductCharacteristic,
    IProductCreateData,
    IProductDiscount
} from '../../../types/productTypes';
import axios from 'axios';
import {translit} from '../../../utils/helpers/utilFunctions';
import React from 'react';
import TextArea from 'antd/es/input/TextArea';
import {RcFile, UploadProps} from 'antd/es/upload/interface';
import {PlusOutlined} from '@ant-design/icons';
import {uploadImage} from '../../../utils/api/imageRequest';
import {uploadFile} from '../../../utils/api/fileRequest';
import {v4 as uuidV4} from 'uuid'
import {stringify} from 'querystring';
import MainInfo from './MainInfo';
import AdditionalInfo from './AdditionalInfo';
import MetaInfo from './MetaInfo';
import RelatedProducts from './RelatedProducts';
import ProductDiscount from './ProductDiscount';
import {createProduct} from '../../../utils/api/createProduct';
import Title from "antd/es/typography/Title";


export default function CreateProduct() {
    const dispatch = useAppDispatch()
    const [api, contextHolder] = notification.useNotification();
    const [createProductReq, {data, isLoading, isSuccess, isError, error}] = useCreateProductMutation()

    const categories = useAppSelector(state => state.product.categories)
    const [features, setFeatures] = useState<{ title: string; value: string }[]>([])
    const [filtersCat, setFiltersCat] = useState<IFilter[] | null>([])

    const [title, setTitle] = useState('')
    const [vendorCode, setVendorCode] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    // Meta информация товара
    const [metaTitle, setMetaTitle] = useState('')
    const [metaDescription, setMetaDescription] = useState('')
    // Остаток и статус
    const [stockStatus, setStockStatus] = useState<'В наличии' | 'Нет в наличии' | 'Под заказ'>('Нет в наличии')
    const [stockCount, setStockCount] = useState<number>(0)
    // Метки
    const [labelNew, setLabelNew] = useState(false)
    const [labelHit, setLabelHit] = useState(false)
    const [length, setLength] = useState(0)
    const [width, setWidth] = useState(0)
    const [height, setHeight] = useState(0)
    const [weight, setWeight] = useState(0)

    // Фото и файлы
    const [fileList, setFileList] = useState<UploadFile[]>([])
    const [imageList, setImageList] = useState<UploadFile[]>([])
    // Характеристики
    const [characteristics, setCharacteristics] = useState<IProductCharacteristic[]>([])
    // Сопутсвующая информация
    const [relatedProducts, setRelatedProducts] = useState<IProduct[]>([])
    // Discount
    const [discount, setDiscount] = useState<IProductDiscount | null>(null)

    const tabItems: TabsProps['items'] = [
        {
            key: '1',
            label: `Основное`,
            children: MainInfo({
                categories,
                description,
                features,
                fileList,
                filtersCat,
                imageList,
                labelHit,
                labelNew,
                price,
                setCategory,
                setDescription,
                setFeatures,
                setFileList,
                setImageList,
                setFiltersCat,
                setLabelHit,
                setLabelNew,
                setPrice,
                setStockCount,
                setStockStatus,
                setTitle,
                setVendorCode,
                stockCount,
                stockStatus,
                title,
                vendorCode,
                length,
                setLength,
                width,
                setWidth,
                weight,
                setWeight,
                height,
                setHeight,
            }),
        },
        {
            key: '2',
            label: `Скидка на товар`,
            children: ProductDiscount({price, discount, setDiscount}),
        },
        {
            key: '3',
            label: `Характеристики`,
            children: AdditionalInfo({characteristics, setCharacteristics}),
        },
        {
            key: '4',
            label: `Сопутствующие товары`,
            children: RelatedProducts({relatedProducts, setRelatedProducts}),
        },
        {
            key: '5',
            label: `Мета-теги`,
            children: MetaInfo({metaTitle, metaDescription, setMetaTitle, setMetaDescription}),
        },
    ];


    const addProduct = () => {
        const validate = validateDatas()
        if (validate === false) {
            return false
        } else {
            const filesList = uploadFiles()
            const imagesList = uploadImages()
            const productFilters = checkFeatures()
            let category_id: number | null = null
            if (categories) {
                category_id = categories.filter(cat => cat.translit === category)[0].id
            }
            const related_products: string[] = []
            if(relatedProducts.length > 0) {
                relatedProducts.map(product => related_products.push(product.id))
            }
            const data: IProductCreateData = {
                title,
                meta_title: metaTitle,
                category_name: category,
                characteristics: characteristics,
                currently_price: Number(price),
                description: description,
                discount: discount,
                files: filesList,
                images: imagesList,
                meta_description: metaDescription,
                product_filters: productFilters,
                hit_label: labelHit,
                new_label: labelNew,
                stock_status: stockStatus,
                stock_count: stockCount,
                title_translit: translit(title),
                vendor_code: vendorCode,
                category_id,
                length,
                width,
                height,
                weight,
                related_products,
            }
            createProductReq(data)
        }
    }
    const checkFeatures = () => {
        if (!features) {
            return false
        }
        let featureData: any = {}
        let title
        let value
        for (let i = 0; i < features.length; i++) {

            title = translit(features[i].title)
            value = translit(features[i].value)
            // featureData.push({[title]: value})
            featureData[title] = value
        }
        return featureData
    }

    const validateDatas = () => { // Проверка данных перед отправкой запроса
        if (title.length === 0) {
            openNotification('Не возможно добавить товар!', 'Проверте поле Название товара!')
            return false
        } else if (vendorCode.length === 0) {
            openNotification('Не возможно добавить товар!', 'Проверте поле Артикул!')
            return false
        } else if (price.length === 0) {
            openNotification('Не возможно добавить товар!', 'Проверте поле Цена товара!')
            return false
        } else if (category.length === 0) {
            openNotification('Не возможно добавить товар!', 'Проверте поле Категория товара!')
            return false
        } else if (description.length === 0) {
            openNotification('Не возможно добавить товар!', 'Проверте поле Описание товара!')
            return false
        } else if (metaTitle.length === 0) {
            openNotification('Не возможно добавить товар!', 'Проверте поле Мета-Тег Title!')
            return false
        } else if (metaDescription.length === 0) {
            openNotification('Не возможно добавить товар!', 'Проверте поле Мета-Тег Description!')
            return false
        } else if (stockStatus.length === 0) {
            openNotification('Не возможно добавить товар!', 'Проверте поле Наличие')
            return false
        } else if (imageList.length === 0) {
            openNotification('Не возможно добавить товар!', 'Проверте поле Фото товара, должно быть хотя-бы одно фото')
            return false
        } else if (length === 0) {
            openNotification('Не возможно добавить товар!', 'Проверте поле Длина товара, должно быть больше 0')
            return false
        }else if (width === 0) {
            openNotification('Не возможно добавить товар!', 'Проверте поле Ширина товара, должно быть больше 0')
            return false
        }else if (height === 0) {
            openNotification('Не возможно добавить товар!', 'Проверте поле Высота товара, должно быть больше 0')
            return false
        }else if (weight === 0) {
            openNotification('Не возможно добавить товар!', 'Проверте поле Вес товара, должно быть больше 0')
            return false
        } else {
            return true // Если прошел все проверки
        }
    }

    const uploadFiles = (): string[] => {
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
            uploadFile(file, newName)
        })
        return filesList
    }
    const uploadImages = (): string[] => {
        if (imageList.length === 0) {
            return []
        }
        let file;
        let tag;
        let newName;
        let imagesList: string[] = []
        imageList.forEach(file_ => {
            tag = file_.originFileObj?.name.split('.').at(-1)
            newName = `${uuidV4()}.${tag}`
            imagesList.push(newName)
            file = file_.originFileObj as Blob
            uploadImage(file, newName)
        })
        return imagesList
    }
    const openNotification = (message: string, description: string) => {
        api.info({
            message,
            description,
            placement: 'topRight',
        });
    };

    useEffect(() => {
        if(isSuccess){
            openNotification('Товар успешно создан', 'Товар успешно создан!')
        }
    }, [isSuccess])
    useEffect(() => {
        if(isError){
            openNotification('При создании товара проиошла ошибка', `При создании товара проиошла ошибка: ${data} ${JSON.stringify(error)}`)
        }
    }, [isError])

    return (
        <Space direction='vertical' size="large" style={{display: 'flex'}}>
            <Title level={3}>Добавление нового товара</Title>

            {contextHolder}
            <Tabs defaultActiveKey='1' items={tabItems}></Tabs>
            <div className='loader-container'>
                {isLoading && <Spin className='loader' size="large"/>}
            </div>
            <Button onClick={addProduct}>Добавить товар</Button>
        </Space>
    )
}

{/* <Title level={5}>Название товара</Title>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Название товара' style={{maxWidth: 300}} required={true}/>
            <Select style={{minWidth: 300}} onChange={e => selectCategory(e.target.value)} placeholder='categories'> {/*  categories */
}
//     {categories && categories.map(cat => <Option key={cat.id} value={cat.id}>{cat.title}</Option>)}
// </Select>
// <div className="features">
//     {(filtersCat && filtersCat?.length > 0) && features && features.map((feature, id) => <div key={id} className='feature'>
//         <Select style={{minWidth: 300}} key={1} onChange={e => selectFilter(e, id)}>
//             {categories && filtersCat.map(filter => <>
//                 <Option key={filter.id} value={filter.title}>{filter.title}</Option>
//             </>)}
//         </Select>
//         <Select style={{minWidth: 300}} key={2} onChange={e => selectValue(e, id)}>
//             {/*<option key={0} value={'null'}>Choose value</option>*/}
//             {filtersCat && filtersCat.filter(filter => filter.title === feature.title)[0].values.map(val => <Option key={val.value_title} value={val.value_title}>{val.value_title}</Option>)}
//         </Select>
//         <button onClick={() => deleteFeature(id)}>x</button>
//     </div>)}
// </div>
// <Button onClick={addFeature}>Add feature</Button>
// <Button onClick={addProduct}>Add product</Button> */}
