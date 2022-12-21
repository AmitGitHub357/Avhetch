import {
    ADD_TEAM_REQUEST,
    ADD_TEAM_SUCCESS,
    ADD_TEAM_FAIL,
    ADD_TEAM_RESET,
    FETCH_TEAM_LIST_REQUEST,
    FETCH_TEAM_LIST_SUCCESS,
    FETCH_TEAM_LIST_FAIL,
    TEAM_DETAILS_REQUEST,
    TEAM_DETAILS_SUCCESS,
    TEAM_DETAILS_FAIL,
    DELETE_TEAM_REQUEST,
    DELETE_TEAM_SUCCESS,
    DELETE_TEAM_FAIL,
    DELETE_TEAM_RESET,
    UPDATE_TEAM_REQUEST,
    UPDATE_TEAM_SUCCESS,
    UPDATE_TEAM_FAIL,
    UPDATE_TEAM_RESET
} from '../constants/teamManagementConstants';

export const addTeamReducer = (state = {}, action) => {
    switch (action.type) {
      case ADD_TEAM_REQUEST:
        return { loading: true }
      case ADD_TEAM_SUCCESS:
        return { loading: false, addedTeam: action.payload }
      case ADD_TEAM_FAIL:
        return { loading: false, error: action.payload }
      case ADD_TEAM_RESET:
          return { }
      default:
        return state
    }
  }

  export const updateTeamDataReducer = (state = {}, action) => {
    switch (action.type) {
      case UPDATE_TEAM_REQUEST:
        return { loading: true }
      case UPDATE_TEAM_SUCCESS:
        return { loading: false, success: true }
      case UPDATE_TEAM_FAIL:
        return { loading: false, error: action.payload }
      case UPDATE_TEAM_RESET:
          return { }
      default:
        return state
    }
  }

  export const getTeamListReducer = (state = {}, action) => {
    switch (action.type) {
      case FETCH_TEAM_LIST_REQUEST:
        return { loading: true }
      case FETCH_TEAM_LIST_SUCCESS:
        return { loading: false, teamList: action.payload.leadsList }
      case FETCH_TEAM_LIST_FAIL:
        return { loading: false, error: action.payload }
   
      default:
        return state
    }
  }

  export const projectTeamDetailsReducer = (state = {}, action) => {
    switch (action.type) {
      case TEAM_DETAILS_REQUEST:
        return { loading: true }
      case TEAM_DETAILS_SUCCESS:
        return { loading: false, teamDetails: action.payload }
      case TEAM_DETAILS_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }

  export const deleteTeamReducer = (state = {}, action) => {
    switch (action.type) {
      case DELETE_TEAM_REQUEST:
        return { loading: true }
      case DELETE_TEAM_SUCCESS:
        return { loading: false, success: true }
      case DELETE_TEAM_FAIL:
        return { loading: false, error: action.payload }
        case DELETE_TEAM_RESET:
          return { }
      default:
        return state
    }
  }