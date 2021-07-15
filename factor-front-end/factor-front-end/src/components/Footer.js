import AuthFooter from "./AuthFooter";
import NoAuthFooter from "./NoAuthFooter";
import { useState, useEffect } from 'react';

const Footer = () =>{

    const auth = window.localStorage.getItem("auth");

    const [isAuth, setAuth] = useState(false);

    useEffect(() => {
        setAuth(auth);
    }, [auth]);
    
    return(
        <div>
            {isAuth ? <AuthFooter/> : <NoAuthFooter/>}
        </div>
    )
}

export default Footer;