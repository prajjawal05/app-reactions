import {useEffect, useState} from "react";

export const useSyncInterval = (fn, ms) => {
  const [prevFnCompleted, setFnCompleted] = useState(true);
  useEffect(() => {
    if(prevFnCompleted){
      setFnCompleted(false);
      setTimeout(()=> {
        fn().then(() => {
          setFnCompleted(true);
        })
      }, ms);
    }
  }, [fn, prevFnCompleted]);
};
