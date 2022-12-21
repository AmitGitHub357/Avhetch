import axios from 'axios'
import {
  CANCEL_LEAD_ADD_REQUEST,
  CANCEL_LEAD_ADD_FAIL,
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
} from '../constants/cancellationLeadsConstants'

/* Add Cancelled Lead */
export const addCancelLeadData = (cancelLeadData, addToast) => async (dispatch, getState) => {
    try {
      dispatch({
        type: CANCEL_LEAD_ADD_REQUEST,
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
  
      const { data } = await axios.post(
        '/api/cancelledleads',
        cancelLeadData,
        config
      )

      if (addToast) {
        addToast("Added Lead to Cancelled Leads Successful", { appearance: "success", autoDismiss: true });
      }
  
      dispatch({
        type: CANCEL_LEAD_ADD_SUCCESS,
        payload: data,
      })
  
    } catch (error) {
      if (addToast) {
        addToast("Not Successful", { appearance: "error", autoDismiss: true });
      }
      dispatch({
        type: CANCEL_LEAD_ADD_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

/* Fetch all Cancelled Leads */
export const fetchCancelLeadList = () => async (dispatch) => {
    try {
      dispatch({ type: CANCEL_LEAD_LIST_REQUEST })
  
      const { data } = await axios.get(`/api/cancelledleads`)
  
      dispatch({
        type: CANCEL_LEAD_LIST_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: CANCEL_LEAD_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

/* Delete Cancelled lead */
export const deleteCancelledLead = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CANCEL_LEAD_DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/cancelledleads/${id}`, config)

    dispatch({ type: CANCEL_LEAD_DELETE_SUCCESS })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      console.log('Not authorized, token failed')
    }
    dispatch({
      type: CANCEL_LEAD_DELETE_FAIL,
      payload: message,
    })
  }
}

/* Update Cancelled Lead */
export const updateCancelledLeadData = (lead, addToast) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CANCEL_LEAD_UPDATE_REQUEST,
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

    const { data } = await axios.put(
      `/api/cancelledleads/${lead._id}`,
      lead,
      config
    )
    if (addToast) {
      addToast("Cancelled Lead Update Successful", { appearance: "success", autoDismiss: true });
    }

    dispatch({
      type: CANCEL_LEAD_UPDATE_SUCCESS,
      payload: data,
    })

    dispatch({
      type: CANCEL_LEAD_UPDATE_RESET
    })

    // dispatch({
    //   type: LEAD_DETAILS_RESET
    // })
    // dispatch({ type: LEAD_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    if (addToast) {
      addToast("Update not Successful", { appearance: "error", autoDismiss: true });
    }
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    // if (message === 'Not authorized, token failed') {
    //   dispatch(logout())
    // }
    dispatch({
      type: CANCEL_LEAD_UPDATE_FAIL,
      payload: message,
    })
  }
}

/* Fetch a Cancelled Lead Details */
export const fetchCancelledLeadDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: CANCEL_LEAD_DETAIL_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/cancelledleads/${id}`, config)

    dispatch({
      type: CANCEL_LEAD_DETAIL_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CANCEL_LEAD_DETAIL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}