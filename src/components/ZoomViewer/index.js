import React from "react";
import {withRouter} from "react-router-dom"
import qs from "query-string"

//Todo: Separate MeetingIds

const ZoomViewer = ({match: {params: {meetingId}}, location: {search}}) => {
  let zoomUrl = `https://zoom.us/wc/join/${meetingId}?tk=&prefer=0`;
  let pwd = qs.parse(search)["pwd"];
  if (pwd) {
    zoomUrl = zoomUrl + `&pwd=${pwd}`
  }
  return (
    <iframe
      src={zoomUrl}
      sandbox="allow-forms allow-scripts allow-same-origin"
      allow="microphone; camera;"
      width="100%"
      height="100%"
    />
  );
};

export default withRouter(ZoomViewer);
