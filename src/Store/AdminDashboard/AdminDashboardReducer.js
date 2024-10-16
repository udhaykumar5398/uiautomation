import * as AdminDashboardActionType from "./AdminDashboardActionType"


const initialAdminState = {
    add_deal_data: {

    },
    add_processor_data: {

    },
    add_fields_data: {

    },
    add_issuecertificate_data: {

    },
    add_map_processor: {

    },
    get_all_attributes: {

    },
    save_map_fields:{

    },
    data: []
}
const adminReducer = (state = initialAdminState, { type, payload }) => {
    switch (type) {
        case AdminDashboardActionType.ADMIN_DASHBOARD_DATA:
            return {
                ...state,
                data: payload
            }
        case AdminDashboardActionType.GET_UNIQUE_DEALNAMES:
            return {
                ...state,
                get_unique_dealnames: payload
            }
        case AdminDashboardActionType.GET_ALL_PROCESSOR:
            return {
                ...state,
                get_all_processor: payload
            }
        case AdminDashboardActionType.GET_ALL_FIELDS:
            return {
                ...state,
                add_fields_data: payload
            }
        case AdminDashboardActionType.GET_ALL_ISSUECERTIFICATE_DATA:
            return {
                ...state,
                add_issuecertificate_data: payload
            }
        case AdminDashboardActionType.GET_ALL_ATTRIBUTES:
            return {
                ...state,
                get_all_attributes: payload
            }
        case AdminDashboardActionType.GET_ALL_MAP_PROCESSOR:
            return {
                ...state,
                add_map_processor: payload
            }
            case AdminDashboardActionType.SAVE_MAP_FIELDS:
                return {
                    ...state,
                    save_map_fields: payload
                }
        case AdminDashboardActionType.GET_ADDITIONAL_DATA:
            return {
                ...state,
                add_processor_data: payload
            }

        default:
            return state
    }


}
export default adminReducer
