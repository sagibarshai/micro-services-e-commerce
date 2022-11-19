import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";
import { colors } from "../shared/colors/colors";
import { StyledXButton } from "../shared/components/StyledXButton";
import { StyledParimaryButton } from "../shared/ui-elements/button/button";

interface StyledProps {
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

const StyledPageContainer = styled.div`
     width: 100vw;
     height: 100vh;
     background-color: ${colors.praimaryPink};
     display: flex;
     justify-content: center;
     align-items: center;
`;

const StyledSumContainer = styled.div<StyledProps>`
     display: flex;
     align-items: center;
     justify-content: center;
     background-color: ${colors.backgroundGray};
     width: 100%;
     height: 84px;
     gap: 17px;
     margin-top: ${(props) => props.marginTop};
`;

const StyledText = styled.span`
     font-weight: bold;
     font-size: 1.8rem;
`;
const StyledDivColumn = styled.div<StyledProps>`
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

const StyledDivRow = styled.div<StyledProps>`
     display: flex;
     align-self: ${(props) => props.alignSelf};
     flex-wrap: ${(props) => props.flexWrap};
     gap: ${(props) => props.gap};
     justify-content: ${(props) => props.justifyContent};
     margin: ${(props) => props.marginTop};
     align-items: ${(props) => props.alignItems};
`;

const StyledInput = styled.input<StyledProps>`
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
const StyledLabel = styled.label`
     font-size: 1.6rem;
     font-weight: bolder;
     align-self: flex-start;
`;

export default () => {
     const [btnClicked, setBtnClicked] = useState<boolean>(false);
     const router = useRouter();
     console.log(router.pathname);
     return (
          <StyledPageContainer>
               <StyledDivColumn
                    borderRadius="20px"
                    backgroundColor={colors.white}
                    width="800px"
                    height="600px"
               >
                    <StyledXButton
                         onClick={() => {
                              setBtnClicked(true);
                              setTimeout(() => {
                                   setBtnClicked(false);
                                   router.back();
                              }, 500);
                         }}
                         btnClicked={btnClicked}
                         alignSelf="flex-end"
                    >
                         X
                    </StyledXButton>
                    <StyledSumContainer marginTop="23px" gap="10px">
                         <StyledText>Total To Pay:</StyledText>
                         <StyledText>457$</StyledText>
                    </StyledSumContainer>
                    <StyledDivColumn
                         width="min-content"
                         alignSelf="center"
                         gap="15px"
                         marginTop="30px"
                         justifyContent="center"
                         alignItems="center"
                    >
                         <StyledLabel>CARD NUMBER</StyledLabel>
                         <StyledInput />
                         <StyledLabel>CARDHOLDER NAME</StyledLabel>
                         <StyledInput />
                         <StyledDivRow alignSelf="flex-start" gap="8px">
                              <StyledDivColumn>
                                   <StyledLabel>EXPIRE DATE</StyledLabel>
                                   <StyledInput
                                        type="month"
                                        max="2030-12"
                                        min="2022-12"
                                        width="104px"
                                   />
                              </StyledDivColumn>
                              <StyledDivColumn>
                                   <StyledLabel>CVV</StyledLabel>
                                   <StyledInput
                                        textIndent="15px"
                                        width="57px"
                                   />
                              </StyledDivColumn>
                         </StyledDivRow>
                    </StyledDivColumn>
                    <StyledParimaryButton
                         width="327px"
                         alignSelf="center"
                         marginTop="30px"
                    >
                         Pay Secure
                    </StyledParimaryButton>
               </StyledDivColumn>
          </StyledPageContainer>
     );
};
