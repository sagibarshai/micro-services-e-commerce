import express from "express";
import { DatabaseError, unauthorized } from "@planty-errors-handler/common";
import { currentuser } from "@planty-errors-handler/common";
import { makeCartDocument } from "../middlewares/make-cart-document";
import { CartRequest, CartResponse, ItemUpdated } from "./types/types";

const router = express.Router();

router.post(
     "/api/cart/decrese",
     unauthorized,
     currentuser,
     makeCartDocument,
     async (req: CartRequest, res: CartResponse) => {
          const { itemUpdated } = req.body;
          const cart = res.locals.cart;
          const existingItem: ItemUpdated | undefined = cart.cartItems.find(
               (item) => item.text === itemUpdated.text
          );
          const existingItemIndex: number | undefined =
               cart.cartItems.findIndex(
                    (item) => item.text === itemUpdated.text
               );
          if (!existingItem || !existingItemIndex) return;

          if (existingItem?.qty === 1) {
               cart.sum -= itemUpdated.price;
               cart.cartItems.splice(existingItemIndex, 1);
          } else {
               cart.cartItems[existingItemIndex].qty--;
               cart.sum -= itemUpdated?.price;
          }

          try {
               const updatedCart = await cart.save();
               return res.send(updatedCart);
          } catch (err) {
               console.log(err);
               throw new DatabaseError("Database error");
          }
     }
);

export { router as decreseFromCartRoute };
