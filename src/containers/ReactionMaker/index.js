import React from "react";
import ReactionButton from "../../components/ReactionButton";
import {REACTION_TYPES} from "../../constants";
import {isMobile} from "../../utils";

import {ReactionMakerContainer} from "./style"
import withHandlers from "./handlers";

const ReactionMaker = ({onReact}) => {
  return (
    <ReactionMakerContainer isMobile={isMobile}>
      <div className={"reactionButtons"}>
        {Object.values(REACTION_TYPES).map(reactionType => (
          <ReactionButton
            key={reactionType}
            reactionType={reactionType}
            onClick={onReact}
          />
        ))}
      </div>
    </ReactionMakerContainer>
  )
};


export default withHandlers(ReactionMaker);
