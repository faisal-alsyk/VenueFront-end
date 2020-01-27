import React from "react";
import spinner from "./spinner.gif";

export default function Spinner() {
  return (
        
    <div style={{display:"flex",justifyContent:"center", alignItems: "center"}}>
      <img
        src={spinner}
        style={{ width: "100px", margin: "auto", display: "block" }}
        alt="loading..."
      />
    </div>
  );
}
