import styled from "styled-components";
interface CheckboxProps {
     checked?: boolean;
     color?: string;
     width?: string;
     height?: string;
     onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
     alignSelf: string;
     borderRadius: string;
}
const Checkbox = styled.input<CheckboxProps>`
     &:checked {
          accent-color: ${(props) => props.color};
          color: white;
          background-color: white;
     }
     width: ${(props) => props.width};
     height: ${(props) => props.height};
     align-self: ${(props) => props.alignSelf};
     border-radius: ${(props) => props.borderRadius};
`;

export default (props: CheckboxProps) => (
     <Checkbox {...props} type="checkbox" />
);
