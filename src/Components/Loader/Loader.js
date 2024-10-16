import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const Loader = ({ msg }) => {
  return (
    <React.Fragment>
      <div className="loader">
        <CircularProgress thickness="2" color="secondary" style={{color:"#49ae46"}} />
        {msg === undefined ? 'Loading, Please wait!!!' : <span className="loadingText">{msg}</span>}
      </div>
    </React.Fragment>
  );
}

export default Loader;
