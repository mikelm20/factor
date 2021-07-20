import {useHistory } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import AuthenticationButton from "./AuthenticationButton";
import React from "react";

const Footer = () =>{
    
    const { isAuthenticated , isLoading, user } = useAuth0();
    console.log(JSON.stringify(user));
    const history = useHistory();
    const goHome = ()=>{
    history.push("/home");
    }

    if(isLoading){
        return <p>Loading...</p>
    }else{

        if(!isAuthenticated){
            return <h2>User not Authenticated</h2>
        }

        if(user!==undefined){
            return (
                <div id="wrapper">
                    <div id="button-home" onClick={goHome}>Home</div>
                    <div id="user">           
                        {/*<p>{user.user.name} ({user.user.email})</p>*/}
                    </div>
                    <AuthenticationButton/>
                </div>
            );
        }
    }
}

export default Footer;