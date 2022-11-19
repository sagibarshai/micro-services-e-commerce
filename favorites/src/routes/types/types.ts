import jwt from "jsonwebtoken";
import { FavoritesDoc } from "../../modules/favorites";
import { Request, Response } from "express";

export interface JwtUserPaylod extends jwt.JwtPayload {
     email: string;
     id: string;
     firstName: string;
     lastName: string;
}

export interface FavoritesResponse extends Response {
     locals: {
          userPayload: JwtUserPaylod;
          favorites: FavoritesDoc;
     };
}

export interface FavoritesUpdated {
     text: string;
     price: number;
     imgSrc: string;
}
export interface FavoritesRequest extends Request {
     body: {
          favoritesUpdated: FavoritesUpdated;
     };
}
