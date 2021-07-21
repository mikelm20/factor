import React from "react";
import { useHistory } from 'react-router-dom';
import Header from "../components/Header";

function Home() {

    const history = useHistory();

    const upload = ()=>{
        history.push("/upload");
    }

    const view = ()=>{
        history.push("/view");
    }

    return (
        <div>
        <Header></Header>
        <div className="App-home">
            <h2>Choose an option</h2>
            <div id="button" onClick={upload}>
                Upload a video
            </div> 
            <div id="button" onClick={view}>
                Watch a video
            </div>
        </div>
        </div>
    );

}

export default Home;