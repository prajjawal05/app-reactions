import React, { useState, useCallback } from "react";
import { debounce } from "debounce";
import { REACTION_TYPES } from "../../config/constants";


const DEFAULT_REACTION_COUNTS = Object.values(REACTION_TYPES).reduce((acc, reactionType) => {
    acc[reactionType] = 0; 
    return acc;
 } , {})


const withHandlers = WrappedComponent => props => {
    const [reactions, updateReactions] = useState(DEFAULT_REACTION_COUNTS);
    
    const resetReactions = useCallback(() => {
        updateReactions(DEFAULT_REACTION_COUNTS);    
    }, [updateReactions]);

    const sendDataAndReset = useCallback(debounce((reactionToSend) => {
        console.log(reactionToSend);
        resetReactions();
    }), [resetReactions]);

    // const debouncedSetDataAndReset = (sendDataAndReset, 500);

    const handleReaction = useCallback((reactionType) => {
        updateReactions(reactions => ({...reactions, [reactionType]: reactions[reactionType]+1}));
        sendDataAndReset(reactions);
    }, [reactions, sendDataAndReset]);

    return <WrappedComponent onReact={handleReaction}/>
};

export default withHandlers;