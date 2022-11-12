import express, { Request, Response } from "express";
import { DatabaseError, unauthorized } from "@planty-errors-handler/common";
import { Cart, CartDoc } from "../moduls/cart";
import jwt from "jsonwebtoken";
import { currentuser } from "@planty-errors-handler/common";
import { makeCartDocument } from "../middlewares/make-cart-document";
import { ItemUpdated, CartRequest, CartResponse } from "./types/types";

const router = express.Router();

router.post(
     "/api/cart/add",
     unauthorized,
     currentuser,
     makeCartDocument,
     async (req: CartRequest, res: CartResponse) => {
          const { itemUpdated } = req.body;
          const cart = res.locals.cart;
          const existingItem: ItemUpdated | undefined = cart.cartItems.find(
               (item) => item.text === itemUpdated.text
          );
          if (!existingItem) {
               cart.cartItems.push({ ...itemUpdated, qty: 1 });
               cart.sum += itemUpdated.price;
          } else {
               existingItem.qty++;
               cart.sum += itemUpdated?.price;
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

export { router as addToCartRoute };
