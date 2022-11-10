import { currentuser, unauthorized } from "@planty-errors-handler/common";
import express, { Request } from "express";
import jwt from "jsonwebtoken";
import { makeCartDocument } from "../middlewears/make-cart-document";
import { AddToCartResponse } from "./add-to-cart";
const router = express.Router();
router.get(
     "/api/cart/getCart",
     unauthorized,
     currentuser,
     makeCartDocument,
     (req: Request, res: AddToCartResponse) => {
          const userCart = res.locals.cart;
          res.status(200).send({ cart: userCart.cartItems });
     }
);

export { router as getCartRoute };
