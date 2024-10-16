/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import React, { useState, useEffect } from "react";

import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

import "./Login.css";
import Button from "@material-ui/core/Button";
import FormLoader from "../../Components/Formloader/Formloader";
import { withTheme } from "react-jsonschema-form";
import { Theme as MuiTheme } from "rjsf-material-ui";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
// import { CustomFieldTemplate, widgets } from "../../../components/customscripts/customscript";
import schema from "./schema.json";
import { useDispatch } from "react-redux";
import { resetPassword } from "../../Store/User/UserAction";
import { CustomFieldTemplate, widgets } from "../../Components/CustomScripts/CustomScript";
import { Dialog, TextField, Typography } from "@material-ui/core";
import LinkItem from "../../Components/LinkItem/linkitem";
import { Close } from "@material-ui/icons";

const customStylesautosmallmodal = {
    content: {
        top: "25%",
        left: "50%",
        bottom: "auto",
        transform: "translate(-50%, 0%)",
        width: "542px",
        zIndex: "10000",
        borderRadius: "10px",
    },
};
const Form = withTheme(MuiTheme);

const uiSchema = {
    email: {
        "ui:widget": "email",
    },
    password: {
        "ui:widget": "password",
    },
};

const ResetPassword = (props) => {
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({ email: "", password: "" });
    const [formData1, setFormData1] = useState({ password: "", confirmpassword: "" });
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [openPopup, setOpenPopup] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword1, setShowPassword1] = useState(false);
    const [token, setToken] = useState("");
    const [secondFormPasswordErrorMsg, setsecondFormPasswordErrorMsg] = useState("");
    const [keepSignedIn, setKeepSignedIn] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [showErrMsg, setshowErrMsg] = useState()
    const handleForgotPasswordOpen = () => {
        setOpenDialog(true);
    };

    const handleKeepSignedInChange = (event) => {
        setKeepSignedIn(event.target.checked);
    };
    useEffect(() => {
        const search = props.location.search;
        const params = new URLSearchParams(search);
        const tokenFromURL = params.get("token");
        setToken(tokenFromURL);
        sessionStorage.clear();
    }, [props.location.search]);

    const handleEmailChange = (e) => {
        setFormData1((prev) => ({ ...prev, emailid: e.target.value }));
    };

    const handleUserRoleChange = (e) => {
        setFormData1((prev) => ({ ...prev, userrole: e.target.value }));
    };

    const handleOnClick = (e) => {
        setFormData1((prev) => ({ ...prev, password: e.target.value }));
    };

    const handleOnClick1 = (e) => {
        setFormData1((prev) => ({ ...prev, confirmpassword: e.target.value }));
    };

    const handleButtonClick = () => {
        setShowPassword((prev) => !prev);
    };

    const handleButtonClick1 = () => {
        setShowPassword1((prev) => !prev);
    };

    const onSubmit1 = (e) => {
        e.preventDefault();
        if (formData1.password === formData1.confirmpassword && !secondFormPasswordErrorMsg) {
            myfunc();
        } else {
            console.log("Enter Valid Inputs");
        }
    }

    const myfunc = async () => {
        const data = {
            token: token,
            password: formData1.password,
            confirmpassword: formData1.confirmpassword,
        };

        setLoading(true);
        await dispatch(resetPassword(data));
        setLoading(false);
    };

    const onOpenModal = () => {
        setOpen1(true);
    };

    const onOpenModal1 = () => {
        setOpen1(false);
        setOpen2(true);
        setOpen3(false);
    };

    const onCloseModal1 = () => {
        setOpen2(false);
    };

    const onCloseModal = () => {
        setOpen1(false);
    };

    const onCloseModalpopup = () => {
        setOpen3(false);
        window.location.assign("/");
    };

    const onCloseModalpopup1 = () => {
        setOpen2(true);
        window.location.assign("/");
    };

    const secondFormPasswordValidate = () => {
        const passwordValid = formData1.password.match(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*[\d])(?=.*[\W])(?=.*\s).{8,15}$/gm
        );
        if (!passwordValid) {
            console.log(
                "Password must contain at least 8 characters, 1 uppercase, 1 lowercase, 1 special character, and 1 number",
                {
                    variant: "error",
                    autoHideDuration: 3000,
                }
            );
        }
    };

    const secondFormHandleChangePassword = (e) => {
        setFormData1({ ...formData1, password: e.target.value });
        secondFormPasswordValidate();
    };

    const secondFormEmailValidate = () => {
        const emailValid = formData.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        if (!emailValid) {
            console.log("Enter Valid Email", {
                variant: "error",
                autoHideDuration: 3000,
            });
        }
    };

    const secondFormHandleChangeEmail = (e) => {
        setFormData({ ...formData, email: e.target.value });
        secondFormEmailValidate();
    };

    return (
        <React.Fragment>
            <div style={{ display: "flex", flexDirection: "column" }}>


                {loading && <FormLoader />}
                <h4>Log in to your account to access Intain ABS</h4>
                <div className="form_row_single">
                    <Form
                        schema={schema}
                        formData={formData}
                        // onSubmit={onSubmit}
                        widgets={widgets}
                        FieldTemplate={CustomFieldTemplate}
                    // uiSchema={uiSchema}
                    >
                        <div id="form-btn">
                            <div className="container-fluid" style={{ textAlign: "center" }}>
                                <div className="row">
                                    <Button
                                        className="col-md-12"
                                        variant="contained"
                                        size="large"
                                        color="primary"
                                        id="signinbutton"
                                        type="submit"
                                        style={{ background: "#048c88" }}
                                    >
                                        Sign In
                                    </Button>
                                </div>
                                <div>
                                    <div
                                        type='button'
                                        className='popupcancelbtn'
                                        onClick={handleForgotPasswordOpen}
                                    >
                                        Forgot Password?
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Form>

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
                        <Typography variant="body2" color="textSecondary" style={{ whiteSpace: 'nowrap', alignItems: "center" }}>
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

            </div>
            <>
                {open3 && (
                    <Dialog open={open3} onClose={() => setOpen3(false)} className='modalPopup' PaperProps={{
                        style: {
                            overflow: 'hidden', // Hides overflow

                        },
                    }} >
                        <h2 className="popupheading1">Confirm your Mail ID</h2>
                        <Button
                            type="button"
                            className="closePopup"
                            style={{ minWidth: "40px" }}
                            onClick={onCloseModalpopup}
                        >

                            <Close></Close>
                        </Button>
                        <div>
                            <form
                                className=""
                                onSubmit={onSubmit1}
                            >
                                <div className="" style={{padding:"1rem"}}>
                                <label className="label">Password</label>
                                    <div className="flex input" >

                                        <input
                                            required
                                            placeholder="Type here"
                                            className="input-none"
                                            type={
                                                showPassword ? "text" : "password"
                                            }
                                            onChange={secondFormHandleChangePassword}
                                            value={formData1.password}
                                        // required
                                        />
                                        <button
                                            type="button"
                                            className="eye-btn"
                                            onClick={handleButtonClick}
                                        >
                                            {showPassword ? (
                                                <VisibilityOffIcon />
                                            ) : (
                                                <VisibilityIcon />
                                            )}
                                        </button>
                                    </div>
                                </div>
                                {secondFormPasswordErrorMsg === null ||
                                    secondFormPasswordErrorMsg ===
                                    "" ? null : (
                                    <p className="error-msg">
                                        {secondFormPasswordErrorMsg}
                                    </p>
                                )}
                                <div className="" style={{padding:"1rem"}}>
                                    <label className="label">Confirm Password</label>
                                    <div className="flex input">
                                        <input
                                            required
                                            placeholder="Type here"
                                            className="input-none"
                                            type={
                                                showPassword1 ? "text" : "password"
                                            }
                                            onChange={handleOnClick1}
                                            value={formData1.confirmpassword}
                                        // required
                                        />
                                        <button
                                            type="button"
                                            className="eye-btn"
                                            onClick={handleButtonClick1}
                                        >
                                            {showPassword1 ? (
                                                <VisibilityOffIcon />
                                            ) : (
                                                <VisibilityIcon />
                                            )}
                                        </button>
                                    </div>

                                    {showErrMsg && (
                                        <div className="error-msg-container">
                                            {formData1.password ===
                                                formData1.confirmpassword ? null : (
                                                <p className="error-msg">
                                                    Do not match with Password
                                                </p>
                                            )}
                                        </div>
                                    )}
                                </div>
                                <div className="modalsubmit" style={{ display: "flex", justifyContent: "flex-end", marginRight: "2rem" }}>
                                    <div className="submitbuttonbg">
                                        <div className="row">
                                            <div className="row justify-content-endforlogin">
                                                <button
                                                    type="button"
                                                    className="popupbutton2"
                                                //   onClick={handleClick}
                                                >
                                                    {" "}
                                                    Cancel{" "}
                                                </button>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    type="submit"
                                                    style={{background:"#048c88"}}
                                                >
                                                    Reset
                                                    {/* {this.state.formLoader === true ? (
                                    <CircularProgress
                                      size="10px"
                                      color="primary"
                                    />
                                  ) : (
                                    ""
                                  )} */}
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </Dialog>
                )
                }
            </>

        </React.Fragment >
    );
};

export default ResetPassword;
