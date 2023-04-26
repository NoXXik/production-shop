import {Html, Head, Main, NextScript} from 'next/document'
import Script from "next/script";
import YandexMetrika from "../common/utils/yandex.metrica";
import React from "react";

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <link rel="icon" href="/shop-logo.png"/>
            </Head>
            <body>
            <Main/>
            <NextScript>

            </NextScript>
            <script
                dangerouslySetInnerHTML={{
                    __html: `
                (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
                (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
      
                ym(92227037, "init", {
                      clickmap:true,
                      trackLinks:true,
                      accurateTrackBounce:true
                });
              `,
                }}
            />
            <noscript>
                <div>
                    <img src="https://mc.yandex.ru/watch/92227037" style={{position: 'absolute', left: '-9999px'}}
                         alt=""/>
                </div>
            </noscript>
            </body>
        </Html>
    )
}
