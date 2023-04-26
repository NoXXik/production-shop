import { configureStore } from "@reduxjs/toolkit"
import { productAPI } from "./api/productAPI"
import productSlice from "./productSlice"
import authSlice from "./authSlice";

export const store = configureStore({
    reducer: {
        product: productSlice,
        auth: authSlice,
        [productAPI.reducerPath]: productAPI.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(productAPI.middleware)
}
)

  // Infer the `RootState` and `AppDispatch` types from the store itself
  export type RootState = ReturnType<typeof store.getState>
  // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
  export type AppDispatch = typeof store.dispatch
