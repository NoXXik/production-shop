import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ICategory, IFilter} from "../types/productTypes";
import {AdminData, AuthResponse} from "../types/utilTypes";


export interface AuthStateSchema {
  data: AdminData | null;
  token: string | null;
}

const initialState: AuthStateSchema = {
    data: null,
    token: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<AuthResponse>) => {
            state.data = action.payload.data
            state.token = action.payload.token

            localStorage.setItem('access_token', action.payload.token)
            localStorage.setItem('auth_data', JSON.stringify(action.payload.data))
        },
        logout: (state) => {
            state.data = null
            state.token = null
            localStorage.setItem('access_token', '')
            localStorage.setItem('auth_data', '')
        }
    }
})

export const {setAuth, logout} = authSlice.actions
export default authSlice.reducer
