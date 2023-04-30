import React from "react";
import {NextPageContext} from "next/types";
import Head from "next/head";
import {Text, TextSize} from "../../common/shared/ui/Text/Text";
import {AppLink} from "../../common/shared/ui/Link/Link";

export default function About() {
    return (
        <>
            <Head>
                <title>Контакты</title>
            </Head>
            <h1>Контакты</h1>
            <div className={'contacts'}>
                <h2 style={{fontSize: 26}}>ИП Ногманов Артур Русланович</h2>
                <h3 style={{fontSize: 22}}>Реквизиты</h3>
                <div style={{paddingLeft: 12}}>
                    <Text size={TextSize.SIZE_L} text={'ОГРНИП: 322169000108086'}></Text>
                    <Text size={TextSize.SIZE_L} text={'ИНН: 164609859407'}></Text>
                    <Text size={TextSize.SIZE_L} text={'Адрес: Республика Татарстан, Елабужский район, город Елабуга'}></Text>
                    <div className={'contacts__links'} style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: 8, gap: 12}}>
                        <AppLink href={"tel: +79867240398"}>Тел: +7 986 724 03 98</AppLink>
                        <AppLink href={"mailto:kontrol_116@mail.ru"} >Почта: kontrol_116@mail.ru</AppLink>
                    </div>
                </div>
            </div>
        </>
    )
}

About.getInitialProps = async ({req, res, query}: NextPageContext) => {
    return {props: null}
}
