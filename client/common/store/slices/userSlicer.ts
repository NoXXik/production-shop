import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import {UserData, UserSchema} from "../../types/userTypes";


const userInitialState: UserSchema = {
    isAuth: false,
    token: null,
    user: null
}

const userSlice = createSlice({
    name: 'user',
    initialState: userInitialState,
    reducers: {
        login: (state, action: PayloadAction<UserSchema>) => {
            state.isAuth = action.payload.isAuth
            state.user = action.payload.user
            state.token = action.payload.token
        },
        logout: (state, action: PayloadAction<UserSchema>) => {
            state = userInitialState
        },
    }
})

export const {logout, login} = userSlice.actions
export default userSlice.reducer
