import AuthFooter from "./AuthFooter";
import NoAuthFooter from "./NoAuthFooter";
import { useState, useEffect } from 'react';

const Footer = (props) =>{

    const [isAuth, setAuth] = useState(false);

    useEffect(() => {
        setAuth(props.auth);
    }, [props.auth]);
    
    return(
        <div>
            {isAuth ? <AuthFooter login={props.login}/> : <NoAuthFooter/>}
        </div>
    )
}

export default Footer;