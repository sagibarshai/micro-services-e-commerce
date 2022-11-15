import express, { Request, Response, NextFunction } from "express";
import { body } from "express-validator";
import { BadRequestError } from "@planty-errors-handler/common";
import { validateRequest } from "@planty-errors-handler/common";
import { DatabaseError } from "@planty-errors-handler/common";
import User from "../moduls/user";
import { CookieHandler } from "../utils/cookie";

interface SignupRequest extends Request {
     body: {
          email: string;
          password: string;
          firstName: string;
          lastName: string;
     };
}

const signupRouter = express.Router();
signupRouter.post(
     "/api/users/signup",
     [
          body("email").notEmpty().isEmail().withMessage("Email must be valid"),
          body("password")
               .notEmpty()
               .isLength({ min: 5, max: 20 })
               .withMessage("password must be between 4 and 20 characters"),
     ],
     validateRequest,
     async (req: SignupRequest, res: Response, next: NextFunction) => {
          const { email, password, firstName, lastName } = req.body;
          try {
               const existingUser = await User.findOne({ email });
               if (existingUser) {
                    return next(new BadRequestError("Email alredy exist"));
               }
               const newUser = User.build({
                    email,
                    password,
                    firstName,
                    lastName,
               });
               const user = await newUser.save();
               CookieHandler.setCookie(
                    {
                         email: user.email,
                         id: user.id,
                         firstName: user.firstName,
                         lastName: user.lastName,
                    },
                    res
               );
               // dispatch event

               return res.status(201).send(user);
          } catch (err) {
               return next(new DatabaseError("Database error"));
          }
     }
);

export default signupRouter;
