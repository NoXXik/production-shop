import {Button} from "../../common/shared/ui/Button/Button";
import {Result} from "antd";
import {useRouter} from "next/router";
import {useOrderFailMutation} from "../../common/store/api/categoryAPI";
import {useEffect} from "react";

export default function Failure() {
    const router = useRouter()
    const [failOrder, {data, isSuccess, isError}] = useOrderFailMutation()

    useEffect(() => {
        const OutSum = router.query.OutSum
        const InvId = router.query.InvId
        if(OutSum && typeof OutSum === 'string' && InvId && typeof InvId === 'string') {
            failOrder({OutSum, InvId})
        }
    }, [])
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
