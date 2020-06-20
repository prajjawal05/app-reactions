import React from 'react';
import ReactionMaker from "../../containers/ReactionMaker";
import { isMobile } from "../../utils"
import ZoomViewer from "../ZoomViewer";
import "./style.css";

function App() {
  return (
    <div className={"container"}>
      {!isMobile && <ZoomViewer/>}
      <ReactionMaker/>
    </div>
  );
}

export default App;
