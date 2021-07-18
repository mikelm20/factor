import React from "react";
import { Link } from 'react-router-dom';

function Home() {

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

export default Home;