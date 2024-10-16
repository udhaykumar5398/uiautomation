import React from 'react';
import { Route } from 'react-router-dom';
import Sidebar from '../../Components/Sidebar/Sidebar';

const LayoutRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      <Layout>
        {Component && <Component {...props} />}
      </Layout>
    )}
  />
);

const Layout = ({ children }) => (
  <>
    <Sidebar />
    {children}
  </>
);

export default LayoutRoute;
