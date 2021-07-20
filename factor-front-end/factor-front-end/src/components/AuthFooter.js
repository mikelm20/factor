import {useHistory } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";

const AuthFooter = () =>{
    
    const { user, isAuthenticated, isLoading } = useAuth0();
    const history = useHistory();

    const goHome = ()=>{
        history.push("/home");
    }

    if (isLoading) {
        return (
            <div>Loading ...</div>
        );
    }

    return (
        isAuthenticated && (
        <div id="wrapper">
            <div id="button-home" onClick={goHome}>Home</div>
            <div id="user">           
                <p>{user.name} ({user.email})</p>
            </div>
            <div id="logout">           
                <LogoutButton/>
            </div>
        </div>
        )
    );
}

export default AuthFooter;