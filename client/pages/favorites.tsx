import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";

import {
     StyledPageContainer,
     StyledDivColumn,
     StyledDivRow,
     StyledImg,
     StyledText,
     StyledIconButton,
     StyledCategoryTitle,
} from "../styles/shop/StyledShop";

import Notification from "../shared/notification/Notification";
import { updateCart } from "../redux/cartSlice";
import { StyledParimaryButton } from "../shared/ui-elements/button/button";

import { products } from "../shared/products/products";
import { colors } from "../shared/colors/colors";

import IconDelete from "../shared/svg/delete.svg";
import { apiError } from "../shared/errors/api-error";

export default () => {
     const dispatch = useDispatch();
     const [serverError, setServerError] = useState<null | string>(null);
     const [favoritesList, setFavoritesList] = useState<any[]>([
          ...products[0].products,
          ...products[1].products,
     ]);
     const [buttonClicked, setButtonClicked] = useState<boolean>(false);
     const buttonAnimation = () => {
          setButtonClicked(true);
          setTimeout(() => setButtonClicked(false), 500);
     };

     const addToCartHandler = async (prod: any) => {
          try {
               const { data } = await axios.post("/api/cart/add", {
                    itemUpdated: { ...prod },
               });
               dispatch(updateCart(data));
          } catch (err: any) {
               apiError(err, setServerError);
          }
     };

     const getFromFavoritesHandler = async () => {
          try {
               const { data } = await axios.get("/api/favorites/get-favorites");
               console.log(data);
               setFavoritesList(data);
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
     const favoritesHandler = async (favorite: any) => {
          try {
               const { data } = await axios.post(
                    "/api/favorites/manage-favorites",
                    favorite
               );
               setFavoritesList(data);
          } catch (err) {
               console.log(err);
          }
     };
     useEffect(() => {
          getFromFavoritesHandler();
     }, []);
     if (!favoritesList.length)
          return (
               <StyledPageContainer
                    alignItems="center"
                    height="calc(100vh - 500px)"
               >
                    <StyledCategoryTitle>
                         favorites list is empty!
                    </StyledCategoryTitle>
               </StyledPageContainer>
          );
     return (
          <StyledPageContainer alignItems="center">
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

               <StyledDivRow
                    width="85vw"
                    gap="42px"
                    flexWrap="wrap"
                    justifyContent="center"
               >
                    {favoritesList.map((favorite) => {
                         return (
                              <StyledDivColumn gap="27px" position="relative">
                                   <StyledImg
                                        width="528px"
                                        height="360px"
                                        src={favorite.imgSrc}
                                   />
                                   <StyledIconButton
                                        onClick={() => {
                                             buttonAnimation();
                                             favoritesHandler(favorite);
                                        }}
                                        buttonClicked={buttonClicked}
                                        position="absolute"
                                        top="5px"
                                        right="5px"
                                   >
                                        <IconDelete />
                                   </StyledIconButton>
                                   <StyledDivRow gap="20px" alignItems="center">
                                        <StyledDivRow
                                             gap="20px"
                                             alignItems="center"
                                        >
                                             <StyledText>
                                                  {favorite.text}
                                             </StyledText>
                                        </StyledDivRow>
                                        <StyledText>
                                             {favorite.price}$
                                        </StyledText>
                                   </StyledDivRow>
                                   <StyledParimaryButton
                                        onClick={() =>
                                             addToCartHandler(favorite)
                                        }
                                        alignSelf="center"
                                        width="213px"
                                        height="53px"
                                   >
                                        Add To Bag
                                   </StyledParimaryButton>
                              </StyledDivColumn>
                         );
                    })}
               </StyledDivRow>
          </StyledPageContainer>
     );
};
