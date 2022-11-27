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

import { updateCart } from "../redux/cartSlice";
import { StyledParimaryButton } from "../shared/ui-elements/button/button";

import IconDelete from "../shared/svg/delete.svg";
import { apiError } from "../shared/errors/api-error";
import {
     apiErrorOccurred,
     succsessApiCall,
} from "../redux/user-notifications-slice";

export default () => {
     const dispatch = useDispatch();
     const [favoritesList, setFavoritesList] = useState<any[]>([]);
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
               const errMsg = apiError(err);
               dispatch(apiErrorOccurred(errMsg));
               setTimeout(() => dispatch(apiErrorOccurred(false)), 5000);
          }
     };

     const getFromFavoritesHandler = async () => {
          try {
               const { data } = await axios.get("/api/favorites/get-favorites");
               console.log(data);
               setFavoritesList(data);
          } catch (err: any) {
               const errMsg = apiError(err);
               dispatch(apiErrorOccurred(errMsg));
               setTimeout(() => dispatch(apiErrorOccurred(false)), 5000);
          }
     };
     const favoritesHandler = async (favorite: any) => {
          try {
               const { data } = await axios.post(
                    "/api/favorites/manage-favorites",
                    favorite
               );
               setFavoritesList(data);

               dispatch(
                    succsessApiCall(
                         `${favorite.text} has been remove from favorites list`
                    )
               );
               setTimeout(() => dispatch(succsessApiCall(false)), 5000);
          } catch (err) {
               const errMsg = apiError(err);
               dispatch(apiErrorOccurred(errMsg));
               setTimeout(() => dispatch(apiErrorOccurred(false)), 5000);
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
               <StyledDivRow
                    width="85vw"
                    gap="42px"
                    flexWrap="wrap"
                    justifyContent="center"
               >
                    {favoritesList.map((favorite) => {
                         return (
                              <StyledDivColumn
                                   gap="27px"
                                   position="relative"
                                   key={favorite.imgSrc}
                              >
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
