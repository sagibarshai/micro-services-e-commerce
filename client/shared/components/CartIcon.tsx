import CartIcon from "../../shared/svg/cart.svg";
import styled, { css } from "styled-components";
import { colors } from "../colors/colors";
import { toggleCartPopup } from "../../redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../../redux/store";
import { useState } from "react";

interface StyledProps {
     noItemsAnimation?: boolean;
}

const StyledNotification = styled.span`
     position: absolute;
     top: -7.5px;
     right: -7.5px;
     border-radius: 50%;
     width: 20px;
     height: 20px;
     background-color: ${colors.backgroundGreen};
`;
const StyledNotificationText = styled.span`
     position: absolute;
     top: 50%;
     left: 50%;
     transform: translate(-50%, -50%);
     color: ${colors.white};
     font-size: 1.3rem;
`;

const StyledIcon = styled.i``;
const StyledContainer = styled.button<StyledProps>`
     all: unset;
     position: relative;
     cursor: pointer;
     transition: all 2s;
     ${(props) =>
          props.noItemsAnimation === true &&
          css`
               animation: shake 0.5s ease-in-out;
          `}
     @keyframes shake {
          0% {
               transform: rotate(0deg);
          }
          25% {
               transform: rotate(25deg);
          }
          50% {
               transform: rotate(0eg);
          }
          75% {
               transform: rotate(-25deg);
          }
          100% {
               transform: rotate(0deg);
          }
     }
`;
const StyledTooltipMessage = styled.span`
     width: 160px;
     height: 120px;
     background-color: ${colors.backgroundGreen};
     font-size: 2.5rem;
     font-weight: bolder;
     color: ${colors.whiteBackground};
     position: absolute;
     top: 50px;
     left: 50%;
     transform: translateX(-50%);
     clip-path: polygon(49% 0, 100% 38%, 100% 100%, 0 100%, 0% 38%);
     padding-top: 25px;
     display: flex;
     align-items: center;
     justify-content: center;
`;

interface Props {
     itemsInCart: number;
}
export default (props: Props) => {
     const [noItemsAnimation, setNoItemsAnimation] = useState<boolean>(false);
     const [noItemsTooltip, setNoItemsTooltip] = useState<boolean>(false);

     const dispatch = useDispatch();
     const itemsInCart = useSelector(
          (state: StoreState) => state.cartSlice.cartItems.length
     );

     return (
          <StyledContainer
               noItemsAnimation={noItemsAnimation}
               onClick={() => {
                    if (!itemsInCart) {
                         setNoItemsAnimation(true);
                         setNoItemsTooltip(true);
                         setTimeout(() => {
                              setNoItemsAnimation(false);
                         }, 5000);
                         setTimeout(() => {
                              setNoItemsTooltip(false);
                         }, 5000);
                         return;
                    }
                    dispatch(toggleCartPopup());
               }}
          >
               <StyledIcon>
                    <CartIcon />
               </StyledIcon>
               {!itemsInCart && noItemsTooltip && (
                    <StyledTooltipMessage>
                         <span>Your cart is empty..</span>
                    </StyledTooltipMessage>
               )}
               <StyledNotification>
                    <StyledNotificationText>
                         {props.itemsInCart}
                    </StyledNotificationText>
               </StyledNotification>
          </StyledContainer>
     );
};
