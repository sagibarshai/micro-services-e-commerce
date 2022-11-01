import styled from "styled-components";
import IconFacebook from "../../shared/svg/icon-facebook.svg";
import IconInstagram from "../../shared/svg/icon-instagram.svg";
import IconTwitter from "../../shared/svg/icon-twitter.svg";
import IconMail from "../../shared/svg/icon-mail.svg";
import IconPhone from "../../shared/svg/icon-phone.svg";

interface Props {
     justifyContent?: string;
     gap?: string;
     fontSize?: string;
     fontWeight?: string;
     height?: string;
     width?: string;
     alignItems?: string;
     margin?: string;
}

const StyledFooterContainer = styled.footer<Props>`
     height: 250px;
     display: flex;
     align-items: center;
     justify-content: center;
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
     align-items: ${(props) => props.alignItems};
`;

const StyledDivRow = styled.div<Props>`
     display: flex;
     justify-content: ${(props) => props.justifyContent};
     gap: ${(props) => props.gap};
     height: ${(props) => props.height};
     align-items: center;
     width: ${(props) => props.width};
`;
const StyledWrapper = styled.div<Props>`
     display: flex;
     align-items: center;
     justify-content: center;
     margin: ${(props) => props.margin};
`;

const StyledIcon = styled.i<Props>`
     margin: ${(props) => props.margin};
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
     { icon: <IconPhone />, text: "0546077403" },
     { icon: <IconMail />, text: "sagibarshai1@gmail.com" },
];

const StyledFooter = (props: Props) => {
     return (
          <StyledFooterContainer>
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
                                        <StyledIcon>{element.icon}</StyledIcon>
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
                                        <StyledWrapper>
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
