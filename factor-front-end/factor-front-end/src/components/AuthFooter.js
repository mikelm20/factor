import LogOut from "./Logout";
import {useHistory } from "react-router-dom";

const AuthFooter = (props) =>{
    
    const user = window.localStorage.getItem("owner");
    const email = window.localStorage.getItem("email");
    const history = useHistory();

    const goHome = ()=>{
        history.push("/home");
    }
    
    return(
        <div id="wrapper">
            <div id="button-home" onClick={goHome}>Home</div>
            <div id="user">           
                <p>{user} ({email})</p>
            </div>
            <div id="logout">           
                <LogOut login={props.login}/>
            </div>
        </div>
    );
}

export default AuthFooter;