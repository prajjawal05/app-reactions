export const APPS = {
    ZOOM_MEETING: "ZOOM_MEETING",
    NO_APP: "NO_APP"
};

export const REACTION_TYPES = {
    LOVE: "LOVE",
    CLAP: "CLAP"
    // APPRECIATE: "APPRECIATE"
    // LAUGH: "LAUGH"
};

export const DEFAULT_REACTION_COUNTS = Object.values(REACTION_TYPES).reduce((acc, reactionType) => {
    acc[reactionType] = 0;
    return acc;
} , {});

export const mobileAgents = [
    /Android/i,
    /iPhone/i,
    /iPod/i,
    /BlackBerry/i,
    /Windows Phone/i
  ];

export const ICON_SIZES = {
  MOBILE: "101px",
  DESKTOP: "201px"
};
