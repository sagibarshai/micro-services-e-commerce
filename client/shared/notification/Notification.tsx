import styled, { css } from "styled-components";
import { colors } from "../colors/colors";

export type Variant = "error" | "success";
export type Props = {
     variant: Variant;
     width?: string;
     height?: string;
     backgroundColor?: string;
     message?: string;
     mobileWidth?: string;
     icon?: JSX.Element;
     transform?: string;
     position?: string;
     bottom?: string;
     left?: string;
     fontSize?: string;
     fontWeight?: string;
     color?: string;
     gap?: string;
     mobileHeigt?: string;
     mobileBottom?: string;
     animation?: boolean;
     mobileTransform?: string;
     positionFixiedBottom?: boolean;
     animationTime?: number;
     zIndex?: string;
     padding?: string;
     onClick?: (x: any) => any;
};

export const StyledNotificationContainer = styled.div<Props>`
     display: flex;
     align-items: center;
     justify-content: center;
     border-radius: 10px;
     position: relative;
     text-align: center;
     background-color: ${(props) => props.backgroundColor};
     ${(props) =>
          props.variant === "success" &&
          css`
               width: 493px;
               height: 86px;
               background-color: rgba(0, 0, 0, 0.8);
               position: fixed;
               bottom: 54px;
               left: 50%;
               transform: translate(-50%, 0%);
               gap: 5px;
          `};
     z-index: 10;
     ${(props) =>
          props.variant === "error" &&
          css`
               width: 365px;
               height: 54px;
               padding: 24px;
               border-radius: 16px;
               display: flex;
               gap: 16px;
               align-items: center;
               justify-content: center;
               font-size: 1.4rem;
          `};
     width: ${(props) => props.width};
     gap: ${(props) => props.gap};
     position: ${(props) => props.position};
     transform: ${(props) => props.transform};
     left: ${(props) => props.left};
     bottom: ${(props) => props.bottom};
     z-index: ${(props) => props.zIndex};
     transition: all 4s;
     padding: ${(props) => props.padding};
     font-size: ${(props) => props.fontSize};
     font-weight: ${(props) => props.fontWeight};
     animation: ${(props) =>
          props.animation &&
          `lowerOpacity ${props.animationTime || "5s"} infinite`};
     @keyframes lowerOpacity {
          0% {
               opacity: 1;
          }

          85% {
               opacity: 1;
          }

          100% {
               opacity: 0;
          }
     }
`;
export const StyledSpan = styled.span<Props>`
     ${(props) =>
          props.variant === "success" &&
          css`
               font-size: 2rem;
               font-weight: 300;
               text-align: center;
          `};
     flex-grow: 0;
     font-family: inherit;
`;
const StyledIcon = styled.i`
     vertical-align: middle;
`;
const Notification: React.FC<Props> = (props) => {
     return (
          <StyledNotificationContainer {...props}>
               <StyledIcon>{props.icon}</StyledIcon>
               <StyledSpan {...props}>{props.message}</StyledSpan>
          </StyledNotificationContainer>
     );
};
export default Notification;
