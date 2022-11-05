import styled, { css } from "styled-components";
import { colors } from "../colors/colors";

interface XButtonProps {
     btnClicked: boolean;
     absolute?: boolean;
}

export const StyledXButton = styled.button<XButtonProps>`
     width: 48px;
     height: 48px;
     border-radius: 50%;
     background-color: ${colors.paimaryGrey};
     color: ${colors.praimarylack};
     font-weight: bolder;
     ${(props) =>
          props.absolute === true &&
          css`
               position: absolute;
               top: 32px;
               right: 32px;
          `}
     font-size: 3rem;
     border: none;
     outline: none;
     cursor: pointer;
     transition: all 0.5s;
     &:hover {
          background-color: ${colors.backgroundGreen};
          color: ${colors.white};
     }
     ${(props) =>
          props.btnClicked === true &&
          css`
               transform: scale(-50%) rotate(360deg);
          `}
`;
