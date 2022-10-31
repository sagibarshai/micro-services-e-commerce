import { NextPage } from "next";
import {
     StyledPageContainer,
     StyledSvg,
     StyledTitle,
     StyledAbsoluteDivColumn,
     StyledText,
     StyledSection,
     StyledDivRow,
     StyledDivColumn,
     StyledIconButton,
     StyledImg,
} from "../styles/home/StyledHomePage";
import LeafsSvg from "../shared/svg/homepage-leafs-background.svg";
import { StyledParimaryButton } from "../shared/ui-elements/button/button";
import { colors } from "../shared/colors/colors";
import IconHome from "../shared/svg/home.svg";
import IconArrow from "../shared/svg/arrow.svg";
import IconLeaf from "../shared/svg/black-leaf.svg";
import { useState } from "react";

interface IconSections {
     icon: React.ReactElement;
     text: string;
}
interface ImagesSection {
     imgSrc: string;
     text: string;
}

const firstSectionIcons: IconSections[] = [
     { icon: <IconHome />, text: "Indoor plant" },
     { icon: <IconArrow />, text: "Outdoor plant" },
     { icon: <IconLeaf />, text: "Contant us" },
];

const firstSectionImages: ImagesSection[] = [
     {
          imgSrc: "/images/coconut.png",
          text: "Coconut plant",
     },
     {
          imgSrc: "/images/chair.png",
          text: "Chairs",
     },
];
const secondSectionImages: ImagesSection[] = [
     {
          imgSrc: "/images/minimalistic-picture.png",
          text: "Minimalistic picture",
     },
     { imgSrc: "/images/stylish-chair.png", text: "Stylish chair" },
     { imgSrc: "/images/bamboo.png", text: "Bamboo plant" },
];
const App: NextPage = () => {
     const [buttonClicked, setButtonClicked] = useState<boolean>(false);
     return (
          <StyledPageContainer>
               <StyledSection height="min-content">
                    <StyledSvg>
                         <LeafsSvg width="min-content" />
                    </StyledSvg>
                    <StyledAbsoluteDivColumn>
                         <StyledTitle>Every plant has a story</StyledTitle>
                         <StyledText width="560px" fontSize="1.8rem">
                              Make you're home beautiful with our plant and
                              accessories for your garden and house
                         </StyledText>
                         <StyledParimaryButton width="200px" height="48px">
                              View More
                         </StyledParimaryButton>
                    </StyledAbsoluteDivColumn>
               </StyledSection>
               <StyledDivRow
                    alignItem="center"
                    justifyContent="center"
                    height="300px"
                    gap="157px"
               >
                    {firstSectionIcons.map((element) => {
                         return (
                              <StyledIconButton
                                   buttonClicked={buttonClicked}
                                   onClick={() => {
                                        setButtonClicked(true);
                                        setTimeout(
                                             () => setButtonClicked(false),
                                             500
                                        );
                                   }}
                              >
                                   <StyledDivColumn gap="38px">
                                        {element.icon}
                                        <StyledText
                                             fontWeight="bold"
                                             fontSize="1.8rem"
                                        >
                                             {element.text}
                                        </StyledText>
                                   </StyledDivColumn>
                              </StyledIconButton>
                         );
                    })}
               </StyledDivRow>

               <StyledSection height="max-content" marginTop="100px">
                    <StyledDivColumn justifyContent="center">
                         <StyledTitle
                              fontWeight="bolder"
                              color={colors.blackInputText}
                              fontSize="5.2rem"
                         >
                              This Week Highlights
                         </StyledTitle>
                         <StyledDivRow
                              justifyContent="center"
                              gap="36px"
                              marginTop="82px"
                              padding="0 0 100px 0"
                         >
                              {firstSectionImages.map((element) => {
                                   return (
                                        <StyledDivColumn
                                             key={element.imgSrc}
                                             gap="49px"
                                        >
                                             <StyledImg
                                                  src={element.imgSrc}
                                                  width="528px"
                                                  height="352px"
                                             />
                                             <StyledText
                                                  fontSize="2.6rem"
                                                  fontWeight="bolder"
                                             >
                                                  {element.text}
                                             </StyledText>
                                        </StyledDivColumn>
                                   );
                              })}
                         </StyledDivRow>
                    </StyledDivColumn>
               </StyledSection>
               <StyledSection backgroundColor="transparent" marginTop="90px">
                    <StyledDivColumn alignItem="center" justifyContent="center">
                         <StyledTitle
                              fontWeight="bold"
                              fontSize="5.2rem"
                              color={colors.blackInputText}
                         >
                              Trending Products
                         </StyledTitle>
                         <StyledDivRow
                              gap="60px"
                              marginTop="90px"
                              justifyContent="center"
                         >
                              {secondSectionImages.map((element) => {
                                   return (
                                        <StyledDivColumn
                                             key={element.imgSrc}
                                             gap="26px"
                                             alignItem="center"
                                        >
                                             <StyledImg
                                                  src={element.imgSrc}
                                                  width="344px"
                                                  height="234px"
                                             />
                                             <StyledText
                                                  fontSize="1.6rem"
                                                  fontWeight="bold"
                                             >
                                                  {element.text}
                                             </StyledText>
                                        </StyledDivColumn>
                                   );
                              })}
                         </StyledDivRow>
                         <StyledParimaryButton
                              marginTop="72px"
                              width="200px"
                              height="48px"
                              backgroundColor={colors.whiteBackground}
                              color={colors.blackInputText}
                         >
                              View All Products{" "}
                         </StyledParimaryButton>
                    </StyledDivColumn>
               </StyledSection>
          </StyledPageContainer>
     );
};
export default App;
