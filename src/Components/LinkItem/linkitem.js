/* eslint-disable react/prop-types */
/* eslint-disable require-jsdoc */
import React from 'react';
import Button from '@material-ui/core/Button';
import { NavLink } from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';

const LinkItem = ({ className, to, title, icon, step, children }) => {
  return (
    <NavLink className={'nav-link ' + className} to={to}>
      <Tooltip title={title} placement="top">
        <Button aria-controls="simple-menu" aria-haspopup="true">
          {icon === undefined ? ' ' : (
            <span className="icon">
              <img alt={title} title={title} src={icon} />
            </span>
          )}
          {step === undefined ? ' ' : (
            <span className="step">
              {step}
            </span>
          )}
          <span className="text">
            {title}
          </span>
          {children}
        </Button>
      </Tooltip>
    </NavLink>
  );
};

export default LinkItem;
