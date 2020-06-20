import React from "react";
import ReactionButton from "../../components/ReactionButton";
import { REACTION_TYPES } from "../../config/constants";

import withHandlers from "./handlers";

const ReactionMaker = ({ onReact, reactions }) => (
    <div style={{display: "flex", justifyContent: "space-around", flexDirection: "column", marginLeft:"10px"}}>
        {Object.values(REACTION_TYPES).map(reactionType => (
            <ReactionButton key={reactionType} reactionCount={reactions[reactionType]} reactionType={reactionType} onClick={onReact}/>
        ))}
    </div>
);

export default withHandlers(ReactionMaker);