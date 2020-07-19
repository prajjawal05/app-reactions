import React, {useEffect, useRef, useState} from 'react';
import FloatingReactions from "../FloatingReactions"
import ReactionMaker from "../../containers/ReactionMaker";
import { DEFAULT_REACTION_COUNTS } from "../../config/constants";
import ZoomViewer from "../ZoomViewer";
import "./style.css";

//Todo: Find the reason, it is rendering two times
//Todo: Reactions are getting resetted when being pressed during timer
//Todo: Some state management issues

function App() {
  const [reactions, updateReactions] = useState(DEFAULT_REACTION_COUNTS);

  const containerRef = useRef(null);
  const [forwardedRef, setRef] = useState(null);
  useEffect(() => {
    setRef(containerRef)
  }, []);

  return (
    <div className={"container"} ref={containerRef}>
        {forwardedRef && <FloatingReactions containerRef={forwardedRef} reactions={reactions} iconSize={40}/>}
        <ZoomViewer/>
        <ReactionMaker reactions={reactions} onReactionsUpdate={updateReactions}/>
    </div>
  );
}

export default App;
