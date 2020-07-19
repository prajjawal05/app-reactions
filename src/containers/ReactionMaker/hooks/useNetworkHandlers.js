import {useCallback} from "react";
import {debounce} from "debounce";
import {DEFAULT_REACTION_COUNTS} from "../../../constants";
import {CLIENT_REACTION_TYPES} from "../config/constants";

export const useNetworkHandlers = ({onClientReactionsUpdate}) => {
  const sendReactions = useCallback(debounce(
    (reactionsToSend) => {
      fetch('/react?op=update', {
        method: 'POST',
        body: JSON.stringify(reactionsToSend),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      }).then(response => response.json())
        .then(peerReactions => {
          onClientReactionsUpdate({
            [CLIENT_REACTION_TYPES.PEER]: peerReactions,
            [CLIENT_REACTION_TYPES.OWN]: DEFAULT_REACTION_COUNTS
          })
        })
    }, 1000), []);

  const getReactions = useCallback(
    async () => {
      let response = await fetch('/react?op=get', {
        method: 'POST',
        body: JSON.stringify({}),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      }).then(response => response.json())
        .then(peerReactions =>
          onClientReactionsUpdate((clientReactions) => ({
            ...clientReactions,
            [CLIENT_REACTION_TYPES.PEER]: peerReactions
          }))
        );
    }, [onClientReactionsUpdate]);

  return {
    getReactions,
    sendReactions
  }
};
