import React from "react";
import {NextPageContext} from "next/types";
import { useRouter } from "next/router";
import Head from "next/head";

export default function About() {
    return (
        <>
            <Head>
                <title>Контакты</title>
            </Head>
            About
        </>
    )
}

About.getInitialProps = async ({req, res, query}: NextPageContext) => {
    return {props: null}
}
