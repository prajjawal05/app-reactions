import React, {useEffect, useMemo, useRef, useState} from 'react';
import ReactionMaker from "../../containers/ReactionMaker";
import {DEFAULT_REACTION_COUNTS} from "../../constants";
import {APPS_CONFIG} from "../../config/apps";

import FloatingReactions from "../FloatingReactions"
import "./style.css";

function App({appName}) {
  const [reactions, updateReactions] = useState(DEFAULT_REACTION_COUNTS);

  const containerRef = useRef(null);
  const [forwardedRef, setRef] = useState(null);
  useEffect(() => {
    setRef(containerRef)
  }, []);

  const AppToReact = useMemo(() => APPS_CONFIG[appName].RenderComponent, []);

  return (
    <div className={"container"} ref={containerRef}>
      {forwardedRef && <FloatingReactions containerRef={forwardedRef} reactions={reactions} iconSize={40}/>}
      <AppToReact/>
      <ReactionMaker onReactionsUpdate={updateReactions}/>
    </div>
  );
}

export default App;
