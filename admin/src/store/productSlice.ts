import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ICategory, IFilter } from "../types/productTypes";

interface ProductInitialState {
    categories: ICategory[] | null,
    filters: IFilter[] | null
}

const initialState: ProductInitialState = {
    categories: null,
    filters: null
}

const productSlice = createSlice({
    name: 'product_data',
    initialState: initialState,
    reducers: {
        setCategories: (state, action: PayloadAction<ICategory[]>) => {
            state.categories = action.payload
        },
        setFilters: (state, action: PayloadAction<IFilter[]>) => {
            state.filters = action.payload
        }
    }
})

export const {setCategories, setFilters} = productSlice.actions
export default productSlice.reducer
