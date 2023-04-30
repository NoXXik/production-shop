import Head from "next/head";
import React, {useEffect, useState} from "react";
import {DeliveryInfo, DeliveryInfoOnChoose} from "../common/types/deliveryTypes";
import {useAppSelector} from "../common/hooks/redux/reduxHooks";
import {useRouter} from "next/router";
import {Input} from "../common/shared/ui/Input/Input";
import {Button} from "../common/shared/ui/Button/Button";
import {Text, TextColor, TextSize} from "../common/shared/ui/Text/Text";
import {discountValue, isDiscountValid, priceWithDiscount} from "../common/utils/isDiscountValid";
import {notification, Spin} from "antd";
import {useSubmitOrderMutation} from "../common/store/api/categoryAPI";
import {AppLink} from "../common/shared/ui/Link/Link";
import ReCAPTCHA from "react-google-recaptcha";

const {ISDEKWidjet} = require('../common/utils/widjet')


interface Goods {
    length: number;
    width: number;
    height: number;
    weight: number;
}

export default function Compare() {
    const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfo | null>(null);
    const [reCaptcha, setReCaptcha] = useState(false)
    const [name, setName] = useState<string>('');
    const [surname, setSurname] = useState<string>('');
    const [otchestvo, setOtchestvo] = useState<string>('');
    const [comment, setComment] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [totalDiscount, setTotalDiscount] = useState<number>(0)
    const [totalCount, setTotalCount] = useState<number>(0)
    const [totalOrderSum, setTotalOrderSum] = useState<number>(0)
    const [totalSum, setTotalSum] = useState<number>(0)
    const [buttonDisabled, setButtonDisabled] = useState(true)
    const [submitOrder, {data, error, isError, isLoading, isSuccess}] = useSubmitOrderMutation()
    const [api, contextHolder] = notification.useNotification();
    const openNotification = (message: string) => {
        api.info({
            message,
            placement: 'topRight',
        });
    };
    const router = useRouter()
    const products = useAppSelector(state => state.cart.products)
    let goods: Goods[] = [];
    products.forEach(prod => {
        for (let i = 0; i < prod.count; i++) {
            goods.push({
                weight: prod.weight,
                width: prod.width,
                height: prod.height,
                length: prod.length,
            })
        }
    })
    useEffect(() => {
        let count = 0
        let discount = 0
        let summ = 0
        products.forEach(item => {
            count += item.count
            if (item.discount && isDiscountValid(item.discount.startDate, item.discount.expirationDate)) {
                discount += Number(discountValue(item.price, item.discount.discount)) * item.count
                summ += Number(priceWithDiscount(item.price, item.discount.discount)) * item.count
            } else {
                summ += item.price * item.count
            }
        })
        setTotalSum(summ)
        setTotalDiscount(discount)
        setTotalCount(count)
        setTotalOrderSum(summ)

    }, [])

    useEffect(() => {
        if(name.length > 0 && phone.length > 0 && email.length > 0 && otchestvo.length > 0 && surname.length > 0 && deliveryInfo && reCaptcha) {
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)
        }
    }, [name, phone, email, surname, otchestvo, deliveryInfo, reCaptcha])

    function onReady() {
    }

    function onChoose(data: DeliveryInfoOnChoose) {
        const DeliveryInfo = validateDeliveryInfo(data)
        if(deliveryInfo){
            setTotalOrderSum(prev => prev - Number(deliveryInfo.price))
        }
        setDeliveryInfo(DeliveryInfo)
    }
    const handleRecaptcha = (value: any) => {
        setReCaptcha(true)
    }
    function onChooseProfile(wat: any) {
    }

    function onCalculate() {
    }

    function onChooseAddress(wat: any) {
    }

    function validateDeliveryInfo(data: DeliveryInfoOnChoose): DeliveryInfo {
        return {
            id: data.id,
            city: data.city,
            cityName: data.cityName,
            tarif: data.tarif,
            price: Number(data.price),
            term: data.term,
            address: data.PVZ.Address,
            addressComment: data.PVZ.AddressComment,
            name: data.PVZ.Name,
            phone: data.PVZ.Phone
        }
    }

    function orderHandler() {
        let _products: {id: string, count: number}[] = []
        products.forEach(product => {
            _products.push({id: product.id, count: product.count})
        })
        if(deliveryInfo && _products.length === products.length) {
            submitOrder({
                delivery: deliveryInfo,
                products: _products,
                comment: comment,
                phone: phone,
                email: email,
                full_name: `${surname} ${name} ${otchestvo}`,
            })
        } else {
            openNotification('Проверьте правильность введенных данных и выбор пункта выдачи!')
        }
    }


    useEffect(() => {
        const widjet = new ISDEKWidjet({
            showWarns: true,
            showErrors: true,
            showLogs: true,
            hideMessages: false,
            path: `${process.env.NEXT_PUBLIC_SITE_URL}/sdek/widget/scripts/`,
            servicepath: `${process.env.NEXT_PUBLIC_PHP_URL}/sdek/widget/scripts/service.php`, //ссылка на файл service.php на вашем сайте
            templatepath: `${process.env.NEXT_PUBLIC_PHP_URL}/sdek/widget/scripts/template.php`,
            choose: true,
            popup: false,
            country: 'Россия',
            defaultCity: 'Казань',
            cityFrom: 'Елабуга',
            link: 'forpvz',
            hidedress: true,
            hidecash: true,
            hidedelt: true,
            detailAddress: true,
            region: true,
            apikey: 'a4b58d88-e41f-4774-98ad-e3ac6eb59700',
            goods: goods,
            onReady: onReady,
            onChoose: onChoose,
            onChooseProfile: onChooseProfile,
            onCalculate: onCalculate,
            onChooseAddress: onChooseAddress,
        });

        if (products.length < 1) {
            router.push('/cart')
        }
    }, [])

    useEffect(() => {
        if(isError && error) {
            openNotification('Произошла ошибка при оформлении заказа. Обратитесь в тех. поддержку')
        }
    }, [isError, error])

    useEffect(() => {
        if(isSuccess && data) {
            window.location.assign(data.paymentUrl)
        }
    }, [isSuccess, data])

    useEffect(() => {
        if(deliveryInfo) {
            setTotalOrderSum(prev => prev + Number(deliveryInfo.price))
            openNotification('Пункт приема выдачи выбран!')
        }
    }, [deliveryInfo])
    return (
        <>
            {contextHolder}
            <Head>
                <link href="http://localhost:3000/sdek/widget/scripts/style.css" rel="stylesheet" type="text/css"/>
            </Head>
            <div className={'_container'}>
                {isLoading && <Spin spinning={true} size={'large'} style={{color: 'orange'}}/>}
                <h1>Оформление заказа</h1>
                <div className={'submit-order__user-data'}>
                    {/*<h2>1. Данные получателя</h2>*/}
                    <Text title={'1. Данные получателя'}/>
                    <div className={'submit-order__inputs'}>
                        <Input label={'Имя *'} value={name} onChange={e => setName(e)}
                               errorMessage={'Введите Имя получателя'} validate={(value) => value.length > 0}/>
                        <Input label={'Фамилия *'} value={surname} onChange={e => setSurname(e)}
                               errorMessage={'Введите Фамилию получателя'} validate={(value) => value.length > 0}/>
                        <Input label={'Отчество *'} value={otchestvo} onChange={e => setOtchestvo(e)}
                               errorMessage={'Введите Отчество получателя'} validate={(value) => value.length > 0}/>
                        <Input label={'Телефон *'} value={phone} onChange={e => setPhone(e)}
                               errorMessage={'Введите номер получателя'} validate={(value) => value.length > 0}/>
                        <Input label={'E-mail *'} value={email} onChange={e => setEmail(e)}
                               errorMessage={'Введите E-mail получателя'} validate={(value) => value.length > 0}/>
                        <Input label={'Коментарий к заказу'} value={comment} onChange={e => setComment(e)}/>

                    </div>
                </div>
                <div className={'submit-order__delivery-block'}>
                    <h2>2. Выберите пункт выдачи</h2>
                    <div className={'submit-order__map'} id="forpvz" style={{width: '100%', height: '500px'}}></div>
                </div>
                <div className={'submit-order__order-details'}>
                    <div className={'submit-order__count'}><Text color={TextColor.GRAY} size={TextSize.SIZE_L}
                                                                 text={`${totalCount} товара на сумму ${totalSum} ₽`}/></div>
                    <div className={'submit-order__discount item'}><Text color={TextColor.GRAY} size={TextSize.SIZE_L}
                                                                    text={`Скидка: ${totalDiscount} ₽`}/></div>
                    <div className={'submit-order__delivery-cost item'}><Text color={TextColor.GRAY} size={TextSize.SIZE_L}
                                                                         text={`Стоимость доставки: ${deliveryInfo ? `${deliveryInfo.price} ₽` : 'Пункт выдачи не выбран'}`}/>
                    </div>
                    <div className={'submit-order__summ item'}><Text color={TextColor.GRAY} size={TextSize.SIZE_L}
                                                                title={`Итого: ${totalOrderSum} ₽`}/></div>
                    <ReCAPTCHA
                        className={'submit-order_recaptcha'}
                        onChange={handleRecaptcha}
                        sitekey="6LcEdbklAAAAAPiKpNu1D2nUrUQhgz4KLntNWu4i"
                    />
                    <Button disabled={buttonDisabled} onClick={orderHandler}>Оформить</Button>

                    <p className={'submit-order__agreement'}>
                        *Нажимая кнопку «Оформить», я даю свое согласие на сбор и обработку моих персональных данных в соответствии с {<AppLink target={'_blank'} href={'/privacy-policy.docx'}>Политикой обработки персональных данных</AppLink>} и принимаю условия {<AppLink target={'_blank'} href={'/public-offer.docx'}>Публичной оферты</AppLink>}
                    </p>
                </div>
            </div>
        </>
    )
}
