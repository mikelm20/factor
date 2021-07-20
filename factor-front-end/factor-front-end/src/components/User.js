import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  
  const { user, isAuthenticated, isLoading } = useAuth0();

  React.useEffect(()=>{
    window.localStorage.setItem("user",user.name);
    window.localStorage.setItem("email",user.email);

    return ()=>{  window.localStorage.removeItem("user");
  window.localStorage.removeItem("email");}
  });

  if (isLoading) {
    return <div>Loading ...</div>;
  }
  else{
    return (
      isAuthenticated && (
        <div>
          <h3>{user.name} ({user.email})</h3>
        </div>
      )
    );
  }
};

export default Profile;