import {Button, Modal, Radio, Select, Switch, Typography, Upload, UploadFile} from "antd"
import Input from "antd/es/input/Input"
import TextArea from "antd/es/input/TextArea"
import React, {useEffect, useState} from "react"
import {ICategory, IFilter} from "../../../types/productTypes"
import {useAppDispatch, useAppSelector} from "../../../utils/hooks/reduxHooks"
import {useLazyGetCategoriesQuery} from "../../../store/api/productAPI"
import {setCategories} from "../../../store/productSlice"
import {PlusOutlined} from '@ant-design/icons';
import {RcFile, UploadProps} from "antd/es/upload"
import {uploadImage} from "../../../utils/api/imageRequest"
import {uploadFile} from "../../../utils/api/fileRequest"
import {v4 as uuidV4} from 'uuid'

const {Title} = Typography
const {Option} = Select


export const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
    });

interface IMainInfoProps {

    vendorCode: string;
    title: string;
    categories: ICategory[] | null;
    filtersCat: IFilter[] | null;
    features: { title: string; value: string }[];
    price: string;
    // oldPrice: string;
    description: string;
    imageList: UploadFile[];
    fileList: UploadFile[];
    stockCount: number;
    stockStatus: 'В наличии' | 'Нет в наличии' | 'Под заказ';
    labelNew: boolean;
    labelHit: boolean;
    width: number;
    length: number;
    height: number;
    weight: number;

    setTitle: React.Dispatch<React.SetStateAction<string>>;
    setVendorCode: React.Dispatch<React.SetStateAction<string>>;
    setPrice: React.Dispatch<React.SetStateAction<string>>;
    // setOldPrice: React.Dispatch<React.SetStateAction<string>>;
    setCategory: React.Dispatch<React.SetStateAction<string>>;
    setDescription: React.Dispatch<React.SetStateAction<string>>;
    setFileList: React.Dispatch<React.SetStateAction<UploadFile[]>>;
    setImageList: React.Dispatch<React.SetStateAction<UploadFile[]>>;
    setStockCount: React.Dispatch<React.SetStateAction<number>>;
    setStockStatus: React.Dispatch<React.SetStateAction<'В наличии' | 'Нет в наличии' | 'Под заказ'>>;
    setLabelNew: React.Dispatch<React.SetStateAction<boolean>>;
    setLabelHit: React.Dispatch<React.SetStateAction<boolean>>;
    setFeatures: React.Dispatch<React.SetStateAction<{ title: string; value: string }[]>>;
    setFiltersCat: React.Dispatch<React.SetStateAction<IFilter[] | null>>;
    setWidth: React.Dispatch<React.SetStateAction<number>>;
    setLength: React.Dispatch<React.SetStateAction<number>>;
    setHeight: React.Dispatch<React.SetStateAction<number>>;
    setWeight: React.Dispatch<React.SetStateAction<number>>;

}


export default function MainInfo(props: IMainInfoProps) {
    const [getCategories, {data, isError, isSuccess, isLoading}] = useLazyGetCategoriesQuery()
    const categories = useAppSelector(state => state.product.categories)
    const dispatch = useAppDispatch()


    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');

    const {
        vendorCode,
        description,
        features,
        fileList,
        filtersCat,
        imageList,
        labelHit,
        labelNew,
        price,
        stockCount,
        stockStatus,
        title,
        weight,
        length,
        height,
        width
    } = props
    const {
        setTitle,
        setVendorCode,
        setPrice,
        setCategory,
        setDescription,
        setFileList,
        setImageList,
        setStockCount,
        setStockStatus,
        setLabelNew,
        setLabelHit,
        setFeatures,
        setFiltersCat,
        setWidth,
        setWeight,
        setHeight,
        setLength,
    } = props

    function selectCategory(id: string) {
        if (categories) {
            setFeatures([])
            const selectedCat = categories.filter(cat => cat.id.toString() == id)[0]
            setCategory(selectedCat.translit)
            const filters = selectedCat?.Filters
            if (filters && filters?.length > 0) {
                setFiltersCat(filters)
            } else {
                setFiltersCat([])
            }
        }
    }

    useEffect(() => {
        getCategories('')
    }, [])
    useEffect(() => {
        if (categories && categories.length > 0) {
            selectCategory(categories[0].id.toString())
        }
    }, [categories])

    useEffect(() => {
        if (data) {
            dispatch(setCategories(data))
        }
    }, [data])


    const addFeature = () => {
        if (filtersCat && filtersCat.length > 0) {
            if (features && features?.length > 0) {
                // setFeatures(features.concat({title: filters[0].title, value: filters[0].values[0]}))
                setFeatures(features.concat({
                    title: filtersCat[0].translit,
                    value: filtersCat[0].values[0].value_translit
                }))
            } else {
                filtersCat && setFeatures([{
                    title: filtersCat[0].translit,
                    value: filtersCat[0].values[0].value_translit
                }])
            }
        }
    }
    const selectFilter = (e: any, id: number) => {

        if (filtersCat && features) {
            const filter = filtersCat.filter(filter => filter.translit === e)[0]
            setFeatures(features?.filter((feature, idd) => idd === id ? feature.title = e : feature))
            setFeatures(features?.filter((feature, idd) => idd === id ? feature.value = filter.values[0].value_translit : feature))
        }
    }
    const selectValue = (e: any, id: number) => {

        setFeatures(features && features?.filter((feature, idd) => idd === id ? feature.value = e : feature))
    }
    const deleteFeature = (_id: number) => {
        setFeatures(features => {
            return features && features.filter((feature, id) => id !== _id)
        })
    }

    const handleCancel = () => setPreviewOpen(false);

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as RcFile);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
    };

    const handleImageChange: UploadProps['onChange'] = ({fileList: newFileList}) => {
        setImageList(newFileList);
    }
    const handleFileChange: UploadProps['onChange'] = ({fileList: newFileList}) => {
        setFileList(newFileList);

    }

    const stockCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const count = Number(e.target.value)
        setStockCount(count)
        if (count <= 0) {
            setStockStatus('Нет в наличии')
        }
    }
    const uploadButton = (
        <div>
            <PlusOutlined/>
            <div style={{marginTop: 8}}>Upload</div>
        </div>
    );

    return (
        <>
            <Title level={5}>Название товара</Title>
            <Input status={title.length > 0 ? '' : 'error'} value={title} onChange={(e) => setTitle(e.target.value)}
                   placeholder='Название товара' style={{maxWidth: 300}} required={true}/>
            <Title level={5}>Артикул товара</Title>
            <Input status={vendorCode.length > 0 ? '' : 'error'} value={vendorCode}
                   onChange={(e) => setVendorCode(e.target.value)} placeholder='Название товара' style={{maxWidth: 300}}
                   required={true}/>

            <Title level={5}>Категория товара</Title>
            <Select style={{minWidth: 300}} onChange={(value) => selectCategory(value)}
                    placeholder='categories'> {/*  categories */}
                {categories && categories.map(cat => <Option key={cat.id} value={cat.id}>{cat.title}</Option>)}
            </Select>
            <Title level={5}>Фильтры товара</Title>
            <div className="features">
                {(filtersCat && filtersCat?.length > 0) && features && features.map((feature, id) => <div key={id}
                                                                                                          className='feature'>
                    <React.Fragment key={id}>
                        <Select style={{minWidth: 300}} key={'sdfsf'} onChange={(value) => selectFilter(value, id)}>
                            {categories && filtersCat.map(filter => <>
                                <Option
                                    key={filter.id}
                                    value={filter.translit}
                                >
                                    {filter.title}
                                </Option>
                            </>)}
                        </Select>
                        <Select style={{minWidth: 300}} key={'sdfsdfs'} onChange={(value) => selectValue(value, id)}>
                            {/*<option key={0} value={'null'}>Choose value</option>*/}
                            {filtersCat && filtersCat.filter(filter => filter.translit === feature.title)[0].values.map(val =>
                                <Option key={val.value_title}
                                        value={val.value_translit}
                                >
                                    {val.value_title}
                                </Option>)}
                        </Select>
                        <Button onClick={() => deleteFeature(id)}>X</Button>
                    </React.Fragment>
                </div>)}
                <Button style={{borderColor: (features && features?.length > 0) ? '' : 'red'}} onClick={addFeature}>Добавить
                    Фильтр</Button>
            </div>
            <Title level={5}>Цена товара</Title>
            <Input type='number' value={price} onChange={(e) => setPrice(e.target.value)} placeholder='Цена товара'
                   style={{maxWidth: 300}} required={true}/>
            {/* <Title level={5}>Старая цена товара</Title>
            <Input type='number' value={oldPrice} onChange={(e) => setOldPrice(e.target.value)} placeholder='Цена товара' style={{maxWidth: 300}} required={true}/> */}
            {/* <Button onClick={addProduct}>Add product</Button> */}
            <Title level={5}>Описание товара</Title>
            <TextArea status={description.length > 1 ? '' : 'error'} value={description}
                      onChange={e => setDescription(e.target.value)}
                      placeholder='Описание должно содержать минимум 50 символов'></TextArea>
            <Title level={5}>Фото товара</Title>
            <Upload
                // action={'http://localhost:3000/api/upload'}
                listType="picture-card"
                multiple={true}
                fileList={imageList}
                onPreview={handlePreview}
                onChange={handleImageChange}
                beforeUpload={() => {
                    return false
                }}
                accept='image/*'
            >
                {imageList.length >= 8 ? null : uploadButton}
            </Upload>
            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                <img alt="example" style={{width: '100%'}} src={previewImage}/>
            </Modal>
            {/* <Button onClick={uploadImages}>Загрузить картинки</Button> */}
            <Title level={5}>Файлы товара</Title>
            <Upload
                // action={'http://localhost:3000/api/upload'}
                listType="picture-card"
                multiple={true}
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleFileChange}
                beforeUpload={() => {
                    return false
                }}
                accept='.doc,.docx,.pdf,.txt'
            >
                {fileList.length >= 8 ? null : uploadButton}
            </Upload>
            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                <img alt="example" style={{width: '100%'}} src={previewImage}/>
            </Modal>
            {/* <Button onClick={uploadFiles}>Загрузить Файлы</Button> */}
            <Title level={5}>Остаток товара</Title>
            <Input type='number' value={stockCount} onChange={(e) => stockCountChange(e)} placeholder='Цена товара'
                   style={{maxWidth: 300}} required={true}/>
            <Title level={5}>Наличие товара</Title>
            {/* В наличии'|'Нет в наличии'|'Под заказ' */}
            <Radio.Group onChange={e => setStockStatus(e.target.value)} value={stockStatus}>
                <Radio.Button value="В наличии" disabled={stockCount <= 0 ? true : false}>В наличии</Radio.Button>
                <Radio.Button value="Нет в наличии">Нет в наличии</Radio.Button>
                <Radio.Button value="Под заказ">Под заказ</Radio.Button>
            </Radio.Group>
            <Title level={5}>Отметить товар меткой 'Новинка'?</Title>
            <Switch defaultChecked={false} onChange={() => setLabelNew(!labelNew)}></Switch>
            <Title level={5}>Отметить товар меткой 'Хит продаж'?</Title>
            <Switch defaultChecked={false} onChange={() => setLabelHit(!labelHit)}></Switch>

            <Title level={5}>Длина товара</Title>
            <Input type={'number'} status={length !== 0 ? '' : 'error'} value={length} onChange={(e) => setLength(Number(e.target.value))}
                   placeholder='Длина товара' style={{maxWidth: 300}} required={true}/>
            <Title level={5}>Ширина товара</Title>
            <Input type={'number'} status={width !== 0 ? '' : 'error'} value={width} onChange={(e) => setWidth(Number(e.target.value))}
                   placeholder='Ширина товара' style={{maxWidth: 300}} required={true}/>
            <Title level={5}>Высота товара</Title>
            <Input type={'number'} status={height !== 0 ? '' : 'error'} value={height} onChange={(e) => setHeight(Number(e.target.value))}
                   placeholder='Высота товара' style={{maxWidth: 300}} required={true}/>
            <Title level={5}>Вес товара</Title>
            <Input type={'number'} status={weight !== 0 ? '' : 'error'} value={weight} onChange={(e) => setWeight(Number(e.target.value))}
                   placeholder='Вес товара' style={{maxWidth: 300}} required={true}/>

        </>
    )
}
