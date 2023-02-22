import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IFilter, IReadyFilter, IFilterInitialState, ISelectedFilter } from "../../types/filterTypes";



const filterInitialState: IFilterInitialState = {
    filters: null,
    readyFilter: null,
    selectedFilters: []
}

const filterSlice = createSlice({
    name: 'filter',
    initialState: filterInitialState,
    reducers: {
        setFilter: (state, action: PayloadAction<IFilter[]>) => {
            state.filters = action.payload
        },
        setReadyFilter: (state, action: PayloadAction<IReadyFilter[] | null>) => {
            
            state.readyFilter = action.payload
        },
        changeReadyFilter: (state, action: PayloadAction<{title: string, filter: string}>) => {
            if(state.readyFilter) {
                state.readyFilter = state.readyFilter.map(filtr => {
                    if(filtr.translit !== action.payload.title) {
                        return filtr
                    }
                    return {...filtr, filters: filtr.filters.map(filtr_ => {
                        if(filtr_.translit !== action.payload.filter) {
                            return filtr_
                        }
                        return {...filtr_, checked: !filtr_.checked}
                    })}
                })
            }
        },
        addSelectedFilter: (state, action: PayloadAction<ISelectedFilter>) => {
            state.selectedFilters = [...state.selectedFilters, action.payload]
        },
        deleteSelectedFilter: (state, action: PayloadAction<ISelectedFilter>) => {
            state.selectedFilters = state.selectedFilters.filter(filter => ((filter.filter !== action.payload.filter) && (filter.title !== action.payload.title)))
        },
        resetSelectedFilter: (state) => {
            state.selectedFilters = []
        }
    }
})

export const {setFilter, setReadyFilter, changeReadyFilter, addSelectedFilter, deleteSelectedFilter, resetSelectedFilter} = filterSlice.actions
export default filterSlice.reducer