import { Route, Switch, Redirect } from 'react-router-dom';
import Home from '../routes/Home';
import Upload from '../routes/Upload';
import View from '../routes/View';
import React from 'react';
import Watch from '../routes/Watch';
import Login from '../routes/Login';
import { useAuth0 } from "@auth0/auth0-react";


const Routes = () => {

  const {isLoading, isAuthenticated} = useAuth0();
  
  return (
    <Switch>
      <Route exact path='/watch/:id' render={()=>isLoading? <p>Loading...</p> : isAuthenticated? <Watch/>: <Login/>}/>
      <Route exact path='/upload' render={()=>isLoading? <p>Loading...</p> : isAuthenticated? <Upload/>: <Login/>}/>
      <Route exact path='/view' render={()=>isLoading? <p>Loading...</p> : isAuthenticated? <View/>: <Login/>}/>
      <Route exact path='/home' render={()=> isLoading? <p>Loading...</p> : isAuthenticated? <Home/> : <Login/>}/>
      <Route path='/' render={()=><Redirect to="/home" />}/>
    </Switch>
  )
}

export default Routes;