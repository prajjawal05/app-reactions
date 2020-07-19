import styled from "styled-components";
import {ICON_SIZES} from "../../config/constants";

export const ReactionMakerContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: ${props => props.isMobile ? ICON_SIZES.MOBILE : ICON_SIZES.DESKTOP};

  .reactionButtons {
      display: ${props => props.isMobile ? "flex" : "none"};
      justify-content: space-around;
      align-items: center;
      flex-direction: column;
      height: 100%;
  }

  :hover > .reactionButtons{
      display: flex;
  }
`;
