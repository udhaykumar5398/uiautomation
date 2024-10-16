import * as ProcessorDashboardActionType from "./ProcessorDashboardActionType"


const initialProcessorState = {


    processor_data: [],
    get_file_list: [],
    upload_contract: {},
    upload_lms: {},
    save_lms: {},
    view_loans: {},
    get_attribute_detail: {},
    review: {},
    ddreport: {},
    edit_loans: {},
    getallmessage: {},
}
const processorReducer = (state = initialProcessorState, { type, payload }) => {
    switch (type) {
        case ProcessorDashboardActionType.PROCESSOR_DASHBOARD_DATA:
            return {
                ...state,
                processor_data: payload
            }
        case ProcessorDashboardActionType.GET_FILE_LIST:
            return {
                ...state,
                get_file_list: payload
            }

        case ProcessorDashboardActionType.UPLOAD_CONTRACT:
            return {
                ...state,
                upload_contract: payload
            }
        case ProcessorDashboardActionType.UPLOAD_LMS:
            return {
                ...state,
                upload_lms: payload
            }
        case ProcessorDashboardActionType.SAVE_LMS:
            return {
                ...state,
                save_lms: payload
            }
        case ProcessorDashboardActionType.VIEW_LOANS:
            return {
                ...state,
                view_loans: payload
            }
        case ProcessorDashboardActionType.GET_ATTRIBUTE_DETAIL:
            return {
                ...state,
                get_attribute_detail: payload
            }
        case ProcessorDashboardActionType.REVIEW:
            return {
                ...state,
                review: payload
            }
        case ProcessorDashboardActionType.EDIT_LOANS:
            return {
                ...state,
                edit_loans: payload
            }
        case ProcessorDashboardActionType.DDREPORT:
            return {
                ...state,
                ddreport: payload
            }
        case ProcessorDashboardActionType.GET_ALL_MESSAGE:
            return {
                ...state,
                getallmessage: payload
            }


        default:
            return state
    }


}
export default processorReducer
