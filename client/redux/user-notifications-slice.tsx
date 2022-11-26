import { createSlice } from "@reduxjs/toolkit";

interface UserNotificationState {
     showErrorNotification: boolean | string;
     showUserNotification: boolean | string;
}
const initialUserNotificationState: UserNotificationState = {
     showErrorNotification: false,
     showUserNotification: false,
};

const userNotificationSlice = createSlice({
     name: "errors",
     initialState: initialUserNotificationState,
     reducers: {
          apiErrorOccurred: (state, payload: any) => {
               state.showErrorNotification = payload.payload;
          },
          succsessApiCall: (state, payload: any) => {
               state.showUserNotification = payload.payload;
          },
     },
});
export default userNotificationSlice.reducer;
export const { apiErrorOccurred, succsessApiCall } =
     userNotificationSlice.actions;
