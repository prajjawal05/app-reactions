import React, { useState, useCallback } from "react";
import { debounce } from "debounce";
import { REACTION_TYPES } from "../../config/constants";


const DEFAULT_REACTION_COUNTS = Object.values(REACTION_TYPES).reduce((acc, reactionType) => {
    acc[reactionType] = 0; 
    return acc;
 } , {})


const sendDataToBackend = debounce((reactionToSend) => console.log(reactionToSend), 500);

const withHandlers = WrappedComponent => props => {
    const [reactions, updateReactions] = useState(DEFAULT_REACTION_COUNTS);
    
    const resetReactions = useCallback(debounce(() => {
        updateReactions(DEFAULT_REACTION_COUNTS);
    }, 500), []);

    const sendAndResetReactions = useCallback(() => {
        sendDataToBackend(reactions);
        resetReactions();
    }, [resetReactions, reactions]);

    const handleReaction = useCallback((reactionType) => {
        updateReactions(reactions => ({...reactions, [reactionType]: reactions[reactionType]+1}));
        sendAndResetReactions();
    }, [reactions, sendAndResetReactions]);

    return <WrappedComponent onReact={handleReaction}/>
};

export default withHandlers;