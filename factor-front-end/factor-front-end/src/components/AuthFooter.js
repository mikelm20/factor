import LogOut from "./Logout";
import { Link } from "react-router-dom";

const AuthFooter = (props) =>{
    
    const user = window.localStorage.getItem("owner");
    const email = window.localStorage.getItem("email");
    
    return(
        <div id="wrapper">
            <div id="button-home">
                <Link to='/home'>Home</Link>
            </div>
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