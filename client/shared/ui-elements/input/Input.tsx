import styled, { css } from "styled-components";
import { colors } from "../../colors/colors";
interface InputVariant {
     variant: "large" | "medium";
     placeholder: string;
     onChange: (event: React.ChangeEvent<HTMLInputElement>) => any;
     onFocus?: () => void;
     type?: string;
}

const StyledInput = styled.input<InputVariant>`
     height: 54px;
     border-radius: 16px;
     color: ${colors.blackInputText};
     background-color: ${colors.paimaryGrey};
     border-color: transparent;
     color: ${colors.praimarylack};
     font-size: 1.8rem;
     text-indent: 18px;
     &:focus {
          border: none;
          outline: none;
          outline: ${`2px solid ${colors.secondaryGreen}`};
     }
     ${(props) =>
          props.variant === "medium"
               ? css`
                      width: 174px;
                 `
               : css`
                      width: 365px;
                 `}
`;
export default (props: InputVariant) => {
     return <StyledInput {...props} />;
};
