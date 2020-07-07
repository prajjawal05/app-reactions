import React, {useMemo} from "react";
import FloatingReaction from "../../components/FloatingReaction";
import {REACTION_TYPES} from "../../config/constants";
import {usePrevious} from "../../hooks";

const FloatingReactions = ({ containerRef, reactions: inputReactions }) => {
  const boundaries = useMemo(() => containerRef.current.getBoundingClientRect(), [containerRef]);
  const maxRight = useMemo(() => boundaries.right - boundaries.left - 40, [boundaries]);

  const prevInputReactions = usePrevious(inputReactions) || 0;
  const numNewReactions = inputReactions[REACTION_TYPES.LOVE] > prevInputReactions[REACTION_TYPES.LOVE] ?
    inputReactions[REACTION_TYPES.LOVE] - prevInputReactions[REACTION_TYPES.LOVE]
    : inputReactions[REACTION_TYPES.LOVE];

  const reactions = useMemo(() => [], []);
  for (let i = 0; i < numNewReactions; i++) {
    reactions.push(<FloatingReaction key={reactions.length + i} maxRight={maxRight} maxBottom={boundaries.bottom}/>)
  }
  return reactions
};

export default FloatingReactions;
