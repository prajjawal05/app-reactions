import React from "react";
import ReactionButton from "../../components/ReactionButton";
import {REACTION_TYPES} from "../../config/constants";

import withHandlers from "./handlers";
import "./style.css"

const ReactionMaker = ({onReact, reactions}) => {
  return (
    <div className={"reactionMakerContainer"}>
      <div className={"reactionButtons"}>
        {Object.values(REACTION_TYPES).map(reactionType => (
          <ReactionButton key={reactionType} reactionCount={reactions[reactionType]} reactionType={reactionType}
                          onClick={onReact}/>
        ))}
      </div>
    </div>
  )
};


export default withHandlers(ReactionMaker);
