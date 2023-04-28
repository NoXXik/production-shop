import {fetchBaseQuery} from '@reduxjs/toolkit/query'
import type {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
} from '@reduxjs/toolkit/query'
import {logout} from "../authSlice";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../utils/hooks/reduxHooks";

const baseQuery = fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/`,
    prepareHeaders: (headers, { getState }) => {
        const token = localStorage.getItem('access_token')
        if (token) {
            headers.set('authorization', `Bearer ${token}`)
        }
        return headers
    },
})
export const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)
    if (result.error && result.error.status === 401) {
        // try to get a new token
        api.dispatch(logout())
        document.location.replace('/login')
    }
    return result
}
