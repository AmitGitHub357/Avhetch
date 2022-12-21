import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    ADD_USER_FAIL,
    ADD_USER_REQUEST,
    ADD_USER_SUCCESS,
    ADD_USER_RESET,
    MANAGERS_DETAILS_FAIL,
    MANAGERS_DETAILS_REQUEST,
    MANAGERS_DETAILS_SUCCESS,
    TEAMLEADS_DETAILS_REQUEST,
    TEAMLEADS_DETAILS_SUCCESS,
    TEAMLEADS_DETAILS_FAIL,
    MANAGER_TEAMLEADS_DETAILS_REQUEST,
    MANAGER_TEAMLEADS_DETAILS_SUCCESS,
    MANAGER_TEAMLEADS_DETAILS_FAIL,
    TEAMLEAD_CONSULTANTS_DETAILS_REQUEST,
    TEAMLEAD_CONSULTANTS_DETAILS_SUCCESS,
    TEAMLEAD_CONSULTANTS_DETAILS_FAIL,
    MANAGER_CONSULTANTS_DETAILS_REQUEST,
    MANAGER_CONSULTANTS_DETAILS_SUCCESS,
    MANAGER_CONSULTANTS_DETAILS_FAIL,
    ASMS_DETAILS_REQUEST,
    ASMS_DETAILS_SUCCESS,
    ASMS_DETAILS_FAIL,
    CONSULTANTS_DETAILS_REQUEST,
    CONSULTANTS_DETAILS_SUCCESS,
    CONSULTANTS_DETAILS_FAIL,
    USER_LOGOUT,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    USER_DETAIL_REQUEST,
    USER_DETAIL_SUCCESS,
    USER_DETAIL_FAIL
} from '../constants/usersConstants';

export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
      case USER_LOGIN_REQUEST:
        return { loading: true }
      case USER_LOGIN_SUCCESS:
        return { loading: false, userInfo: action.payload }
      case USER_LOGIN_FAIL:
        return { loading: false, error: action.payload }
      case USER_LOGOUT:
        return {}
      default:
        return state
    }
  }

export const addConsultantReducer = (state = {}, action) => {
    switch (action.type) {
      case ADD_USER_REQUEST:
        return { loading: true }
      case ADD_USER_SUCCESS:
        return { loading: false, userInfo: action.payload }
      case ADD_USER_FAIL:
        return { loading: false, error: action.payload }
      case ADD_USER_RESET:
          return {}
      default:
        return state
    }
  }

export const fetchManagersReducer = (state = {}, action) => {
    switch (action.type) {
      case MANAGERS_DETAILS_REQUEST:
        return { loading: true }
      case MANAGERS_DETAILS_SUCCESS:
        return { loading: false, managers: action.payload }
      case MANAGERS_DETAILS_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }

export const fetchTeamLeadsReducer = (state = {}, action) => {
    switch (action.type) {
      case TEAMLEADS_DETAILS_REQUEST:
        return { loading: true }
      case TEAMLEADS_DETAILS_SUCCESS:
        return { loading: false, teamlead: action.payload }
      case TEAMLEADS_DETAILS_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }

export const fetchASMReducer = (state = {}, action) => {
    switch (action.type) {
      case ASMS_DETAILS_REQUEST:
        return { loading: true }
      case ASMS_DETAILS_SUCCESS:
        return { loading: false, asm: action.payload }
      case ASMS_DETAILS_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }

export const fetchConsultantsReducer = (state = {}, action) => {
    switch (action.type) {
      case CONSULTANTS_DETAILS_REQUEST:
        return { loading: true}
      case CONSULTANTS_DETAILS_SUCCESS:
        return { loading: false, consultants: action.payload }
      case CONSULTANTS_DETAILS_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }

  export const deleteUserReducer = (state = {}, action) => {
    switch (action.type) {
      case USER_DELETE_REQUEST:
        return { loading: true }
      case USER_DELETE_SUCCESS:
        return { loading: false, success: true }
      case USER_DELETE_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }

  export const userUpdateReducer = (state = { user: {} }, action) => {
    switch (action.type) {
      case USER_UPDATE_REQUEST:
        return { loading: true }
      case USER_UPDATE_SUCCESS:
        return { loading: false, success: true }
      case USER_UPDATE_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }


  export const userListReducer = (state = { user: {} }, action) => {
    switch (action.type) {
      case USER_LIST_REQUEST:
        return { loading: true }
      case USER_LIST_SUCCESS:
        return { loading: false, users: action.payload }
      case USER_LIST_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }

  export const userDetailReducer = (state = { user: {} }, action) => {
    switch (action.type) {
      case USER_DETAIL_REQUEST:
        return { loading: true }
      case USER_DETAIL_SUCCESS:
        return { loading: false, userData: action.payload }
      case USER_DETAIL_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }


  export const fetchTeamLeadsUnderManagerReducer = (state = {}, action) => {
    switch (action.type) {
      case  MANAGER_TEAMLEADS_DETAILS_REQUEST:
        return { loading: true }
      case  MANAGER_TEAMLEADS_DETAILS_SUCCESS:
        return { loading: false, teamleadList: action.payload }
      case  MANAGER_TEAMLEADS_DETAILS_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }

  export const fetchConsultantsUnderTeamLeadReducer = (state = {}, action) => {
    switch (action.type) {
      case  TEAMLEAD_CONSULTANTS_DETAILS_REQUEST:
        return { loading: true }
      case  TEAMLEAD_CONSULTANTS_DETAILS_SUCCESS:
        return { loading: false, consultantList: action.payload }
      case  TEAMLEAD_CONSULTANTS_DETAILS_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }

  export const fetchConsultantsUnderManagerReducer = (state = {}, action) => {
    switch (action.type) {
      case  MANAGER_CONSULTANTS_DETAILS_REQUEST:
        return { loading: true }
      case  MANAGER_CONSULTANTS_DETAILS_SUCCESS:
        return { loading: false, consultantsList: action.payload.consultantsList }
      case  MANAGER_CONSULTANTS_DETAILS_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }
 
