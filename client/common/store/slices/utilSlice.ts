import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const utilInitialState = {
    spaMode: false
}

const utilSlice = createSlice({
    name: 'category',
    initialState: utilInitialState,
    reducers: {
        setSpaMode: (state, action: PayloadAction<boolean>) => {
            state.spaMode = action.payload
        }
    }
})

export const {setSpaMode} = utilSlice.actions
export default utilSlice.reducer