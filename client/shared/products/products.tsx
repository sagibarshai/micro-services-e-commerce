export interface ProductDetials {
     imgSrc: string;
     text: string;
     price: number;
}

type ProductsType = "Chairs" | "Outdoor plants" | "Indoor plants" | "Pictures";

type Products = {
     productType: ProductsType;
     products: ProductDetials[];
}[];

export const products: Products = [
     {
          productType: "Chairs",
          products: [
               {
                    imgSrc: "/images/chair.png",
                    price: 199,
                    text: "Lola chair",
               },
               {
                    imgSrc: "/images/wood-chair.png",
                    price: 199,
                    text: "Wood chair",
               },
          ],
     },
     {
          productType: "Outdoor plants",
          products: [
               {
                    imgSrc: "images/orchid.png",
                    price: 89,
                    text: "Orchid",
               },
               {
                    imgSrc: "/images/mini-palm-tree.png",
                    price: 45,
                    text: "Mini palm tree",
               },
          ],
     },
     {
          productType: "Indoor plants",
          products: [
               {
                    imgSrc: "images/pink-flower-cactus.png",
                    price: 50,
                    text: "Pink flowe cactus",
               },
               {
                    imgSrc: "/images/african-cactus.png",
                    price: 50,
                    text: "African cactus",
               },
          ],
     },
     {
          productType: "Pictures",
          products: [
               {
                    imgSrc: "images/motivation-picture.png",
                    price: 35,
                    text: "Motivation picture",
               },
               {
                    imgSrc: "/images/minimalistic-picture.png",
                    price: 29,
                    text: "Minimalistic picture",
               },
          ],
     },
];
