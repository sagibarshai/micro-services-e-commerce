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
import { addItemToCart } from "../redux/cartSlice";
import axios from "axios";
export default () => {
     const dispatch = useDispatch();
     const cartState = useSelector(
          (state: StoreState) => state.cartSlice.cartItems
     );
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
               console.log(data);
          } catch (err) {
               console.log(err);
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
                              <StyledDivRow gap="42px">
                                   {product.products.map((prod) => {
                                        return (
                                             <StyledDivColumn gap="27px">
                                                  <StyledImg
                                                       width="528px"
                                                       height="360px"
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
                                                                      // dispatch(
                                                                      //      addItemToCart(
                                                                      //           prod
                                                                      //      )
                                                                      // );
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
