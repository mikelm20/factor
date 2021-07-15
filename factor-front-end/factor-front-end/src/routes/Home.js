import React from "react";
import { Link } from 'react-router-dom';

function Home() {

    return (
        <div className="App-home">
            <h2>Choose an option</h2>
            <p><Link to='/upload'>Upload a video</Link> or <Link to='/view'>Watch a video</Link></p>
        </div>
    );
  }

export default Home;