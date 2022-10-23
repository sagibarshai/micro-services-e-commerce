import express, { Request, Response, NextFunction } from "express";
import User from "../moduls/user";
import { isValidObjectId } from "mongoose";
import jwt from "jsonwebtoken";
import { BadRequestError } from "../errors/bad-request-error";
import { UnauthorizedError } from "../errors/unauthorized-error";
import { DatabaseError } from "../errors/database-error";

const correntUserRouter = express.Router();

interface CurrentUserRequest extends Request {
     body: {
          userId: string;
     };
}
interface JwtUserPaylod extends jwt.JwtPayload {
     id: string;
}

correntUserRouter.get(
     "/api/users/currentuser",
     async (req: CurrentUserRequest, res: Response, next: NextFunction) => {
          const token = req.headers.cookie?.split("=")[1] || undefined;
          if (!token) return next(new BadRequestError("Token must be suplied"));
          const userPayload = jwt.verify(
               token,
               process.env.JWT_KEY!
          ) as JwtUserPaylod;

          if (!userPayload) throw new UnauthorizedError("Token is not valid");
          const userId = userPayload.id;

          if (!isValidObjectId(userId)) {
               return next(new BadRequestError("User id is not valid"));
          }
          let existingUser;
          try {
               existingUser = await User.findById(userId).exec();
          } catch (err) {
               return next(new DatabaseError("Database error occured"));
          }
          if (!existingUser) {
               return next(new BadRequestError("User was not found"));
          }
          return res.status(200).send({
               user: existingUser,
               message: "succsesfuly logedin",
          });
     }
);

export default correntUserRouter;
