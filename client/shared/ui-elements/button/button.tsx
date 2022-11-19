import styled, { css } from "styled-components";
import { colors } from "../../colors/colors";

interface StyledProps {
     backgroundColor?: string;
     color?: string;
     width?: string;
     height?: string;
     marginTop?: string;
     alignSelf?: string;
}

export const StyledParimaryButton = styled.button<StyledProps>`
     width: ${(props) => props.width || "365px"};
     height: ${(props) => props.height || "54px"};
     border-radius: 16px;
     color: ${(props) => props.color || colors.white};
     background-color: ${(props) =>
          props.backgroundColor || colors.backgroundGreen};
     border-color: transparent;
     font-size: 1.7rem;
     margin-top: ${(props) => props.marginTop};
     cursor: pointer;
     font-weight: bold;
     transition: all 0.5s;
     align-self: ${(props) => props.alignSelf};
     &:focus {
          outline: none;
          border: none;
     }
     &:hover {
          transform: scale(0.95);
          opacity: 0.7;
          font-weight: bolder;
     }
`;
