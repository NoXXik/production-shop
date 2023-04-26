import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import categorySlice from "./slices/categorySlice";
import filterSlice from "./slices/filterSlice";
import { categoryAPI } from "./api/categoryAPI";
import { getMiddlewareRouteMatcher } from "next/dist/shared/lib/router/utils/middleware-route-matcher";
import productSlice from "./slices/productSlice";
import categoryPanelSlice from "./slices/categoryPanelSlice";
import utilSlice from "./slices/utilSlice";
import userSlicer from "./slices/userSlicer";
import cartSlice from "./slices/cartSlice";


export const store = configureStore({
    reducer: {
        categories: categorySlice,
        filter: filterSlice,
        products: productSlice,
        settings: categoryPanelSlice,
        utils: utilSlice,
        user: userSlicer,
        cart: cartSlice,
        [categoryAPI.reducerPath]: categoryAPI.reducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(categoryAPI.middleware)
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
