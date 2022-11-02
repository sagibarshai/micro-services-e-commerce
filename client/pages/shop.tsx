import {
     StyledPageContainer,
     StyledCategoryTitle,
     StyledDivColumn,
     StyledDivRow,
     StyledImg,
     StyledText,
} from "../styles/shop/StyledShop";

import IconDelete from "../shared/svg/delete.svg";

export default () => (
     <StyledPageContainer>
          <StyledDivColumn gap="27px">
               <StyledCategoryTitle>Chairs</StyledCategoryTitle>
               <StyledDivRow gap="42px">
                    <StyledDivColumn>
                         <StyledImg src="/images/chair.png" />
                         <StyledDivRow justifyContent="space-between">
                              <StyledDivRow gap="20px">
                                   <IconDelete />
                                   <IconDelete />
                                   <StyledText>Wood chair</StyledText>
                              </StyledDivRow>
                              <StyledText>199$</StyledText>
                         </StyledDivRow>
                    </StyledDivColumn>
                    <StyledDivColumn>
                         <StyledImg src="/images/chair.png" />
                         <StyledDivRow justifyContent="space-between">
                              <StyledDivRow gap="20px">
                                   <IconDelete />
                                   <IconDelete />
                                   <StyledText>Wood chair</StyledText>
                              </StyledDivRow>
                              <StyledText>199$</StyledText>
                         </StyledDivRow>
                    </StyledDivColumn>
               </StyledDivRow>
          </StyledDivColumn>
     </StyledPageContainer>
);
{
     /* <StyledCategoryTitle>Chairs</StyledCategoryTitle>
<StyledDivRow gap="42px" marginTop="16px">
     <StyledImg src="/images/chair.png" />
     <StyledImg src="/images/chair.png" />
</StyledDivRow>
<StyledDivRow
     marginTop="16px"
     justifyContent="space-between"
     alignItems="center"
>
     <StyledDivRow gap="20px">
          <IconDelete />
          <IconDelete />
          <StyledText>Wood chair</StyledText>
     </StyledDivRow>
     <StyledText>199$</StyledText>
</StyledDivRow> */
}
