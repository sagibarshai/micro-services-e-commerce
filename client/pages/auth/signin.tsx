import { NextPage } from "next";
import Router from "next/router";
import { useEffect, useReducer, useState } from "react";
import {
     StyledPageContainer,
     StyledTitle,
     StyledSignupContainer,
     StyledLeftContent,
     StyledSubtitle,
     StyledRow,
     StyledSpan,
     StyledButton,
     StyledForm,
     StyledHr,
} from "../../styles/auth/StyledSignUp";
import axios from "axios";
import { colors } from "../../shared/colors/colors";
import Input from "../../shared/ui-elements/input/Input";
import { StyledParimaryButton } from "../../shared/ui-elements/button/button";
import Notification from "../../shared/notification/Notification";
import InfoCircle from "../../shared/svg/info-circle.svg";
import Checkbox from "../../shared/ui-elements/input/Checkbox";
type InputsTypes = "email" | "password";

interface InputState {
     value: string;
     isValid: boolean;
}

interface InputsState {
     email: InputState;
     password: InputState;
}

type Action =
     | {
            type: "EMAIL_VALUE" | "PASSWORD_VALUE";
            payload: {
                 event: React.ChangeEvent<HTMLInputElement>;
            };
       } & React.ReducerAction<any>;

const checkInputValidation = (value: string) => (value.length ? true : false);

function inputsReducer(inputsState: InputsState, action: Action): InputsState {
     let emailUpdated: InputState = { ...inputsState.email };
     let passwordUpdated: InputState = { ...inputsState.password };
     switch (action.type) {
          case "EMAIL_VALUE":
               emailUpdated = {
                    ...inputsState.email,
                    value: action.payload.event.target.value,
               };
               emailUpdated.isValid = checkInputValidation(emailUpdated.value);

               return { ...inputsState, email: emailUpdated };
          case "PASSWORD_VALUE":
               passwordUpdated = {
                    ...inputsState.password,
                    value: action.payload.event.target.value,
               };
               passwordUpdated.isValid = checkInputValidation(
                    passwordUpdated.value
               );

               return { ...inputsState, password: passwordUpdated };
          default:
               return inputsState;
     }
}
const initInputState = {
     value: "",
     isValid: false,
};

const Signup: NextPage = () => {
     const [formRequestError, setFormRequestError] = useState<string | null>(
          null
     );
     const [inputsState, dispatch] = useReducer(inputsReducer, {
          email: {
               ...initInputState,
          },
          password: {
               ...initInputState,
          },
     });
     const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          let input: InputsTypes;
          for (input in inputsState) {
               if (!inputsState[input].isValid) {
                    return setFormRequestError("All filed must not be empty");
               }
          }
          try {
               const { data } = await axios.post("/api/users/signin", {
                    email: inputsState.email.value,
                    password: inputsState.password.value,
               });
               console.log(data);
               Router.push("/api/users/currentuser");
          } catch (err: any) {
               if (
                    err?.response?.data?.errors &&
                    Array.isArray(err.response.data.errors)
               ) {
                    let message = "";
                    for (let error of err.response.data.errors) {
                         message += error["message"];
                    }
                    return setFormRequestError(message);
               }
               setFormRequestError("Somthing went worng..");
               console.log(err);
          }
     };

     useEffect(() => {
          setFormRequestError(null);
     }, [inputsState]);

     return (
          <StyledPageContainer>
               <StyledSignupContainer>
                    <StyledLeftContent>
                         <StyledTitle>Sign In</StyledTitle>
                         <StyledRow
                              alignItems="baseline"
                              gap="48px"
                              justifayContent="flex-start"
                         >
                              <StyledSubtitle>New user?</StyledSubtitle>
                              <StyledButton
                                   onClick={() => Router.push("/auth/signup")}
                              >
                                   <StyledSpan
                                        color={colors.secondaryGreen}
                                        fontSize="1.7rem"
                                        fontWeight="bolder"
                                   >
                                        Create an account
                                   </StyledSpan>
                              </StyledButton>
                         </StyledRow>
                         <StyledForm onSubmit={(e) => submitHandler(e)}>
                              {formRequestError && (
                                   <Notification
                                        fontWeight="bold"
                                        fontSize="2rem"
                                        backgroundColor={
                                             colors.notificationError
                                        }
                                        icon={<InfoCircle />}
                                        message={formRequestError}
                                        variant="error"
                                        color="white"
                                   />
                              )}
                              <Input
                                   variant="large"
                                   placeholder="Email Address"
                                   onChange={(e) =>
                                        dispatch({
                                             type: "EMAIL_VALUE",
                                             payload: { event: e },
                                        })
                                   }
                              />
                              <Input
                                   variant="large"
                                   type="password"
                                   placeholder="Password"
                                   onChange={(e) =>
                                        dispatch({
                                             type: "PASSWORD_VALUE",
                                             payload: { event: e },
                                        })
                                   }
                              />
                              <StyledRow gap="17px" alignItems="center">
                                   <Checkbox
                                        onChange={(e) => {}}
                                        alignSelf={"flex-start"}
                                        width="35px"
                                        height="35px"
                                        borderRadius="8px"
                                        color={colors.secondaryGreen}
                                   />
                                   <StyledSpan
                                        fontSize="1.7rem"
                                        fontWeight="bold"
                                   >
                                        Keep me signed in
                                   </StyledSpan>
                              </StyledRow>
                              <StyledParimaryButton>
                                   Sign Up
                              </StyledParimaryButton>
                              <StyledRow alignItems="center">
                                   <StyledHr></StyledHr>
                                   <StyledSpan fontSize="1.4rem">
                                        Or Sign In With
                                   </StyledSpan>
                                   <StyledHr></StyledHr>
                              </StyledRow>
                         </StyledForm>
                    </StyledLeftContent>
               </StyledSignupContainer>
          </StyledPageContainer>
     );
};
export default Signup;
