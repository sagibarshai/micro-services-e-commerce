import styled from "styled-components";
import { colors } from "../../shared/colors/colors";
interface StyledProps {
     justifyContent?: string;
     alignItems?: string;
     width?: string;
     height?: string;
     gap?: string;
     margin?: string;
     fontSize?: string;
     fontWeight?: string;
}

export const StyledCartContainer = styled.div`
     width: 495px;
     height: calc(100vh - 120px);
     overflow: hidden;
     overflow-y: auto;
     background-color: ${colors.whiteBackground};
     box-shadow: 8px 16px 32px #0000001a;
     position: fixed;
     top: 120px;
     right: 0;
     z-index: 2;
     border-radius: 20px;
     padding: 30px;
     &::-webkit-scrollbar {
          width: 6px;
          border-radius: 100px;
          background-color: #e9e9e9;
     }
     &::-webkit-scrollbar-track {
          background-color: ${colors.lightGrey};
          opacity: 0.5;
     }
     &::-webkit-scrollbar-thumb {
          background-color: ${colors.blackInputText};
          opacity: 1;
     }
`;
export const StyledDivRow = styled.div<StyledProps>`
     display: flex;
     justify-content: ${(props) => props.justifyContent};
     align-items: ${(props) => props.alignItems};
     gap: ${(props) => props.gap};
     margin: ${(props) => props.margin};
`;

export const StyledTitle = styled.h1`
     all: unset;
     font-size: 3.2rem;
     font-weight: bolder;
`;
export const StyledIcon = styled.i`
     vertical-align: baseline;
`;

export const StyledButton = styled.button<StyledProps>`
     all: unset;
     cursor: pointer;
     width: ${(props) => props.width};
     height: ${(props) => props.height};
`;

export const StyledDivColumn = styled.div<StyledProps>`
     display: flex;
     flex-direction: column;
     gap: ${(props) => props.gap};
     justify-content: ${(props) => props.justifyContent};
     align-items: ${(props) => props.alignItems};
     width: ${(props) => props.width};
     margin: ${(props) => props.margin};
`;

export const StyledImg = styled.img`
     width: 181px;
     height: 181px;
     object-fit: cover;
`;
export const StyledText = styled.span<StyledProps>`
     font-weight: ${(props) => props.fontWeight};
     font-size: ${(props) => props.fontSize};
`;
export const StyledSumContainer = styled.div`
     display: flex;
     align-items: center;
     justify-content: center;
     background-color: ${colors.backgroundGray};
     width: 100%;
     height: 84px;
     gap: 17px;
`;
