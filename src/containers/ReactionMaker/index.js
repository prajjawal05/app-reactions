import React from "react";
import ReactionButton from "../../components/ReactionButton";
import { REACTION_TYPES } from "../../config/constants";
import { isMobile } from "../../utils"

import withHandlers from "./handlers";

let REACTION_MAKER_STYLE = {
    display: "flex", 
    justifyContent: "space-around", 
    flexDirection: "column"
};

if(!isMobile){
    REACTION_MAKER_STYLE = { ...REACTION_MAKER_STYLE, marginLeft:"10px" }
}

const ReactionMaker = ({ onReact, reactions }) => (
    <div style={REACTION_MAKER_STYLE}>
        {Object.values(REACTION_TYPES).map(reactionType => (
            <ReactionButton key={reactionType} reactionCount={reactions[reactionType]} reactionType={reactionType} onClick={onReact}/>
        ))}
    </div>
);

export default withHandlers(ReactionMaker);