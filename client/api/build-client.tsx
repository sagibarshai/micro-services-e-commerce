import axios from "axios";
import { AppContext } from "next/app";

const buildClient = (appContext: AppContext) => {
     if (typeof window === "undefined") {
          //  on server
          return axios.create({
               baseURL: "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
               headers: appContext?.ctx?.req?.headers,
          });
     } else {
          // on browser
          return axios.create({
               baseURL: "/",
          });
     }
};

export default buildClient;
