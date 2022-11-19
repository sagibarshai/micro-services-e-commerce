import { DatabaseError } from "@planty-errors-handler/common";
import { Request, NextFunction } from "express";
import { Favorites } from "../modules/favorites";
import { FavoritesResponse } from "../routes/types/types";
export const makefavoritesDocument = async (
     req: Request,
     res: FavoritesResponse,
     next: NextFunction
) => {
     const userId = res.locals.userPayload.id;
     let favorites;
     try {
          favorites = await Favorites.findOne({ userId: userId });
          if (!favorites) {
               favorites = new Favorites({ userId, favoritesItems: [] });
               await favorites.save();
          }
     } catch (err) {
          console.log(err);
          throw new DatabaseError("Database error");
     }
     console.log("fav!! ", favorites);
     res.locals.favorites = favorites;
     next();
};
