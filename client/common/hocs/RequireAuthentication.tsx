import React, {ClassicComponent, FC} from "react";
import {AppContext} from "next/app";
import {NextPageContext} from "next/types";
import {useRouter} from "next/router";
import Router from 'next/router'
import {parse, serialize} from 'cookie'


const jwt = require('jsonwebtoken')

const RequireAuthentication = (WrappedComponent: any) => {
    return class extends React.Component {

        static async getInitialProps(ctx: NextPageContext) {
            if (!ctx.req || !ctx.res) {
                return null
            }

            let isAuthenticated;
            // const token = ctx.req.headers.cookie.replace('auth=', '');
            const cookie = ctx.req.headers?.cookie || ''
            const token = parse(cookie)?.auth

            try {
                isAuthenticated = jwt.verify(token, 'secretkey13245');
            } catch (e) {
                console.log(e);
            }

            // Use !isAuthenticated for error cases
            if (isAuthenticated?.db_user) {
                return WrappedComponent.getInitialProps(ctx);
            } else {
                if(typeof window === 'undefined') { // @ts-ignore
                        // ctx.res.redirect('/');
                    ctx.res.writeHead(302, {location: '/login'})
                    ctx.res.end()
                    }
                else{
                    await Router.push('/login');
            }
            }
            return {}
        }

        render() {
            return <WrappedComponent {...this.props} />;
        }
    }
}


export default RequireAuthentication;
