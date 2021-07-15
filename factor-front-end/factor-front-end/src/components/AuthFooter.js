import { Link } from 'react-router-dom';
import LogOut from "./Logout";

const AuthFooter = () =>{
    
    const user = window.localStorage.getItem("owner");
    const email = window.localStorage.getItem("email");
    
    return(
        <div id="wrapper">
            <div id="home-button">
                <p><Link to='/home'>Go Home</Link></p>
            </div>
            <div id="user">           
                <p>{user} ({email})</p>
            </div>
            <div id="logout">           
                <LogOut />
            </div>
        </div>
    );
}

export default AuthFooter;