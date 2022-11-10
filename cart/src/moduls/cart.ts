import mongoose from "mongoose";

export interface CartItems {
     price: number;
     text: string;
     qty: number;
     imgSrc: string;
}
[];

export interface CartAtters {
     userId: string;
     cartItems: CartItems;
}
export interface CartDoc extends mongoose.Document {
     userId: string;
     cartItems: CartItems[];
     sum: number;
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
                    imgSrc: String,
               },
          ],
     },
     sum: {
          required: true,
          type: Number,
     },
});
export const Cart = mongoose.model<CartDoc>("Carts", CartScahma);
