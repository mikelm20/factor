import React from "react";
import { useHistory } from 'react-router-dom';

function Home() {

    const history = useHistory();

    const upload = ()=>{
        history.push("/upload");
    }

    const view = ()=>{
        history.push("/view");
    }

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

export default Home;