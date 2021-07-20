import {useHistory } from "react-router-dom";
import { useAuth0} from "@auth0/auth0-react";
import AuthenticationButton from "./AuthenticationButton";
import React from "react";
import User from "../components/User";

const Footer = () =>{
    
    const { isAuthenticated , isLoading} = useAuth0();
    
    const history = useHistory();
    const goHome = ()=>{
    history.push("/home");
    }

    if(isLoading){
        return <p>Loading...</p>
    }

    if(!isAuthenticated){
        return <h2>User not Authenticated</h2>
    }

    return (
        <div id="wrapper">
            <div id="button-home" onClick={goHome}>Home</div>
            <div id="user">           
                <User></User>
            </div>
            <AuthenticationButton/>
        </div>
    );
}

export default Footer;