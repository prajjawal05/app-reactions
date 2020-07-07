import React, {useMemo} from "react";
import FloatingReaction from "../../components/FloatingReaction";
import {DEFAULT_REACTION_COUNTS, REACTION_TYPES} from "../../config/constants";
import {usePrevious} from "../../hooks";

const FloatingReactions = ({ containerRef, reactions: inputReactions, iconSize }) => {
  const boundaries = useMemo(() => containerRef.current.getBoundingClientRect(), [containerRef]);
  const maxRight = useMemo(() => boundaries.right - boundaries.left - iconSize, [boundaries]);

  const prevInputReactions = usePrevious(inputReactions) || DEFAULT_REACTION_COUNTS;
  const floatingReactions = useMemo(() => [], []);

  Object.values(REACTION_TYPES).forEach((reactionType) => {
    const numNewReactions = inputReactions[reactionType] >= prevInputReactions[reactionType] ?
      inputReactions[reactionType] - prevInputReactions[reactionType]
      : inputReactions[reactionType];

    for (let i = 0; i < numNewReactions; i++) {
      floatingReactions.push(
        <FloatingReaction
          key={floatingReactions.length + i}
          reactionType={reactionType}
          maxRight={maxRight}
          maxBottom={boundaries.bottom}
        />
      )
    }
  });

  return floatingReactions
};


export default FloatingReactions;
