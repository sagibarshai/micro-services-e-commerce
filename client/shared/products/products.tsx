export interface ProductDetials {
     imgSrc: string;
     text: string;
     price: number;
     id: string;
}

type ProductsType = "Chairs" | "Outdoor plants" | "Indoor plants" | "Pictures";

type Products = {
     productType: ProductsType;
     id: ProductsType;
     products: ProductDetials[];
}[];

export const products: Products = [
     {
          productType: "Chairs",
          id: "Chairs",
          products: [
               {
                    imgSrc: "/images/chair.png",
                    price: 199,
                    text: "Lola chair",
                    id: "ab",
               },
               {
                    imgSrc: "/images/wood-chair.png",
                    price: 199,
                    text: "Wood chair",
                    id: "bc",
               },
          ],
     },
     {
          productType: "Outdoor plants",
          id: "Outdoor plants",
          products: [
               {
                    imgSrc: "images/orchid.png",
                    price: 89,
                    text: "Orchid",
                    id: "cd",
               },
               {
                    imgSrc: "/images/mini-palm-tree.png",
                    price: 45,
                    text: "Mini palm tree",
                    id: "de",
               },
          ],
     },
     {
          productType: "Indoor plants",
          id: "Indoor plants",
          products: [
               {
                    imgSrc: "images/pink-flower-cactus.png",
                    price: 50,
                    text: "Pink flowe cactus",
                    id: "ef",
               },
               {
                    imgSrc: "/images/african-cactus.png",
                    price: 50,
                    text: "African cactus",
                    id: "fg",
               },
          ],
     },
     {
          productType: "Pictures",
          id: "Pictures",
          products: [
               {
                    imgSrc: "images/motivation-picture.png",
                    price: 35,
                    text: "Motivation picture",
                    id: "gj",
               },
               {
                    imgSrc: "/images/minimalistic-picture.png",
                    price: 29,
                    text: "Minimalistic picture",
                    id: "kj",
               },
          ],
     },
];
