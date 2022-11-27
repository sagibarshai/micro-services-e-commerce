import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useDispatch } from "react-redux";

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
import { apiError } from "../shared/errors/api-error";
import {
     apiErrorOccurred,
     succsessApiCall,
} from "../redux/user-notifications-slice";

interface FormDetails {
     cardNumber: string;
     cardExprationDate: string;
     cardCvv: string;
     cardHolderName: string;
     sum: number;
}

export default () => {
     const dispatch = useDispatch();
     const router = useRouter();
     const [btnClicked, setBtnClicked] = useState<boolean>(false);
     const [cardHolderName, setCardHolderName] = useState<string>("");
     const [cardNumber, setCardNumber] = useState<string>("");
     const [cardCvv, setCardCvv] = useState<string>("");
     const [cardExprationDate, setCardExprationDate] = useState<string>("");

     const query = router.query;
     const { sum } = query;

     const paymentHandler = async (formDetials: FormDetails) => {
          let arrayCardNumber: string[] = formDetials.cardNumber.split(" ");
          let transformedCardNumbers: string = "";
          for (let i = 0; i < arrayCardNumber.length; i++) {
               transformedCardNumbers += arrayCardNumber[i];
          }
          const expMonth = formDetials.cardExprationDate
               .split("-")[1]
               .toString();
          const expYear = formDetials.cardExprationDate
               .split("-")[0]
               .toString();
          const transformedFormDetials = {
               expMonth,
               expYear,
               cardNumber: transformedCardNumbers,
               cardHolderName,
               cardCvv,
               sum: Number(sum),
          };
          console.log(transformedFormDetials);
          try {
               const { data } = await axios.post("/api/payments/charge", {
                    ...transformedFormDetials,
               });
               dispatch(
                    succsessApiCall(
                         `Succsessfly charge!, please check your email to get more detials`
                    )
               );
               setTimeout(() => dispatch(succsessApiCall(false)), 5000);
               setTimeout(() => router.push("/"), 10000);
          } catch (err) {
               const errMsg = apiError(err);
               dispatch(apiErrorOccurred(errMsg));
               setTimeout(() => dispatch(apiErrorOccurred(false)), 5000);
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
                         <StyledText>{sum}$</StyledText>
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
                              minLength={19}
                              maxLength={19}
                              value={cardNumber}
                              onChange={(e) => {
                                   e.target.value = e.target.value
                                        .replace(/[^\dA-Z]/g, "")
                                        .replace(/(.{4})/g, "$1 ")
                                        .trim();
                                   setCardNumber(e.target.value);
                              }}
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
                                        value={cardCvv}
                                        minLength={3}
                                        maxLength={3}
                                        onChange={(e) => {
                                             e.target.value =
                                                  e.target.value.replace(
                                                       /[^\dA-Z]/g,
                                                       ""
                                                  );
                                             setCardCvv(e.target.value);
                                        }}
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
                                   sum: Number(sum),
                              });
                         }}
                    >
                         Pay Secure
                    </StyledParimaryButton>
               </StyledDivColumn>
          </StyledPageContainer>
     );
};
