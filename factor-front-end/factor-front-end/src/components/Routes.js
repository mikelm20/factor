import { Route, Switch, Redirect } from 'react-router-dom';
import Home from '../routes/Home';
import Upload from '../routes/Upload';
import View from '../routes/View';
import React from 'react';
import Watch from '../routes/Watch';
import Login from '../routes/Login';
import { useAuth0 } from "@auth0/auth0-react";


const Routes = () => {

  const {isAuthenticated} = useAuth0();
  
  return (
    <Switch>
      <Route exact path='/watch/:id' render={()=>isAuthenticated? <Watch/>: <Login/>}/>
      <Route exact path='/upload' render={()=>isAuthenticated? <Upload/>: <Login/>}/>
      <Route exact path='/view' render={()=>isAuthenticated? <View/>: <Login/>}/>
      <Route exact path='/home' render={()=> isAuthenticated? <Home/> : <Login/>}/>
      <Route path='/' render={()=><Redirect to="/home" />}/>
    </Switch>
  )
}

export default Routes;