/* eslint-disable require-jsdoc */
import React from "react";
import { Button } from "@material-ui/core";
import "../App.css"

const ErrorPage = () => {
  const login = () => {
    window.location.assign('/');
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center', marginTop: '30px' }}>Page Not Found</h1>
      <p style={{ textAlign: 'center' }}>
        Are you sure you typed in the correct URL?
      </p>
      <div style={{ textAlign: 'center' }}>
        <Button variant="contained" color="primary" onClick={login} style={{background:"#048c88"}}>
          Back to Login
        </Button>
      </div>
    </div>
  );
};

export default ErrorPage;
