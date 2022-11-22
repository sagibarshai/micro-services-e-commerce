import mongoose from "mongoose";

export interface OrderAttrs {
     userId: string;
     email: string;
     sum: number;
}
export interface OrdersDoc extends mongoose.Document {
     transactions: { date: string; sum: number }[];
     userId: string;
     email: string;
}

const OrderSchama = new mongoose.Schema({
     userId: {
          type: String,
          required: true,
     },
     email: {
          type: String,
          required: true,
     },
     transactions: {
          required: true,
          type: [
               {
                    sum: Number,
                    date: String,
               },
          ],
     },
});
export const Orders = mongoose.model<OrdersDoc>("orders", OrderSchama);
