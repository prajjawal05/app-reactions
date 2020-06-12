import React, { useCallback } from "react";
import Fab from "@material-ui/core/Fab"
import { amber } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';

import ReactionIcon from "../ReactionIcon";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        height: "201px",
        width: "200px",
        textAlign: "center"
    },
    button: {
        width: "80%",
        height: "80%",
        '&:hover': {
            backgroundColor: amber[300],
            width: "100%",
            height: "100%"
        },
        '&:active': {
            backgroundColor: amber[700],
            width: "100%",
            height: "100%"
        }
    }
}));

const ReactionButton = ({ reactionType, onClick }) => {
    const handleClick = useCallback(() => {
        onClick(reactionType)
    }, [reactionType, onClick]);
    const classes = useStyles();

    return (
        <div onClick={handleClick} className={classes.root}>
            <Fab className={classes.button}>
                <div>
                    <ReactionIcon reactionType={reactionType}/>
                </div>
            </Fab>
        </div>
    )
};

export default ReactionButton;