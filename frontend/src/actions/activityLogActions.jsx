import axios from 'axios'
import {
    ACTIVITY_LOG_DETAIL_REQUEST,
    ACTIVITY_LOG_DETAIL_SUCCESS,
    ACTIVITY_LOG_DETAIL_RESET,
    ACTIVITY_LOG_DETAIL_FAIL
} from '../constants/activityLogConstants'

export const activityLogData = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ACTIVITY_LOG_DETAIL_REQUEST,
      })

      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
  
      const { data } = await axios.get(
        `/api/activityLog/${id}`,
        config
      )
  
      dispatch({
        type: ACTIVITY_LOG_DETAIL_SUCCESS,
        payload: data,
      })
  
    } catch (error) {
      dispatch({
        type: ACTIVITY_LOG_DETAIL_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }