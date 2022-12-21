import {
    ACTIVITY_LOG_DETAIL_REQUEST,
    ACTIVITY_LOG_DETAIL_SUCCESS,
    ACTIVITY_LOG_DETAIL_RESET,
    ACTIVITY_LOG_DETAIL_FAIL
} from '../constants/activityLogConstants'

export const activityLogDetailReducer = (state = {}, action) => {
    switch (action.type) {
      case ACTIVITY_LOG_DETAIL_REQUEST:
        return { loading: true }
      case ACTIVITY_LOG_DETAIL_SUCCESS:
        return { loading: false, activityLog: action.payload }
      case ACTIVITY_LOG_DETAIL_FAIL:
        return { loading: false, error: action.payload }
      case ACTIVITY_LOG_DETAIL_RESET:
            return { }
      default:
        return state
    }
  }