import axios from "axios";
import * as ProcessorDashboardActionType from "./ProcessorDashboardActionType"
import { PATH, URL } from "../../Constants";
import { toast } from 'react-toastify';
import { redirectToLogin } from "../Common/CommonAction";



const token = localStorage.getItem('token')
const userrole = localStorage.getItem('userrole');

export const getallpools = (userrid) => async (dispatch) => {
    const args = {
        method: "GET",
        url: `${URL}${PATH.getallpoolsbyuserid}${userrid}`,
        headers: {
            authorization: `Bearer ${token}`,
            userrole: `${userrole}`
        },

    };
    try {
        let api = await axios(args);
        if (api.status === 200) {

            dispatch({
                type: ProcessorDashboardActionType.PROCESSOR_DASHBOARD_DATA,
                payload: api.data
            });
            toast.info(api.data.message);

        }

        else {
            console.log("No Data");
            toast.error(api.data.message)
        }
    } catch (error) {
        console.error(error, "error");
        if (error && error.response) {
            toast.error(error.response.data.message)
            if (error.response.status === 401) {
                redirectToLogin();
            }
            return false;
        }
    }
}


export const downloadcertificate = (value, dealname) => async () => {
    const args = {
        method: "GET",
        url: `${URL}${PATH.downloadcertificate}${value}`,
        headers: {
            authorization: `Bearer ${token}`,
            userrole: `${userrole}`
        },
        responseType: 'arraybuffer'
    };

    try {
        let api = await axios(args);
        if (api.status === 200) {
            const file_name = `Certificate-${dealname}.pdf`;
            startDownload(api.data, file_name);

            function startDownload(file, file_name) {
                const pdffile = new Blob([file], { type: "application/pdf" });
                const downloadLink = document.createElement("a");
                const url = window.URL.createObjectURL(pdffile);
                downloadLink.href = url;
                downloadLink.download = file_name;
                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);
                window.URL.revokeObjectURL(url);
            }

            toast.info("Download started!");
        } else {
            console.log("No Data");
            toast.error(api.data.message);
        }
    } catch (error) {
        console.error("Error downloading certificate:", error);
        if (error && error.response) {
            toast.error(error.response.data.message)
            if (error.response.status === 401) {
                redirectToLogin();
            }
            return false;
        }
    }
};

export const getfilelist = (dealname) => async (dispatch) => {
    const args = {
        method: "GET",
        url: `${URL}${PATH.getfilelist}${dealname}`,
        headers: {
            authorization: `Bearer ${token}`,
            userrole: `${userrole}`
        },

    };
    try {
        let api = await axios(args);
        if (api.status === 200) {
            let arr = api.data;
            let arr1 = [];
            arr.forEach(function (element) {
                arr1.push({ label: element, value: element })
            })
            console.log(arr1, 'arr1')
            dispatch({
                type: ProcessorDashboardActionType.GET_FILE_LIST,
                payload: arr1
            });
            toast.info(api.data.message);
            return true;
        }

        else {
            console.log("No Data");
            toast.error(api.data.message);
            return false;
        }
    } catch (error) {
        console.error(error, "error");
        if (error && error.response) {
            toast.error(error.response.data.message)
            if (error.response.status === 401) {
                redirectToLogin();
            }
            return false;
        }
    }
}

export const getattributedetail = (poolid) => async (dispatch) => {
    const args = {
        method: "GET",
        url: `${URL}${PATH.getattributedetail}${poolid}`,
        headers: {
            authorization: `Bearer ${token}`,
            userrole: `${userrole}`
        },

    };
    try {
        let api = await axios(args);
        if (api.status === 200) {


            const field_details = api.data.result;
            console.log(field_details, 'fleds')
            localStorage.setItem("field_details", JSON.stringify(field_details));
            toast.info(api.data.message)

        }

        else {
            console.log("No Data");
            toast.error(api.data.message)
        }
    } catch (error) {
        console.error(error, "error");
        if (error && error.response) {
            toast.error(error.response.data.message)
            if (error.response.status === 401) {
                redirectToLogin();
            }
            return false;
        }
    }
}
export const uploadcontract = (data) => async (dispatch) => {
    const args = {
        method: "POST",
        url: `${URL}${PATH.uploadcontract}`,
        headers: {
            authorization: `Bearer ${token}`,
            userrole: `${userrole}`
        },
        data

    };
    try {
        let api = await axios(args);
        if (api.status === 200) {
            if (api.data.desc === "File Upload Completed!!!") {
                dispatch({
                    type: ProcessorDashboardActionType.UPLOAD_CONTRACT,
                    payload: api.data
                });
                toast.info(api.data.message)
            }

        }

        else {
            console.log("No Data");
            toast.error(api.data.message)
        }
    } catch (error) {
        console.error(error, "error");
        if (error && error.response) {
            toast.error(error.response.data.message)
            if (error.response.status === 401) {
                redirectToLogin();
            }
            return false;
        }
    }
}
export const uploadlms = (data) => async (dispatch) => {
    const args = {
        method: "POST",
        url: `${URL}${PATH.uploadlms}`,
        headers: {
            authorization: `Bearer ${token}`,
            userrole: `${userrole}`
        },
        data

    };
    try {
        let api = await axios(args);
        if (api.status === 200) {
            dispatch({
                type: ProcessorDashboardActionType.UPLOAD_LMS,
                payload: api.data
            });
            toast.info(api.data.message)
            return api.data.filetype;

        }

        else {
            console.log("No Data");
            toast.error(api.data.message)
            return false;
        }
    } catch (error) {
        console.error(error, "error");
        if (error && error.response) {
            toast.error(error.response.data.message)
            if (error.response.status === 401) {
                redirectToLogin();
            }
            return false;
        }
    }
}
export const savelms = (uploadlmsfile) => async (dispatch) => {
    const args = {
        method: "POST",
        url: `${URL}${PATH.savelms}`,
        headers: {
            authorization: `Bearer ${token}`,
            userrole: `${userrole}`
        },
        data: uploadlmsfile

    };
    try {
        let api = await axios(args);
        if (api.status === 200) {
            dispatch({
                type: ProcessorDashboardActionType.SAVE_LMS,
                payload: api.data
            })
            toast.info(api.data.message)


        }

        else {
            console.log("No Data");
            toast.error(api.data.message)
        }
    } catch (error) {
        console.error(error, "error");
        if (error && error.response) {
            toast.error(error.response.data.message)
            if (error.response.status === 401) {
                redirectToLogin();
            }
            return false;
        }
    }
}
export const viewloans = (data) => async (dispatch) => {
    const args = {
        method: "POST",
        url: `${URL}${PATH.viewloans}`,
        headers: {
            authorization: `Bearer ${token}`,
            userrole: `${userrole}`
        },
        data

    };
    try {
        let api = await axios(args);
        if (api.status === 200) {

            dispatch({
                type: ProcessorDashboardActionType.VIEW_LOANS,
                payload: api.data.res
            });
            toast.info(api.data.res.message)
            return true;
        }

        else {
            console.log("No Data");
            toast.error(api.data.message)
            return false
        }
    } catch (error) {
        console.error(error, "error");
        if (error && error.response) {
            toast.error(error.response.data.message)
            if (error.response.status === 401) {
                redirectToLogin();
            }
            return false;
        }
    }
}
export const getattributedetailbypoolid = (poolid) => async (dispatch) => {
    const args = {
        method: "GET",
        url: `${URL}${PATH.getattributedetailbypoolid}${poolid}`,
        headers: {
            authorization: `Bearer ${token}`,
            userrole: `${userrole}`
        },


    };
    try {
        let api = await axios(args);
        if (api.status === 200) {

            dispatch({
                type: ProcessorDashboardActionType.GET_ATTRIBUTE_DETAIL,
                payload: api.data.result
            });
            toast.info(api.data.message)
        }

        else {
            console.log("No Data");
            toast.error(api.data.message)
        }
    } catch (error) {
        console.error(error, "error");
        if (error && error.response) {
            toast.error(error.response.data.message)
            if (error.response.status === 401) {
                redirectToLogin();
            }
            return false;
        }
    }
}
export const reviewdata = (result) => async (dispatch) => {
    dispatch({
        type: ProcessorDashboardActionType.REVIEW,
        payload: result
    });
}
export const ddreportselect = (result) => async (dispatch) => {
    dispatch({
        type: ProcessorDashboardActionType.DDREPORT,
        payload: result
    });
}
export const downloadexcel = (value, dealname) => async () => {
    const args = {
        method: "GET",
        url: `${URL}${PATH.downloadexcel}${dealname}&poolid=${value}`,
        headers: {
            authorization: `Bearer ${token}`,
            userrole: `${userrole}`
        },
        responseType: 'arraybuffer'
    };

    try {
        let api = await axios(args);
        if (api.status === 200) {
            const file_name = value + "_" + dealname + ".xlsx";
            startDownload(api.data, file_name);

            function startDownload(file, file_name) {
                const pdffile = new Blob([file], { type: "application/pdf" });
                const downloadLink = document.createElement("a");
                const url = window.URL.createObjectURL(pdffile);
                downloadLink.href = url;
                downloadLink.download = file_name;
                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);
                window.URL.revokeObjectURL(url);
            }

            toast.info("Download started!");
        } else {
            console.log("No Data");
            toast.error(api.data.message);
        }
    } catch (error) {
        console.error("Error downloading certificate:", error);
        if (error && error.response) {
            toast.error(error.response.data.message)
            if (error.response.status === 401) {
                redirectToLogin();
            }
            return false;
        }
    }
};
export const exportexcel = (data) => async () => {
    const args = {
        method: "GET",
        url: `${URL}${PATH.exportexcel}${data.poolname}&poolid=${data.poolid}`,
        headers: {
            authorization: `Bearer ${token}`,
            userrole: `${userrole}`
        },
        responseType: 'arraybuffer'
    };

    try {
        let api = await axios(args);
        if (api.status === 200) {
            const file_name = data.poolname + "_" + data.poolid + ".xlsx";
            startDownload(api.data, file_name);

            function startDownload(file, file_name) {
                const pdffile = new Blob([file], { type: "application/pdf" });
                const downloadLink = document.createElement("a");
                const url = window.URL.createObjectURL(pdffile);
                downloadLink.href = url;
                downloadLink.download = file_name;
                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);
                window.URL.revokeObjectURL(url);
            }

            toast.info("Download started!");
        } else {
            console.log("No Data");
            toast.error(api.data.message);
        }
    } catch (error) {
        console.error("Error downloading certificate:", error);
        if (error && error.response) {
            toast.error(error.response.data.message)
            if (error.response.status === 401) {
                redirectToLogin();
            }
            return false;
        }
    }
};


export const updatedata = (data) => async (dispatch) => {
    const args = {
        method: "Patch",
        url: `${URL}${PATH.updatedata}`,
        headers: {
            authorization: `Bearer ${token}`,
            userrole: `${userrole}`
        },
        data

    };
    try {
        let api = await axios(args);

        if (api.status === 200) {


            toast.info(api.data.message);

        }

        else {
            console.log("No Data");
            toast.error(api.data.message)
        }
    } catch (error) {
        console.error(error, "error");
        if (error && error.response) {
            toast.error(error.response.data.message)
            if (error.response.status === 401) {
                redirectToLogin();
            }
            return false;
        }
    }
}
export const editloans = (data) => async (dispatch) => {
    const args = {
        method: "POST",
        url: `${URL}${PATH.editLoans}`,
        headers: {
            authorization: `Bearer ${token}`,
            userrole: `${userrole}`
        },
        data

    };
    try {
        let api = await axios(args);
        if (api.status === 200) {

            dispatch({
                type: ProcessorDashboardActionType.EDIT_LOANS,
                payload: api.data
            });
            toast.info(api.data.res.message)
            return true;
        }

        else {
            console.log("No Data");
            toast.error(api.data.message)
            return false
        }
    } catch (error) {
        console.error(error, "error");
        if (error && error.response) {
            toast.error(error.response.data.message)
            if (error.response.status === 401) {
                redirectToLogin();
            }
            return false;
        }
    }
}
export const addsignature = (data) => async (dispatch) => {
    const args = {
        method: "POST",
        url: `${URL}${PATH.addsignature}`,
        headers: {
            authorization: `Bearer ${token}`,
            userrole: `${userrole}`
        },
        data

    };
    try {
        let api = await axios(args);
        if (api.status === 200) {

            console.log(api, "apiii")
            toast.info(api.data.result)
            return api.data.filePath;
        }

        else {
            console.log("No Data");
            toast.error(api.data.message)
            return false
        }
    } catch (error) {
        console.error(error, "error");
        if (error && error.response) {
            toast.error(error.response.data.message)
            if (error.response.status === 401) {
                redirectToLogin();
            }
            return false;
        }
    }
}
export const issuecertificate = (data) => async (dispatch) => {
    const args = {
        method: "POST",
        url: `${URL}${PATH.issuecertificate}`,
        headers: {
            authorization: `Bearer ${token}`,
            userrole: `${userrole}`
        },
        data

    };
    try {
        let api = await axios(args);
        if (api.status === 201) {

            localStorage.setItem("filename", api.data.filename)
            toast.info(api.data.message)
            return api.data.filename;
        }

        else {
            console.log("No Data");
            toast.error(api.data.message)
            return false
        }
    } catch (error) {
        console.error(error, "error");
        if (error && error.response) {
            toast.error(error.response.data.message)
            if (error.response.status === 401) {
                redirectToLogin();
            }
            return false;
        }
    }
}
export const getallmessagesbydealname = (data) => async (dispatch) => {
    const args = {
        method: "GET",
        url: `${URL}${PATH.getallmessagesbydealname}${data.dealName}`,
        headers: {
            authorization: `Bearer ${token}`,
            userrole: `${userrole}`
        },


    };
    try {
        let api = await axios(args);
        if (api.status === 200) {

            dispatch({
                type: ProcessorDashboardActionType.GET_ALL_MESSAGE,
                payload: api.data
            });
            toast.info(api.data.message)
            return api.data;
        }

        else {
            console.log("No Data");
            toast.error(api.data.message)
            return false
        }
    } catch (error) {
        console.error(error, "error");
        if (error && error.response) {
            toast.error(error.response.data.message)
            if (error.response.status === 401) {
                redirectToLogin();
            }
            return false;
        }
    }
}

export const savecertificate = (data) => async (dispatch) => {
    const args = {
        method: "POST",
        url: `${URL}${PATH.savecertificate}`,
        headers: {
            authorization: `Bearer ${token}`,
            userrole: `${userrole}`
        },
        data

    };
    try {
        let api = await axios(args);
        if (api.status === 201) {
            console.log(api, "savee")
            toast.info(api.data.message)
            return true;
        }

        else {
            console.log("No Data");
            toast.error(api.data.message)
            return false
        }
    } catch (error) {
        console.error(error, "error");
        if (error && error.response) {
            toast.error(error.response.data.message)
            if (error.response.status === 401) {
                redirectToLogin();
            }
            return false;
        }
    }
}