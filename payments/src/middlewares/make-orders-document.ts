import { DatabaseError } from "@planty-errors-handler/common";
import { Request, NextFunction } from "express";
import { OrdersDoc, Orders } from "../moduls/order";
import { PaymentsResponse } from "../routes/types/types";

export const makeOrdersDocument = async (
     req: Request,
     res: PaymentsResponse,
     next: NextFunction
) => {
     const userId = res.locals.userPayload.id;
     const email = res.locals.userPayload.email;
     let orders;
     try {
          orders = await Orders.findOne({ userId: userId });
          if (!orders) {
               orders = new Orders({
                    userId,
                    email,
                    transactions: [],
               });
               await orders.save();
          }
     } catch (err) {
          console.log(err);
          throw new DatabaseError("Database error");
     }
     res.locals.orders = orders;

     next();
};
