import {Button} from "../common/shared/ui/Button/Button";
import {Result} from "antd";
import Head from "next/head";

export default function ServerError() {
    return (
        <>
            <Head>
                <title>Ошибка на сервере</title>
            </Head>
            <Result
                style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}
                status="500"
                title="500"
                subTitle="Произошла внутренняя ошибка на сервере, мы уже работаем над ее исправлением и приносим извинения за возможные неудобства."
            />
        </>
    )
}
