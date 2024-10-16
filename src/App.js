import logo from './logo.svg';
import './App.css';
import Login from './Containers/Login/Login';
import LoginLayoutRoute from './Containers/LayoutRouting/LoginLayoutRoute';
import { Switch, BrowserRouter as Router, Route, useHistory } from 'react-router-dom';
import AdminDashboard from './Containers/AdminDashboard/AdminDashboard';
import LayoutRoute from './Containers/LayoutRouting/LayoutRoute';
import "bootstrap/dist/css/bootstrap.min.css";
import { ThemeProvider, createTheme } from '@mui/material';
import Register from './Containers/Register/Register';
import AdminProcessorDashboard from "../src/Containers/AdminProcessorDashboard/AdminProcessorDashboard"
import Fields from "../src/Containers/Fields/Fields"
import IssueCertificate from "../src/Containers/IssueCertificate/IssueCertificate"
import processorDashboard from './Containers/ProcessorDashboard/processorDashboard';
import ProcessorDashboard from './Containers/ProcessorDashboard/processorDashboard';
import DDreport from './Containers/DDReport/DDreport';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ResetPassword from './Containers/Login/resetPassword';
import ErrorPage from './Components/custom_404';
import CacheBuster from "./CacheBuster"
import { Button } from 'react-bootstrap';
const theme = createTheme({
  palette: {
    primary: {
      main: "#048c88",
      light: "#064e4a",
      dark: "#064e4a",
    },
    secondary: {
      main: "#49ae46",
      light: "#d5f2f0",
      dark: "#2e9a2b",
    },
  },
  props: {
    MuiButton: {
      size: "medium",
    },
    MuiFilledInput: {},
    MuiFormControl: {},
    MuiFormHelperText: {},
    MuiIconButton: {
      size: "medium",
    },
    MuiInputBase: {},
    MuiInputLabel: {},
    MuiListItem: {
      dense: true,
    },
    MuiOutlinedInput: {},
    MuiFab: {
      size: "medium",
    },
    MuiTable: {
      size: "medium",
    },
    MuiTextField: {
      variant: "filled",
      size: "medium",
    },
    MuiToolbar: {
      variant: "dense",
    },
  },

  overrides: {},
})

function App() {

  return (
    <CacheBuster>
      {/* {({ loading, isLatestVersion, refreshCacheAndReload }) => {
        if (loading) return null;
        if (!loading && !isLatestVersion) {
          refreshCacheAndReload();
        }

        return (
          <div className="App">
            <ThemeProvider theme={theme}>
              <ToastContainer autoClose={2000} />
              <Switch>
                <LoginLayoutRoute
                  exact={true}
                  path="/"
                  component={Login}
                />
                <LoginLayoutRoute
                  exact={true}
                  path="/register"
                  component={Register}
                />
                <LoginLayoutRoute exact={true}
                  path="/resetPassword"
                  component={ResetPassword}
                />
                <LayoutRoute exact={true}
                  path="/admin/dashboard"
                  component={AdminDashboard} />
                <LayoutRoute exact={true}
                  path="/admin/processordashboard"
                  component={AdminProcessorDashboard} />
                <LayoutRoute exact={true}
                  path="/admin/fields"
                  component={Fields} />
                <LayoutRoute exact={true}
                  path="/admin/issuecertificate"
                  component={IssueCertificate} />
                <LayoutRoute exact={true}
                  path="/processor/dashboard"
                  component={ProcessorDashboard} />
                <LayoutRoute exact={true}
                  path="/processor/ddreport"
                  component={DDreport} />
                <LayoutRoute exact={true}
                  path="*"
                  component={ErrorPage} />
              </Switch>

            </ThemeProvider>

          </div>
        );
      }} */}
      {({ loading, isLatestVersion, refreshCacheAndReload }) => (
        <>
          {loading && <p style={{ textAlign: "center" }}>Loading...</p>}
          {!loading && !isLatestVersion && (
            <div style={{ textAlign: "center" }}>
              <Button variant="contained" color="primary" style={{ background: "#048c88" }} onClick={refreshCacheAndReload}>Update Available - Click to Refresh</Button>
            </div>
          )}
          {!loading && isLatestVersion &&

            <div className="App">
              <ThemeProvider theme={theme}>
                <ToastContainer autoClose={2000} />
                <Switch>
                  <LoginLayoutRoute
                    exact={true}
                    path="/"
                    component={Login}
                  />
                  <LoginLayoutRoute
                    exact={true}
                    path="/register"
                    component={Register}
                  />
                  <LoginLayoutRoute exact={true}
                    path="/resetPassword"
                    component={ResetPassword}
                  />
                  <LayoutRoute exact={true}
                    path="/admin/dashboard"
                    component={AdminDashboard} />
                  <LayoutRoute exact={true}
                    path="/admin/processordashboard"
                    component={AdminProcessorDashboard} />
                  <LayoutRoute exact={true}
                    path="/admin/fields"
                    component={Fields} />
                  <LayoutRoute exact={true}
                    path="/admin/issuecertificate"
                    component={IssueCertificate} />
                  <LayoutRoute exact={true}
                    path="/processor/dashboard"
                    component={ProcessorDashboard} />
                  <LayoutRoute exact={true}
                    path="/processor/ddreport"
                    component={DDreport} />
                  <LayoutRoute exact={true}
                    path="*"
                    component={ErrorPage} />
                </Switch>

              </ThemeProvider>

            </div>
          }
        </>
      )}
    </CacheBuster>
  );
}

export default App;
