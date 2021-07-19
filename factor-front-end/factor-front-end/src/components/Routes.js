import { Route, Switch, Redirect } from 'react-router-dom';
import Login from '../routes/Login';
import Home from '../routes/Home';
import Upload from '../routes/Upload';
import View from '../routes/View';
import Unauthorized from'../routes/Unauthorized';
import React from 'react';
import Watch from '../routes/Watch';

const Routes = (props) => {

  return (
    <Switch>
      <Route exact path='/login' render={()=><Login login={props.login}/>}/>
      <Route exact path='/watch/:id' render={()=><Watch auth={props.auth}/>}/>
      <Route exact path='/upload' render={()=><Upload auth={props.auth}/>}/>
      <Route exact path='/view' render={()=><View auth={props.auth}/>}/>
      <Route exact path='/home' render={()=><Home auth={props.auth}/>}/>
      <Route path='/' render={()=>props.auth ?  <Redirect to="/home" />  :  <Redirect to="/login" />  }/>
      <Route path='/forbidden' render={()=><Unauthorized auth={props.auth}/>}/>
    </Switch>
  )
}

export default Routes;