import React from "react";
import { Link } from 'react-router-dom';
import NotLogged from "../components/NotLogged";

function Home(props) {

    if(props.auth){
        return (
            <div className="App-home">
                <h2>Choose an option</h2>
                <div id="button">
                    <Link to='/upload'>Upload a video</Link>
                </div> 
                <div id="button">
                    <Link to='/view'>Watch a video</Link>
                </div>
            </div>
        );
    }
    else return <NotLogged/>
  }

export default Home;