import React, { useMemo } from "react";
import { REACTION_TYPES } from "../../config/constants";
import appreciationImage from "../../assets/appreciationImage.png";
import clapImage from "../../assets/clapImage.png";
import laughingImage from "../../assets/laughingImage.png";


const IMAGE_REACTION_MAP = {
    [REACTION_TYPES.CLAP]: {
        src: clapImage,
        alt: "Clap"
    },
    [REACTION_TYPES.APPRECIATE]: {
        src: appreciationImage,
        alt: "Appreciate"
    },
    [REACTION_TYPES.LAUGH]: {
        src: laughingImage,
        alt: "Laugh"
    }
};


export default ({ reactionType }) => {
    const reactionProps = useMemo(() => IMAGE_REACTION_MAP[reactionType]);
    return (<img {...reactionProps} width={"80%"} />);
};
