import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { StoreState } from "../../../redux/store";
import { colors } from "../../../shared/colors/colors";
import { StyledXButton } from "../../../shared/components/StyledXButton";
import { useState } from "react";
import BlackCart from "../../../shared/svg/cart.svg";
import DeleteIcon from "../../../shared/svg/delete.svg";
import PlusIcon from "../../../shared/svg/plus.svg";
import MinusIcon from "../../../shared/svg/minus.svg";
import {
     //      addItemToCart,
     //      decreseCartItemQty,
     //      removeItemFromCart,
     toggleCartPopup,
} from "../../../redux/cartSlice";
import { StyledParimaryButton } from "../../../shared/ui-elements/button/button";
import axios from "axios";
import { updateCart } from "../../../redux/cartSlice";

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
     height: calc(100vh - 120px);
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
     &::-webkit-scrollbar {
          width: 6px;
          border-radius: 100px;
          background-color: #e9e9e9;
     }
     &::-webkit-scrollbar-track {
          background-color: ${colors.lightGrey};
          opacity: 0.5;
     }
     &::-webkit-scrollbar-thumb {
          background-color: ${colors.blackInputText};
          opacity: 1;
     }
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

const StyledButton = styled.button<StyledProps>`
     all: unset;
     cursor: pointer;
     width: ${(props) => props.width};
     height: ${(props) => props.height};
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
const StyledSumContainer = styled.div`
     display: flex;
     align-items: center;
     justify-content: center;
     background-color: ${colors.backgroundGray};
     width: 100%;
     height: 84px;
     gap: 17px;
`;

export default () => {
     const [btnClicked, setBtnClicked] = useState<boolean>(false);
     const dispatch = useDispatch();
     const cartIsOpen = useSelector(
          (state: StoreState) => state.cartSlice.openCartPopup
     );
     const { cartSum } = useSelector((state: StoreState) => state.cartSlice);
     const { cartItems } = useSelector((state: StoreState) => state.cartSlice);

     const decreseFromCartHandler = async (prod: any) => {
          try {
               const { data } = await axios.post("/api/cart/decrese", {
                    itemUpdated: { ...prod },
               });
               dispatch(updateCart(data));
          } catch (err) {
               console.log(err);
          }
     };
     const removeFromCartHandler = async (prod: any) => {
          try {
               const { data } = await axios.post("/api/cart/remove", {
                    itemUpdated: { ...prod },
               });
               dispatch(updateCart(data));
          } catch (err) {
               console.log(err);
          }
     };
     const increseFromCartHandler = async (prod: any) => {
          try {
               const { data } = await axios.post("/api/cart/add", {
                    itemUpdated: { ...prod },
               });
               dispatch(updateCart(data));
          } catch (err) {
               console.log(err);
          }
     };

     if (!cartIsOpen) return <></>;
     if (!cartItems.length) return <></>;
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
                                   dispatch(toggleCartPopup());
                              }, 500);
                         }}
                    >
                         X
                    </StyledXButton>
               </StyledDivRow>
               <StyledDivColumn
                    gap="60px"
                    margin="50px 0"
                    justifyContent="center"
               >
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
                                             <StyledButton
                                                  width="35px"
                                                  height="35px"
                                                  onClick={() => {
                                                       removeFromCartHandler(
                                                            item
                                                       );
                                                  }}
                                             >
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
                                             <StyledButton
                                                  width="35px"
                                                  height="35px"
                                                  onClick={() => {
                                                       increseFromCartHandler(
                                                            item
                                                       );
                                                  }}
                                             >
                                                  <PlusIcon />
                                             </StyledButton>
                                             <StyledButton
                                                  width="35px"
                                                  height="35px"
                                                  onClick={() => {
                                                       decreseFromCartHandler(
                                                            item
                                                       );
                                                  }}
                                             >
                                                  <MinusIcon />
                                             </StyledButton>
                                        </StyledDivRow>
                                   </StyledDivColumn>
                              </StyledDivRow>
                         );
                    })}
                    <StyledSumContainer>
                         <StyledText fontSize="2.5rem" fontWeight="bold">
                              total:
                         </StyledText>
                         <StyledText fontSize="2.5rem" fontWeight="bold">
                              {cartSum}$
                         </StyledText>
                    </StyledSumContainer>
                    <StyledParimaryButton alignSelf="center">
                         Check out
                    </StyledParimaryButton>
               </StyledDivColumn>
          </StyledCartContainer>
     );
};
