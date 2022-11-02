import {
     StyledPageContainer,
     StyledCategoryTitle,
     StyledDivColumn,
     StyledDivRow,
     StyledImg,
     StyledText,
} from "../styles/shop/StyledShop";

import IconCircleCart from "../shared/svg/circle-cart.svg";
import IconFavorites from "../shared/svg/favorites.svg";
import { products } from "../shared/products/products";

export default () => {
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
                                                            <IconFavorites
                                                                 width="48px"
                                                                 height="48px"
                                                            />
                                                            <IconCircleCart
                                                                 width="48px"
                                                                 height="48px"
                                                            />
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
