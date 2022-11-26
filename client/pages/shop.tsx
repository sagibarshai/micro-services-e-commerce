import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";

import { updateCart } from "../redux/cartSlice";
import { apiError } from "../shared/errors/api-error";
import {
     apiErrorOccurred,
     succsessApiCall,
} from "../redux/user-notifications-slice";

import { ProductDetials, products } from "../shared/products/products";

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
import { StoreState } from "../redux/store";

export default () => {
     const dispatch = useDispatch();
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
               dispatch(succsessApiCall(`${prod.text} has just added to cart`));
               setTimeout(() => dispatch(succsessApiCall(false)), 5000);
          } catch (err: any) {
               const errMsg = apiError(err);
               dispatch(apiErrorOccurred(errMsg));
               setTimeout(() => dispatch(apiErrorOccurred(false)), 5000);
          }
     };
     const favoritesHandler = async (prod: ProductDetials) => {
          try {
               const { data, status } = await axios.post(
                    "/api/favorites/manage-favorites",
                    prod
               );
               let addFav = false;
               let removeFav = false;
               console.log(status, data);

               status === 200 ? (removeFav = true) : (addFav = true);
               dispatch(
                    succsessApiCall(
                         `${prod.text} has been ${
                              addFav ? "add" : "remove"
                         } from favorites list`
                    )
               );
               setTimeout(() => dispatch(succsessApiCall(false)), 5000);
          } catch (err: any) {
               const errMsg = apiError(err);
               dispatch(apiErrorOccurred(errMsg));
               setTimeout(() => dispatch(apiErrorOccurred(false)), 5000);
          }
     };
     return (
          <StyledPageContainer>
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
                                                                      favoritesHandler(
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
