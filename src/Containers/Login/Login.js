import React, { useEffect, useState } from 'react';
import "./Login.css";
import FormLoader from '../../Components/Formloader/Formloader';
import { useForm, Controller } from 'react-hook-form';
import LinkItem from '../../Components/LinkItem/linkitem';
import CustomButton from '../../Components/Buttons/CustomButton';
import CustomTextField from '../../Components/TextField/TextField';
import {
  TextField, MenuItem, Button, Dialog, IconButton,
  DialogTitle, Checkbox, FormControlLabel,
  DialogContent, DialogActions, Typography, FormHelperTextFormControl, InputLabel, Select, FormControl
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { forgotPassword, jwttoken } from '../../Store/User/UserAction';
import { withTheme } from "react-jsonschema-form";
import { Theme as MuiTheme } from "rjsf-material-ui";
import { CustomFieldTemplate, widgets } from '../../Components/CustomScripts/CustomScript';
import { toast } from 'react-toastify';
const Form = withTheme(MuiTheme);
const schema = require("./schema.json");
const uiSchema = {
  email: {
    "ui:widget": "email",
  },
  password: {
    "ui:widget": "password",
  },
};


const LoginPage = () => {
  const { control: resetControl, handleSubmit: handleResetSubmit, formState: { errors: resetErrors }, reset } = useForm();
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    emailid: "",
    password: "",
    userrole: "",
  });
  const [orgLoading, setOrgLoading] = useState(false);
  const [emailid, setEmailid] = useState('');
  const [password, setPassword] = useState('');
  const [userrole, setUserRole] = useState('');

  const [attemptCount, setAttemptCount] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);


  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isDisabled) return; // Prevent submission if form is disabled

    const formData = {
      emailid,
      password,
      userrole
    };
    console.log(formData, "event");
    setLoading(true);

    try {
      const result = await jwttoken(formData);
      setLoading(false);

      if (result && result.success) {
        console.log({ emailid, password, userrole });
        setAttemptCount(0);
      } else {
        const newAttemptCount = attemptCount + 1;
        setAttemptCount(newAttemptCount);

        if (newAttemptCount >= 3) {
          setIsDisabled(true); // Disable form after 3 failed attempts
          setLoading(true);
          console.log("Form disabled. Starting timer to re-enable.");

          // Set a timer to re-enable the form after 1 minute
          setTimeout(() => {
            setIsDisabled(false);
            setLoading(false);
            setAttemptCount(0); // Optionally reset attempt count
            console.log("Form re-enabled.");
          }, 6000);
          setTimeout(() => {
            toast.warn('Account is disabled. Please try again after 3 minutes.')

          }, 6000)
        }
      }
    } catch (error) {
      setLoading(false);
      console.error("Error during authentication:", error);
      // Optionally, increment the attempt count here if authentication fails
      const newAttemptCount = attemptCount + 1;
      setAttemptCount(newAttemptCount);

      if (newAttemptCount >= 3) {
        setIsDisabled(true); // Disable form after 3 failed attempts
        setLoading(true);
        console.log("Form disabled. Starting timer to re-enable.");

        // Set a timer to re-enable the form after 1 minute
        setTimeout(() => {
          setIsDisabled(false);
          setLoading(false);
          setAttemptCount(0); // Optionally reset attempt count
          console.log("Form re-enabled.");
        }, 60000); // 60000 ms = 1 minute
      }
    }
  };
  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   if (isDisabled) return;
  //   const formData = {
  //     emailid,
  //     password,
  //     userrole
  //   };
  //   console.log(formData, "event");
  //   setLoading(true);

  //   try {
  //     const result = await jwttoken(formData);
  //     setLoading(false);

  //     if (result && result.success) {
  //       console.log({ emailid, password, userrole });
  //       setAttemptCount(0); // Reset attempts on success
  //     } else {
  //       setAttemptCount(prev => prev + 1);
  //       if (attemptCount + 1 >= 3) {
  //         setIsDisabled(true); // Disable form after 3 failed attempts
  //         setLoading(true)
  //         console.log("hhhhh")
  //       }
  //     }
  //   } catch (error) {
  //     setLoading(false);
  //     console.error("Error during authentication:", error);
  //     // Optionally, increment the attempt count here if authentication fails
  //     setAttemptCount(prev => prev + 1);
  //     if (attemptCount + 1 >= 3) {
  //       setIsDisabled(true); // Disable form after 3 failed attempts
  //     }
  //   }
  // };

  const handleForgotPasswordOpen = () => {
    setOpenDialog(true);
    
  };

  const handleForgotPasswordClose = () => {
    setOpenDialog(false);
    reset({ userrole: "", emailid: "" })
  };

  const handlePasswordResetSubmit = async (data) => {
    console.log(data, 'forgotPassword');
    await forgotPassword(data)
    setOpenDialog(false)
  };

  const handleKeepSignedInChange = (event) => {
    setKeepSignedIn(event.target.checked);
  };

  useEffect(() => {

    localStorage.clear()
  }, [])
  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", width: "40rem" }}>
        <h4>Log in to your account to access Intain ABS</h4>
        <div className="form_row_single">
          {loading && <FormLoader />}

          <form onSubmit={handleSubmit} style={{ margin: 'auto', padding: '20px' }}>
            <TextField
              label="Email ID"
              InputLabelProps={{ shrink: true }}
              variant="filled"
              fullWidth
              margin="normal"
              value={emailid}
              onChange={(e) => setEmailid(e.target.value)}
              required
              style={{ width: '100%', marginBottom: '16px' }}
              disabled={isDisabled}
            />
            <TextField
              label="Password"
              InputLabelProps={{ shrink: true }}

              type="password"
              variant="filled"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: '100%', marginBottom: '16px' }} // Increased width and gap
              disabled={isDisabled}
            />

            <FormControl fullWidth margin="normal" required style={{ marginBottom: '16px' }} variant='filled'>
              <InputLabel>User Role</InputLabel>
              <Select

                value={userrole}
                onChange={(e) => setUserRole(e.target.value)}
                label="User Role"

              >
                <MenuItem value="Admin">Admin</MenuItem>
                <MenuItem value="Processor">Processor</MenuItem>
              </Select>
            </FormControl>

            <Button variant="contained" color="primary" type="submit" fullWidth style={{ padding: "10px", fontSize: "18px" }}>
              Submit
            </Button>
            <div
              type='button'
              className='popupcancelbtn'
              onClick={handleForgotPasswordOpen}
            >
              Forgot Password?
            </div>

          </form>
          <FormControlLabel
            control={
              <Checkbox
                checked={keepSignedIn}
                onChange={handleKeepSignedInChange}
                color="primary"
              />
            }
            label="Keep me signed-in"
          />
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '35px' }}>
            <hr style={{ flex: 1, border: '1px solid #ccc', marginRight: '8px' }} />
            <Typography variant="body2" color="textSecondary" style={{ whiteSpace: 'nowrap' }}>
              New to Intain ABS?
            </Typography>
            <hr style={{ flex: 1, border: '1px solid #ccc', marginLeft: '8px' }} />
          </div>
          <LinkItem
            to={"/register"}
            variant="contained"
            className="loginBtn"
            title={"Create your Account"}
          >
          </LinkItem>
        </div>
        <Dialog open={openDialog} onClose={handleForgotPasswordClose} className='modalPopup'>
          <div >
            <h2>Forgot Password</h2>
            <>

              <IconButton
                edge="end"
                color="inherit"
                onClick={handleForgotPasswordClose}
                aria-label="close"
                style={{ position: 'absolute', right: 16, top: 8, color: "#018e82" }}
              >
                <CloseIcon />
              </IconButton>
            </>
            <DialogContent>
              <Typography variant="body1" gutterBottom>
                Confirm your Mail ID
              </Typography>
              <Typography variant="body2" gutterBottom>
                We will send the link to reset your password on your registered mail ID
              </Typography>
              <Controller
                name="emailid"
                control={resetControl}
                defaultValue=""
                rules={{ required: 'Email is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Email ID"
                    variant="filled"
                    fullWidth
                    error={!!resetErrors.emailid}
                    helperText={resetErrors.emailid ? resetErrors.emailid.message : ''}
                    style={{ marginBottom: '16px' }}
                  />
                )}
              />
              <Controller
                name="userrole"
                control={resetControl}
                defaultValue=""
                rules={{ required: 'User role is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label="User Role"
                    variant="filled"
                    fullWidth
                    error={!!resetErrors.userrole}
                    helperText={resetErrors.userrole ? resetErrors.userrole.message : ''}
                    style={{ marginBottom: '16px' }}
                  >
                    <MenuItem value="Admin">Admin</MenuItem>
                    <MenuItem value="Processor">Processor</MenuItem>
                  </TextField>
                )}
              />
            </DialogContent>
            <DialogActions style={{ marginRight: "15px", marginBottom: "5px" }}>
              <Button className='' onClick={handleForgotPasswordClose} color="primary" variant='outlined'>
                Cancel
              </Button>
              <CustomButton
                variant="contained"
                color="primary"
                onClick={handleResetSubmit(handlePasswordResetSubmit)}
              >
                Confirm
              </CustomButton>
            </DialogActions>
          </div>
        </Dialog>
      </div>

    </>
  );
};

export default LoginPage;
