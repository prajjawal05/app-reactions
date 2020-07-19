import { mobileAgents } from "../config/constants"

export const compose = (...funcs) =>
  funcs.reduce((a, b) => (...args) => a(b(...args)), arg => arg);


export const isMobile = mobileAgents.some(
    (toMatchItem) =>
      navigator.userAgent.match(toMatchItem)
  );

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
