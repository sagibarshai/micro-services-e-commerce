import { NextPage } from "next";
import styled from "styled-components";
import Router from "next/router";
import { ReducerAction, ReducerState, useReducer } from "react";
import axios from "axios";
const StyledDiv = styled.div`
     display: flex;
     flex-direction: column;
     justify-content: space-around;
     width: 50vw;
     height: 50vh;
     align-self: center;
     justify-self: center;
`;

const StyledInput = styled.input`
     width: 400px;
     height: 100px;
     border-radius: 10px;
     font-size: 1.2rem;
`;
interface InputState {
     value: string;
     isValid: boolean;
}

interface InputsState {
     email: InputState;
     password: InputState;
}

type Action =
     | ({
            type: "EMAIL_VALUE" | "PASSWORD_VALUE";
            payload: {
                 event: React.ChangeEvent<HTMLInputElement>;
            };
       } & ReducerAction<any>)
     | ({
            type: "EMAIL_VALIDATION" | "PASSWORD_VALIDATION";
            payload: {
                 event: React.ChangeEvent<HTMLInputElement>;
                 isValid: boolean;
            };
       } & ReducerAction<any>);

function inputsReducer(inputsState: InputsState, action: Action): InputsState {
     let emailUpdated: InputState = { ...inputsState.email };
     let passwordUpdated: InputState = { ...inputsState.password };
     console.log(action);
     switch (action.type) {
          case "EMAIL_VALUE":
               emailUpdated = {
                    ...inputsState.email,
                    value: action.payload.event.target.value,
               };
               return { ...inputsState, email: emailUpdated };
          case "PASSWORD_VALUE":
               passwordUpdated = {
                    ...inputsState.password,
                    value: action.payload.event.target.value,
               };
               return { ...inputsState, password: passwordUpdated };
          case "EMAIL_VALIDATION":
               emailUpdated = {
                    ...inputsState.email,
                    isValid: action.payload.isValid,
               };
               return { ...inputsState, email: emailUpdated };
          case "PASSWORD_VALIDATION":
               passwordUpdated = {
                    ...inputsState.password,
                    isValid: action.payload.isValid,
               };
               return { ...inputsState, password: passwordUpdated };
          default:
               return inputsState;
     }
}

const Signup: NextPage = () => {
     const [inputsState, dispatch] = useReducer(inputsReducer, {
          email: {
               value: "",
               isValid: false,
          },
          password: {
               value: "",
               isValid: false,
          },
     });
     const submitFunc = async () => {
          try {
               const { data } = await axios.post("/api/users/signup", {
                    email: inputsState.email.value,
                    password: inputsState.password.value,
               });
               console.log(data);
               Router.push("/api/users/currentuser");
          } catch (err) {
               console.log(err);
          }
     };
     return (
          <StyledDiv>
               <StyledInput
                    placeholder="email"
                    onChange={(e) => {
                         dispatch({
                              type: "EMAIL_VALUE",
                              payload: { event: e },
                         });
                    }}
               />
               <StyledInput
                    placeholder="password"
                    onChange={(e) => {
                         dispatch({
                              type: "PASSWORD_VALUE",
                              payload: { event: e },
                         });
                    }}
               />
               <StyledInput
                    // placeholder="password"
                    type="button"
                    value="submit"
                    onClick={submitFunc}
               />
               {/* <StyledInput value={""} placeholder="email" onChange={(e) => setEmail(e.target.value) }  />; */}
               {/* <StyledInput value={""} placeholder="email" onChange={(e) => setEmail(e.target.value) }  />; */}
          </StyledDiv>
     );
};
export default Signup;
