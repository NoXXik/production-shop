import {EventHandler, MouseEventHandler, useState} from "react";
import axios, {AxiosResponse} from "axios";
import {useRouter} from "next/router";
import {useAppDispatch} from "../common/hooks/redux/reduxHooks";
import {login} from "../common/store/slices/userSlicer";

interface UserLogin {
    email: string;
    password: string;
}

export interface UserCart {
  id: string;
  user_id: string;
}

export interface UserFavorite {
  id: string;
  user_id: string;
}

export interface IUserData {
  id: string;
  email: string;
  hash_password: string;
  first_name: string;
  last_name: string;
  role: string;
  discount?: any;
  banned: boolean;
  created_at: string;
  updated_at: string;
  userCart: UserCart;
  userFavorite: UserFavorite;
}
export default function Login() {
    const [loginForm, setLoginForm] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()
    const dispatch = useAppDispatch();
    const loginHandler = async (e: any) => {
        e.preventDefault()
        const {data, status, headers, request} = await axios.post<{ user: IUserData, token: string }>(`http://localhost:3000/api/user/login`, {email: loginForm, password: password})
        console.log(headers, request)

        if (status === 200) {
            dispatch(login({isAuth: true, token: data.token, user: data.user}))
            router.push('/')
        } else {
            console.log('Auth Error')
        }
    }
    return (
        <>
            Login
            <input onChange={(e) => setLoginForm(e.target.value)} value={loginForm} placeholder={'Введите логин'}/>
            <input onChange={(e) => setPassword(e.target.value)} value={password} placeholder={'Введите пороль'} />
            <button onClick={loginHandler}>Логин</button>
        </>
    )
}
