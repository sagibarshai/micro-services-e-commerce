import styled from "styled-components";
import { colors } from "../../shared/colors/colors";
import useMenageLinks from "../../shared/hooks/useMenageLinks";
import IconApp from "../../shared/components/IconApp";
import CustomLink from "../../shared/components/CustomLink";
import CartIcon from "../../shared/components/CartIcon";
interface StyledProps {
     isActive?: boolean;
     gap?: string;
     marginLeft?: string;
     marginRight?: string;
}

const StyledHeader = styled.header`
     width: 100vw;
     height: 120px;
     background-color: ${colors.paimaryGrey};
     display: flex;
     z-index: 2;
     position: sticky;
     top: 0;
     align-items: center;
     justify-content: space-between;
`;
const StyledDivRow = styled.div<StyledProps>`
     display: flex;
     gap: ${(props) => props.gap};
     margin-left: ${(props) => props.marginLeft};
     margin-right: ${(props) => props.marginRight};
     height: 42px;
`;

export default () => {
     const { links } = useMenageLinks();
     return (
          <StyledHeader>
               <StyledDivRow gap="22px" marginLeft="60px">
                    {links.map((link) => {
                         if (link.path.startsWith("/auth")) return;
                         return <CustomLink link={link} />;
                    })}
               </StyledDivRow>
               <IconApp />
               <StyledDivRow marginRight="58px" gap="22px">
                    <CartIcon />
                    {links.map((link) => {
                         if (link.path !== "/auth/signin") return;
                         return <CustomLink link={link} />;
                    })}
               </StyledDivRow>
          </StyledHeader>
     );
};
