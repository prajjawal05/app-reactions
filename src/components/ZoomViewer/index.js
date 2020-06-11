import React from "react";
import "./style.css";

const ZoomViewer = ({meetingId = "2408823365"}) => (
    <iframe src={`https://zoom.us/wc/2408823365/join?prefer=0`} sandbox="allow-forms allow-scripts allow-same-origin" allow="microphone; camera;" width="100%"></iframe>
)

export default ZoomViewer;