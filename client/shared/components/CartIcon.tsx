import CartIcon from "../../shared/svg/cart.svg";
import styled from "styled-components";
import { colors } from "../colors/colors";

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
     /* font-weight: bold; */
`;

const StyledIcon = styled.i``;
const StyledContainer = styled.div`
     position: relative;
`;
export default () => {
     return (
          <StyledContainer>
               <StyledIcon>
                    <CartIcon />
               </StyledIcon>
               <StyledNotification>
                    <StyledNotificationText>1</StyledNotificationText>
               </StyledNotification>
          </StyledContainer>
     );
};
