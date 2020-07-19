import React, {useState, useCallback, useEffect} from "react";
import {debounce} from "debounce";
import {compose} from "../../utils";
import {REACTION_TYPES} from "../../config/constants";
import {useNetworkHandlers} from "./hooks/useNetworkHandlers";
import {useSyncInterval} from "./hooks/useSyncInterval";
import {CLIENT_REACTION_TYPES, DEFAULT_CLIENT_REACTIONS} from "./config/constants";


const withReactionStates = WrappedComponent => ({onReactionsUpdate}) => {
  const [clientReactions, updateClientReactions] = useState(DEFAULT_CLIENT_REACTIONS);

  useEffect(() => {
    const updatedReactions = Object.keys(REACTION_TYPES).reduce((agg, reactionType) => {
        agg[reactionType] = clientReactions[CLIENT_REACTION_TYPES.OWN][reactionType] +
          clientReactions[CLIENT_REACTION_TYPES.PEER][reactionType];
        return agg;
      }, {});
    onReactionsUpdate(updatedReactions);
  }, [JSON.stringify(clientReactions)]);

  return (
    <WrappedComponent
      clientReactions={clientReactions}
      onClientReactionsUpdate={updateClientReactions}
    />
  );
};


const withReactionHandlers = WrappedComponent => ({onReactionsUpdate, onClientReactionsUpdate}) => {
  const {sendReactions, getReactions} = useNetworkHandlers({onClientReactionsUpdate});

  useSyncInterval(getReactions, 1000);

  const handleReaction = useCallback((reactionType) => {
    onClientReactionsUpdate((clientReactionsInState) => {
      const updatedOwnReaction = {
        ...clientReactionsInState[CLIENT_REACTION_TYPES.OWN],
        [reactionType]: clientReactionsInState[CLIENT_REACTION_TYPES.OWN][reactionType] + 1
      };
      sendReactions(updatedOwnReaction);
      return {
        ...clientReactionsInState,
        [CLIENT_REACTION_TYPES.OWN]: updatedOwnReaction
      };
    })
  }, [sendReactions]);

  return <WrappedComponent onReact={handleReaction}/>
};

export default compose(
  withReactionStates,
  withReactionHandlers
);
