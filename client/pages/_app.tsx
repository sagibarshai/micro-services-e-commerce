import "../styles/globals.css";
import type { AppContext, AppProps } from "next/app";
import Header from "../components/layouts/Header";
import { useRouter } from "next/router";
import StyledFooter from "../components/layouts/Footer";
// import useMenageLinks from "../shared/hooks/useMenageLinks";
// const [links, activePath] = useMenageLinks();

const AppComponent = ({ Component, pageProps }: AppProps) => {
     const router = useRouter();
     return (
          <>
               {!router.pathname.startsWith("/auth") && <Header />}
               <Component {...pageProps} />
               {!router.pathname.startsWith("/auth") && <StyledFooter />}
          </>
     );
};

export default AppComponent;
