import React, { useEffect, useState } from 'react';
import LinkItem from '../LinkItem/linkitem';
import Button from '@material-ui/core/Button';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Tooltip from '@material-ui/core/Tooltip';
import { Processor, AdminUser } from './menu';
import './sidebar.css'
import { useDispatch } from 'react-redux';
import { logout } from '../../Store/User/UserAction';

const Sidebar = () => {
  const dispatch = useDispatch();
  const [currentUser, setCurrentUser] = useState(localStorage.getItem('username'));
  const [userType, setUserType] = useState(localStorage.getItem('userrole'));
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [currentmenu, setCurrentMenu] = useState([]);
  const [menuLoader, setMenuLoader] = useState(false);


  useEffect(() => {
    // history.go(1);

    if (userType === "Admin") {
      setCurrentMenu(AdminUser);
      setMenuLoader(true);
    } else {
      setCurrentMenu(Processor);
      setMenuLoader(true);
    }

    if (currentUser !== null) {
      const firstname = currentUser;
      const namefirstletter = firstname.charAt(0).toUpperCase();
      setCurrentUser(namefirstletter);
    }
  }, [userType, currentUser]);

  const LogOut = async () => {
    dispatch(logout({ token }));
  }

  return (
    <React.Fragment>
      {menuLoader === false ? '' :
        <div className="sidebar">
          <ul>
            <li className="logoPlaceholder">
              {/* <LinkItem to={'#nogo'} title={''} icon={Logo} > </LinkItem> */}
            </li>
            {currentmenu.map((item) => (
              <li key={item.title}>
                <LinkItem to={item.linkto} title={item.title} icon={item.icon}></LinkItem>
                {item.subitems != null ? (
                  <React.Fragment>
                    <ul>
                      <div className="arrow-left"></div>
                      <div className="arrow_box">
                        {item.subitems.map((item1) => (
                          <li key={item1.title}>
                            <LinkItem to={item1.linkto} title={item1.title}></LinkItem>
                          </li>
                        ))}
                      </div>
                    </ul>
                  </React.Fragment>
                ) : (
                  <React.Fragment> </React.Fragment>
                )}
              </li>
            ))}
          </ul>
          <Tooltip title="LogOut">
            <ul className="bottomMenu">
              <li className="showMenu">
                <Button className="logout" variant="contained" color="primary" style={{ backgroundColor: "#048c88" }} type="submit"
                  onClick={LogOut}

                >
                  <ExitToAppIcon></ExitToAppIcon>
                </Button>
              </li>
            </ul>
          </Tooltip>
        </div>
      }
    </React.Fragment>
  );
}

export default Sidebar;
