import {createUrl} from "../utils";
import {Routes} from "./routes";
import {APPS} from "../constants";
import InvalidPage from "../components/InvalidPage";
import ZoomViewer from "../components/ZoomViewer";

export const APPS_CONFIG = {
  [APPS.NO_APP]: {
    getUrl: createUrl(Routes[APPS.NO_APP]),
    RenderComponent: InvalidPage,
  },
  [APPS.ZOOM_MEETING]: {
    getUrl: createUrl(Routes[APPS.ZOOM_MEETING]),
    RenderComponent: ZoomViewer
  }
};
