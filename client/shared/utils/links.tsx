interface Links {
     name: string;
     path: string;
     isActive: boolean;
}
export const isActiveCheck = (currentPathname: string, linkPathname: string) =>
     currentPathname === linkPathname ? true : false;

export const links: Links[] = [
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
          name: "Shop",
          path: "/shop",
          isActive: false,
     },
     {
          name: "Home",
          path: "/",
          isActive: false,
     },
];
