import {NextPageContext} from "next/types";
import {DeepPartial} from "redux";
import {AxiosRequestConfig} from "axios";
import {parse} from "cookie";

const authReqHeader = (ctx: NextPageContext): DeepPartial<AxiosRequestConfig<any> | undefined> => {
    if(!ctx || !ctx.req?.headers.cookie) {
        return undefined
    }
    const cookie = ctx.req.headers?.cookie || ''
    const token = parse(cookie)?.auth
    return {
        headers:
            { authorization: 'Bearer ' + token}
    };
}

export default authReqHeader;
