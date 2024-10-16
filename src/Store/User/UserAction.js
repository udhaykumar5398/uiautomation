import axios from "axios";
import { PATH, URL } from "../../Constants";
import { toast } from 'react-toastify';

const userrole = localStorage.getItem('userrole')


export const jwttoken = async (data) => {
    const args = {
        method: "POST",
        url: `${URL}${PATH.jwttoken}`,
        headers: {
            'Content-Type': 'application/json'
        },
        data
    };

    try {
        let api = await axios(args);
        console.log(api, "api");

        if (api.status === 200) {
            localStorage.setItem("userrole", api.data.result.userrole);
            localStorage.setItem("userid", api.data.result.userid);
            localStorage.setItem("username", api.data.result.username);
            localStorage.setItem("userLastName", api.data.result.userLastName);
            localStorage.setItem("token", api.data.token);

            toast.info(api.data.message);
            setTimeout(() => {
                if (api.data.result.userrole === 'Admin') {
                    window.location.assign('admin/dashboard');
                } else if (api.data.result.userrole === 'Processor') {
                    window.location.assign('processor/dashboard');
                }
            }, 1000); // Delay of 1000 milliseconds (1 second)

        } else {
            toast.error(api.data.message);
        }

    } catch (error) {
        if (error && error.response) {

            toast.error(error.response.data.message);
        }
        console.log(error, 'error');
    }
}

export const logout = (data) => {
    return async (dispatch) => {
        const args = {
            method: "POST",
            url: `${URL}${PATH.logout}`,
            headers: {
                authorization: `Bearer ${data.token}`,
                userrole: `${userrole}`,
            },
            data,
        };

        try {
            let api = await axios(args);
            console.log(api, "api");
            if (api.status === 200) {
                toast.info(api.data.message)
                localStorage.clear();
                setTimeout(() => {
                    window.location.assign("/");
                }, 1000)

            } else {
                toast.error(api.data.message)
                console.log("Logout error");
            }
        } catch (error) {
            console.log(error, 'error');
            // Dispatch a failure action if needed
            // dispatch({ type: 'LOGOUT_FAILURE', payload: error });
        }
    };
}
export const forgotPassword = async (data) => {
    const args = {
        method: "POST",
        url: `${URL}${PATH.forgotpassword}`,
        headers: {
            'Content-Type': 'application/json'
        },
        data
    };
    try {
        let api = await axios(args)
        console.log(api, "api")
        if (api.status === 200) {
            toast.info(api.data.message)
            console.log('Successfull')
        } else {
            console.log("login error")
        }

    } catch (error) {
        if (error && error.response) {
            toast.error(error.response.data.message);
        }
        console.log(error, 'error')
    }

}
export const resetPassword = async (data) => {
    const args = {
        method: "patch",
        url: `${URL}${PATH.resetpassword}${data.token}`,
        headers: {
            'Content-Type': 'application/json'
        },

    };
    try {
        let api = await axios(args)
        console.log(api, "api")
        if (api.status === 200) {
            console.log('Successfull')
            toast.info(api.data.message)
            console.log('Successfull')
        } else {
            console.log("login error")
        }

    } catch (error) {
        if (error && error.response) {
            toast.error(error.response.data.message);
        }
    }

}
export const register = async (data) => {
    const args = {
        method: "POST",
        url: `${URL}${PATH.register}`,
        headers: {
            'Content-Type': 'application/json'
        },
        data

    };
    try {
        let api = await axios(args)
        console.log(api, "api")
        if (api.status === 200) {
            console.log('Successfull')
            toast.info(api.data.message)
            console.log('Successfull')
        } else {
            console.log("login error")
        }

    } catch (error) {
        if (error && error.response) {
            toast.error(error.response.data.message);
        }
    }

}