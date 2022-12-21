import {
    ADD_TASK_REQUEST,
    ADD_TASK_SUCCESS,
    ADD_TASK_FAIL,
    FETCH_ALL_TASK_REQUEST,
    FETCH_ALL_TASK_SUCCESS,
    FETCH_ALL_TASK_FAIL,
    FETCH_TASK_REQUEST,
    FETCH_TASK_SUCCESS,
    FETCH_TASK_FAIL,
    DELETE_TASK_REQUEST,
    DELETE_TASK_SUCCESS,
    DELETE_TASK_FAIL,
    DELETE_TASK_RESET,
    UPDATE_TASK_REQUEST,
    UPDATE_TASK_SUCCESS,
    UPDATE_TASK_FAIL,
    UPDATE_TASK_RESET
} from '../constants/taskManagerContants';

export const addTaskReducer = (state = {}, action) => {
    switch (action.type) {
      case ADD_TASK_REQUEST:
        return { loading: true }
      case ADD_TASK_SUCCESS:
        return { loading: false, addedTask: action.payload }
      case ADD_TASK_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }

  export const fetchTasksReducer = (state = {}, action) => {
    switch (action.type) {
      case FETCH_ALL_TASK_REQUEST:
        return { loading: true }
      case FETCH_ALL_TASK_SUCCESS:
        return { loading: false, taskList: action.payload }
      case FETCH_ALL_TASK_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }

  export const fetchIndividualTasksReducer = (state = {}, action) => {
    
    switch (action.type) {
      case FETCH_TASK_REQUEST:
        return { loading: true }
      case FETCH_TASK_SUCCESS:
        return { loading: false, taskList: action.payload.todoData }
      case FETCH_TASK_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }

  export const updateTaskReducer = (state = {}, action) => {
    switch (action.type) {
      case UPDATE_TASK_REQUEST:
        return { loading: true }
      case UPDATE_TASK_SUCCESS:
        return { loading: false, success: true }
      case UPDATE_TASK_FAIL:
        return { loading: false, error: action.payload }
      case UPDATE_TASK_RESET:
          return { }
      default:
        return state
    }
  }

  export const deleteTaskReducer = (state = {}, action) => {
    switch (action.type) {
      case DELETE_TASK_REQUEST:
        return { loading: true }
      case DELETE_TASK_SUCCESS:
        return { loading: false, success: true }
      case DELETE_TASK_FAIL:
        return { loading: false, error: action.payload }
        case DELETE_TASK_RESET:
          return { }
      default:
        return state
    }
  }