
export const URL = "https://intainva.intainabs.com/"
export const PATH = {
    jwttoken: "backendapiumb/v1/JWT_TOKEN",
    forgotpassword: "backendapiumb/v1/forgotPassword",
    resetpassword:"backendapiumb/v1/resetPassword?token=",
    logout:"backendapiumb/v1/logout",
    register:"backendapiumb/v1/register",
    admin: "backendapiumb/v1/getAllPoolDetails",
    getuniquedealname: "backendapiumb/v1/getUniqueDealNames",
    getallprocessor: "backendapiumb/v1/getAllProcessor",
    getallfields: "backendapiumb/v1/getAllAttributes",
    getallissuecertificate: "backendapiumb/v1/getAllMessages",
    getallmapprocessor: "backendapiumb/v1/mapProcessor",
    savemapfields: "backendapiumb/v1/poolAttributeMapping",
    getallattributes: "backendapiumb/v1/getAttributesByPoolId?poolid=",
    getallpoolsbyuserid: "backendapiumb/v1/getAllPoolsByUserid/",
    downloadcertificate: "backendapiumb/v1/downloadCertByPoolId?dealId=",
    getfilelist: "backendapiumb/v1/getFileListByDealName?poolname=",
    getattributedetail: "backendapiumb/v1/getAttributeDetailsByPoolId?poolid=",
    uploadcontract: "backendapiai/api/upload_documents",
    uploadlms: "backendapiumb/v1/uploadLms",
    savelms: "backendapiumb/v1/saveLms",
    viewloans:"backendapiai/api/view_loans",
    getattributedetailbypoolid:"backendapiumb/v1/getAttributeDetailsByPoolId?poolid=",
    adddeal:"backendapiumb/v1/addPool",
    addprocessordata:"backendapiumb/v1/addProcessor",
    deletedeal:"backendapiumb/v1/deletePool?poolid=",
    addfields:"backendapiumb/v1/addAttribute",
    addissuecertificate:"backendapiumb/v1/saveMessage",
    downloadexcel:"backendapiumb/v1/downloadExcel?poolname=",
    exportexcel:"backendapiumb/v1/exportExcel?poolname=",
    updatedata:"backendapiumb/v1/updatedatas",
    editLoans:"backendapiai/api/get_loans",
    addsignature:"backendapiumb/v1/uploadSignature",
    issuecertificate:"backendapiumb/v1/issueCertificate",
    getallmessagesbydealname:"backendapiumb/v1/getAllMsgByDealName?dealName=",
    savecertificate:"backendapiumb/v1/storeCertInIPFS"

}

export const routers = ["/"]