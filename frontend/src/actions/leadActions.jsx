import axios from 'axios'
import {
  LEAD_ADD_REQUEST,
  LEAD_ADD_FAIL,
  LEAD_ADD_SUCCESS,
  LEAD_UPDATE_REQUEST,
  LEAD_UPDATE_SUCCESS,
  LEAD_UPDATE_FAIL,
  LEAD_UPDATE_RESET,
  LEAD_DETAILS_REQUEST,
  LEAD_DETAILS_SUCCESS,
  LEAD_DETAILS_FAIL,
  LEAD_DETAILS_RESET,
  LEAD_LIST_REQUEST,
  LEAD_LIST_SUCCESS,
  LEAD_LIST_FAIL,
  CONSULTANT_LEAD_LIST_REQUEST,
  CONSULTANT_LEAD_LIST_SUCCESS,
  CONSULTANT_LEAD_LIST_FAIL,
  TEAMLEAD_LEAD_LIST_REQUEST,
  TEAMLEAD_LEAD_LIST_SUCCESS,
  TEAMLEAD_LEAD_LIST_FAIL,
  MANAGER_LEAD_LIST_REQUEST,
  MANAGER_LEAD_LIST_SUCCESS,
  MANAGER_LEAD_LIST_FAIL,
  LEAD_DELETE_REQUEST,
  LEAD_DELETE_SUCCESS,
  LEAD_DELETE_FAIL,
  BULK_UPLOAD_REQUEST,
  BULK_UPLOAD_FAIL,
  BULK_UPLOAD_SUCCESS,

} from '../constants/leadsConstants'

/* Add Lead */
export const addLeadData = (leadData) => async (dispatch, getState) => {
    try {
      dispatch({
        type: LEAD_ADD_REQUEST,
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
        '/api/leads',
        leadData,
        config
      )
  
      dispatch({
        type: LEAD_ADD_SUCCESS,
        payload: data,
      })
  
    } catch (error) {
      dispatch({
        type: LEAD_ADD_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

/* Update Lead */
export const updateLeadData = (lead) => async (dispatch, getState) => {
    try {
      dispatch({
        type: LEAD_UPDATE_REQUEST,
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
        `/api/leads/${lead._id}`,
        lead,
        config
      )
  
      dispatch({
        type: LEAD_UPDATE_SUCCESS,
        payload: data,
      })

      dispatch({
        type: LEAD_UPDATE_RESET
      })

      dispatch({
        type: LEAD_DETAILS_RESET
      })
      // dispatch({ type: LEAD_DETAILS_SUCCESS, payload: data })
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      // if (message === 'Not authorized, token failed') {
      //   dispatch(logout())
      // }
      dispatch({
        type: LEAD_UPDATE_FAIL,
        payload: message,
      })
    }
  }

/* Fetch a Lead Details */
export const fetchleadDetails = (id) => async (dispatch, getState) => {
    try {
      dispatch({ type: LEAD_DETAILS_REQUEST })

      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
  
      const { data } = await axios.get(`/api/leads/${id}`, config)
  
      dispatch({
        type: LEAD_DETAILS_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: LEAD_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

/* Fetch all Leads */
export const fetchLeadList = () => async (dispatch) => {
  try {
    dispatch({ type: LEAD_LIST_REQUEST })

    const { data } = await axios.get(`/api/leads`)

    dispatch({
      type: LEAD_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: LEAD_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

/* Delete lead */
export const deleteLead = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: LEAD_DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/leads/${id}`, config)

    dispatch({ type: LEAD_DELETE_SUCCESS })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      console.log('Not authorized, token failed')
    }
    dispatch({
      type: LEAD_DELETE_FAIL,
      payload: message,
    })
  }
}

/* Add Bulk Leads */
export const addbulkLeads = (leadData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BULK_UPLOAD_REQUEST,
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
      '/api/leads/bulkupload',
      leadData,
      config
    )

    dispatch({
      type: BULK_UPLOAD_SUCCESS,
      payload: data,
    })

  } catch (error) {
    dispatch({
      type: BULK_UPLOAD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

/* Fetch consultant Leads */
export const fetchConsultantLeadList = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: CONSULTANT_LEAD_LIST_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/leads/consultant/${id}`, config)

    dispatch({
      type: CONSULTANT_LEAD_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CONSULTANT_LEAD_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

/* Fetch teamlead Leads */
export const fetchTeamLeadLeadList = () => async (dispatch, getState) => {
  try {
    dispatch({ type: TEAMLEAD_LEAD_LIST_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()


    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }



    const { data } = await axios.get(`/api/leads/teamlead`, config)

    dispatch({
      type: TEAMLEAD_LEAD_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: TEAMLEAD_LEAD_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

/* Fetch manager Leads */
export const fetchManagerLeadList = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: MANAGER_LEAD_LIST_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/leads/manager`, config)

    dispatch({
      type: MANAGER_LEAD_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: MANAGER_LEAD_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
