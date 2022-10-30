import { useState } from "react";
import { useRouter } from "next/router";
export interface Link {
     name: string;
     path: string;
     isActive: boolean;
}
export const isActiveCheck = (currentPathname: string, linkPathname: string) =>
     currentPathname === linkPathname ? true : false;

let links: Link[] = [
     {
          name: "Sign up",
          path: "/auth/signup",
          isActive: false,
     },
     {
          name: "Sign in",
          path: "/auth/signin",
          isActive: false,
     },
     {
          name: "Home",
          path: "/",
          isActive: false,
     },
     {
          name: "Shop",
          path: "/shop",
          isActive: false,
     },
];

export default () => {
     const router = useRouter();
     let activePath = null;
     for (let link of links) {
          let { path } = link;
          link["isActive"] = false;
          if (path === router.pathname) {
               link["isActive"] = true;
               activePath = path;
          }
     }
     return { links, activeLink: activePath };
};
