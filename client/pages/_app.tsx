import "../styles/globals.css";
import type { AppContext, AppProps } from "next/app";
import Header from "../components/layouts/Header";
import buildClient from "../api/build-client";

interface Props {
     user: any;
}

const AppComponent = ({ Component, pageProps, user }: AppProps & Props) => {
     console.log("app have a user ", user);
     return (
          <>
               {/* <Header /> */}
               <Component {...pageProps} />
          </>
     );
};
// AppComponent.getInitialProps = async (appContext: AppContext) => {
//      const axiosInstence = buildClient(appContext);
//      console.log(axiosInstence);
//      let user;
//      try {
//           user = await axiosInstence.get("/api/users/currentuser");
//           console.log(user, " user!");
//      } catch (err) {
//           console.log(err);
//      }
//      return {
//           ...user,
//      };
// };

export default AppComponent;
