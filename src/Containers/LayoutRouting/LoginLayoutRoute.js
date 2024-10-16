import React from 'react';
import { Route } from 'react-router-dom';
import LogoBankema from '../../images/logo.jpg';
import './LayoutRoute.css'

const LayoutRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={(props) => (
      <LoginLayout>
        {Component && <Component {...props} />}
      </LoginLayout>
    )} />
  );
};

const LoginLayout = ({ children }) => {
  return (
    <>
      <div id="mainContent">
        <div className="site-header-without-login">
          <h2><img className="site-logo" src={LogoBankema} alt="Site Logo" /></h2>
        </div>
        <div className="container-fluid">
        <div className="row align-self-center custom-height">
        <div className="col-sm-12 col-lg-6  d-flex custom-height login-left-image" >
        <div className="login-content row left-content" style={{textAlign:"center",marginLeft:"3rem"}}>
                <h1>Welcome to Intain ABS</h1>
              </div>
            </div>
            <div className="col-sm-12 col-lg-6 custom-height custom-height-scrollbar" >
              <div className="login-content align-self-center justify-content-center">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LayoutRoute;
