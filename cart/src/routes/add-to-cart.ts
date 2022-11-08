import express, { Request, Response } from "express";
import { unauthorized } from "@planty-errors-handler/common";
import { Cart } from "../moduls/cart";
import jwt from "jsonwebtoken";
import { currentuser } from "@planty-errors-handler/common";
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
interface AddToCartResponse extends Response {
     locals: {
          userPayload: JwtUserPaylod;
     };
}

interface AddToCartRequest extends Request {
     body: {
          itemUpdated: {
               text: string;
               price: number;
               qty: number;
          };
     };
}

router.post(
     "/api/cart/add",
     unauthorized,
     currentuser,
     async (req: AddToCartRequest, res: Response) => {
          const itemUpdated = req.body.itemUpdated;
          let userPayload: JwtUserPaylod = res.locals.userPayload;
          const userId = userPayload.id;
          let userCart;
          try {
               userCart = await Cart.findOne({ userId: userId });
               if (!userCart) {
                    console.log("only first time");
                    const newCartDocument = new Cart({
                         userId: userId,
                         cartItems: {
                              ...itemUpdated,
                         },
                    });
                    await newCartDocument.save();
               }
          } catch (err) {
               console.log(err);
          }
          console.log("only first time and second time");
          // there is user cart, i just need to upated the item
          const itemId = itemUpdated.text;

          userCart?.cartItems.find((item) => item.text === itemId);
          res.status(200).send("working");
     }
);

export { router as addToCartRoute };
