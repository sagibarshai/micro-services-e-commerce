import { useState } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import { StyledXButton } from "../../../shared/components/StyledXButton";
import { StyledParimaryButton } from "../../../shared/ui-elements/button/button";
import { toggleCartPopup } from "../../../redux/cartSlice";
import { updateCart } from "../../../redux/cartSlice";
import {
     apiErrorOccurred,
     succsessApiCall,
} from "../../../redux/user-notifications-slice";
import { apiError } from "../../../shared/errors/api-error";

import { StoreState } from "../../../redux/store";

import BlackCart from "../../../shared/svg/cart.svg";
import DeleteIcon from "../../../shared/svg/delete.svg";
import PlusIcon from "../../../shared/svg/plus.svg";
import MinusIcon from "../../../shared/svg/minus.svg";

import {
     StyledButton,
     StyledCartContainer,
     StyledDivColumn,
     StyledDivRow,
     StyledIcon,
     StyledImg,
     StyledSumContainer,
     StyledText,
     StyledTitle,
} from "../../../styles/cart/cart-style";

interface Props {
     currentuser: {
          email: string;
     } | null;
}

export default (props: Props) => {
     const [btnClicked, setBtnClicked] = useState<boolean>(false);
     const router = useRouter();
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
               const errMsg = apiError(err);
               dispatch(apiErrorOccurred(errMsg));
               setTimeout(() => dispatch(apiErrorOccurred(false)), 5000);
          }
     };
     const removeFromCartHandler = async (prod: any) => {
          try {
               const { data } = await axios.post("/api/cart/remove", {
                    itemUpdated: { ...prod },
               });
               dispatch(updateCart(data));
          } catch (err) {
               const errMsg = apiError(err);
               dispatch(apiErrorOccurred(errMsg));
               setTimeout(() => dispatch(apiErrorOccurred(false)), 5000);
          }
     };
     const increseFromCartHandler = async (prod: any) => {
          try {
               const { data } = await axios.post("/api/cart/add", {
                    itemUpdated: { ...prod },
               });
               dispatch(updateCart(data));
          } catch (err) {
               const errMsg = apiError(err);
               dispatch(apiErrorOccurred(errMsg));
               setTimeout(() => dispatch(apiErrorOccurred(false)), 5000);
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
                    <StyledParimaryButton
                         alignSelf="center"
                         onClick={() =>
                              router.push({
                                   pathname: "/payment",
                                   query: props.currentuser,
                              })
                         }
                    >
                         Check out
                    </StyledParimaryButton>
               </StyledDivColumn>
          </StyledCartContainer>
     );
};
