import React from "react";
import "./style.css";

const ZoomViewer = ({meetingId = "2408823365"}) => {
  const width = window.innerWidth - 201;
  return (
    <iframe style={{minWidth: width}} src={`https://zoom.us/wc/join/8299546616?tk=&prefer=0&track_id=&meeting_result=&jmf_code=&wpk=&_x_zm_rtaid=bWMwMw-YTnKPTfUy17PxtA.1592163668617.72d53f29ee078ad1af175dd166907adf&_x_zm_rhtaid=61`} sandbox="allow-forms allow-scripts allow-same-origin" allow="microphone; camera;" width={width} height="100%"></iframe>
  );
}

export default ZoomViewer;
