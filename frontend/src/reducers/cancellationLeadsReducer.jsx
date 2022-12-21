import {
    CANCEL_LEAD_ADD_FAIL,
    CANCEL_LEAD_ADD_REQUEST,
    CANCEL_LEAD_ADD_SUCCESS,
    CANCEL_LEAD_LIST_REQUEST,
    CANCEL_LEAD_LIST_SUCCESS,
    CANCEL_LEAD_LIST_FAIL,
    CANCEL_LEAD_DELETE_REQUEST,
    CANCEL_LEAD_DELETE_SUCCESS,
    CANCEL_LEAD_DELETE_FAIL,
    CANCEL_LEAD_UPDATE_REQUEST,
    CANCEL_LEAD_UPDATE_SUCCESS,
    CANCEL_LEAD_UPDATE_FAIL,
    CANCEL_LEAD_UPDATE_RESET,
    CANCEL_LEAD_DETAIL_REQUEST,
    CANCEL_LEAD_DETAIL_SUCCESS,
    CANCEL_LEAD_DETAIL_FAIL,
    CANCEL_LEAD_DETAIL_RESET

} from '../constants/cancellationLeadsConstants';

export const addCancelLeadReducer = (state = {}, action) => {
    switch (action.type) {
      case CANCEL_LEAD_ADD_REQUEST:
        return { loading: true }
      case CANCEL_LEAD_ADD_SUCCESS:
        return { loading: false, cancelLeadInfo: action.payload }
      case CANCEL_LEAD_ADD_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }

export const cancelLeadListReducer = (state = {}, action) => {
    switch (action.type) {
      case CANCEL_LEAD_LIST_REQUEST:
        return { loading: true }
      case CANCEL_LEAD_LIST_SUCCESS:
        return { loading: false, cancelLeadInfo: action.payload }
      case CANCEL_LEAD_LIST_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }

  export const deleteCancelLeadReducer = (state = {}, action) => {
    switch (action.type) {
      case CANCEL_LEAD_DELETE_REQUEST:
        return { loading: true }
      case CANCEL_LEAD_DELETE_SUCCESS:
        return { loading: false, success: true }
      case CANCEL_LEAD_DELETE_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }

  export const updateCancelLeadReducer = (state = {}, action) => {
    switch (action.type) {
      case CANCEL_LEAD_UPDATE_REQUEST:
        return { loading: true }
      case CANCEL_LEAD_UPDATE_SUCCESS:
        return { loading: false, cancelLeadInfo: action.payload, success : true }
      case CANCEL_LEAD_UPDATE_FAIL:
        return { loading: false, error: action.payload }
        case CANCEL_LEAD_UPDATE_RESET:
          return { }
      default:
        return state
    }
  }


  export const cancelledLeadDetailsReducer = (state = {}, action) => {
    switch (action.type) {
      case CANCEL_LEAD_DETAIL_REQUEST:
        return { loading: true }
      case CANCEL_LEAD_DETAIL_SUCCESS:
        return { loading: false, cancelledLeadInfo: action.payload }
      case CANCEL_LEAD_DETAIL_FAIL:
        return { loading: false, error: action.payload }
      case CANCEL_LEAD_DETAIL_RESET:
          return { }
      default:
        return state
    }
  }