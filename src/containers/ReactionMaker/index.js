import React, {useRef, useState,  useEffect} from "react";
import ReactionButton from "../../components/ReactionButton";
import FloatingReactions from "../../components/FloatingReactions";
import {REACTION_TYPES} from "../../config/constants";

import withHandlers from "./handlers";


let REACTION_MAKER_STYLE = {
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  flexDirection: "column",
  height: "100%"
};

const ReactionMaker = ({onReact, reactions}) => {
  const containerRef = useRef(null);
  const [forwardedRef, setRef] = useState(null);
  useEffect(() => {
    setRef(containerRef)
  }, [containerRef]);

  return (
    <div style={{width: "100%"}} ref={containerRef}>
      {forwardedRef && <FloatingReactions containerRef={forwardedRef} reactions={reactions}/>}
      <div style={REACTION_MAKER_STYLE}>
        {Object.values(REACTION_TYPES).map(reactionType => (
          <ReactionButton key={reactionType} reactionCount={reactions[reactionType]} reactionType={reactionType}
                          onClick={onReact}/>
        ))}
      </div>
    </div>
  )
};

//opacity abd rabdin generator

export default withHandlers(ReactionMaker);
