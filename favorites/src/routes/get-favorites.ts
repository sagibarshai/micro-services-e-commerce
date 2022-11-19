import { Router, Request } from "express";
import { FavoritesResponse } from "./types/types";
import { currentuser, unauthorized } from "@planty-errors-handler/common";
import { makefavoritesDocument } from "../middlewares/make-favorites-document";
const router = Router();
router.get(
     "/api/favorites/get-favorites",
     unauthorized,
     currentuser,
     makefavoritesDocument,
     (req: Request, res: FavoritesResponse) => {
          const favoritesList = res.locals.favorites.favoritesItems;
          return res.send(favoritesList);
     }
);

export { router as getFavoritesRouter };
