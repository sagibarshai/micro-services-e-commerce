import styled, { css } from "styled-components";
import { colors } from "../../shared/colors/colors";

interface StyledProps {
     gap?: string;
     justifyContent?: string;
     marginTop?: string;
     alignItems?: string;
     buttonClicked?: boolean;
     position?: string;
     top?: string;
     right?: string;
     flexWrap?: string;
     alignSelf?: string;
     maxWidth?: string;
     maxHeight?: string;
     height?: string;
     width?: string;
}
export const StyledPageContainer = styled.div<StyledProps>`
     display: flex;
     justify-content: center;
     flex-direction: column;
     align-items: center;
     gap: 110px;
     margin-top: 50px;
     margin-bottom: 100px;
     height: ${(props) => props.height};
`;
export const StyledCategoryTitle = styled.h2<StyledProps>`
     color: ${colors.backgroundGreen};
     font-size: 3.3rem;
`;
export const StyledDivRow = styled.div<StyledProps>`
     display: flex;
     align-self: ${(props) => props.alignSelf};
     flex-wrap: ${(props) => props.flexWrap};
     gap: ${(props) => props.gap};
     justify-content: ${(props) => props.justifyContent};
     margin: ${(props) => props.marginTop};
     align-items: ${(props) => props.alignItems};
     width: ${(props) => props.width};
`;
export const StyledDivColumn = styled.div<StyledProps>`
     display: flex;
     flex-direction: column;
     gap: ${(props) => props.gap};
     position: ${(props) => props.position};
`;
export const StyledImg = styled.img<StyledProps>`
     display: flex;
     max-width: ${(props) => props.maxWidth};
     max-height: ${(props) => props.maxHeight};
`;
export const StyledText = styled.span`
     font-weight: bold;
     font-size: 1.6rem;
`;
export const StyledIconButton = styled.button<StyledProps>`
     all: unset;
     cursor: pointer;
     transition: all 0.5s;
     position: ${(props) => props.position};
     top: ${(props) => props.top};
     right: ${(props) => props.right};
     &:hover {
          transform: scale(1.2);
          ${(props) =>
               props.buttonClicked === false &&
               css`
                    transform: scale(1.2);
               `}
          ${(props) =>
               props.buttonClicked === true &&
               css`
                    transform: scale(0.8);
               `}
     }
`;
