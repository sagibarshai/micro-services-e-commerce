import styled from "styled-components";
import { colors } from "../../shared/colors/colors";
import useMenageLinks from "../../shared/hooks/useMenageLinks";
import IconApp from "../../shared/components/IconApp";
import CustomLink from "../../shared/components/CustomLink";
import CartIcon from "../../shared/components/CartIcon";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../../redux/store";
import axios from "axios";
import { updateCart } from "../../redux/cartSlice";
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

interface Props {
     currentuser: {
          email: string;
     } | null;
}

export default (props: Props) => {
     const { links } = useMenageLinks();
     const dispatch = useDispatch();
     const itemsInCart: number = useSelector(
          (state: StoreState) => state.cartSlice.cartItems.length
     );
     const isAuth: boolean = props.currentuser ? true : false;
     const logoutHandler = async () => {
          try {
               const { data } = await axios.post("/api/users/signout");
               dispatch(updateCart([]));
               console.log(data);
          } catch (err) {
               console.log(err);
          }
     };
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
                    {!isAuth ? (
                         <CustomLink
                              link={
                                   links.find(
                                        (link) => link.name === "Sign in"
                                   )!
                              }
                         />
                    ) : (
                         <CustomLink
                              onClick={() => logoutHandler()}
                              link={
                                   links.find(
                                        (link) => link.name === "Sign out"
                                   )!
                              }
                         />
                    )}
               </StyledDivRow>
          </StyledHeader>
     );
};
