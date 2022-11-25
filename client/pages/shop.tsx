import {
     StyledPageContainer,
     StyledCategoryTitle,
     StyledDivColumn,
     StyledDivRow,
     StyledImg,
     StyledText,
     StyledIconButton,
} from "../styles/shop/StyledShop";

import IconCircleCart from "../shared/svg/circle-cart.svg";
import IconFavorites from "../shared/svg/favorites.svg";
import { ProductDetials, products } from "../shared/products/products";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StoreState } from "../redux/store";
import { updateCart } from "../redux/cartSlice";
import Notification from "../shared/notification/Notification";
import axios from "axios";
import { colors } from "../shared/colors/colors";
export default () => {
     const dispatch = useDispatch();
     const cartState = useSelector(
          (state: StoreState) => state.cartSlice.cartItems
     );
     const [serverError, setServerError] = useState<null | string>(null);
     const [buttonClicked, setButtonClicked] = useState<boolean>(false);
     const buttonAnimation = () => {
          setButtonClicked(true);
          setTimeout(() => setButtonClicked(false), 500);
     };

     const addToCartHandler = async (prod: ProductDetials) => {
          try {
               const { data } = await axios.post("/api/cart/add", {
                    itemUpdated: { ...prod },
               });
               dispatch(updateCart(data));
          } catch (err: any) {
               console.log(err);
               let returendErr = "";
               if (Array.isArray(err?.response?.data?.errors)) {
                    console.log(err.response.data.errors!);
                    for (let error of err.response.data.errors!) {
                         console.log(error);
                         returendErr += error.message;
                    }
               } else setServerError(`Server error ${err.code}`);
               setServerError(returendErr);
               setTimeout(() => setServerError(null), 5000);
          }
     };
     const addToFavoritesHandler = async (prod: ProductDetials) => {
          try {
               const { data } = await axios.post(
                    "/api/favorites/manage-favorites",
                    prod
               );
          } catch (err: any) {
               console.log(err);
               let returendErr = "";
               if (Array.isArray(err?.response?.data?.errors)) {
                    console.log(err.response.data.errors!);
                    for (let error of err.response.data.errors!) {
                         console.log(error);
                         returendErr += error.message;
                    }
               } else setServerError(`Server error ${err.code}`);
               setServerError(returendErr);
               setTimeout(() => setServerError(null), 5000);
          }
     };
     return (
          <StyledPageContainer>
               {serverError && (
                    <Notification
                         backgroundColor={colors.errorRed}
                         position="fixed"
                         variant="error"
                         animation={true}
                         message={serverError}
                         bottom="60%"
                         left="50%"
                         transform="translate(-50% , -50%)"
                    />
               )}
               {products.map((product) => {
                    return (
                         <StyledDivColumn gap="27px">
                              <StyledCategoryTitle>
                                   {product.productType}
                              </StyledCategoryTitle>
                              <StyledDivRow gap="42px" id={product.id}>
                                   {product.products.map((prod) => {
                                        return (
                                             <StyledDivColumn gap="27px">
                                                  <StyledImg
                                                       maxWidth="528px"
                                                       maxHeight="360px"
                                                       src={prod.imgSrc}
                                                  />
                                                  <StyledDivRow
                                                       justifyContent="space-between"
                                                       alignItems="center"
                                                  >
                                                       <StyledDivRow
                                                            gap="20px"
                                                            alignItems="center"
                                                       >
                                                            <StyledIconButton
                                                                 onClick={() => {
                                                                      buttonAnimation();
                                                                      addToFavoritesHandler(
                                                                           prod
                                                                      );
                                                                 }}
                                                                 buttonClicked={
                                                                      buttonClicked
                                                                 }
                                                            >
                                                                 <IconFavorites
                                                                      width="48px"
                                                                      height="48px"
                                                                 />
                                                            </StyledIconButton>
                                                            <StyledIconButton
                                                                 buttonClicked={
                                                                      buttonClicked
                                                                 }
                                                                 onClick={() => {
                                                                      buttonAnimation();
                                                                      addToCartHandler(
                                                                           prod
                                                                      );
                                                                 }}
                                                            >
                                                                 <IconCircleCart
                                                                      width="48px"
                                                                      height="48px"
                                                                 />
                                                            </StyledIconButton>
                                                            <StyledText>
                                                                 {prod.text}
                                                            </StyledText>
                                                       </StyledDivRow>
                                                       <StyledText>
                                                            {prod.price}$
                                                       </StyledText>
                                                  </StyledDivRow>
                                             </StyledDivColumn>
                                        );
                                   })}
                              </StyledDivRow>
                         </StyledDivColumn>
                    );
               })}
          </StyledPageContainer>
     );
};
