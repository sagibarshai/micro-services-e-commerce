import axios from "axios";
import { AppContext } from "next/app";

const buildClient = (appContext: AppContext) => {
     if (typeof window === "undefined") {
          // We are on the server

          return axios.create({
               //        http://ingress-nginx-controller.ingress-nginx.svc.cluster.local
               baseURL: "http://e-commerce.dev",
               headers: appContext?.ctx?.req?.headers,
          });
     } else {
          // We must be on the browser http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/auth/signup
          return axios.create({
               baseURL: "/",
          });
     }
};

export default buildClient;
