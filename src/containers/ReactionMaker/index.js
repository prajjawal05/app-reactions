import React from "react";
import ReactionButton from "../../components/ReactionButton";
import { REACTION_TYPES } from "../../config/constants";


const ReactionMaker = () => (
    <div style={{display: "flex", justifyContent: "space-around", flexDirection: "column", marginLeft:"10px"}}>
        {Object.values(REACTION_TYPES).map(reactionType => (
            <ReactionButton key={reactionType} reactionType={reactionType}/>
        ))}
    </div>
);

export default ReactionMaker;