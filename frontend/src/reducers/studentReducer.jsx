import {
    ADD_STUDENT_REQUEST,
    ADD_STUDENT_SUCCESS,
    ADD_STUDENT_FAIL,
    FETCH_ALL_STUDENT_REQUEST,
    FETCH_ALL_STUDENT_SUCCESS,
    FETCH_ALL_STUDENT_FAIL,
    FETCH_STUDENT_REQUEST,
    FETCH_STUDENT_SUCCESS,
    FETCH_STUDENT_FAIL,
    DELETE_STUDENT_REQUEST,
    DELETE_STUDENT_SUCCESS,
    DELETE_STUDENT_FAIL,
    DELETE_STUDENT_RESET,
    UPDATE_STUDENT_REQUEST,
    UPDATE_STUDENT_SUCCESS,
    UPDATE_STUDENT_FAIL,
    UPDATE_STUDENT_RESET
} from '../constants/studentConstants';

export const addStudentReducer = (state = {}, action) => {
    switch (action.type) {
      case ADD_STUDENT_REQUEST:
        return { loading: true }
      case ADD_STUDENT_SUCCESS:
        return { loading: false, addedStudent: action.payload }
      case ADD_STUDENT_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }

  export const fetchStudentsReducer = (state = {}, action) => {
    switch (action.type) {
      case FETCH_ALL_STUDENT_REQUEST:
        return { loading: true }
      case FETCH_ALL_STUDENT_SUCCESS:
        return { loading: false, StudentList: action.payload }
      case FETCH_ALL_STUDENT_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }

  export const fetchIndividualStudentsReducer = (state = {}, action) => {
    switch (action.type) {
      case FETCH_STUDENT_REQUEST:
        return { loading: true }
      case FETCH_STUDENT_SUCCESS:
        return { loading: false, StudentList: action.payload.studentData }
      case FETCH_STUDENT_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }

  export const updateStudentReducer = (state = {}, action) => {
    switch (action.type) {
      case UPDATE_STUDENT_REQUEST:
        return { loading: true }
      case UPDATE_STUDENT_SUCCESS:
        return { loading: false, success: true }
      case UPDATE_STUDENT_FAIL:
        return { loading: false, error: action.payload }
      case UPDATE_STUDENT_RESET:
          return { }
      default:
        return state
    }
  }

  export const deleteStudentReducer = (state = {}, action) => {
    switch (action.type) {
      case DELETE_STUDENT_REQUEST:  
        return { loading: true }
      case DELETE_STUDENT_SUCCESS:  
        return { loading: false, success: true }  
      case DELETE_STUDENT_FAIL:
        return { loading: false, error: action.payload }
        case DELETE_STUDENT_RESET:  
          return { }
      default:  
        return state    
    }
  }