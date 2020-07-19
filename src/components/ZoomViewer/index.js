import React from "react";
import {withRouter} from "react-router-dom"
import qs from "query-string"

//Todo: Separate MeetingIds

const ZoomViewer = ({match: {params: {meetingId}}, location: {search}}) => {
  let zoomUrl = `https://zoom.us/wc/join/${meetingId}?tk=&prefer=0&track_id=&meeting_result=&jmf_code=&wpk=&_x_zm_rtaid=bWMwMw-YTnKPTfUy17PxtA.1592163668617.72d53f29ee078ad1af175dd166907adf&_x_zm_rhtaid=61`;
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
