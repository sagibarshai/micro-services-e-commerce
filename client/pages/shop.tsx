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
import { products } from "../shared/products/products";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StoreState } from "../redux/store";
import { addItemToCart } from "../redux/cartSlice";
export default () => {
     const dispatch = useDispatch();
     const cartState = useSelector(
          (state: StoreState) => state.cartSlice.cartItems
     );
     console.log(cartState);
     const [buttonClicked, setButtonClicked] = useState<boolean>(false);
     const buttonAnimation = () => {
          setButtonClicked(true);
          setTimeout(() => setButtonClicked(false), 500);
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
                                                                 buttonClicked={
                                                                      buttonClicked
                                                                 }
                                                                 onClick={() => {
                                                                      buttonAnimation();
                                                                      dispatch(
                                                                           addItemToCart(
                                                                                prod
                                                                           )
                                                                      );
                                                                 }}
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
                                                                      console.log(
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
