import React, { useState, useCallback, useEffect, useMemo } from "react";
import { debounce } from "debounce";
import { compose } from "../../utils";
import { REACTION_TYPES, DEFAULT_REACTION_COUNTS } from "../../config/constants";



// const getReactionsFromBackend = () => fetch('/react?op=get', {
//     method: 'POST',
//     body: JSON.stringify({}),
//     headers: {
//       'Content-type': 'application/json; charset=UTF-8'
//     }
//   });

const withReactionStates = WrappedComponent => ({reactionsToSend, updateReactionsToSend}) => {
    const [reactions, updateReactions] = useState(DEFAULT_REACTION_COUNTS);
    const resetReactionsToSend = useCallback(() => {
        updateReactionsToSend(DEFAULT_REACTION_COUNTS);
    }, [updateReactionsToSend]);

    return <WrappedComponent
        reactions={reactions}
        updateReactions={updateReactions}
        reactionsToSend={reactionsToSend}
        updateReactionsToSend={updateReactionsToSend}
        resetReactionsToSend={resetReactionsToSend}
    />
}

const withReactionHandlers = WrappedComponent => ({ reactions, reactionsToSend, updateReactions, updateReactionsToSend, resetReactionsToSend }) => {
    // const sendReactionsToBackend = useCallback(debounce(reactionToSendToBackend => fetch('/react?op=update', {
    //     method: 'POST',
    //     body: JSON.stringify(reactionToSendToBackend),
    //     headers: {
    //       'Content-type': 'application/json; charset=UTF-8'
    //     }
    //   })
    //   .then(response => response.json())
    //   .then(updateReactions)
    //   .then(resetReactionsToSend),
    // 500), []);
    //
    // useEffect(() => {
    //     setInterval(() => {
    //         sendReactionsToBackend(reactionsToSend); //intentional to prevent current state getting resetted
    //     }, 3000);
    // }, []);

    const handleReaction = useCallback((reactionType) => {
        const updatedReactionsToSend = {...reactionsToSend, [reactionType]: reactionsToSend[reactionType]+1};
        updateReactionsToSend(updatedReactionsToSend);
        // sendReactionsToBackend(updatedReactionsToSend);
    }, [reactionsToSend, updateReactionsToSend]);

    return <WrappedComponent allReactions={reactions} ownReactions={reactionsToSend} onReact={handleReaction}/>
}


const withAddedReactions = WrappedComponent => ({allReactions, ownReactions, ...restProps}) => {
    const reactions = useMemo(() =>
        Object.keys(REACTION_TYPES).reduce((acc, reactionType) => {
        acc[reactionType] = allReactions[reactionType] + ownReactions[reactionType]
        return acc;
        }, {...DEFAULT_REACTION_COUNTS}
    ),[ownReactions, allReactions]);

    return <WrappedComponent reactions={reactions} {...restProps}/>
};

export default compose(
    withReactionStates,
    withReactionHandlers,
    withAddedReactions
);
