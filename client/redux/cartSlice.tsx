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
          // addItemToCart: (state, payload: { payload: ProductDetials }) => {
          //      const itemIsInCart = state.cartItems.find(
          //           (item) => item.text === payload.payload.text
          //      );
          //      if (itemIsInCart) {
          //           const newQty = itemIsInCart.qty + 1;
          //           itemIsInCart.qty = newQty;
          //      } else {
          //           const newQty = 1;
          //           state.cartItems.push({ ...payload.payload, qty: newQty });
          //      }
          //      state.cartSum += payload.payload.price;
          // },
          // decreseCartItemQty: (state, payload: { payload: ProductDetials }) => {
          //      const exisitingItemIndex = state.cartItems.findIndex(
          //           (item) => item.text === payload.payload.text
          //      );
          //      state.cartSum -= payload.payload.price;
          //      if (state.cartItems[exisitingItemIndex].qty === 1) {
          //           state.cartItems.splice(exisitingItemIndex, 1);
          //           return;
          //      }
          //      state.cartItems[exisitingItemIndex].qty--;
          // },
          // removeItemFromCart: (state, payload: { payload: ProductDetials }) => {
          //      const exisitingItemIndex = state.cartItems.findIndex(
          //           (item) => item.text === payload.payload.text
          //      );
          //      let sumToDecrese =
          //           state.cartItems[exisitingItemIndex].qty *
          //           state.cartItems[exisitingItemIndex].price;
          //      state.cartSum -= sumToDecrese;

          //      state.cartItems.splice(exisitingItemIndex, 1);
          // },
          updateCart: (state, payload: { payload: any }) => {
               console.log(payload);
               state.cartItems = payload.payload.cartItems;
          },
          toggleCartPopup: (state) => {
               state.openCartPopup = !state.openCartPopup;
          },
     },
});
export default cartSlice.reducer;
export const {
     // addItemToCart,
     toggleCartPopup,
     // decreseCartItemQty,
     // removeItemFromCart,
     updateCart,
} = cartSlice.actions;
