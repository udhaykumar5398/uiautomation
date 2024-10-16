/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import React, { useState, useEffect } from 'react';
import { TextField, MenuItem, Button, FormControl, InputLabel, Select } from '@mui/material';
import { withTheme } from 'react-jsonschema-form';
import { Theme as MuiTheme } from 'rjsf-material-ui';
import LinkItem from '../../Components/LinkItem/linkitem';
import { useDispatch } from 'react-redux';
import { CustomFieldTemplate, widgets } from '../../Components/CustomScripts/CustomScript';
import { register } from '../../Store/User/UserAction';


const Register = ({ enqueueSnackbar, history }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({});
    const [formLoader, setFormLoader] = useState(false);
    const [formData1, setFormData1] = useState({
        firstName: '',
        lastName: '',
        emailId: '',
        password: '',
        mobileNumber: '',
        userRole: ''
    });
   
    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        emailId: '',
        password: '',
        mobileNumber: '',
        userRole: '',
        submitError: ''
    });
    const validateFormData = () => {
        let isValid = true;
        const newErrors = { ...errors };

        if (!formData1.firstName) {
            newErrors.firstName = 'First Name is required';
            isValid = false;
        } else {
            newErrors.firstName = '';
        }

        if (!formData1.lastName) {
            newErrors.lastName = 'Last Name is required';
            isValid = false;
        } else {
            newErrors.lastName = '';
        }

        if (!formData1.emailId || !/\S+@\S+\.\S+/.test(formData1.emailId)) {
            newErrors.emailId = 'Valid Email Id is required';
            isValid = false;
        } else {
            newErrors.emailId = '';
        }

        if (!formData1.password) {
            newErrors.password = 'Password is required';
            isValid = false;
        } else {
            newErrors.password = '';
        }

        if (!formData1.mobileNumber || !/^\d{10}$/.test(formData1.mobileNumber)) {
            newErrors.mobileNumber = 'Valid Mobile Number is required';
            isValid = false;
        } else {
            newErrors.mobileNumber = '';
        }

        if (!formData1.userRole) {
            newErrors.userRole = 'User Role is required';
            isValid = false;
        } else {
            newErrors.userRole = '';
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData1({
            ...formData1,
            [name]: value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (validateFormData()) {
            setFormLoader(true);
            console.log(formData1,"formmm")
            try {
                await dispatch(register(formData1));
                // enqueueSnackbar('Registration successful!', { variant: 'success' });
                history.push('/');
            } catch (error) {
                setErrors({ ...errors, submitError: 'Registration failed. Please try again.' });
            } finally {
                setFormLoader(false);
            }
        }
    };


    const onSubmit = async (value) => {
        console.log('onSubmit:', value.formData);
        const data = value.formData;
        await dispatch(register(data))
        console.log(data)

    };
    useEffect(() => {
        localStorage.clear();
    }, []);

 

    return (
        <React.Fragment>
            <div style={{ display: "flex", flexDirection: "column" }}>
                <h4>Sign up to your account to access Intain ABS</h4>
                <div className="form_row_single">
                    {/* formLoader can be used here to conditionally show loader */}
                    {/* <Form
                        schema={formSchema}
                        // onChange={formData}
                        onSubmit={onSubmit}
                        widgets={widgets}
                        FieldTemplate={CustomFieldTemplate}
                        uiSchema={uiSchema}
                        // validate={validate}
                    >
                        <div id="form-btn">
                            <div className="container-fluid text-center">
                                <div className="row">
                                    <Button
                                        className="col-md-12"
                                        variant="contained"
                                        size="large"
                                        color="primary"
                                        id="signinbutton"
                                        type="submit"
                                        disabled={formLoader}
                                        style={{background:"#048c88"}}
                                    >
                                        Register
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Form> */}
                    <form onSubmit={handleSubmit}  style={{ maxWidth: 600, margin: '0 auto' }}>
                        <TextField
                            label="First Name"
                            name="firstName"
                            value={formData1.firstName}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            style={{ width: '100%', marginBottom: '16px' }} // Increased width and gap
                            variant="filled"

                        />
                        <TextField
                            label="Last Name"
                            name="lastName"
                            value={formData1.lastName}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            style={{ width: '100%', marginBottom: '16px' }} // Increased width and gap
                            variant="filled"

                        />
                        <TextField
                            label="Email Id"
                            name="emailId"
                            type="email"
                            value={formData1.emailId}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            style={{ width: '100%', marginBottom: '16px' }} // Increased width and gap
                            variant="filled"

                        />
                        <TextField
                            label="Password"
                            name="password"
                            type="password"
                            value={formData1.password}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            style={{ width: '100%', marginBottom: '16px' }} // Increased width and gap
                            variant="filled"

                        />
                        <TextField
                            label="Mobile Number"
                            name="mobileNumber"
                            type="tel"
                            value={formData1.mobileNumber}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            variant='filled'
                            style={{ width: '100%', marginBottom: '16px' }}

                        />
                        <FormControl fullWidth margin="normal" variant='filled'
                            style={{ width: '100%', marginBottom: '16px' }}  >
                            <InputLabel>User Role</InputLabel>
                            <Select
                                name="userRole"
                                value={formData1.userRole}
                                onChange={handleChange}
                                label="User Role"
                            >
                                <MenuItem value="Admin">Admin</MenuItem>
                                <MenuItem value="Processor">Processor</MenuItem>

                            </Select>
                        </FormControl>
                        <div id="form-btn">
                            <div className="container-fluid text-center">
                                <div className="row">
                                    <Button
                                        className="col-md-12"
                                        variant="contained"
                                        size="large"
                                        color="primary"
                                        id="signinbutton"
                                        type="submit"
                                        // disabled={formLoader}
                                        style={{ background: "#048c88" }}
                                    >
                                        Register
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div className="loginCheckbox">
                        <p className="lineDivider">
                            <span>Have Account?</span>
                        </p>
                        <LinkItem to={'/'} variant="contained" className="loginBtn" title={'Login'}> </LinkItem>
                    </div>
                </div></div>
        </React.Fragment>
    );
};

export default Register
