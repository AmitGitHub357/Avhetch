import {
    LEAD_ADD_FAIL,
    LEAD_ADD_REQUEST,
    LEAD_ADD_SUCCESS,
    LEAD_UPDATE_REQUEST,
    LEAD_UPDATE_SUCCESS,
    LEAD_UPDATE_FAIL,
    LEAD_UPDATE_RESET,
    LEAD_DETAILS_REQUEST,
    LEAD_DETAILS_SUCCESS,
    LEAD_DETAILS_RESET,
    LEAD_DETAILS_FAIL,
    LEAD_LIST_REQUEST,
    LEAD_LIST_SUCCESS,
    LEAD_LIST_FAIL,
    LEAD_DELETE_REQUEST,
    LEAD_DELETE_SUCCESS,
    LEAD_DELETE_FAIL,
    BULK_UPLOAD_REQUEST,
    BULK_UPLOAD_SUCCESS,
    BULK_UPLOAD_FAIL
} from '../constants/leadsConstants';

export const addLeadReducer = (state = {}, action) => {
    switch (action.type) {
      case LEAD_ADD_REQUEST:
        return { loading: true }
      case LEAD_ADD_SUCCESS:
        return { loading: false, leadInfo: action.payload }
      case LEAD_ADD_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }

export const updateLeadReducer = (state = {}, action) => {
    switch (action.type) {
      case LEAD_UPDATE_REQUEST:
        return { loading: true }
      case LEAD_UPDATE_SUCCESS:
        return { loading: false, leadInfo: action.payload, success: true }
      case LEAD_UPDATE_FAIL:
        return { loading: false, error: action.payload }
        case LEAD_UPDATE_RESET:
          return { }
      default:
        return state
    }
  }

export const leadDetailsReducer = (state = {}, action) => {
    switch (action.type) {
      case LEAD_DETAILS_REQUEST:
        return { loading: true }
      case LEAD_DETAILS_SUCCESS:
        return { loading: false, leadInfo: action.payload }
      case LEAD_DETAILS_FAIL:
        return { loading: false, error: action.payload }
      case LEAD_DETAILS_RESET:
          return { }
      default:
        return state
    }
  }


export const leadListReducer = (state = {}, action) => {
    switch (action.type) {
      case LEAD_LIST_REQUEST:
        return { loading: true }
      case LEAD_LIST_SUCCESS:
        return { loading: false, leadInfo: action.payload }
      case LEAD_LIST_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }

  export const deleteLeadReducer = (state = {}, action) => {
    switch (action.type) {
      case LEAD_DELETE_REQUEST:
        return { loading: true }
      case LEAD_DELETE_SUCCESS:
        return { loading: false, success: true }
      case LEAD_DELETE_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }

  export const bulkLeadsReducer = (state = {}, action) => {
    switch (action.type) {
      case BULK_UPLOAD_REQUEST:
        return { loading: true }
      case BULK_UPLOAD_SUCCESS:
        return { loading: false, leadList: action.payload }
      case BULK_UPLOAD_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }