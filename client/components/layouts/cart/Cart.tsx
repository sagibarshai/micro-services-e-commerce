import styled from "styled-components";
import { useSelector } from "react-redux";
import { StoreState } from "../../../redux/store";
import { colors } from "../../../shared/colors/colors";
import { StyledXButton } from "../../../shared/components/StyledXButton";
import { useState } from "react";
import BlackCart from "../../../shared/svg/cart.svg";
import DeleteIcon from "../../../shared/svg/delete.svg";
import PlusIcon from "../../../shared/svg/plus.svg";
import MinusIcon from "../../../shared/svg/minus.svg";
interface StyledProps {
     justifyContent?: string;
     alignItems?: string;
     width?: string;
     height?: string;
     gap?: string;
     margin?: string;
     fontSize?: string;
     fontWeight?: string;
}

const StyledCartContainer = styled.div`
     width: 495px;
     height: calc(100vh - 120px - 60px);
     overflow: hidden;
     overflow-y: auto;
     background-color: ${colors.whiteBackground};
     box-shadow: 8px 16px 32px #0000001a;
     position: fixed;
     top: 120px;
     right: 0;
     z-index: 2;
     border-radius: 20px;
     padding: 30px;
`;
const StyledDivRow = styled.div<StyledProps>`
     display: flex;
     justify-content: ${(props) => props.justifyContent};
     align-items: ${(props) => props.alignItems};
     gap: ${(props) => props.gap};
     margin: ${(props) => props.margin};
`;

const StyledTitle = styled.h1`
     all: unset;
     font-size: 3.2rem;
     font-weight: bolder;
`;
const StyledIcon = styled.i`
     vertical-align: baseline;
`;

const StyledButton = styled.button`
     all: unset;
`;

const StyledDivColumn = styled.div<StyledProps>`
     display: flex;
     flex-direction: column;
     gap: ${(props) => props.gap};
     justify-content: ${(props) => props.justifyContent};
     align-items: ${(props) => props.alignItems};
     width: ${(props) => props.width};
     margin: ${(props) => props.margin};
`;

const StyledImg = styled.img`
     width: 181px;
     height: 181px;
     object-fit: cover;
`;
const StyledText = styled.span<StyledProps>`
     font-weight: ${(props) => props.fontWeight};
     font-size: ${(props) => props.fontSize};
`;

export default () => {
     const [btnClicked, setBtnClicked] = useState<boolean>(false);
     const cartIsOpen = useSelector(
          (state: StoreState) => state.cartSlice.openCartPopup
     );
     const { cartItems } = useSelector((state: StoreState) => state.cartSlice);

     if (!cartIsOpen) return <></>;
     return (
          <StyledCartContainer>
               <StyledDivRow
                    justifyContent="space-between"
                    alignItems="baseline"
               >
                    <StyledDivRow gap="20px">
                         <StyledIcon>
                              <BlackCart width="34px" height="39px" />
                         </StyledIcon>
                         <StyledTitle>My bag</StyledTitle>
                    </StyledDivRow>
                    <StyledXButton
                         btnClicked={btnClicked}
                         onClick={() => {
                              setBtnClicked(true);
                    
                              setTimeout(() => {
                                   setBtnClicked(false);
                              }, 500);
                         }}
                    >
                         X
                    </StyledXButton>
               </StyledDivRow>
               <StyledDivColumn gap="60px" margin="50px 0">
                    {cartItems.map((item) => {
                         return (
                              <StyledDivRow gap="28px">
                                   <StyledImg src={item.imgSrc} />
                                   <StyledDivColumn
                                        justifyContent="space-between"
                                        height="181px"
                                        width="100%"
                                   >
                                        <StyledText
                                             fontSize="2.5rem"
                                             fontWeight="bolder"
                                        >
                                             {item.price}$
                                        </StyledText>
                                        <StyledDivRow
                                             justifyContent="space-between"
                                             height="181px"
                                        >
                                             <StyledText fontSize="2.5rem">
                                                  {item.text}
                                             </StyledText>
                                             <StyledButton>
                                                  <DeleteIcon />
                                             </StyledButton>
                                        </StyledDivRow>
                                        <StyledDivRow
                                             alignItems="center"
                                             justifyContent="space-between"
                                        >
                                             <StyledText fontSize="2.5rem">
                                                  Qty:{item.qty}
                                             </StyledText>
                                             <StyledButton>
                                                  <PlusIcon />
                                             </StyledButton>
                                             <StyledButton>
                                                  <MinusIcon />
                                             </StyledButton>
                                        </StyledDivRow>
                                   </StyledDivColumn>
                              </StyledDivRow>
                         );
                    })}
               </StyledDivColumn>
          </StyledCartContainer>
     );
};
