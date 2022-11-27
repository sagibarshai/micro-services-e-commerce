import { Request, Response } from "express";
import { OrdersDoc } from "../../moduls/order";
import jwt from "jsonwebtoken";

interface JwtUserPaylod extends jwt.JwtPayload {
     email: string;
     id: string;
     firstName: string;
     lastName: string;
}

export interface PaymentsRequest extends Request {
     body: {
          sum: number;
          email: string;
          userId: string;
          cardNumber: string;
          expMonth: string;
          expYear: string;
          cardCvv: string;
     };
}
export interface PaymentsResponse extends Response {
     locals: {
          userPayload: JwtUserPaylod;
          orders: OrdersDoc;
     };
}
