import axios from 'axios'
import {
    ADD_TEAM_REQUEST,
    ADD_TEAM_SUCCESS,
    ADD_TEAM_FAIL,
    FETCH_TEAM_LIST_REQUEST,
    FETCH_TEAM_LIST_SUCCESS,
    FETCH_TEAM_LIST_FAIL,
    TEAM_DETAILS_REQUEST,
    TEAM_DETAILS_SUCCESS,
    TEAM_DETAILS_FAIL,
    DELETE_TEAM_REQUEST,
    DELETE_TEAM_SUCCESS,
    DELETE_TEAM_FAIL,
    UPDATE_TEAM_REQUEST,
    UPDATE_TEAM_SUCCESS,
    UPDATE_TEAM_FAIL
} from '../constants/teamManagementConstants';


/* Add team */
export const addTeam = (team, addToast) => async (dispatch,getState) => {
  try {
    dispatch({
      type: ADD_TEAM_REQUEST,
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


    

    const { data } = await axios.post(
      '/api/team/new',team,
      config
    )

    if (addToast) {
      addToast("Team Added", { appearance: "success", autoDismiss: true });
    }

    dispatch({
      type: ADD_TEAM_SUCCESS,
      payload: data,
    })

  } catch (error) {
    dispatch({
      type: ADD_TEAM_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}


/* Team List */
export const fetchTeamList = () => async (dispatch,getState) => {
    try {
      dispatch({
        type: FETCH_TEAM_LIST_REQUEST,
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
  

      
  
      const { data } = await axios.get(
        '/api/team/list',
        config
      )
  
      dispatch({
        type: FETCH_TEAM_LIST_SUCCESS,
        payload: data,
      })
  
    } catch (error) {
      dispatch({
        type: FETCH_TEAM_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

/* Team details */
export const teamDetails = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: TEAM_DETAILS_REQUEST,
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
  

      
  
      const { data } = await axios.get(
        `/api/team/projectteam/${id}`,
        config
      )
    
      dispatch({
        type: TEAM_DETAILS_SUCCESS,
        payload: data,
      })
  
    } catch (error) {
      dispatch({
        type: TEAM_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

/* delete tasks by id */
export const deleteTeam= (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: DELETE_TEAM_REQUEST,
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
        `/api/team/${id}`,
        config
      )
  
      dispatch({
        type: DELETE_TEAM_SUCCESS,
        payload: data,
      })
  
    } catch (error) {
      dispatch({
        type: DELETE_TEAM_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }


  /* update team by id */
export const updateTeam = (team, addToast) => async (dispatch, getState) => {
  try {
    dispatch({
      type: UPDATE_TEAM_REQUEST,
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


    

    const { data } = await axios.put(
      `/api/team/${team._id}`, team,
      config
    )

    if (addToast) {
      addToast("User Updated", { appearance: "success", autoDismiss: true });
    }

    dispatch({
      type: UPDATE_TEAM_SUCCESS,
      payload: data,
    })

  } catch (error) {
    dispatch({
      type: UPDATE_TEAM_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}