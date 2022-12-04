import "../styles/globals.css";
import type { AppContext } from "next/app";
import Header from "../components/layouts/Header";
import { useRouter } from "next/router";
import StyledFooter from "../components/layouts/Footer";
import { Provider } from "react-redux";
import store from "../redux/store";
import Cart from "../components/layouts/cart/Cart";
import buildClient from "../api/build-client";
import SharedContnet from "../shared/shared-content/SharedContnet";
const AppComponent = ({ Component, pageProps, currentuser }: any) => {
     const router = useRouter();
     return (
          <Provider store={store}>
               {!(
                    router.pathname.includes("/auth") ||
                    router.pathname.includes("/payment")
               ) && <Header currentuser={currentuser} />}
               {!(
                    router.pathname.includes("/auth") ||
                    router.pathname.includes("/payment")
               ) && <Cart currentuser={currentuser} />}
               <Component {...pageProps} />
               {!(
                    router.pathname.includes("/auth") ||
                    router.pathname.includes("/payment")
               ) && <StyledFooter />}
               <SharedContnet />
          </Provider>
     );
};
AppComponent.getInitialProps = async (appContext: AppContext) => {
     const client = buildClient(appContext);

     try {
          const { data } = await client.get("/api/users/currentuser");
          return { currentuser: data.user };
     } catch (err: any) {
          const errors = err?.response?.data?.errors;
          return { currentuser: null };
     }
};
export default AppComponent;
