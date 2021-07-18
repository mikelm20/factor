import React from "react";
import Videos from "../components/Videos";
import NotLogged from "../components/NotLogged";

function View(props) {

  const owner = window.localStorage.getItem('owner');

  if(props.auth){
    return (
        <div className="App-videos">
           <h2>Videos for: {owner}</h2>
            <Videos/>
        </div>
    );
  }
  else
    return <NotLogged/>
}

export default View;