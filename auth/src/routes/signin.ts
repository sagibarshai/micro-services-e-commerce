import express, { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { BadRequestError } from "../errors/bad-request-error";
import { DatabaseError } from "../errors/database-error";
import { RequestValidatorError } from "../errors/validation-request-error";
import { validateRequest } from "../middlewears/validate-request";
import User from "../moduls/user";
import { CookieHandler } from "../utils/cookie";
import { Password } from "../utils/password";
const signinRouter = express.Router();

signinRouter.post(
     "/api/users/signin",
     [
          body("email").not().isEmpty().withMessage("email must be valid"),
          body("password")
               .isLength({ min: 5, max: 10 })
               .withMessage("password must be between 4 and 20 characters"),
     ],
     validateRequest,
     async (req: Request, res: Response, next: NextFunction) => {
          const { email, password } = req.body;
          let existingUser;
          try {
               existingUser = await User.findOne({ email });
          } catch (err) {
               return next(new DatabaseError("Database error"));
          }
          if (!existingUser) {
               return next(
                    new BadRequestError("Cannot login with this credentials")
               );
          }
          const storedPassword = existingUser.password;
          const passwordIsValid = await Password.compare(
               storedPassword,
               password
          );
          if (!passwordIsValid) {
               return next(
                    new BadRequestError("Cannot login with this credentials")
               );
          }
          CookieHandler.setCookie(
               {
                    email: existingUser.email,
                    id: existingUser.id,
                    firstName: existingUser.firstName,
                    lastName: existingUser.lastName,
               },
               res
          );
          return res.send(existingUser).status(200);
     }
);

export default signinRouter;
