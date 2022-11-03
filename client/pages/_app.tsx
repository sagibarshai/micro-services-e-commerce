import "../styles/globals.css";
import type { AppContext, AppProps } from "next/app";
import Header from "../components/layouts/Header";
import { useRouter } from "next/router";
import StyledFooter from "../components/layouts/Footer";
import { Provider } from "react-redux";
import store, { StoreState } from "../redux/store";

const AppComponent = ({ Component, pageProps }: AppProps) => {
     const cartIsOpen = store.getState().cartSlice.openCartPopup;
     console.log(cartIsOpen);
     const router = useRouter();
     return (
          <Provider store={store}>
               {!router.pathname.startsWith("/auth") && <Header />}
               <Component {...pageProps} />
               {!router.pathname.startsWith("/auth") && <StyledFooter />}
          </Provider>
     );
};

export default AppComponent;
