import mongoose from "mongoose";

export interface FavoritesItems {
     price: number;
     text: string;
     imgSrc: string;
}
[];

export interface FavoritestAtters {
     userId: string;
     favoritesItems: FavoritesItems;
}
export interface FavoritesDoc extends mongoose.Document {
     userId: string;
     favoritesItems: FavoritesItems[];
}

const favorites = new mongoose.Schema({
     userId: {
          required: true,
          type: String,
     },
     favoritesItem: {
          required: true,
          type: [
               {
                    price: Number,
                    text: String,
                    imgSrc: String,
               },
          ],
     },
});
export const Favorites = mongoose.model<FavoritesDoc>("favorites", favorites);
