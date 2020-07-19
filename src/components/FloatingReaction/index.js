import React, {useState, useCallback, useMemo} from "react";
import TweenOne from "rc-tween-one";

import ReactionIcon from "../../components/ReactionIcon";

import {REACTION_TYPES} from "../../config/constants";

import {StyledFloater} from "./style";

const addHandlers = WrappedComponent => props => {
  const [isFloated, updatedWhetherFloated] = useState(false);

  const handleComplete = useCallback(() => {
    updatedWhetherFloated(true);
  }, [updatedWhetherFloated]);

  return (
    <WrappedComponent
      {...props}
      isFloated={isFloated}
      onAnimationComplete={handleComplete}
    />
  )
};


const FloatingReaction = ({onAnimationComplete, isFloated, reactionType = REACTION_TYPES.LOVE, maxRight, maxBottom}) => {
  const animationProps = useMemo(() => {
    const horizontalPos = maxRight * Math.random();
    const animateToBottom = {
      y: maxBottom,
      x: horizontalPos,
      duration: 0
    };
    const animateTowardsUp = {
      y: 0,
      x: horizontalPos,
      duration: 3000 + 1000 * Math.random(),
      onComplete: onAnimationComplete
    };
    return [animateToBottom, animateTowardsUp];
  }, [maxRight, maxBottom, onAnimationComplete]);

  return (
    !isFloated &&
    <TweenOne animation={animationProps}>
      <StyledFloater duration={3000 + 1000 * Math.random()}>
        <ReactionIcon reactionType={reactionType}/>
      </StyledFloater>
    </TweenOne>
  );
};

export default addHandlers(FloatingReaction);
