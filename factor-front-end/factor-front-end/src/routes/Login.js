import React from "react";
import LoginGoogle from "../components/LoginGoogle"

function Login(props) {

    return (
        <div className="App-home">
            <h2>Please Log In to continue</h2>
            <LoginGoogle login={props.login}/>
        </div>
    );
  }

export default Login;