import styled, { css } from "styled-components";
import { colors } from "../../colors/colors";

export const StyledParimaryButton = styled.button`
     width: 365px;
     height: 54px;
     border-radius: 100px;
     color: ${colors.white};
     background-color: ${colors.secondaryGreen};
     border-color: transparent;
     font-size: 1.7rem;
     cursor: pointer;
     font-weight: bold;
     transition: all 0.5s;
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
