import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {ICartProduct} from "../../shared/ui/CartProductList/CartProductList";

interface CartSchema {
    products: ICartProduct[]
}
const cartInitialState: CartSchema = {
    products: []
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: cartInitialState,
    reducers: {
        setProducts: (state, action: PayloadAction<ICartProduct[]>) => {
            state.products = action.payload
        },
    }
})

export const {setProducts} = cartSlice.actions
export default cartSlice.reducer
