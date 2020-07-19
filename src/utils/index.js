import { mobileAgents } from "../constants"

export const compose = (...funcs) =>
  funcs.reduce((a, b) => (...args) => a(b(...args)), arg => arg);


export const isMobile = mobileAgents.some(
    (toMatchItem) =>
      navigator.userAgent.match(toMatchItem)
  );

export const createUrl = path => match => `${match.url}${path}`;
