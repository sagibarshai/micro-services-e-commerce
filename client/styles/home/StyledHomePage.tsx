import styled from "styled-components";
import { colors } from "../../shared/colors/colors";

export const StyledPageContainer = styled.div`
     position: relative;
     background-color: ${colors.whiteBackground};
     min-height: 100vh;
     width: 100vw;
     display: flex;
     justify-content: center;
`;
export const StyledDivColumn = styled.div`
     position: absolute;
     top: 195px;
     left: 50%;
     transform: translate(-50%, 0);
     display: flex;
     justify-content: space-between;
     font-weight: bold;
     gap: 40px;
     flex-direction: column;
     align-items: center;
`;
export const StyledText = styled.p`
     font-size: 1.8rem;
     color: ${colors.blackInputText};
     text-align: center;
     width: 560px;
`;
export const StyledSvg = styled.i`
     width: 100%;
     height: 100%;
`;

export const StyledTitle = styled.h1`
     all: unset;
     line-height: 1;
     color: ${colors.secondaryGreen};
     font-size: 6rem;
`;
