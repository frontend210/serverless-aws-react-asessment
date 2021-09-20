import React, { createElement } from "react";
import { Route, Switch } from "react-router-dom";
import ListPage from "./pages/list"
import Layout from "./components/Layout";

const renderLayout = (component, layoutProps) => (routerProps) => (
  <Layout {...layoutProps}>{createElement(component, routerProps)}</Layout>
);

const routes = () => (
  <Switch>
    <Route exact path="/" render={renderLayout(ListPage)} />
  </Switch>
);

export default routes;
