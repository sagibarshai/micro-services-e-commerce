import { Router } from "express";
import {
     unauthorized,
     currentuser,
     validateRequest,
     DatabaseError,
} from "@planty-errors-handler/common";
import { body } from "express-validator";
import { makeOrdersDocument } from "../middlewares/make-orders-document";
import { PaymentsRequest, PaymentsResponse } from "./types/types";
import { stripe } from "../stripe/stripe";
const router = Router();
router.post(
     "/api/payments/charge",
     unauthorized,
     currentuser,
     [
          body("cardNumber")
               .isLength({ min: 8, max: 8 })
               .withMessage("Card number must be 8 characters"),
          body("cardCvv")
               .isLength({ min: 3, max: 3 })
               .withMessage("Card CVV must be 3 characters"),
          body("cardExprationDate")
               .not()
               .isEmpty()
               .withMessage("Card Expretion Date must be valid"),
          body("cardExprationDate")
               .not()
               .isEmpty()
               .withMessage("Card Expretion Date must be valid"),
          body("sum")
               .not()
               .isEmpty()
               .isInt({ gt: 0 })
               .withMessage("Sum must be valid"),
     ],
     validateRequest,
     makeOrdersDocument,
     async (req: PaymentsRequest, res: PaymentsResponse) => {
          const userOrdersDocument = res.locals.orders;
          const bodyData = req.body;
          const cardData = {};
          try {
               //     const token = stripe.tokens.create({

               //      })
               const token = "";
               await stripe.charges.create({
                    amount: bodyData.sum * 100,
                    currency: "usd",
                    source: token,
                    receipt_email: "sagibarshai1@gmail.com",
               });
          } catch (err) {
               console.log(err);
               throw new Error("Payment error! " + err);
          }

          try {
               const currentDate = new Date().toString();
               const userOrdersTransactions = userOrdersDocument.transactions;
               userOrdersTransactions.push({
                    date: currentDate,
                    sum: bodyData.sum,
               });
               userOrdersDocument.save();
               res.status(200).send({ userOrdersDocument });
          } catch (err) {
               console.log(err);
               throw new DatabaseError("Database error");
          }
     }
);
export { router as ChargeRoute };
