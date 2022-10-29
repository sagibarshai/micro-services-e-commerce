import styled from "styled-components";
import { colors } from "../../shared/colors/colors";
import { fonts } from "../../shared/fonts/fonts";

interface StyledProps {
     gap?: string;
     justifayContent?: string;
     fontSize?: string;
     alignItems?: string;
     fontWeight?: string;
}

export const StyledPageContainer = styled.div`
     background-color: ${colors.parimaryGreen};
     width: 100wh;
     height: 100vh;
     display: flex;
     align-items: center;
     justify-content: center;
`;

export const StyledSignupContainer = styled.div`
     position: relative;
     background-color: ${colors.white};
     width: 895px;
     height: 603px;
     display: flex;
     border-radius: 20px;
`;
export const StyledRightConatiner = styled.div`
     display: flex;
     align-items: center;
     justify-items: center;
     margin-left: 100px;
`;
export const StyledSvg = styled.i``;

export const StyledLeftContent = styled.div`
     margin-left: 91px;
     margin-top: 32px;
`;

export const StyledTitle = styled.h2`
     all: unset;
     font-family: ${fonts.headline};
     letter-spacing: 0.3px;
     color: ${colors.praimarylack};
     font-weight: bold;
     letter-spacing: 0.3px;
     font-size: 3.8rem;
`;
export const StyledRow = styled.div<StyledProps>`
     display: flex;
     justify-content: ${(props) => props.justifayContent};
     gap: ${(props) => props.gap};
     align-items: ${(props) => props.alignItems};
`;

export const StyledButton = styled.button`
     all: unset;
     cursor: pointer;
`;

export const StyledSpan = styled.span<StyledProps>`
     color: ${(props) => props.color};
     font-size: ${(props) => props.fontSize};
     font-weight: ${(props) => props.fontWeight};
`;

export const StyledSubtitle = styled.h4`
     all: unset;
     color: ${colors.praimarylack};
     font: ${fonts.headline};
     letter-spacing: -0.1px;
     font-size: 2rem;
     font-weight: bold;
`;

export const StyledForm = styled.form`
     display: flex;
     flex-direction: column;
     gap: 18px;
     margin-top: 38px;
`;
export const StyledHr = styled.hr`
     border: 1px solid ${colors.lightGrey};
     box-shadow: 8px 16px 32px #0000001a;
     width: 33%;
`;
