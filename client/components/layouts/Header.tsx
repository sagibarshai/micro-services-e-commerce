import styled from "styled-components";
import { colors } from "../../shared/colors/colors";

const StyledHeader = styled.header`
     width: 100vw;
     height: 120px;
     background-color: ${colors.paimaryGrey};
     display: flex;
     z-index: 2;
     position: sticky;
     top: 0;
`;

export default () => <StyledHeader></StyledHeader>;
