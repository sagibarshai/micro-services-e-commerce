import "../styles/globals.css";
import type { AppContext, AppProps } from "next/app";
import Header from "../components/layouts/Header";
import { useRouter } from "next/router";
import StyledFooter from "../components/layouts/Footer";
import { Provider, useSelector } from "react-redux";
import store, { StoreState } from "../redux/store";
import { createPortal } from "react-dom";

const AppComponent = ({ Component, pageProps }: AppProps) => {
     const router = useRouter();
     return (
          <Provider store={store}>
               {/* {createPortal(
                    <h1>cart</h1>,
                    document.getElementById("cart-portal")!
               )} */}
               {!router.pathname.startsWith("/auth") && <Header />}
               <Component {...pageProps} />
               {!router.pathname.startsWith("/auth") && <StyledFooter />}
          </Provider>
     );
};

export default AppComponent;
