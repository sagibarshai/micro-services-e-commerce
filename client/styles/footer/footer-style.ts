import styled from "styled-components";

import { colors } from "../../shared/colors/colors";
export interface StyledProps {
     justifyContent?: string;
     gap?: string;
     fontSize?: string;
     fontWeight?: string;
     height?: string;
     width?: string;
     alignItems?: string;
     margin?: string;
}

export const StyledFooterContainer = styled.footer<StyledProps>`
     height: 250px;
     display: flex;
     align-items: center;
     justify-content: center;
     background-color: ${colors.praimaryPink};
`;

export const StyledSubtitle = styled.h4<StyledProps>`
     all: unset;
     font-weight: bold;
     font-size: ${(props) => props.fontSize || "2rem"};
     font-weight: ${(props) => props.fontWeight || "bold"};
`;
export const StyledDivColumn = styled.div<StyledProps>`
     display: flex;
     flex-direction: column;
     gap: ${(props) => props.gap};
     align-items: ${(props) => props.alignItems};
`;

export const StyledDivRow = styled.div<StyledProps>`
     display: flex;
     justify-content: ${(props) => props.justifyContent};
     gap: ${(props) => props.gap};
     height: ${(props) => props.height};
     align-items: center;
     width: ${(props) => props.width};
`;
export const StyledWrapper = styled.div<StyledProps>`
     display: flex;
     align-items: center;
     justify-content: center;
     margin: ${(props) => props.margin};
`;

export const StyledIcon = styled.i<StyledProps>`
     margin: ${(props) => props.margin};
`;
