import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import { StyledParimaryButton } from "../shared/ui-elements/button/button";
import { StyledXButton } from "../shared/components/StyledXButton";

import { colors } from "../shared/colors/colors";

import {
     StyledDivColumn,
     StyledDivRow,
     StyledInput,
     StyledLabel,
     StyledPageContainer,
     StyledSumContainer,
     StyledText,
} from "../styles/payment/payment";

interface FormDetails {
     cardNumber: string;
     cardExprationDate: string;
     cardCvv: string;
     cardHolderName: string;
     sum: number;
}

export default () => {
     const router = useRouter();

     const [btnClicked, setBtnClicked] = useState<boolean>(false);
     const [cardHolderName, setCardHolderName] = useState<string>("");
     const [cardNumber, setCardNumber] = useState<string>("");
     const [cardCvv, setCardCvv] = useState<string>("");
     const [cardExprationDate, setCardExprationDate] = useState<string>("");

     const query = router.query;

     const paymentHandler = async (formDetials: FormDetails) => {
          try {
               const { data } = await axios.post("/api/payments/charge", {
                    ...formDetials,
               });
               console.log(data);
          } catch (err) {
               console.log(err);
          }
     };
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
                         <StyledInput
                              onChange={(e) => setCardNumber(e.target.value)}
                         />
                         <StyledLabel>CARDHOLDER NAME</StyledLabel>
                         <StyledInput
                              onChange={(e) =>
                                   setCardHolderName(e.target.value)
                              }
                         />
                         <StyledDivRow alignSelf="flex-start" gap="8px">
                              <StyledDivColumn>
                                   <StyledLabel>EXPIRE DATE</StyledLabel>
                                   <StyledInput
                                        onChange={(e) =>
                                             setCardExprationDate(
                                                  e.target.value
                                             )
                                        }
                                        type="month"
                                        max="2030-12"
                                        min="2022-12"
                                        width="104px"
                                   />
                              </StyledDivColumn>
                              <StyledDivColumn>
                                   <StyledLabel>CVV</StyledLabel>
                                   <StyledInput
                                        onChange={(e) =>
                                             setCardCvv(e.target.value)
                                        }
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
                         onClick={() => {
                              paymentHandler({
                                   cardNumber,
                                   cardHolderName,
                                   cardExprationDate,
                                   cardCvv,
                                   sum: 5,
                              });
                         }}
                    >
                         Pay Secure
                    </StyledParimaryButton>
               </StyledDivColumn>
          </StyledPageContainer>
     );
};
