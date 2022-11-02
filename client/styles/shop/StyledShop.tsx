import styled from "styled-components";
import { colors } from "../../shared/colors/colors";

interface StyledProps {
     gap?: string;
     justifyContent?: string;
     marginTop?: string;
}
export const StyledPageContainer = styled.div`
     display: flex;
     justify-content: center;
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
