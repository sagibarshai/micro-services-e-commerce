import styled from "styled-components";
import { colors } from "../../shared/colors/colors";
import useMenageLinks from "../../shared/hooks/useMenageLinks";
import IconApp from "../../shared/components/IconApp";
import CustomLink from "../../shared/components/CustomLink";
import CartIcon from "../../shared/components/CartIcon";
import { useSelector } from "react-redux";
import { StoreState } from "../../redux/store";
interface StyledProps {
     isActive?: boolean;
     gap?: string;
     marginLeft?: string;
     marginRight?: string;
}

const StyledHeader = styled.header`
     width: 100vw;
     height: 120px;
     background-color: ${colors.praimaryPink};
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
const StyledTooltip = styled.div`
     position: absolute;
     height: 50px;
     width: 100px;
     background-color: ${colors.white};
     top: 100%;
     left: 50%;
     transform: translate(-50%, -10%);
     clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
`;
export default () => {
     const { links } = useMenageLinks();
     const itemsInCart: number = useSelector(
          (state: StoreState) => state.cartSlice.cartItems.length
     );
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
                    <CartIcon itemsInCart={itemsInCart}>
                         <StyledTooltip />
                    </CartIcon>
                    {links.map((link) => {
                         if (link.path !== "/auth/signin") return;
                         return <CustomLink link={link} />;
                    })}
               </StyledDivRow>
          </StyledHeader>
     );
};
