import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './container/home';
import Layout from './hoc/Layout';
import RegisterLogin from './component/RegisterLogin';
import Register from './component/RegisterLogin/register';
import UserDashBoard from './component/user';
import Auth from './hoc/Layout/auth';


const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact component={Auth(Home, null)} />
        <Route path="/user/dashBoard" exact component={Auth(UserDashBoard, true)} />
        <Route path="/registerLogin" exact component={Auth(RegisterLogin, false)} />
        <Route path="/register" exact component={Auth(Register, false)} />
      </Switch>
    </Layout>
  );
};

export default Routes;
