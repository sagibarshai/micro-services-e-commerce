import express from "express";
import { DatabaseError, unauthorized } from "@planty-errors-handler/common";
import { currentuser } from "@planty-errors-handler/common";
import { makeCartDocument } from "../middlewares/make-cart-document";
import { CartRequest, CartResponse } from "./types/types";
const router = express.Router();

router.post(
     "/api/cart/remove",
     unauthorized,
     currentuser,
     makeCartDocument,
     async (req: CartRequest, res: CartResponse) => {
          const { itemUpdated } = req.body;
          const cart = res.locals.cart;

          const existingItemIndex: number | undefined =
               cart.cartItems.findIndex(
                    (item) => item.text === itemUpdated.text
               );
          cart.sum = cart.sum - itemUpdated.qty * itemUpdated.price;
          cart.cartItems[existingItemIndex].qty = 0;
          cart.cartItems.splice(existingItemIndex, 1);
          try {
               const updatedCart = await cart.save();
               return res.send(updatedCart);
          } catch (err) {
               console.log(err);
               throw new DatabaseError("Database error");
          }
     }
);

export { router as removeFromCartRoute };
