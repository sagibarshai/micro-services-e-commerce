import mongoose from "mongoose";

export interface CartAtters {
     userId: string;
     cartItems: {
          price: number;
          text: string;
          qty: number;
     };
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
export const Cart = mongoose.model("Carts", CartScahma);
