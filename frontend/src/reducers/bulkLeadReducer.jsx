import {
    BULK_LEAD_ADD_REQUEST,
    BULK_LEAD_ADD_SUCCESS,
    BULK_LEAD_ADD_FAIL,
    BULK_LEAD_ADD_RESET,
    BULK_LEAD_ASSIGN_REQUEST,
    BULK_LEAD_ASSIGN_SUCCESS,
    BULK_LEAD_ASSIGN_FAIL,
    BULK_LEAD_EDIT_REQUEST,
    BULK_LEAD_EDIT_SUCCESS,
    BULK_LEAD_EDIT_FAIL,
    BULK_LEAD_LIST_REQUEST,
    BULK_LEAD_LIST_SUCCESS,
    BULK_LEAD_LIST_FAIL,
} from '../constants/bulkLeadConstants'


export const addBulkLeadReducer = (state = {}, action) => {
    switch (action.type) {
      case BULK_LEAD_ADD_REQUEST:
        return { loading: true }
      case BULK_LEAD_ADD_SUCCESS:
        return { loading: false, status: action.payload }
      case BULK_LEAD_ADD_FAIL:
        return { loading: false, error: action.payload }
      case BULK_LEAD_ADD_RESET:
            return { }
      default:
        return state
    }
  }

  export const assignBulkLeadReducer = (state = {}, action) => {
    switch (action.type) {
      case BULK_LEAD_ASSIGN_REQUEST:
        return { loading: true }
      case BULK_LEAD_ASSIGN_SUCCESS:
        return { loading: false, success : true }
      case BULK_LEAD_ASSIGN_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }

  export const getBulkLeadReducer = (state = {}, action) => {
    switch (action.type) {
      case BULK_LEAD_LIST_REQUEST:
        return { loading: true }
      case BULK_LEAD_LIST_SUCCESS:
        return { loading: false, leadList : action.payload.bulkLeadList }
      case BULK_LEAD_LIST_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }

  export const editBulkLeadReducer = (state = {}, action) => {
    switch (action.type) {
      case BULK_LEAD_EDIT_REQUEST:
        return { loading: true }
      case BULK_LEAD_EDIT_SUCCESS:
        return { loading: false, leadInfo: action.payload, success: true }
      case BULK_LEAD_EDIT_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }