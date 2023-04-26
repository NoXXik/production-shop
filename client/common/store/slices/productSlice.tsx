import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import {IProducts } from "../../types/productTypes"



const productInitialState: {products: IProducts | null} = {
    products: null
}

const productSlice = createSlice({
    name: 'product',
    initialState: productInitialState,
    reducers: {
        setProducts: (state, action: PayloadAction<IProducts>) => {
            state.products = action.payload
        },
    }
})

export const {setProducts} = productSlice.actions
export default productSlice.reducer
