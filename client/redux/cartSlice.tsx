import { createSlice } from "@reduxjs/toolkit";
import { ProductDetials } from "../shared/products/products";

interface CartProductDetails extends ProductDetials {
     qty: number;
}
interface Cart {
     openCartPopup: boolean;
     cartItems: CartProductDetails[];
     cartSum: number;
}
const cart: Cart = {
     cartItems: [],
     openCartPopup: false,
     cartSum: 0,
};
const cartSlice = createSlice({
     name: "cartSlice",
     initialState: cart,
     reducers: {
          updateCart: (state, payload: { payload: any }) => {
               console.log(payload);
               state.cartItems = payload.payload.cartItems;
               state.cartSum = payload.payload.sum;
          },
          toggleCartPopup: (state) => {
               state.openCartPopup = !state.openCartPopup;
          },
     },
});
export default cartSlice.reducer;
export const { toggleCartPopup, updateCart } = cartSlice.actions;
