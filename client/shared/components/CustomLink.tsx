import Link from "next/link";
import styled, { css } from "styled-components";
import { colors } from "../colors/colors";
import { Link as LinkType } from "../hooks/useMenageLinks";

interface Props {
     link: LinkType;
}
interface StyledProps {
     isActive: boolean;
}
const StyledLink = styled.a<StyledProps>`
     color: ${colors.textGreen};
     text-decoration: none;
     font-size: 2rem;
     font-weight: bolder;
     cursor: pointer;
     ${(props) =>
          props.isActive &&
          css`
               border-bottom: 1px solid ${colors.textGreen};
               color: ${colors.blackInputText};
          `};
`;
export default (props: Props) => {
     return (
          <Link key={props.link.path} href={props.link.path}>
               <StyledLink isActive={props.link.isActive}>
                    {props.link.name}
               </StyledLink>
          </Link>
     );
};
