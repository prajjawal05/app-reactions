import ZoomViewer from "../components/ZoomViewer"

export const APPS = {
    ZOOM_MEETING: "ZOOM_MEETING"
};

export const APPS_CONFIG = {
    [APPS.ZOOM_MEETING]: {
        render: ZoomViewer
    }
}

export const REACTION_TYPES = {
    LOVE: "LOVE"
};

export const mobileAgents = [
    /Android/i,
    /iPhone/i,
    /iPod/i,
    /BlackBerry/i,
    /Windows Phone/i
  ]
