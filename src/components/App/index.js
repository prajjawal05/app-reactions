import React, {useEffect, useRef, useState} from 'react';
import FloatingReactions from "../FloatingReactions"
import ReactionMaker from "../../containers/ReactionMaker";
import { isMobile } from "../../utils"
import { REACTION_TYPES } from "../../config/constants";
import ZoomViewer from "../ZoomViewer";
import "./style.css";


const DEFAULT_REACTION_COUNTS = Object.values(REACTION_TYPES).reduce((acc, reactionType) => {
  acc[reactionType] = 0;
  return acc;
} , {})

function App() {
  const [reactionsToSend, updateReactionsToSend] = useState(DEFAULT_REACTION_COUNTS);

  const containerRef = useRef(null);
  const [forwardedRef, setRef] = useState(null);
  useEffect(() => {
    setRef(containerRef)
  }, [containerRef]);

  return (
    <div className={"container"} ref={containerRef}>
      {forwardedRef && <FloatingReactions containerRef={forwardedRef} reactions={reactionsToSend}/>}
      <div className={"app"}>
        {!isMobile && <ZoomViewer/>}
        <ReactionMaker reactionsToSend={reactionsToSend} updateReactionsToSend={updateReactionsToSend}/>
      </div>
    </div>
  );
}

export default App;
