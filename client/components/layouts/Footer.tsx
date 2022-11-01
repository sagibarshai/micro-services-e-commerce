import styled from "styled-components";
import IconFacebook from "../../shared/svg/icon-facebook.svg";
import IconInstagram from "../../shared/svg/icon-instagram.svg";
import IconTwitter from "../../shared/svg/icon-twitter.svg";
import IconMail from "../../shared/svg/icon-mail.svg";

interface Props {
     justifyContent?: string;
     gap?: string;
     fontSize?: string;
     fontWeight?: string;
     height?: string;
}

const StyledFooterContainer = styled.footer<Props>`
     height: 200px;
`;

const StyledSubtitle = styled.h4<Props>`
     all: unset;
     font-weight: bold;
     font-size: ${(props) => props.fontSize || "2rem"};
     font-weight: ${(props) => props.fontWeight || "bold"};
`;
const StyledDivColumn = styled.div<Props>`
     display: flex;
     flex-direction: column;
     gap: ${(props) => props.gap};
`;

const StyledDivRow = styled.div<Props>`
     display: flex;
     justify-content: ${(props) => props.justifyContent};
     gap: ${(props) => props.gap};
     height: ${(props) => props.height};
     align-items: center;
`;

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
     { icon: <IconMail />, text: "0546077403" }, //shoud be iconPhone
     { icon: <IconMail />, text: "sagibarshai1@gmail.com" },
];
const StyledIcon = styled.i``;

const StyledFooter = (props: Props) => {
     return (
          <StyledFooterContainer>
               <StyledDivRow
                    {...props}
                    justifyContent="space-between"
                    height="100%"
               >
                    <StyledDivColumn gap="20px">
                         <StyledSubtitle fontWeight="bolder">
                              Follow us
                         </StyledSubtitle>
                         <StyledDivRow gap="20px">
                              {firstIconsSection.map((element) => {
                                   return (
                                        <StyledIcon>{element.icon}</StyledIcon>
                                   );
                              })}
                         </StyledDivRow>
                    </StyledDivColumn>
                    <StyledDivColumn gap="20px">
                         <StyledSubtitle fontWeight="bolder">
                              Follow us
                         </StyledSubtitle>
                         <StyledDivRow gap="20px">
                              {firstIconsSection.map((element) => {
                                   return (
                                        <StyledIcon>{element.icon}</StyledIcon>
                                   );
                              })}
                         </StyledDivRow>
                    </StyledDivColumn>
               </StyledDivRow>
          </StyledFooterContainer>
     );
};
export default StyledFooter;
