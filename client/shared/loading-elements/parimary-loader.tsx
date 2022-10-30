import ReactLoading from "react-loading";

interface Props {
     loading: boolean;
}

export default (props: Props) => {
     return (
          <ReactLoading
               type="spin"
               color="white"
               height="20px"
               width="20px"
               className={
                    props.loading
                         ? "parimary-loader"
                         : "parimary-loader-disapper"
               }
          />
     );
};
