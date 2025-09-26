import { configureStore } from "@reduxjs/toolkit";
import bookSlice from  "./slice/BookSlice"
const store = configureStore({
    reducer:{
        books:bookSlice
    }
})
export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

