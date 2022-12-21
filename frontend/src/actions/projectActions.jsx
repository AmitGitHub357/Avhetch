import axios from 'axios'
import {
    PROJECT_LIST_REQUEST,
    PROJECT_LIST_SUCCESS,
    PROJECT_LIST_FAIL,
    PROJECT_DETAILS_REQUEST,
    PROJECT_DETAILS_SUCCESS,
    PROJECT_DETAILS_FAIL,
    PROJECT_UPDATE_REQUEST,
    PROJECT_UPDATE_SUCCESS,
    PROJECT_UPDATE_FAIL,
    PROJECT_ADD_REQUEST,
    PROJECT_ADD_SUCCESS,
    PROJECT_ADD_FAIL,
    PROJECT_DELETE_REQUEST,
    PROJECT_DELETE_SUCCESS,
    PROJECT_DELETE_FAIL
} from '../constants/projectsConstants';


/* Fetch Projects */
export const projects = () => async (dispatch) => {
    try {
      dispatch({
        type: PROJECT_LIST_REQUEST,
      })

      
  
      const { data } = await axios.get(
        '/api/projects'
      )
  
      dispatch({
        type: PROJECT_LIST_SUCCESS,
        payload: data,
      })
  
    } catch (error) {
      dispatch({
        type: PROJECT_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

  /* Add Project */
export const addProject = (project) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PROJECT_ADD_REQUEST,
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
      `/api/projects`,
      project,
      config
    )

    dispatch({
      type: PROJECT_ADD_SUCCESS,
      payload: data,
    })

  } catch (error) {
    dispatch({
      type: PROJECT_ADD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

  /* Update Projects */
export const updateProject = (project) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PROJECT_UPDATE_REQUEST,
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

    console.log(project)
    const { data } = await axios.put(
      `/api/projects/${project._id}`,
      project,
      config

    )

    dispatch({
      type: PROJECT_UPDATE_SUCCESS,
      payload: data,
    })

  } catch (error) {
    dispatch({
      type: PROJECT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

/* Get Project details */
export const getProjectDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PROJECT_DETAILS_REQUEST,
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
      `/api/projects/${id}`,config
    )

    dispatch({
      type: PROJECT_DETAILS_SUCCESS,
      payload: data,
    })

  } catch (error) {
    dispatch({
      type: PROJECT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

/* Delete Project by id */
export const deleteProject= (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PROJECT_DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()


    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      },
    }


    

    const { data } = await axios.delete(
      `/api/projects/${id}`,
      config
    )

    dispatch({
      type: PROJECT_DELETE_SUCCESS,
      payload: data,
    })

  } catch (error) {
    dispatch({
      type: PROJECT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}