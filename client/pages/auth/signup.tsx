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
     StyledRightConatiner,
     StyledSvg,
} from "../../styles/auth/StyledSignUp";
import axios from "axios";
import { colors } from "../../shared/colors/colors";
import Input from "../../shared/ui-elements/input/Input";
import { StyledParimaryButton } from "../../shared/ui-elements/button/button";
import Notification from "../../shared/notification/Notification";
import InfoCircle from "../../shared/svg/info-circle.svg";
import { StyledXButton } from "../../shared/components/StyledXButton";
import LeafSvg from "../../shared/svg/leaf1.svg";
import ParimaryLoader from "../../shared/loading-elements/parimary-loader";
type InputsTypes = "email" | "password" | "firstName" | "lastName";

interface InputState {
     value: string;
     isValid: boolean;
}

interface InputsState {
     email: InputState;
     password: InputState;
     firstName: InputState;
     lastName: InputState;
}

type Action =
     | {
            type:
                 | "EMAIL_VALUE"
                 | "PASSWORD_VALUE"
                 | "FIRST_NAME_VALUE"
                 | "LAST_NAME_VALUE";
            payload: {
                 event: React.ChangeEvent<HTMLInputElement>;
            };
       } & React.ReducerAction<any>;

const checkInputValidation = (value: string) => (value.length ? true : false);

function inputsReducer(inputsState: InputsState, action: Action): InputsState {
     let emailUpdated: InputState = { ...inputsState.email };
     let passwordUpdated: InputState = { ...inputsState.password };
     let firstNameUpdated: InputState = { ...inputsState.firstName };
     let lastNameUpdated: InputState = { ...inputsState.lastName };
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
          case "FIRST_NAME_VALUE":
               firstNameUpdated = {
                    ...inputsState.firstName,
                    value: action.payload.event.target.value,
               };
               firstNameUpdated.isValid = checkInputValidation(
                    firstNameUpdated.value
               );

               return { ...inputsState, firstName: firstNameUpdated };
          case "LAST_NAME_VALUE":
               lastNameUpdated = {
                    ...inputsState.lastName,
                    value: action.payload.event.target.value,
               };
               lastNameUpdated.isValid = checkInputValidation(
                    lastNameUpdated.value
               );

               return { ...inputsState, lastName: lastNameUpdated };
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
          firstName: {
               ...initInputState,
          },
          lastName: {
               ...initInputState,
          },
     });
     const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          setIsLoading(true);
          let input: InputsTypes;
          for (input in inputsState) {
               if (!inputsState[input].isValid) {
                    setIsLoading(false);
                    return setFormRequestError("All filed must not be empty");
               }
          }
          try {
               const { data } = await axios.post("/api/users/signup", {
                    email: inputsState.email.value,
                    password: inputsState.password.value,
                    firstName: inputsState.firstName.value,
                    lastName: inputsState.lastName.value,
               });
               setIsLoading(false);
               console.log(data);
               Router.push("/api/users/currentuser");
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

     useEffect(() => {
          setFormRequestError(null);
     }, [inputsState]);

     return (
          <StyledPageContainer>
               <StyledSignupContainer>
                    <StyledXButton
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
                    <StyledRow>
                         <StyledLeftContent>
                              <StyledTitle>Create An Account</StyledTitle>
                              <StyledRow
                                   alignItems="baseline"
                                   gap="8px"
                                   justifayContent="flex-start"
                              >
                                   <StyledSubtitle>
                                        Already an user?
                                   </StyledSubtitle>
                                   <StyledButton
                                        onClick={() =>
                                             Router.push("/auth/signin")
                                        }
                                   >
                                        <StyledSpan
                                             color={colors.secondaryGreen}
                                             fontSize="1.7rem"
                                             fontWeight="bolder"
                                        >
                                             Sign In
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
                                   <StyledRow gap="14px">
                                        <Input
                                             variant="medium"
                                             placeholder="First Name"
                                             onChange={(e) =>
                                                  dispatch({
                                                       type: "FIRST_NAME_VALUE",
                                                       payload: { event: e },
                                                  })
                                             }
                                        />
                                        <Input
                                             variant="medium"
                                             placeholder="Last Name"
                                             onChange={(e) =>
                                                  dispatch({
                                                       type: "LAST_NAME_VALUE",
                                                       payload: { event: e },
                                                  })
                                             }
                                        />
                                   </StyledRow>
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
                                        placeholder="Password"
                                        type="password"
                                        onChange={(e) =>
                                             dispatch({
                                                  type: "PASSWORD_VALUE",
                                                  payload: { event: e },
                                             })
                                        }
                                   />
                                   <StyledParimaryButton>
                                        {isLoading ? (
                                             <ParimaryLoader
                                                  loading={isLoading}
                                             />
                                        ) : (
                                             "Sign Up"
                                        )}{" "}
                                   </StyledParimaryButton>
                                   {/* <StyledRow alignItems="center">
                                        <StyledHr></StyledHr>
                                        <StyledSpan
                                             fontSize="1.4rem"
                                             fontWeight="bolder"
                                        >
                                             Or Sign In With
                                        </StyledSpan>
                                        <StyledHr></StyledHr>
                                   </StyledRow> */}
                              </StyledForm>
                         </StyledLeftContent>
                         <StyledRightConatiner>
                              <StyledSvg
                                   style={{
                                        width: "202px",
                                        height: "445px",
                                        display: "flex",
                                   }}
                              >
                                   <LeafSvg />
                              </StyledSvg>
                         </StyledRightConatiner>
                    </StyledRow>
               </StyledSignupContainer>
          </StyledPageContainer>
     );
};
export default Signup;
