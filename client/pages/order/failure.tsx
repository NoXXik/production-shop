import {Button} from "../../common/shared/ui/Button/Button";
import {Result} from "antd";
import {useRouter} from "next/router";

export default function Failure() {
    const router = useRouter()

    return (
        <>
            <Result
                style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}
                status="error"
                title="Отмена покупки"
                subTitle="Ваш заказ был успешно отменен!"
                extra={[<Button onClick={() => router.push('/')} key="main">На главную</Button>,
                    <Button onClick={() => router.push('/catalog')} key="catalog">Каталог</Button>]}
            />
        </>
    )
}
