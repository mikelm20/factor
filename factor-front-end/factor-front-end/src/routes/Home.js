import React from "react";
import { useHistory } from 'react-router-dom';
import NotLogged from "../components/NotLogged";

function Home(props) {

    const history = useHistory();

    const upload = ()=>{
        history.push("/upload");
    }

    const view = ()=>{
        history.push("/view");
    }

    if(props.auth){
        return (
            <div className="App-home">
                <h2>Choose an option</h2>
                <div id="button" onClick={upload}>
                    Upload a video
                </div> 
                <div id="button" onClick={view}>
                    Watch a video
                </div>
            </div>
        );
    }
    else return <NotLogged/>
  }

export default Home;