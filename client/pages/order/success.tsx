import {Result} from "antd";
import {Button} from "../../common/shared/ui/Button/Button";
import {useRouter} from "next/router";

export default function Success() {
    const router = useRouter()

    return (
        <>
            <Result
                style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}
                status="success"
                title="Оплачен"
                subTitle="Ваш заказ успешно оплачен, благодарим вас за совершенную покупку!"
                extra={[<Button onClick={() => router.push('/')} key="main">На главную</Button>,
                    <Button onClick={() => router.push('/catalog')} key="catalog">Каталог</Button>]}
            />
        </>
    )
}
