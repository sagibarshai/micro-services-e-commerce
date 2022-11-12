import jwt from "jsonwebtoken";
import { CartDoc } from "../../moduls/cart";
import { Request, Response } from "express";

export interface JwtUserPaylod extends jwt.JwtPayload {
     email: string;
     id: string;
     firstName: string;
     lastName: string;
}

export interface CartResponse extends Response {
     locals: {
          userPayload: JwtUserPaylod;
          cart: CartDoc;
     };
}

export interface ItemUpdated {
     text: string;
     price: number;
     qty: number;
     imgSrc: string;
}
export interface CartRequest extends Request {
     body: {
          itemUpdated: ItemUpdated;
     };
}
