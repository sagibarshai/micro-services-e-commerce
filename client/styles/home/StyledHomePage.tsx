import styled, { css } from "styled-components";
import { Colors, colors } from "../../shared/colors/colors";

interface StyledProps {
     height?: string;
     width?: string;
     color?: string;
     fontSize?: string;
     fontWeight?: string;
     gap?: string;
     alignItem?: string;
     justifyContent?: string;
     buttonClicked?: boolean;
     marginTop?: string;
     padding?: string;
     animation?: boolean;
     backgroundColor?: string;
}

export const StyledPageContainer = styled.div`
     position: relative;
     background-color: ${colors.secondaryGreen};
     height: max-content;
     width: 100vw;
     display: flex;
     justify-content: center;
     flex-direction: column;
     padding-bottom: 100px;
`;
export const StyledSection = styled.section<StyledProps>`
     width: 100vw;
     height: ${(props) => props.height};
     background-color: ${(props) =>
          props.backgroundColor || colors.whiteBackground};
     padding-top: ${(props) => props.marginTop};
`;
export const StyledAbsoluteDivColumn = styled.section`
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
export const StyledText = styled.p<StyledProps>`
     font-size: ${(props) => props.fontSize};
     color: ${(props) => props.color || colors.blackInputText};
     text-align: center;
     width: ${(props) => props.width};
     font-weight: ${(props) => props.fontWeight};
`;
export const StyledSvg = styled.i`
     width: 100%;
     height: 100%;
`;

export const StyledTitle = styled.h1<StyledProps>`
     all: unset;
     line-height: 1;
     color: ${(props) => props.color || colors.secondaryGreen};
     font-size: ${(props) => props.fontSize || "6rem"};
     text-align: center;
     font-weight: ${(props) => props.fontWeight};
`;
export const StyledDivRow = styled.div<StyledProps>`
     display: flex;
     justify-content: ${(props) => props.justifyContent || `space-between`};
     align-items: center;
     width: 100vw;
     align-items: ${(props) => props.alignItem};
     height: ${(props) => props.height};
     gap: ${(props) => props.gap};
     margin-top: ${(props) => props.marginTop};
     padding: ${(props) => props.padding};
`;

export const StyledIconButton = styled.button<StyledProps>`
     all: unset;
     cursor: pointer;
     transition: all 0.5s;
     &:hover {
          ${(props) =>
               props.buttonClicked === false &&
               css`
                    transform: scale(1.2);
               `}
          ${(props) =>
               props.buttonClicked === true &&
               css`
                    transform: scale(0.7) rotateY(90deg);
               `}
     }
`;
export const StyledDivColumn = styled.div<StyledProps>`
     display: flex;
     flex-direction: column;
     justify-content: space-between;
     gap: ${(props) => props.gap};
     align-items: center;
`;
export const StyledImg = styled.img<StyledProps>`
     width: ${(props) => props.width};
     height: ${(props) => props.height};
`;
