import React from 'react';
import ReactionMaker from "../../containers/ReactionMaker";
import ZoomViewer from "../ZoomViewer";
import "./style.css";

function App() {
  return (
    <div className={"container"}>
      <ZoomViewer/>
      <ReactionMaker/>
    </div>
  );
}

export default App;
