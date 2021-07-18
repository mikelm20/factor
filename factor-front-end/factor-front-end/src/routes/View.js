import React from "react";
import Videos from "../components/Videos";
import NotLogged from "../components/NoLog";

function View() {

  const auth = window.localStorage.getItem('auth');
  const owner = window.localStorage.getItem('owner');

  if(auth){
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