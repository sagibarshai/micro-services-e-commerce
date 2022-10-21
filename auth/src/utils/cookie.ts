import jwt, { SignOptions } from "jsonwebtoken";
import { Response } from "express";
import { UserDoc } from "../moduls/user";

interface UserPayload {
     email: string;
     id: string;
}

export class CookieHandler {
     static setCookie(user: UserPayload, res: Response, config?: SignOptions) {
          const token = jwt.sign(user, process.env.JWT_KEY!, config);
          res.cookie("token", token);
     }
     static clearCookie(res: Response) {
          res.clearCookie("token");
     }
}
