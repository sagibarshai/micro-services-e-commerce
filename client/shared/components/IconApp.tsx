import styled from "styled-components";
import { colors } from "../colors/colors";
import IconApp from "../../shared/svg/app-logo.svg";
import { useRouter } from "next/router";

export const StyledIcon = styled.i`
     vertical-align: middle;
`;
export const StyledIconText = styled.span`
     font-size: 3rem;
     font-weight: bolder;
     letter-spacing: -0.15px;
     color: ${colors.blackInputText};
     opacity: 1;
`;
export const StyledContainer = styled.div`
     display: flex;
     align-items: center;
     cursor: pointer;
`;
export default () => {
     const router = useRouter();
     return (
          <StyledContainer onClick={() => router.push("/")}>
               <StyledIconText>Planty</StyledIconText>
               <StyledIcon>
                    <IconApp />
               </StyledIcon>
          </StyledContainer>
     );
};
