import {DEFAULT_REACTION_COUNTS} from "../../../constants";

export const CLIENT_REACTION_TYPES = {
  PEER: "PEER",
  OWN: "OWN"
};

export const DEFAULT_CLIENT_REACTIONS = {
  [CLIENT_REACTION_TYPES.OWN]: DEFAULT_REACTION_COUNTS,
  [CLIENT_REACTION_TYPES.PEER]: DEFAULT_REACTION_COUNTS
};
