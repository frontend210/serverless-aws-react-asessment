import React, {createElement} from 'react';
import {Route, Switch} from 'react-router-dom';
import Layout from './components/Layout';
import ListPage from './pages/list'
import DetailPage from './pages/detail'

const renderLayout = (component, layoutProps) => (routerProps) => (
  <Layout {...layoutProps}>{createElement(component, routerProps)}</Layout>
);

const routes = () => (
  <Switch>
    <Route exact path="/" render={renderLayout(ListPage)}/>
    <Route exact path="/create" render={renderLayout(DetailPage)}/>
    <Route exact path="/edit/:userId" render={renderLayout(DetailPage)}/>
  </Switch>
);

export default routes;
