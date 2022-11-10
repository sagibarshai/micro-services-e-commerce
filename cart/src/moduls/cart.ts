import mongoose from "mongoose";

export interface CartItems {
     price: number;
     text: string;
     qty: number;
}
[];

export interface CartAtters {
     userId: string;
     cartItems: CartItems;
}
export interface CartDoc extends mongoose.Document {
     userId: string;
     cartItems: CartItems[];
}

const CartScahma = new mongoose.Schema({
     userId: {
          required: true,
          type: String,
     },
     cartItems: {
          type: [
               {
                    price: Number,
                    text: String,
                    qty: Number,
               },
          ],
     },
});
export const Cart = mongoose.model<CartDoc>("Carts", CartScahma);
