import { NextPage } from "next";
import {
     StyledPageContainer,
     StyledSvg,
     StyledTitle,
     StyledDivColumn,
     StyledText,
} from "../styles/home/StyledHomePage";
import LeafsSvg from "../shared/svg/homepage-leafs-background.svg";
import { StyledParimaryButton } from "../shared/ui-elements/button/button";
const App: NextPage = () => {
     return (
          <StyledPageContainer>
               <StyledSvg>
                    <LeafsSvg width="min-content" />
               </StyledSvg>
               <StyledDivColumn>
                    <StyledTitle>Every plant has a story</StyledTitle>
                    <StyledText>
                         Make you're home beautiful with our plant and
                         accessories for your garden and house
                    </StyledText>
                    <StyledParimaryButton>View More</StyledParimaryButton>
               </StyledDivColumn>
          </StyledPageContainer>
     );
};
export default App;
