import React, {useState, useCallback, useEffect} from "react";
import { debounce } from "debounce";
import { compose } from "../../utils";
import { REACTION_TYPES, DEFAULT_REACTION_COUNTS } from "../../config/constants";


const withReactionStates = WrappedComponent => (props) => {
  const [ownReactions, updateOwnReactions] = useState(DEFAULT_REACTION_COUNTS);
  const [peerReactions, updatePeerReactions] = useState(DEFAULT_REACTION_COUNTS);

  const resetOwnReactions = useCallback(() => {
    updateOwnReactions(DEFAULT_REACTION_COUNTS);
  }, [updateOwnReactions]);

  return (
    <WrappedComponent
      {...props}
      ownReactions={ownReactions}
      updateOwnReactions={updateOwnReactions}
      resetOwnReactions={resetOwnReactions}
      peerReactions={peerReactions}
      updatePeerReactions={updatePeerReactions}
    />
  );
};

const withReactionHandlers = WrappedComponent => ({ ownReactions, updateOwnReactions, resetOwnReactions, updatePeerReactions, ...restProps }) => {
  const sendReactionsToBackend = useCallback(debounce(reactionToSendToBackend => fetch('/react?op=update', {
      method: 'POST',
      body: JSON.stringify(reactionToSendToBackend),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    }).then(response => response.json())
      .then(updatePeerReactions)
      .then(resetOwnReactions),
    500), []);

  useEffect(() => {
    setInterval(() => {
      sendReactionsToBackend(ownReactions); //intentional to prevent current state getting resetted
    }, 3000);
  }, []);

  const handleReaction = useCallback((reactionType) => {
    const updatedOwnReactions = {...ownReactions, [reactionType]: ownReactions[reactionType] + 1};
    updateOwnReactions(updatedOwnReactions);
    sendReactionsToBackend(updatedOwnReactions);
  }, [ownReactions, updateOwnReactions]);

  return <WrappedComponent {...restProps} ownReactions={ownReactions} onReact={handleReaction}/>
}


const withAddedReactions = WrappedComponent => ({ peerReactions, ownReactions, updateReactions, ...restProps}) => {
  useEffect(() => {
    updateReactions(
      Object.keys(REACTION_TYPES).reduce((acc, reactionType) => {
        acc[reactionType] = peerReactions[reactionType] + ownReactions[reactionType]
        return acc;
      }, {...DEFAULT_REACTION_COUNTS})
    );
  }, [ownReactions, peerReactions, updateReactions]);

  return <WrappedComponent {...restProps}/>
};

export default compose(
  withReactionStates,
  withReactionHandlers,
  withAddedReactions
);
