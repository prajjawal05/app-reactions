import {useCallback} from "react";
import {debounce} from "debounce";

export const useNetworkHandlers = ({resetOwnReactions, onReactionsUpdate}) => {
  const sendReactions = useCallback(debounce(
    (reactionsToSend) => {
      fetch('/react?op=update', {
        method: 'POST',
        body: JSON.stringify(reactionsToSend),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      }).then(resetOwnReactions)
    }, 1000), []);

  const getReactions = useCallback(
    async () => {
      let response = await fetch('/react?op=get', {
        method: 'POST',
        body: JSON.stringify({}),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      }).then(response => response.json());
      onReactionsUpdate(response);
      resetOwnReactions();
    }, [onReactionsUpdate]);

  return {
    getReactions,
    sendReactions
  }
};
