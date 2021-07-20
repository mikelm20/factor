import React from "react";
import Videos from "../components/Videos";

function View() {

  const owner = window.localStorage.getItem('owner');

  return (
      <div className="App-videos">
          <h2>Videos for: {owner}</h2>
          <Videos/>
      </div>
  );
}

export default View;