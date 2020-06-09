import React from 'react';
import ReactionMaker from "../../containers/ReactionMaker"
import ZoomViewer from "../ZoomViewer"

function App() {
  return (
    <div style={{display: "flex", alignItems: "stretch", height: "100%"}} className="wrapperOfZoom">
      <ZoomViewer/>
      <ReactionMaker/>
    </div>
  );
}

export default App;
