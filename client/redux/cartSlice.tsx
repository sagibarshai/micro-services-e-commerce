import { createSlice } from "@reduxjs/toolkit";
import { ProductDetials } from "../shared/products/products";

interface CartProductDetails extends ProductDetials {
     qty: number;
}
interface Cart {
     openCartPopup: boolean;
     cartItems: CartProductDetails[];
}
const cart: Cart = {
     cartItems: [],
     openCartPopup: false,
};
const cartSlice = createSlice({
     name: "cartSlice",
     initialState: cart,
     reducers: {
          addItemToCart: (state, payload: { payload: ProductDetials }) => {
               const itemIsInCart = state.cartItems.find(
                    (item) => item.text === payload.payload.text
               );
               if (itemIsInCart) {
                    const newQty = itemIsInCart.qty + 1;
                    itemIsInCart.qty = newQty;
               } else {
                    const newQty = 1;
                    state.cartItems.push({ ...payload.payload, qty: newQty });
               }
          },
          toggleCartPopup: (state) => {
               state.openCartPopup = !state.openCartPopup;
          },
     },
});
export default cartSlice.reducer;
export const { addItemToCart, toggleCartPopup } = cartSlice.actions;
