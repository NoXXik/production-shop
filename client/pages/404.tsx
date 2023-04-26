import { Result } from "antd";
import {Button} from "../common/shared/ui/Button/Button";
import {useRouter} from "next/router";
import Head from "next/head";

export default function NotFound() {
    const router = useRouter()

    return (
        <>
            <Head>
                <title>Страница не найдена</title>
            </Head>
            <Result
                style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}
                status="404"
                title="404"
                subTitle="К сожалению, запрашиваемая вами страница не найдена. "
                extra={<Button onClick={() => router.push('/')}>На главную</Button>}
            />
        </>
    )
}
