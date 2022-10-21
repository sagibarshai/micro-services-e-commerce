import express, { Request, Response } from "express";
import { CookieHandler } from "../utils/cookie";
const signoutRouter = express.Router();

signoutRouter.post("/api/users/signout", (req: Request, res: Response) => {
     CookieHandler.clearCookie(res);
     return res.send({ message: "signout" });
});

export default signoutRouter;
