import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IPanelSettingsInitialState } from "../../types/productTypes";

const panelSettingsInitialState: IPanelSettingsInitialState = {
    sort: 'title_asc',
    page: 1,
    maxPages: 1,
    limit: 21,
    view: 'plate'
}

const categoryPanelSlice = createSlice({
    name: 'categoryPanelSettings',
    initialState: panelSettingsInitialState,
    reducers: {
        setSort: (state, action: PayloadAction<'title_asc' | 'title_desc' | 'price_asc' | 'price_desc'>) => {
            state.sort = action.payload
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload
        },
        setMaxPages: (state, action: PayloadAction<number>) => {
            state.maxPages = action.payload
        },
        setLimit: (state, action: PayloadAction<21 | 42>) => {
            state.limit = action.payload
        },
        setView: (state, action: PayloadAction<'plate' | 'list'>) => {
            state.view = action.payload
        }
    }
})

export default categoryPanelSlice.reducer
export const {setLimit, setMaxPages, setPage, setSort, setView} = categoryPanelSlice.actions