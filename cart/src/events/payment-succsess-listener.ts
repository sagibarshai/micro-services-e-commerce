import {
     DatabaseError,
     Listener,
     Subjects,
} from "@planty-errors-handler/common";
import { queueGroupName } from "./queue-group-name";
import { PaymentCreatedEvent } from "@planty-errors-handler/common";
import { Message } from "node-nats-streaming";
import { Cart } from "../moduls/cart";

export class PaymentSuccsessListenet extends Listener<PaymentCreatedEvent> {
     queueGroupName = queueGroupName;
     subject: Subjects.PaymentSuccsess = Subjects.PaymentSuccsess;
     onMessage = async (data: PaymentCreatedEvent["data"], msg: Message) => {
          msg.ack();
          const userId = data.userId;
          try {
               const exsitingCart = await Cart.findOne({ userId: userId });
               if (!exsitingCart)
                    throw new Error(
                         `No cart with the userId : ${userId} was found`
                    );
               exsitingCart.cartItems = [];
               await exsitingCart.save();
          } catch (err) {
               console.log(err);
               throw new DatabaseError("Database err");
          }
     };
}
