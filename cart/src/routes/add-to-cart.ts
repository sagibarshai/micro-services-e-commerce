import express, { Request, Response } from "express";
import { unauthorized } from "@planty-errors-handler/common";
import { Cart, CartDoc } from "../moduls/cart";
import jwt from "jsonwebtoken";
import { currentuser } from "@planty-errors-handler/common";
import { makeCartDocument } from "../middlewears/make-cart-document";
const router = express.Router();

export interface UserPayload {
     email: string;
     id: string;
     firstName: string;
     lastName: string;
}
interface JwtUserPaylod extends jwt.JwtPayload {
     id: string;
}
export interface AddToCartResponse extends Response {
     locals: {
          userPayload: JwtUserPaylod;
          cart: CartDoc;
     };
}

interface ItemUpdated {
     text: string;
     price: number;
     qty: number;
     imgSrc: string;
}

interface AddToCartRequest extends Request {
     body: {
          itemUpdated: ItemUpdated;
     };
}

router.post(
     "/api/cart/add",
     unauthorized,
     currentuser,
     makeCartDocument,
     async (req: AddToCartRequest, res: AddToCartResponse) => {
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
          }
          res.send("something went worng");
     }
);

export { router as addToCartRoute };
