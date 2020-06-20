import React, { useState, useCallback, useEffect, useMemo } from "react";
import { debounce } from "debounce";
import {compose} from "../../utils";
import { REACTION_TYPES } from "../../config/constants";


const DEFAULT_REACTION_COUNTS = Object.values(REACTION_TYPES).reduce((acc, reactionType) => {
    acc[reactionType] = 0; 
    return acc;
 } , {})


 const sendReactionsToBackend = debounce(reactionToSend => fetch('/react?op=update', {
    method: 'POST',
    body: JSON.stringify(reactionToSend),
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  }), 
200);

const getPeerReactionsFromBackend = () => fetch('/react?op=get', {
    method: 'POST',
    body: JSON.stringify({}),
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  });


const withReactionStates = WrappedComponent => props => {
    const [peerReactions, updatePeerReactions] = useState(DEFAULT_REACTION_COUNTS);
    const [ownReactions, updateOwnReactions] = useState(DEFAULT_REACTION_COUNTS);
    const resetOwnReactions = useCallback(() => {
        updateOwnReactions(DEFAULT_REACTION_COUNTS);
    });

    return <WrappedComponent 
        peerReactions={peerReactions}
        ownReactions={ownReactions}
        updatePeerReactions={updatePeerReactions}
        updateOwnReactions={updateOwnReactions}
        resetOwnReactions={resetOwnReactions}
    />
}


const withPeerReactionScheduler = WrappedComponent => ({updatePeerReactions, resetOwnReactions, ...restProps}) => {
    useEffect(() => {
        setInterval(() => {
            getPeerReactionsFromBackend()
            .then(response => response.json())
            .then(updatePeerReactions)
            .then(() => resetOwnReactions());
        }, 3000);
    }, []);

    return <WrappedComponent {...restProps}/>
};

const withOwnReactionHandlers = WrappedComponent => ({ peerReactions, ownReactions, updateOwnReactions }) => {
    const handleReaction = useCallback((reactionType) => {
        const updatedReactions = {...ownReactions, [reactionType]: ownReactions[reactionType]+1};
        updateOwnReactions(updatedReactions);
        sendReactionsToBackend(updatedReactions);
    }, [ownReactions, updateOwnReactions]);

    return <WrappedComponent ownReactions={ownReactions} peerReactions={peerReactions} onReact={handleReaction}/>
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
    withReactionStates,
    withPeerReactionScheduler,
    withOwnReactionHandlers,
    withAddedReactions
);