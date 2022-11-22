import "../styles/globals.css";
import type { AppContext, AppProps } from "next/app";
import Header from "../components/layouts/Header";
import { useRouter } from "next/router";
import StyledFooter from "../components/layouts/Footer";
import { Provider, useSelector } from "react-redux";
import store, { StoreState } from "../redux/store";
import Cart from "../components/layouts/cart/Cart";
import buildClient from "../api/build-client";
import { useCookies } from "react-cookie";

const AppComponent = ({ Component, pageProps, currentuser }: any) => {
     const router = useRouter();
     console.log(currentuser);

     return (
          <Provider store={store}>
               {!router.pathname.startsWith("/auth") && <Header />}
               {!router.pathname.startsWith("/auth") && <Cart />}
               <Component {...pageProps} />
               {!router.pathname.startsWith("/auth") && <StyledFooter />}
          </Provider>
     );
};
AppComponent.getInitialProps = async (appContext: AppContext) => {
     const client = buildClient(appContext);

     try {
          const { data } = await client.get("/api/users/currentuser");
          return { currentuser: data.user };
     } catch (err: any) {
          console.log(err.response.data.errors[0]);
          return { currentuser: null };
     }
};
export default AppComponent;
