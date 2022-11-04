import CartIcon from "../../shared/svg/cart.svg";
import styled from "styled-components";
import { colors } from "../colors/colors";
import { toggleCartPopup } from "../../redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../../redux/store";

const StyledNotification = styled.span`
     position: absolute;
     top: -7.5px;
     right: -7.5px;
     border-radius: 50%;
     width: 20px;
     height: 20px;
     background-color: ${colors.secondaryGreen};
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
const StyledContainer = styled.button`
     all: unset;
     position: relative;
     cursor: pointer;
`;

interface Props {
     itemsInCart: number;
}
export default (props: Props) => {
     const dispatch = useDispatch();
     return (
          <StyledContainer
               onClick={() => {
                    dispatch(toggleCartPopup());
               }}
          >
               <StyledIcon>
                    <CartIcon />
               </StyledIcon>
               <StyledNotification>
                    <StyledNotificationText>
                         {props.itemsInCart}
                    </StyledNotificationText>
               </StyledNotification>
          </StyledContainer>
     );
};
