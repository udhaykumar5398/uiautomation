import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    // height: 10,
    backgroundColor: '#e0e0e0', // Background color of the progress bar
  },
  bar: {
    borderRadius: 5,
    backgroundColor: '#49ae46', // Custom color for the progress bar
  },
});

const LinearLoader = ({ msg }) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <div className="LinearProgress">
        <LinearProgress
          classes={{ root: classes.root, bar: classes.bar }}
          thickness={2}
        />
        {msg === undefined ? 'Please wait !!! ' : <span className="loadingText"> {msg} </span>}
      </div>
    </React.Fragment>
  );
};

export default LinearLoader;
