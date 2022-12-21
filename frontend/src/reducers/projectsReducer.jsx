import {
    PROJECT_LIST_REQUEST,
    PROJECT_LIST_FAIL,
    PROJECT_LIST_SUCCESS,
    PROJECT_DETAILS_REQUEST,
    PROJECT_DETAILS_FAIL,
    PROJECT_DETAILS_SUCCESS,
    PROJECT_UPDATE_REQUEST,
    PROJECT_UPDATE_FAIL,
    PROJECT_UPDATE_SUCCESS,
    PROJECT_ADD_REQUEST,
    PROJECT_ADD_FAIL,
    PROJECT_ADD_SUCCESS,

} from '../constants/projectsConstants'

export const fetchProjectsReducer = (state = {}, action) => {
    switch (action.type) {
      case PROJECT_LIST_REQUEST:
        return { loading: true }
      case PROJECT_LIST_SUCCESS:
        return { loading: false, projectInfo: action.payload }
      case PROJECT_LIST_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }

  export const addProjectReducer = (state = {}, action) => {
    switch (action.type) {
      case PROJECT_ADD_REQUEST:
        return { loading: true }
      case PROJECT_ADD_SUCCESS:
        return { loading: false, projectInfo: action.payload }
      case PROJECT_ADD_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }


  export const updateProjectReducer = (state = {}, action) => {
    switch (action.type) {
      case PROJECT_UPDATE_REQUEST:
        return { loading: true }
      case PROJECT_UPDATE_SUCCESS:
        return { loading: false, success: true }
      case PROJECT_UPDATE_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }

  export const projectDetailsReducer = (state = {}, action) => {
    switch (action.type) {
      case PROJECT_DETAILS_REQUEST:
        return { loading: true }
      case PROJECT_DETAILS_SUCCESS:
        return { loading: false, projectInfo: action.payload}
      case PROJECT_DETAILS_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }