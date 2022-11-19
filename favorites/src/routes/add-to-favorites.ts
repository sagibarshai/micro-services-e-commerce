import express, { Router } from "express";
import {
     unauthorized,
     currentuser,
     validateRequest,
} from "@planty-errors-handler/common";
import { body } from "express-validator";
import { FavoritesRequest, FavoritesResponse } from "./types/types";
import { makefavoritesDocument } from "../middlewares/make-favorites-document";

const router = Router();

router.post(
     "/api/favorites/add",
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
          const favorites = res.locals.favorites;
          const existingItem = favorites.favoritesItems.find(
               (item) => item.text === req.body.favoritesUpdated.text
          );
          if (!existingItem) {
               favorites.favoritesItems.push(req.body.favoritesUpdated);
          } else {
               const existingItemIndex = favorites.favoritesItems.findIndex(
                    (item) => item.text === req.body.favoritesUpdated.text
               );
               favorites.favoritesItems.splice(existingItemIndex, 1);
          }
          await favorites.save();
          res.status(200).send({ favorites });
     }
);
export { router as addToFavoritesRoute };
