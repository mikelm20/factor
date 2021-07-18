import { Route, Switch } from 'react-router-dom';
import Login from '../routes/Login';
import Home from '../routes/Home';
import Upload from '../routes/Upload';
import View from '../routes/View';
import Unauthorized from'../routes/Unauthorized';
import React from 'react';
import Watch from '../routes/Watch';

const Routes = () => {

  return (
    <Switch>
      <Route exact path='/login' component={Login}/>
      <Route exact path='/watch/:id' component={Watch}/>
      <Route exact path='/upload' component={Upload}/>
      <Route exact path='/view' component={View}/>
      <Route exact path='/home' component={Home}/>
      <Route path='/' component={Unauthorized}/>
    </Switch>
  )
}

export default Routes;