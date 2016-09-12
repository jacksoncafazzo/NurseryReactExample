import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import CatalogIndex from './components/catalog/catalog-index';
import AddFlower from './components/add/add-flower';
import UserLogin from './components/user/login';
import UserLogout from './components/user/logout';
import UserRegister from './components/user/register';
import UserProfile from './components/user/profile';
import ResetPassword from './components/user/reset_password';
import requireAuth from './components/utils/authenticated';
import UpdateCatalog from './components/catalog/update-catalog';
import MenuTabsSwipeable from './components/menu-tabs';


export default (
  <Route path='/' component={App}>
    <IndexRoute component={MenuTabsSwipeable} />
    <Route path='/addflower' component={AddFlower} onEnter={requireAuth} />
    <Route path='/login' component={UserLogin} />
    <Route path='/logout' component={UserLogout} />
    <Route path='/register' component={UserRegister} />
    <Route path='/reset' component={ResetPassword} />
    <Route path='/profile' component={UserProfile} onEnter={requireAuth} />
    <Route path='/update' component={UpdateCatalog} />
  </Route>
);
