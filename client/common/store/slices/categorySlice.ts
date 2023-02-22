import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { INavbarCategory } from "../../types/categoryTypes";


const categoryInitialState: {categories: INavbarCategory[]|null} = {
    categories: []
}

const categorySlice = createSlice({
    name: 'category',
    initialState: categoryInitialState,
    reducers: {
        setCategory: (state, action: PayloadAction<INavbarCategory[]>) => {
            state.categories = action.payload
        }
    }
})

export const {setCategory} = categorySlice.actions
export default categorySlice.reducer

// PayloadAction<INavbarCategory[]>