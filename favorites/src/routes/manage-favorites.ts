import { Router } from "express";
import {
     unauthorized,
     currentuser,
     validateRequest,
     DatabaseError,
} from "@planty-errors-handler/common";
import { body } from "express-validator";
import { FavoritesRequest, FavoritesResponse } from "./types/types";
import { makefavoritesDocument } from "../middlewares/make-favorites-document";

const router = Router();

router.post(
     "/api/favorites/manage-favorites",
     unauthorized,
     currentuser,
     [
          body("imgSrc").notEmpty().withMessage("imgSrc must be supplied"),
          body("price")
               .notEmpty()
               .isInt({ gt: 0 })
               .withMessage("price must be greater then 0"),
          body("text").notEmpty().withMessage("text must be supplied"),
     ],
     validateRequest,
     makefavoritesDocument,
     async (req: FavoritesRequest, res: FavoritesResponse) => {
          const favorite = req.body;
          const { favorites } = res.locals;
          const { favoritesItems } = res.locals.favorites;
          const existingItem = favoritesItems.find(
               (item) => item.text === favorite.text
          );
          let status: number = 200;
          if (!existingItem) {
               favoritesItems.push(favorite);
               status = 201;
          } else {
               const existingItemIndex = favoritesItems.findIndex(
                    (item) => item.text === favorite.text
               );
               favoritesItems.splice(existingItemIndex, 1);
               status = 200;
          }
          try {
               await favorites.save();
          } catch (err) {
               console.log(err);
               throw new DatabaseError("Database Error");
          }
          res.status(status).send(favoritesItems);
     }
);
export { router as manageFavoritesRoute };
