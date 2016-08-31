import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './App';
import Flowers from './components/flowers';
import AddFlower from './components/add-flower';
import Login from './components/login-register/Login';
import Logout from './components/login-register/Logout';
import Register from './components/login-register/Register';
import requireAuth from './utils/authenticated';
import User from './components/login-register/user-details';
import Users from './components/login-register/users.js';

export default (
  <Route path='/' component={App}>
    <IndexRoute component={Flowers} />
    <Route path='/addflower' component={AddFlower} onEnter={requireAuth} />
    <Route path='/login' component={Login} />
    <Route path='/logout' component={Logout} />
    <Route path='/register' component={Register} />
    <Route path='/users' component={Users} onEnter={requireAuth}>
      <Route path='/users/:companyname' component={User} />
    </Route>
  </Route>
);
