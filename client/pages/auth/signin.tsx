import { useEffect, useReducer, useState } from "react";
import { NextPage } from "next";
import Router from "next/router";
import axios from "axios";

import Notification from "../../shared/notification/Notification";
import InfoCircle from "../../shared/svg/info-circle.svg";
import Checkbox from "../../shared/ui-elements/input/Checkbox";
import ParimaryLoader from "../../shared/loading-elements/parimary-loader";
import { StyledParimaryButton } from "../../shared/ui-elements/button/button";
import { StyledXButton } from "../../shared/components/StyledXButton";
import Input from "../../shared/ui-elements/input/Input";

import { colors } from "../../shared/colors/colors";

import LeafSvg from "../../shared/svg/leaf2.svg";

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
     StyledSvg,
     StyledRightConatiner,
} from "../../styles/auth/StyledSignUp";

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
     const [isLoading, setIsLoading] = useState<boolean>(false);
     const [xButtonClicked, setXButtonClicked] = useState<boolean>(false);

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
                    setIsLoading(false);
                    return setFormRequestError("All fileds must not be empty");
               }
          }
          try {
               setIsLoading(true);
               const { data } = await axios.post("/api/users/signin", {
                    email: inputsState.email.value,
                    password: inputsState.password.value,
               });
               setIsLoading(false);
               console.log(data);
               Router.push("/");
          } catch (err: any) {
               setIsLoading(false);
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
     console.log(isLoading);
     useEffect(() => {
          setFormRequestError(null);
     }, [inputsState]);

     return (
          <StyledPageContainer>
               <StyledSignupContainer>
                    <StyledRow>
                         <StyledXButton
                              absolute={true}
                              btnClicked={xButtonClicked}
                              onClick={() => {
                                   setXButtonClicked((prevState) => !prevState);
                                   setTimeout(() => {
                                        Router.push("/");
                                   }, 400);
                              }}
                         >
                              X
                         </StyledXButton>
                         <StyledLeftContent>
                              <StyledTitle>Sign In</StyledTitle>
                              <StyledRow
                                   alignItems="baseline"
                                   gap="48px"
                                   justifayContent="flex-start"
                              >
                                   <StyledSubtitle>New user?</StyledSubtitle>
                                   <StyledButton
                                        onClick={() =>
                                             Router.push("/auth/signup")
                                        }
                                   >
                                        <StyledSpan
                                             color={colors.backgroundGreen}
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
                                             color={colors.backgroundGreen}
                                        />
                                        <StyledSpan
                                             fontSize="1.7rem"
                                             fontWeight="bold"
                                        >
                                             Keep me signed in
                                        </StyledSpan>
                                   </StyledRow>
                                   <StyledParimaryButton>
                                        {isLoading ? (
                                             <ParimaryLoader
                                                  loading={isLoading}
                                             />
                                        ) : (
                                             "Sign In"
                                        )}
                                   </StyledParimaryButton>
                                   {/* <StyledRow alignItems="center">
                                   <StyledHr></StyledHr>
                                   <StyledSpan fontSize="1.4rem">
                                        Or Sign In With
                                   </StyledSpan>
                                   <StyledHr></StyledHr>
                              </StyledRow> */}
                              </StyledForm>
                         </StyledLeftContent>
                         <StyledRightConatiner>
                              <StyledSvg>
                                   <LeafSvg />
                              </StyledSvg>
                         </StyledRightConatiner>
                    </StyledRow>
               </StyledSignupContainer>
          </StyledPageContainer>
     );
};
export default Signup;
