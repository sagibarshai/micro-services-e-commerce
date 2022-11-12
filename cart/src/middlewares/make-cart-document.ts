import { DatabaseError } from "@planty-errors-handler/common";
import { Request, NextFunction } from "express";
import { Cart } from "../moduls/cart";
import { CartResponse } from "../routes/types/types";
export const makeCartDocument = async (
     req: Request,
     res: CartResponse,
     next: NextFunction
) => {
     const userId = res.locals.userPayload.id;
     let cart;
     try {
          cart = await Cart.findOne({ userId: userId });
          if (!cart) {
               cart = new Cart({ userId, cartItems: [], sum: 0 });
               await cart.save();
          }
     } catch (err) {
          console.log(err);
          throw new DatabaseError("Database error");
     }
     res.locals.cart = cart;
     next();
};
