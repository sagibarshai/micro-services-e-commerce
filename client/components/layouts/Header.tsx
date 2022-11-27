import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import useMenageLinks from "../../shared/hooks/useMenageLinks";
import { updateCart } from "../../redux/cartSlice";
import CustomLink from "../../shared/components/CustomLink";
import { StoreState } from "../../redux/store";

import IconApp from "../../shared/components/IconApp";
import CartIcon from "../../shared/components/CartIcon";

import {
     StyledDivRow,
     StyledHeader,
     StyledTooltip,
} from "../../styles/header/header-style";

interface Props {
     currentuser: {
          email: string;
     } | null;
}

export default (props: Props) => {
     const { links } = useMenageLinks();
     const dispatch = useDispatch();
     const itemsInCart: number = useSelector(
          (state: StoreState) => state.cartSlice.cartItems?.length
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
                         return <CustomLink key={link.name} link={link} />;
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
