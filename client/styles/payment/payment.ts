import styled from "styled-components";

import { colors } from "../../shared/colors/colors";

export interface StyledProps {
     gap?: string;
     justifyContent?: string;
     alignItems?: string;
     position?: string;
     top?: string;
     right?: string;
     flexWrap?: string;
     alignSelf?: string;
     backgroundColor?: string;
     height?: string;
     width?: string;
     marginTop?: string;
     borderRadius?: string;
     textIndent?: string;
}

export const StyledPageContainer = styled.div`
     width: 100vw;
     height: 100vh;
     background-color: ${colors.praimaryPink};
     display: flex;
     justify-content: center;
     align-items: center;
`;

export const StyledSumContainer = styled.div<StyledProps>`
     display: flex;
     align-items: center;
     justify-content: center;
     background-color: ${colors.backgroundGray};
     width: 100%;
     height: 84px;
     gap: 17px;
     margin-top: ${(props) => props.marginTop};
`;

export const StyledText = styled.span`
     font-weight: bold;
     font-size: 1.8rem;
`;
export const StyledDivColumn = styled.div<StyledProps>`
     display: flex;
     flex-direction: column;
     gap: ${(props) => props.gap};
     position: ${(props) => props.position};
     background-color: ${(props) => props.backgroundColor};
     width: ${(props) => props.width};
     height: ${(props) => props.height};
     align-items: ${(props) => props.alignItems};
     margin-top: ${(props) => props.marginTop};
     border-radius: ${(props) => props.borderRadius};
     align-self: ${(props) => props.alignSelf};
`;

export const StyledDivRow = styled.div<StyledProps>`
     display: flex;
     align-self: ${(props) => props.alignSelf};
     flex-wrap: ${(props) => props.flexWrap};
     gap: ${(props) => props.gap};
     justify-content: ${(props) => props.justifyContent};
     margin: ${(props) => props.marginTop};
     align-items: ${(props) => props.alignItems};
`;

export const StyledInput = styled.input<StyledProps>`
     width: ${(props) => props.width || "327px"};
     height: 48px;
     border-radius: 16px;
     border: 2px ${colors.outlineGreenInput} solid;
     text-indent: ${(props) => props.textIndent || "25px"};
     font-size: 1.6rem;
     &:focus {
          outline: none;
     }
`;
export const StyledLabel = styled.label`
     font-size: 1.6rem;
     font-weight: bolder;
     align-self: flex-start;
`;
