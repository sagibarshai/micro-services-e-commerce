import { DatabaseError } from "@planty-errors-handler/common";
import { Request, NextFunction } from "express";
import { Cart, CartDoc } from "../moduls/cart";
import { AddToCartResponse } from "../routes/add-to-cart";

export const makeCartDocument = async (
     req: Request,
     res: AddToCartResponse,
     next: NextFunction
) => {
     const userId = res.locals.userPayload.id;
     let cart;
     try {
          cart = await Cart.findOne({ userId: userId });
          if (!cart) {
               cart = new Cart({ userId, cartItems: [] });
               await cart.save();
          }
     } catch (err) {
          console.log(err);
          throw new DatabaseError("Database error");
     }
     res.locals.cart = cart;
     next();
};
