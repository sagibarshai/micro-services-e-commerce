import styled, { css } from "styled-components";
import { colors } from "../../shared/colors/colors";

interface StyledProps {
     gap?: string;
     justifyContent?: string;
     marginTop?: string;
     alignItems?: string;
     buttonClicked?: boolean;
}
export const StyledPageContainer = styled.div`
     display: flex;
     justify-content: center;
     flex-direction: column;
     align-items: center;
     gap: 110px;
     margin-top: 50px;
     margin-bottom: 100px;
`;
export const StyledCategoryTitle = styled.h2<StyledProps>`
     color: ${colors.secondaryGreen};
     font-size: 3.3rem;
`;
export const StyledDivRow = styled.div<StyledProps>`
     display: flex;
     gap: ${(props) => props.gap};
     justify-content: ${(props) => props.justifyContent};
     margin: ${(props) => props.marginTop};
     align-items: ${(props) => props.alignItems};
`;
export const StyledDivColumn = styled.div<StyledProps>`
     display: flex;
     flex-direction: column;
     gap: ${(props) => props.gap};
`;
export const StyledImg = styled.img``;
export const StyledText = styled.span`
     font-weight: bold;
     font-size: 1.6rem;
`;
export const StyledIconButton = styled.button<StyledProps>`
     all: unset;
     cursor: pointer;
     transition: all 0.5s;
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
