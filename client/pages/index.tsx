import { useRouter } from "next/router";
import { useState, useEffect } from "react";
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

import { StyledParimaryButton } from "../shared/ui-elements/button/button";
import { colors } from "../shared/colors/colors";

import LeafsSvg from "../shared/svg/homepage-leafs-background.svg";
import IconHome from "../shared/svg/home.svg";
import IconArrow from "../shared/svg/arrow.svg";
import IconLeaf from "../shared/svg/black-leaf.svg";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateCart } from "../redux/cartSlice";

export type Size = "S" | "M" | "L";

interface IconSections {
     icon: React.ReactElement;
     text: string;
     navigateTo: string;
     id: string;
}
interface ImagesSection {
     imgSrc: string;
     text: string;
     size?: Size;
     price?: number;
     id: string;
}

const firstSectionIcons: IconSections[] = [
     {
          icon: <IconHome />,
          text: "Indoor plants",
          navigateTo: "/shop/#Indoor plants",
          id: "a",
     },
     {
          icon: <IconArrow />,
          text: "Outdoor plant",
          navigateTo: "/shop/#Outdoor plants",
          id: "b",
     },
     { icon: <IconLeaf />, text: "Contant us", navigateTo: "#footer", id: "c" },
];

const firstSectionImages: ImagesSection[] = [
     {
          imgSrc: "/images/coconut.png",
          text: "Coconut plant",
          size: "L",
          id: "d",
     },
     {
          imgSrc: "/images/chair.png",
          text: "Chairs",
          size: "L",
          id: "e",
     },
];
const secondSectionImages: ImagesSection[] = [
     {
          imgSrc: "/images/minimalistic-picture.png",
          text: "Minimalistic picture",
          size: "M",
          id: "f",
     },
     {
          imgSrc: "/images/stylish-chair.png",
          text: "Stylish chair",
          size: "M",
          id: "g",
     },
     { imgSrc: "/images/bamboo.png", text: "Bamboo plant", size: "M", id: "h" },
];
const thirdSectionImages: ImagesSection[] = [
     {
          imgSrc: "/images/chair.png",
          text: "Lola chair",
          size: "L",
          price: 300,
          id: "i",
     },
     {
          imgSrc: "/images/ficus.png",
          text: "Ficus",
          size: "L",
          price: 20,
          id: "j",
     },
     {
          imgSrc: "/images/magnet-butterly.png",
          text: "Magnet butterly",
          size: "M",
          price: 50,
          id: "k",
     },
     {
          imgSrc: "/images/sydney-chair.png",
          text: "Sydney chair",
          size: "M",
          price: 250,
          id: "m",
     },
     {
          imgSrc: "/images/orchid.png",
          text: "Orchid",
          size: "M",
          price: 60,
          id: "n",
     },
];
const App: NextPage = () => {
     const [buttonClicked, setButtonClicked] = useState<boolean>(false);
     const router = useRouter();
     const dispatch = useDispatch();

     useEffect(() => {
          const getCartItems = async () => {
               try {
                    const { data } = await axios.get("/api/cart/getCart");
                    dispatch(updateCart(data));
               } catch (err) {
                    console.log(err);
               }
          };
     }, []);

     return (
          <StyledPageContainer>
               <StyledSection height="min-content">
                    <StyledSvg>
                         <LeafsSvg width="50vw" />
                    </StyledSvg>
                    <StyledAbsoluteDivColumn>
                         <StyledTitle color={colors.backgroundGreen}>
                              Every plant has a story
                         </StyledTitle>
                         <StyledText width="560px" fontSize="1.8rem">
                              Make you're home beautiful with our plant and
                              accessories for your garden and house
                         </StyledText>
                         <StyledParimaryButton
                              width="200px"
                              height="48px"
                              onClick={() => router.push("/shop")}
                         >
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
                                   key={element.id}
                                   buttonClicked={buttonClicked}
                                   onClick={() => {
                                        setButtonClicked(true);
                                        setTimeout(
                                             () => setButtonClicked(false),
                                             500
                                        );
                                        router.push(element.navigateTo);
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
                                             key={element.id}
                                             gap="49px"
                                        >
                                             <StyledImg
                                                  src={element.imgSrc}
                                                  size={element.size}
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
                    <StyledDivColumn
                         alignItem="center"
                         justifyContent="center"
                         padding="0 0 100px 0"
                    >
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
                                             key={element.id}
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
                              onClick={() => router.push("/shop")}
                         >
                              View All Products
                         </StyledParimaryButton>
                    </StyledDivColumn>
               </StyledSection>
               <StyledSection marginTop="127px">
                    <StyledDivColumn
                         alignItem="center"
                         justifyContent="center"
                         padding="0 0 100px 0"
                    >
                         <StyledTitle
                              fontWeight="bold"
                              fontSize="5.2rem"
                              color={colors.blackInputText}
                         >
                              On Sale This Week
                         </StyledTitle>
                         <StyledText
                              color={colors.garyText}
                              fontSize="2rem"
                              marginTop="27px"
                         >
                              Buy one of our chair and get a plant for free
                         </StyledText>
                         <StyledDivRow
                              gap="20px"
                              justifyContent="center"
                              marginTop="60px"
                         >
                              {thirdSectionImages.map((element) => {
                                   if (element.size === "L") {
                                        return (
                                             <StyledDivColumn
                                                  key={element.id}
                                                  gap="10px"
                                             >
                                                  <StyledImg
                                                       size={element.size}
                                                       src={element.imgSrc}
                                                  />
                                                  <StyledText
                                                       fontSize="1.6rem"
                                                       fontWeight="bold"
                                                       alignSelf="flex-start"
                                                  >
                                                       {element.text}
                                                  </StyledText>
                                                  <StyledText
                                                       fontSize="1.6rem"
                                                       alignSelf="flex-start"
                                                       color={colors.garyText}
                                                  >
                                                       {element.price}$
                                                  </StyledText>
                                             </StyledDivColumn>
                                        );
                                   }
                              })}
                         </StyledDivRow>
                         <StyledDivRow
                              gap="20px"
                              justifyContent="center"
                              marginTop="60px"
                         >
                              {thirdSectionImages.map((element) => {
                                   if (element.size === "M") {
                                        return (
                                             <StyledDivColumn
                                                  key={element.id}
                                                  gap="10px"
                                             >
                                                  <StyledImg
                                                       size={element.size}
                                                       src={element.imgSrc}
                                                  />
                                                  <StyledText
                                                       fontSize="1.6rem"
                                                       fontWeight="bold"
                                                       alignSelf="flex-start"
                                                  >
                                                       {element.text}
                                                  </StyledText>
                                                  <StyledText
                                                       fontSize="1.6rem"
                                                       alignSelf="flex-start"
                                                       color={colors.garyText}
                                                  >
                                                       {element.price}$
                                                  </StyledText>
                                             </StyledDivColumn>
                                        );
                                   }
                              })}
                         </StyledDivRow>
                    </StyledDivColumn>
               </StyledSection>
          </StyledPageContainer>
     );
};
export default App;
