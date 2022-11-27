import IconFacebook from "../../shared/svg/icon-facebook.svg";
import IconInstagram from "../../shared/svg/icon-instagram.svg";
import IconTwitter from "../../shared/svg/icon-twitter.svg";
import IconMail from "../../shared/svg/icon-mail.svg";
import IconPhone from "../../shared/svg/icon-phone.svg";

import {
     StyledDivColumn,
     StyledDivRow,
     StyledFooterContainer,
     StyledIcon,
     StyledSubtitle,
     StyledWrapper,
     StyledProps,
} from "../../styles/footer/footer-style";

interface IconSection {
     icon: React.ReactElement;
     text?: string;
}

const firstIconsSection: IconSection[] = [
     { icon: <IconFacebook /> },
     { icon: <IconTwitter /> },
     { icon: <IconInstagram /> },
];
const secondIconsSection: IconSection[] = [
     { icon: <IconPhone />, text: "0546077403" },
     { icon: <IconMail />, text: "sagibarshai1@gmail.com" },
];

const StyledFooter = (props: StyledProps) => {
     return (
          <StyledFooterContainer id="footer">
               <StyledDivRow
                    {...props}
                    justifyContent="space-between"
                    height="100%"
                    width="60vw"
               >
                    <StyledDivColumn gap="20px" alignItems="center">
                         <StyledSubtitle fontWeight="bolder">
                              Follow us
                         </StyledSubtitle>
                         <StyledDivRow gap="20px">
                              {firstIconsSection.map((element) => {
                                   return (
                                        <StyledIcon key={element.text}>
                                             {element.icon}
                                        </StyledIcon>
                                   );
                              })}
                         </StyledDivRow>
                    </StyledDivColumn>
                    <StyledDivColumn gap="20px" alignItems="center">
                         <StyledSubtitle fontWeight="bolder">
                              Content us
                         </StyledSubtitle>
                         <StyledDivRow gap="70px">
                              {secondIconsSection.map((element) => {
                                   return (
                                        <StyledWrapper key={element.text}>
                                             <StyledIcon margin="0 15px 0 0">
                                                  {element.icon}
                                             </StyledIcon>
                                             <StyledSubtitle>
                                                  {element.text}
                                             </StyledSubtitle>
                                        </StyledWrapper>
                                   );
                              })}
                         </StyledDivRow>
                    </StyledDivColumn>
               </StyledDivRow>
          </StyledFooterContainer>
     );
};
export default StyledFooter;
