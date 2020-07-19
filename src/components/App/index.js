import React, {useEffect, useRef, useState} from 'react';
import FloatingReactions from "../FloatingReactions"
import ReactionMaker from "../../containers/ReactionMaker";
import { DEFAULT_REACTION_COUNTS } from "../../config/constants";
import ZoomViewer from "../ZoomViewer";
import "./style.css";

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
        <ReactionMaker onReactionsUpdate={updateReactions}/>
    </div>
  );
}

export default App;
