import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import userNotificationSlice from "./user-notifications-slice";
const store = configureStore({
     reducer: { cartSlice, userNotificationSlice },
});
export type StoreState = ReturnType<typeof store.getState>;
export default store;
