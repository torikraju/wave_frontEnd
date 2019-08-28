import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './container/home';
import Layout from './hoc/Layout';
import RegisterLogin from './component/RegisterLogin';
import Register from './component/RegisterLogin/register';


const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/registerLogin" exact component={RegisterLogin} />
        <Route path="/register" exact component={Register} />
      </Switch>
    </Layout>
  );
};

export default Routes;
