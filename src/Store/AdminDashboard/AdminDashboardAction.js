import axios from "axios";
import * as AdminDashboardActionType from './AdminDashboardActionType';
import { PATH, URL } from "../../Constants";
import { toast } from 'react-toastify';
import { redirectToLogin } from "../Common/CommonAction";
const token = localStorage.getItem('token')
const userrole = localStorage.getItem('userrole');

export const getallpools = async (dispatch) => {
    const args = {
        method: "GET",
        url: `${URL}${PATH.admin}`,
        headers: {
            authorization: `Bearer ${token}`,
            userrole: `${userrole}`
        }
    };
    try {
        let api = await axios(args);
        if (api.status === 200) {

            dispatch({
                type: AdminDashboardActionType.ADMIN_DASHBOARD_DATA,
                payload: api.data
            });

            toast.info(api.data.message);

        }

        else {
            toast.error(api.data.message)
        }
    } catch (error) {
        if (error && error.response) {
            toast.error(error.response.data.message)

            if (error.response.status === 401) {
                redirectToLogin();
            }
            return false;
        }

    }
}
export const getallprocessor = async (dispatch) => {
    const args = {
        method: "GET",
        url: `${URL}${PATH.getallprocessor}`,
        headers: {
            authorization: `Bearer ${token}`,
            userrole: `${userrole}`
        }
    };
    try {
        let api = await axios(args);

        if (api.status === 200) {

            let data = []
            api.data.result.forEach(function (key, value) {
                var obj = {
                    value: key.userid,
                    label: key.username + " " + key.userLastName,

                }
                data.push(obj);
            })


            dispatch({
                type: AdminDashboardActionType.GET_ALL_PROCESSOR,
                payload: data
            });

            dispatch({
                type: AdminDashboardActionType.GET_ADDITIONAL_DATA,
                payload: api
            });

            toast.info(api.data.message)
        }

        else {
            toast.error(api.data.message)
        }
    } catch (error) {
        if (error && error.response) {
            toast.error(error.response.data.message)

            if (error.response.status === 401) {
                redirectToLogin();
            }
            return false;
        }
    }
}
export const getuniquedealnames = async (dispatch) => {
    const args = {
        method: "GET",
        url: `${URL}${PATH.getuniquedealname}`,
        headers: {
            authorization: `Bearer ${token}`,
            userrole: `${userrole}`
        }
    };
    try {
        let api = await axios(args);
        if (api.status === 200) {


            dispatch({
                type: AdminDashboardActionType.GET_UNIQUE_DEALNAMES,
                payload: api.data.result
            })
        }

        else {
            toast.error(api.data.message)
        }
    } catch (error) {
        toast.error(error.response.data.message)

        console.error(error, "error")
    }
}
export const getallfields = () => {
    return async (dispatch) => {
        const args = {
            method: "GET",
            url: `${URL}${PATH.getallfields}`,
            headers: {
                authorization: `Bearer ${token}`,
                userrole: `${userrole}`
            }
        };

        try {
            const api = await axios(args);
            if (api.status === 200) {
                dispatch({
                    type: AdminDashboardActionType.GET_ALL_FIELDS,
                    payload: api.data.result
                });
                toast.info(api.data.message)
            } else {
                toast.error(api.data.message)
            }
        } catch (error) {
            toast.error(error.response.data.message)

            if (error && error.response) {
                if (error.response.status === 401) {
                    redirectToLogin();
                }
                return false;
            }
        }
    };
}
export const getallissuecertificate = async (dispatch) => {

    const args = {
        method: "GET",
        url: `${URL}${PATH.getallissuecertificate}`,
        headers: {
            authorization: `Bearer ${token}`,
            userrole: `${userrole}`
        }
    };

    try {
        let api = await axios(args);
        if (api.status === 200) {
            dispatch({
                type: AdminDashboardActionType.GET_ALL_ISSUECERTIFICATE_DATA,
                payload: api.data.result
            });
            toast.info(api.data.message)
        }

        else {
            toast.error(api.data.message)
        }
    } catch (error) {
        toast.error(error.response.data.message)

        if (error && error.response) {
            if (error.response.status === 401) {
                redirectToLogin();
            }
            return false;
        }
    }
}



export const getallmapfields = (data) => async (dispatch) => {
    const args = {
        method: "Patch",
        url: `${URL}${PATH.getallmapprocessor}`,
        headers: {
            authorization: `Bearer ${token}`,
            userrole: `${userrole}`
        },
        data
    };
    try {
        let api = await axios(args);
        if (api.status === 200) {
            console.log(api, 'apii')
            dispatch({
                type: AdminDashboardActionType.GET_ALL_MAP_PROCESSOR,
                payload: api.data
            });
            toast.info(api.data.message)
        }

        else {
            toast.error(api.data.message)

        }
    } catch (error) {
        toast.error(error.response.data.message)

        if (error && error.response) {
            if (error.response.status === 401) {
                redirectToLogin();
            }
            return false;
        }
    }
}
export const getallattributes = (value, poolname) => async (dispatch) => {

    const args = {
        method: "GET",
        url: `${URL}${PATH.getallattributes}${value}&poolname=${poolname}`,
        headers: {
            authorization: `Bearer ${token}`,
            userrole: `${userrole}`
        }
    };
    try {
        let api = await axios(args);
        if (api.status === 200) {

            dispatch({
                type: AdminDashboardActionType.GET_ALL_ATTRIBUTES,
                payload: api.data
            })
            toast.info(api.data.message)
        }

        else {
            toast.error(api.data.message)
        }
    } catch (error) {
        toast.error(error.response.data.message)

        if (error && error.response) {
            if (error.response.status === 401) {
                redirectToLogin();
            }
            return false;
        }
    }
}

export const savemapfields = (data) => async (dispatch) => {

    const args = {
        method: "Patch",
        url: `${URL}${PATH.savemapfields}`,
        headers: {
            authorization: `Bearer ${token}`,
            userrole: `${userrole}`
        },
        data
    };
    try {
        let api = await axios(args);
        if (api.status === 200) {
            console.log(api, 'apii')
            dispatch({
                type: AdminDashboardActionType.SAVE_MAP_FIELDS,
                payload: api.data.result
            });
            toast.info(api.data.message)
        }

        else {
            toast.error(api.data.message)
        }
    } catch (error) {
        toast.error(error.response.data.message)

        if (error && error.response) {
            if (error.response.status === 401) {
                redirectToLogin();
            }
            return false;
        }
    }
}

export const adddealdata = (formData) => async (dispatch) => {

    const args = {
        method: "POST",
        url: `${URL}${PATH.adddeal}`,
        headers: {
            authorization: `Bearer ${token}`,
            userrole: `${userrole}`
        },
        data: formData
    };
    try {
        let api = await axios(args);
        if (api.status === 201) {

            dispatch({
                type: AdminDashboardActionType.ADD_DEAL,
                payload: api.data
            });
            toast.info(api.data.message)
        }

        else {
            toast.error(api.data.message)

        }
    } catch (error) {
        toast.error(error.response.data.message)

        if (error && error.response) {
            if (error.response.status === 401) {
                redirectToLogin();
            }
            return false;
        }
    }
}
export const addprocessordata = (formData) => async (dispatch) => {
    
    const args = {
        method: "POST",
        url: `${URL}${PATH.addprocessordata}`,
        headers: {
            authorization: `Bearer ${token}`,
            userrole: `${userrole}`
        },
        data: formData
    };
    try {
        let api = await axios(args);
        if (api.status === 201) {

            dispatch({
                type: AdminDashboardActionType.ADD_PROCESSOR,
                payload: api.data
            });
            toast.info(api.data.message)
        }

        else {
            toast.error(api.data.message)

        }
    } catch (error) {
        toast.error(error.response.data.message)

        if (error && error.response) {
            if (error.response.status === 401) {
                redirectToLogin();
            }
            return false;
        }
    }
}
export const deletedealid = (value) => async (dispatch) => {

    const args = {
        method: "delete",
        url: `${URL}${PATH.deletedeal}${value}`,
        headers: {
            authorization: `Bearer ${token}`,
            userrole: `${userrole}`
        },

    };
    try {
        let api = await axios(args);
        if (api.status === 200) {

            dispatch({
                type: AdminDashboardActionType.ADD_PROCESSOR,
                payload: api.data
            });
            toast.info(api.data.message)
        }

        else {
            console.log("No Data");
            toast.error(api.data.message);
            return false;

        }
    } catch (error) {
        toast.error(error.response.data.message)

        if (error && error.response) {
            if (error.response.status === 401) {
                redirectToLogin();
            }
            return false;
        }
    }
}
export const addfield = (data) => async (dispatch) => {

    const args = {
        method: "POST",
        url: `${URL}${PATH.addfields}`,
        headers: {
            authorization: `Bearer ${token}`,
            userrole: `${userrole}`
        },
        data
    };
    try {
        let api = await axios(args);
        if (api.status === 201) {

            dispatch({
                type: AdminDashboardActionType.ADD_DEAL,
                payload: api.data
            });
            toast.info(api.data.message)
        }

        else {
            console.log("No Data")
            toast.error(api.data.message)
        }
    } catch (error) {
        toast.error(error.response.data.message)

        console.error(error, "error");
        if (error && error.response) {
            if (error.response.status === 401) {
                redirectToLogin();
            }
            return false;
        }
    }
}

export const addissuecertificate = (data) => async (dispatch) => {

    const args = {
        method: "POST",
        url: `${URL}${PATH.addissuecertificate}`,
        headers: {
            authorization: `Bearer ${token}`,
            userrole: `${userrole}`
        },
        data
    };
    try {
        let api = await axios(args);
        if (api.status === 201) {

            dispatch({
                type: AdminDashboardActionType.ADD_DEAL,
                payload: api.data
            });
            toast.info(api.data.message)
        }

        else {
            toast.error(api.data.message)
        }
    } catch (error) {
        toast.error(error.response.data.message)

        console.error(error, "error");
        if (error && error.response) {
            if (error.response.status === 401) {
                redirectToLogin();
            }
            return false;
        }
    }
}