import React, {useState, useCallback, useEffect} from "react";
import {debounce} from "debounce";
import {compose} from "../../utils";
import {DEFAULT_REACTION_COUNTS, REACTION_TYPES} from "../../config/constants";
import {useNetworkHandlers} from "./hooks/useNetworkHandlers";
import {useSyncInterval} from "./hooks/useSyncInterval";


const withReactionStates = WrappedComponent => (props) => {
  const [ownReactions, updateOwnReactions] = useState(DEFAULT_REACTION_COUNTS);
  const resetOwnReactions = useCallback(() => {
    updateOwnReactions(DEFAULT_REACTION_COUNTS);
  }, [updateOwnReactions]);

  return (
    <WrappedComponent
      {...props}
      ownReactions={ownReactions}
      updateOwnReactions={updateOwnReactions}
      resetOwnReactions={resetOwnReactions}
    />
  );
};


const withReactionHandlers = WrappedComponent => ({reactions, onReactionsUpdate, ownReactions, updateOwnReactions, resetOwnReactions}) => {
  const {sendReactions, getReactions} = useNetworkHandlers({resetOwnReactions, onReactionsUpdate});

  useSyncInterval(getReactions, 3000);

  const handleReaction = useCallback((reactionType) => {
    const updatedOwnReactions = {...ownReactions, [reactionType]: ownReactions[reactionType] + 1};
    const updatedReactions = {...reactions, [reactionType]: reactions[reactionType] + 1};
    updateOwnReactions(updatedOwnReactions);
    onReactionsUpdate(updatedReactions);
    sendReactions(updatedOwnReactions);
  }, [reactions, ownReactions, onReactionsUpdate, updateOwnReactions]);

  return <WrappedComponent onReact={handleReaction}/>
};

export default compose(
  withReactionStates,
  withReactionHandlers
);
