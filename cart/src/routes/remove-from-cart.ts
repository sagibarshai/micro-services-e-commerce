import express, { Request } from "express";
import { unauthorized } from "@planty-errors-handler/common";
import { currentuser } from "@planty-errors-handler/common";
import { makeCartDocument } from "../middlewears/make-cart-document";
import { AddToCartResponse } from "./add-to-cart";
const router = express.Router();
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
     "/api/cart/remove",
     unauthorized,
     currentuser,
     makeCartDocument,
     async (req: AddToCartRequest, res: AddToCartResponse) => {
          const { itemUpdated } = req.body;
          const cart = res.locals.cart;
          const existingItem: ItemUpdated | undefined = cart.cartItems.find(
               (item) => item.text === itemUpdated.text
          );
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
          }
          res.send("something went worng");
     }
);

export { router as removeFromCartRoute };
