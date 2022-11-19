import Link from "next/link";
import styled, { css } from "styled-components";
import { colors } from "../colors/colors";
import { Link as LinkType } from "../hooks/useMenageLinks";

interface Props {
     link: LinkType;
     onClick?: () => void;
}
interface StyledProps {
     isActive: boolean;
}
const StyledLink = styled.a<StyledProps>`
     color: ${colors.garyText};
     text-decoration: none;
     font-size: 2rem;
     font-weight: bolder;
     cursor: pointer;
     ${(props) =>
          props.isActive &&
          css`
               border-bottom: 2px solid ${colors.backgroundGreen};
               color: ${colors.blackInputText};
          `};
`;
export default (props: Props) => {
     return (
          <Link key={props.link.path} href={props.link.path}>
               <StyledLink
                    isActive={props.link.isActive}
                    onClick={() => {
                         props.onClick && props.onClick();
                    }}
               >
                    {props.link.name}
               </StyledLink>
          </Link>
     );
};
