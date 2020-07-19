import React from "react";
import image from "./InvalidPage.png";

export default () => (
  <img style={{objectFit: "cover", height: "100%", width: "100%"}} src={image} alt={"Page Not Found"}/>
);
