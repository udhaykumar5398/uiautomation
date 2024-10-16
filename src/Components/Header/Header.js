/* eslint-disable require-jsdoc */
import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { NavLink, Link } from 'react-router-dom';
import Logo from '../../images/logo.jpg';
import LinkItem from '../LinkItem/linkitem';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import './Header.css'
function Header(props) {
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [value, setValue] = useState(null);
  const [message, setMessage] = useState('');
  const [inputVal, setInputVal] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [poolName, setPoolName] = useState(localStorage.getItem('poolname'));
  const [dealType, setDealType] = useState(localStorage.getItem('DealType'));
  const [orgName, setOrgName] = useState(localStorage.getItem('OrgName') || null);
  const [currentUser, setCurrentUser] = useState(localStorage.getItem('username'));

  useEffect(() => {
    if (currentUser !== null) {
      const firstname = currentUser;
      const namefirstletter = firstname.charAt(0).toUpperCase();
      setCurrentUser(namefirstletter);
    }
  }, [currentUser]);

  const onOpenModal1 = (value) => {
    console.log("MODAL " + value);
    setOpen1(true);
    setValue(value);
  };

  const onCloseModal1 = () => {
    setOpen1(false);
  };

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-md-5 col-sm-12 align-self-center">
          <LinkItem to={'#nogo'} className="logo_img" title={''} icon={Logo} > </LinkItem>
        </div>
        <div className="col-md-7 col-sm-12 text-right">
          <React.Fragment>
            {/* {orgName === "originator" ?
              <React.Fragment>
                <div className="float-right header_right">
                  <React.Fragment>
                    <p className="orgname">Logged in as <span> {orgName} </span> </p>
                    <ul className="preprocessing_menu">
                      <li><Button
                        variant="outlined"
                        color="primary" >
                        Pre Processing <MoreVertIcon /> </Button>
                        <ul>
                          <li><MenuItem><NavLink to={'/preprocessingviewloans/'} id="viewloanlink"> View LMS Data</NavLink></MenuItem></li>
                          <li><MenuItem><NavLink to={'/bulkupload/'} id="viewloanlink"> Bulk Document Uploads</NavLink></MenuItem></li>
                        </ul>
                      </li>
                      <li className="userInfo"><LinkItem to={'#nogo'} title={currentUser} > </LinkItem></li>
                    </ul>
                  </React.Fragment>
                </div>
              </React.Fragment>
              : */}
              <React.Fragment>
                <div className="float-right header_right">
                  <React.Fragment>
                    <p className="orgname">Logged in as <span> {orgName} </span> </p>
                    <ul className="preprocessing_menu">
                      <li className="userInfo"><LinkItem to={'#nogo'} title={currentUser} > </LinkItem></li>
                    </ul>
                  </React.Fragment>
                </div>
              </React.Fragment>
            {/* } */}
          </React.Fragment>
        </div>
      </div>

      <div className="tableSearch" id="sub_heading">
        <div className="row align-items-center">
          <div className="col-md-4 col-sm-12">
            {props.pageTitle === 'REPORTS' ?
              <React.Fragment>
                <div className="pageHeading">
                  {poolName === undefined ? ' ' :
                    <React.Fragment>
                      <div><p>Deals&nbsp;<ArrowForwardIosIcon fontSize="small"></ArrowForwardIosIcon><span className="dealId">{poolName}</span></p></div>
                    </React.Fragment>
                  }
                  <span className="pageTitle"> {props.pageTitle}
                    {props.total_deals === undefined ? ' ' :
                      <span className="total_deals">{props.total_deals}</span>
                    }
                  </span>
                </div>
              </React.Fragment> :
              <React.Fragment>
                <div className="pageHeading ">
                  <span className="pageTitle"> {props.pageTitle}
                    {props.total_deals === undefined ? ' ' :
                      <span className="total_deals">{props.total_deals}</span>
                    }
                    {props.dealId === undefined ? ' ' :
                      <span className="dealId">{props.dealId}</span>
                    }
                  </span>
                </div>
              </React.Fragment>
            }
          </div>
          <div className="col-md-8 col-sm-12">
            {props.pageTitle !== 'REPORTS' ? ' ' :
              <div className="page-contents11">
                <p className='fontsizeset'>&nbsp;<InfoOutlinedIcon fontSize="large" className="imgcolor"></InfoOutlinedIcon> &nbsp;In the event 5% did not equal a whole number, additional files are verified to ensure meeting verification requirements</p>
              </div>
            }
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Header;
