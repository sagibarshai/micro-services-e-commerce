import styled from "styled-components";
import { colors } from "../../shared/colors/colors";
interface StyledProps {
     isActive?: boolean;
     gap?: string;
     marginLeft?: string;
     marginRight?: string;
}

export const StyledHeader = styled.header`
     width: 100vw;
     height: 120px;
     background-color: ${colors.praimaryPink};
     display: flex;
     z-index: 2;
     position: sticky;
     top: 0;
     align-items: center;
     justify-content: space-between;
`;
export const StyledDivRow = styled.div<StyledProps>`
     display: flex;
     gap: ${(props) => props.gap};
     margin-left: ${(props) => props.marginLeft};
     margin-right: ${(props) => props.marginRight};
     height: 42px;
`;
export const StyledTooltip = styled.div`
     position: absolute;
     height: 50px;
     width: 100px;
     background-color: ${colors.white};
     top: 100%;
     left: 50%;
     transform: translate(-50%, -10%);
     clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
`;
