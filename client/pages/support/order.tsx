import {Input} from "../../common/shared/ui/Input/Input";
import {Text, TextAlign, TextSize} from "../../common/shared/ui/Text/Text";
import {useEffect, useState} from "react";
import {TextArea} from "../../common/shared/ui/TextArea/TextArea";
import {Button} from "../../common/shared/ui/Button/Button";
import {useCreateSupportOrderMutation} from "../../common/store/api/categoryAPI";
import {notification} from "antd";
import ReCAPTCHA from 'react-google-recaptcha'
import Head from "next/head";

export default function SupportOrder() {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [reCaptcha, setReCaptcha] = useState(false)
    const [createOrder, {data, isLoading, isSuccess, isError, error}] = useCreateSupportOrderMutation()
    const [buttonDisabled, setButtonDisabled] = useState(true)
    const [api, contextHolder] = notification.useNotification();
    const openNotification = (message: string) => {
        api.info({
            message,
            placement: 'topRight',
        });
    };
    const handleCreateOrder = () => {
        if(name.length > 0 && email.length > 0 && title.length > 0 && text.length > 0 && reCaptcha) {
            createOrder({title, text, email, full_name: name})
        }
    }
    const handleRecaptcha = (value: any) => {
        setReCaptcha(true)
    }
    useEffect(() => {
        if(isSuccess && data) {
            openNotification('Заявка в тех.поддержку принята. Ожидайте ответа')
            setText('')
            setName('')
            setTitle('')
            setEmail('')
        }
    }, [isSuccess, data])
    useEffect(() => {
        if(isError && error) {
            openNotification(JSON.stringify(error))
        }
    }, [isError, error])
    useEffect(() => {
        if(name.length > 0 && email.length > 0 && title.length > 0 && text.length > 0 && reCaptcha) {
            setButtonDisabled(false)
        }
    }, [reCaptcha, name, email, title, text, reCaptcha])

    return (
        <div className={'support-order_block _container'}>
            <Head>
                <title>Обратная связь</title>
                <meta name="description"
                      content="Чтобы оставить заявку, пожалуйста, заполните простую форму на странице и опишите вашу проблему. Мы обязательно свяжемся с вами в ближайшее время и предоставим всю необходимую помощь и поддержку для решения проблемы."/>

            </Head>
            {contextHolder}
            <h1 className={'support-order_title'}>Обратная связь</h1>
            <Text align={TextAlign.CENTER} className={'support-order_description'} size={TextSize.SIZE_M}
                  text={'Чтобы оставить заявку, пожалуйста, заполните простую форму на странице и опишите вашу проблему. Мы обязательно свяжемся с вами в ближайшее время и предоставим всю необходимую помощь и поддержку для решения проблемы.'}/>
            <div className={'support-order_input-block'}>
                <Input className={'support-order_item'} label={'Ваше имя'} value={name} onChange={setName}
                       errorMessage={'Заполните обязательное поле!'} validate={(value) => value.length > 0}/>
                <Input className={'support-order_item'} label={'Ваша почта'} value={email} onChange={setEmail}
                       errorMessage={'Заполните обязательное поле!'} validate={(value) => value.length > 0}/>
                <Input className={'support-order_item'} label={'Тема обращения'} value={title} onChange={setTitle}
                       errorMessage={'Заполните обязательное поле!'} validate={(value) => value.length > 0}/>
                <TextArea className={'support-order_item'} label={'Описание обращения'} value={text} onChange={setText}
                          errorMessage={'Заполните обязательное поле!'} validate={(value) => value.length > 0}/>
                <ReCAPTCHA
                    className={'support-order_recaptcha'}
                    onChange={handleRecaptcha}
                    sitekey="6LcEdbklAAAAAPiKpNu1D2nUrUQhgz4KLntNWu4i"
                />
                <Button disabled={buttonDisabled} className={'support-order_button'} onClick={handleCreateOrder}>Оформить</Button>
            </div>
        </div>
    )
}
