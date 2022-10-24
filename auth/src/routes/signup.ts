import express, { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import { BadRequestError } from "../errors/bad-request-error";
import { RequestValidatorError } from "../errors/validation-request-error";
import { validateRequest } from "../middlewears/validate-request";
import { DatabaseError } from "../errors/database-error";
import User from "../moduls/user";
import { CookieHandler } from "../utils/cookie";

interface SignupRequest extends Request {
     body: {
          email: string;
          password: string;
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
     // validateRequest,
     async (req: SignupRequest, res: Response, next: NextFunction) => {
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
               return res.status(400).send(errors.array());
          }
          const { email, password } = req.body;
          try {
               const existingUser = await User.findOne({ email });
               if (existingUser) {
                    return next(new BadRequestError("Email alredy exist"));
               }
               const newUser = User.build({ email, password });
               const user = await newUser.save();
               CookieHandler.setCookie({ email: user.email, id: user.id }, res);
               return res.status(201).send(user);
          } catch (err) {
               return next(new DatabaseError("Database error"));
          }
     }
);

export default signupRouter;
