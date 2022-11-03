import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
const store = configureStore({
     reducer: { cartSlice },
});
export type StoreState = ReturnType<typeof store.getState>;
export default store;
