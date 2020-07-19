import React, {useCallback} from "react";
import Fab from "@material-ui/core/Fab"
import {makeStyles} from '@material-ui/core/styles';
import {amber} from '@material-ui/core/colors';
import {isMobile} from "../../utils";
import {ICON_SIZES} from "../../constants";

import ReactionIcon from "../ReactionIcon";


//Todo: iconSize should have been dynamic
const useStyles = makeStyles(() => ({
  root: {
    height: isMobile ? ICON_SIZES.MOBILE : ICON_SIZES.DESKTOP,
    width: isMobile ? ICON_SIZES.MOBILE : ICON_SIZES.DESKTOP,
    textAlign: "center"
  },
  button: {
    width: "80%",
    height: "80%",
    ...!isMobile && {
      '&:hover': {
        backgroundColor: amber[300],
        width: "100%",
        height: "100%"
      },
      '&:active': {
        backgroundColor: amber[700]
      }
    }
  },
  count: {
    textAlign: "center"
  }
}));

const ReactionButton = ({reactionType, onClick}) => {
  const handleClick = useCallback(() => {
    onClick(reactionType)
  }, [reactionType, onClick]);
  const classes = useStyles();

  return (
    <div onClick={handleClick} className={classes.root}>
      <Fab className={classes.button}>
        <ReactionIcon reactionType={reactionType}/>
      </Fab>
    </div>
  )
};

export default ReactionButton;
