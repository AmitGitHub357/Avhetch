import axios from 'axios'
import {
    BULK_LEAD_ADD_REQUEST,
    BULK_LEAD_ADD_SUCCESS,
    BULK_LEAD_ADD_FAIL,
    BULK_LEAD_ADD_RESET,
    BULK_LEAD_ASSIGN_REQUEST,
    BULK_LEAD_ASSIGN_SUCCESS,
    BULK_LEAD_ASSIGN_FAIL,
    BULK_LEAD_LIST_REQUEST,
    BULK_LEAD_LIST_SUCCESS,
    BULK_LEAD_LIST_FAIL,
    BULK_LEAD_EDIT_REQUEST,
    BULK_LEAD_EDIT_SUCCESS,
    BULK_LEAD_EDIT_FAIL
} from '../constants/bulkLeadConstants'


export const addBulkLeadData = (leadData) => async (dispatch, getState) => {
    
    try {
      dispatch({
        type: BULK_LEAD_ADD_REQUEST,
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
        '/api/bulkLead/create',
        {bulkLeadArray: leadData},
        config
      )
  
      dispatch({
        type: BULK_LEAD_ADD_SUCCESS,
        payload: data,
      })
  
    } catch (error) {
      dispatch({
        type: BULK_LEAD_ADD_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

  export const assignBulkLead = (leadData) => async (dispatch, getState) => {
    try {
      dispatch({
        type: BULK_LEAD_ASSIGN_REQUEST,
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
        '/api/bulkLead/assign/consultant',
        leadData,
        config
      )
  
      dispatch({
        type: BULK_LEAD_ASSIGN_SUCCESS,
        payload: data,
      })
  
    } catch (error) {
      dispatch({
        type: BULK_LEAD_ASSIGN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

  export const getBulkLeadList = () => async (dispatch, getState) => {
    try {
      dispatch({
        type: BULK_LEAD_LIST_REQUEST,
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
        '/api/bulkLead',
        config
      )
  
      dispatch({
        type: BULK_LEAD_LIST_SUCCESS,
        payload: data,
      })
  
    } catch (error) {
      dispatch({
        type: BULK_LEAD_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

  export const editBulkLeadData = (lead) => async (dispatch, getState) => {
    
    try {
      dispatch({
        type: BULK_LEAD_EDIT_REQUEST,
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
        `/api/bulkLead/edit/lead/${lead._id}`,
        lead,
        config
      )
  
      dispatch({
        type: BULK_LEAD_EDIT_SUCCESS,
        payload: data,
      })
  
    } catch (error) {
      dispatch({
        type: BULK_LEAD_EDIT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }