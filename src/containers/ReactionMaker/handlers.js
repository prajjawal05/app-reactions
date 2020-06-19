import React, { useState, useCallback, useEffect } from "react";
import { debounce } from "debounce";
import { REACTION_TYPES } from "../../config/constants";


const DEFAULT_REACTION_COUNTS = Object.values(REACTION_TYPES).reduce((acc, reactionType) => {
    acc[reactionType] = 0; 
    return acc;
 } , {})


 const sendReactionsToBackend = debounce((reactionToSend) => fetch('/react?op=update', {
    method: 'POST',
    body: JSON.stringify(reactionToSend),
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  }), 
10);

const getPeerReactionsFromBackend = () => fetch('/react?op=get', {
    method: 'POST',
    body: {},
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  });

const withPeerReactions = WrappedComponent => props => {
    const [peerReactions, updatePeerReactions] = useState(DEFAULT_REACTION_COUNTS);
    setInterval(() => {
        getPeerReactionsFromBackend()
        .then(response => response.json())
        .then(reactions => updatePeerReactions(reactions));
    }, 3000);

    return <WrappedComponent peerReactions={peerReactions}/>
};

const withReactionHandlers = WrappedComponent => props => {
    const [reactions, updateReactions] = useState(DEFAULT_REACTION_COUNTS);
    
    const resetReactions = useCallback(debounce(() => {
        updateReactions(DEFAULT_REACTION_COUNTS);
    }, 20), []);

    const sendAndResetReactions = useCallback(() => {
        sendReactionsToBackend(reactions);
        resetReactions();
    }, [resetReactions, reactions]);

    const handleReaction = useCallback((reactionType) => {
        updateReactions(reactions => ({...reactions, [reactionType]: reactions[reactionType]+1}));
        sendAndResetReactions();
    }, [reactions, sendAndResetReactions]);

    return <WrappedComponent ownReactions={reactions} onReact={handleReaction} {...props}/>
};

const withAddedReactions = WrappedComponent => ({peerReactions, ownReactions, ...restProps}) => {
    const reactions = DEFAULT_REACTION_COUNTS;
    useEffect(() => {
        Object.keys(REACTION_TYPES).map(reactionType => {
        reactions[reactionType] = peerReactions[reactionType] + ownReactions[reactionType];
    })
    },[peerReactions, ownReactions]);
    return <WrappedComponent reactions={reactions} {...restProps}/>
};

export {
    withPeerReactions,
    withReactionHandlers,
    withAddedReactions
};