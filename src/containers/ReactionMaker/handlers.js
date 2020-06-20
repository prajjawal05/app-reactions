import React, { useState, useCallback, useEffect, useMemo } from "react";
import { debounce } from "debounce";
import {compose} from "../../utils";
import { REACTION_TYPES } from "../../config/constants";


const DEFAULT_REACTION_COUNTS = Object.values(REACTION_TYPES).reduce((acc, reactionType) => {
    acc[reactionType] = 0; 
    return acc;
 } , {})


 const sendReactionsToBackend = debounce(reactionToSend => fetch('https://d2vxsg0gkt3p4m.cloudfront.net/react?op=update', {
    method: 'POST',
    body: JSON.stringify(reactionToSend),
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  }), 
200);

const getPeerReactionsFromBackend = () => fetch('https://d2vxsg0gkt3p4m.cloudfront.net/react?op=get', {
    method: 'POST',
    body: JSON.stringify({}),
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  });

const withPeerReactions = WrappedComponent => props => {
    const [peerReactions, updatePeerReactions] = useState(DEFAULT_REACTION_COUNTS);
    useEffect(() => {
        setInterval(() => {
            getPeerReactionsFromBackend()
            .then(response => response.json())
            .then(updatePeerReactions);
        }, 3000);
    }, []);

    return <WrappedComponent peerReactions={peerReactions}/>
};

const withReactionHandlers = WrappedComponent => props => {
    const [reactions, updateReactions] = useState(DEFAULT_REACTION_COUNTS);
    
    const resetReactions = useCallback(debounce(() => {
        updateReactions(DEFAULT_REACTION_COUNTS);
    }, 200), []);

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
    const reactions = useMemo(() =>
        Object.keys(REACTION_TYPES).reduce((acc, reactionType) => {
        acc[reactionType] = peerReactions[reactionType] + ownReactions[reactionType]
        return acc;
        }, {...DEFAULT_REACTION_COUNTS}
    ),[ownReactions, peerReactions]);
    return <WrappedComponent reactions={reactions} {...restProps}/>
};

export default compose(
    withPeerReactions,
    withReactionHandlers,
    withAddedReactions
);