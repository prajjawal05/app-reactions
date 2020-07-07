import React, {useRef, useState,  useEffect} from "react";
import ReactionButton from "../../components/ReactionButton";
import FloatingReactions from "../../components/FloatingReactions";
import {REACTION_TYPES} from "../../config/constants";

import withHandlers from "./handlers";

const REACTION_MAKERS_STYLE = {
  position: "absolute",
  right: "0px",
  top: "0px",
  height: "100%"
};

const REACTION_BUTTONS_STYLE = {
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  flexDirection: "column",
  height: "100%"
};

const ReactionMaker = ({onReact, reactions}) => {
  return (
    <div style={REACTION_MAKERS_STYLE}>
      <div style={REACTION_BUTTONS_STYLE}>
        {Object.values(REACTION_TYPES).map(reactionType => (
          <ReactionButton key={reactionType} reactionCount={reactions[reactionType]} reactionType={reactionType}
                          onClick={onReact}/>
        ))}
      </div>
    </div>
  )
};

//opacity abd rabdin generator

export default withHandlers(ReactionMaker);
