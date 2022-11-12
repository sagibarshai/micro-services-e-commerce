import { currentuser, unauthorized } from "@planty-errors-handler/common";
import express, { Request } from "express";
import { makeCartDocument } from "../middlewares/make-cart-document";
import { CartResponse } from "./types/types";
const router = express.Router();
router.get(
     "/api/cart/getCart",
     unauthorized,
     currentuser,
     makeCartDocument,
     (req: Request, res: CartResponse) => {
          const userCart = res.locals.cart;
          res.status(200).send({ cart: userCart.cartItems });
     }
);

export { router as getCartRoute };
