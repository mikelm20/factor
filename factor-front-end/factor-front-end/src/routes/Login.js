import React from "react";
import LoginButton from "../components/LoginButton";
import Header from "../components/Header";

function Login() {

    return (
        <div>
         <Header></Header>
        <div className="App-home">
            <h2>Please Log In to continue</h2>
            <LoginButton/>
        </div>
        </div>
    );
  }

export default Login;