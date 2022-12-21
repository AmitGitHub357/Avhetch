import axios from 'axios'
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  ADD_USER_REQUEST,
  ADD_USER_FAIL,
  ADD_USER_SUCCESS,
  MANAGERS_DETAILS_FAIL,
  MANAGERS_DETAILS_REQUEST,
  MANAGERS_DETAILS_SUCCESS,
  TEAMLEADS_DETAILS_REQUEST,
  TEAMLEADS_DETAILS_SUCCESS,
  TEAMLEADS_DETAILS_FAIL,
  TEAMLEAD_CONSULTANTS_DETAILS_REQUEST,
  TEAMLEAD_CONSULTANTS_DETAILS_SUCCESS,
  TEAMLEAD_CONSULTANTS_DETAILS_FAIL,
  MANAGER_CONSULTANTS_DETAILS_REQUEST,
  MANAGER_CONSULTANTS_DETAILS_SUCCESS,
  MANAGER_CONSULTANTS_DETAILS_FAIL,
  MANAGER_TEAMLEADS_DETAILS_REQUEST,
  MANAGER_TEAMLEADS_DETAILS_SUCCESS,
  MANAGER_TEAMLEADS_DETAILS_FAIL,
  ASMS_DETAILS_REQUEST,
  ASMS_DETAILS_SUCCESS,
  ASMS_DETAILS_FAIL,
  CONSULTANTS_DETAILS_REQUEST,
  CONSULTANTS_DETAILS_SUCCESS,
  CONSULTANTS_DETAILS_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_DETAIL_REQUEST,
  USER_DETAIL_SUCCESS,
  USER_DETAIL_FAIL
} from '../constants/usersConstants'

/* Login */
export const login = (email, password, addToast) => async (dispatch) => {
    try {
      dispatch({
        type: USER_LOGIN_REQUEST,
      })
  
   
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
  
      const { data } = await axios.post(
        'http://localhost:5000/api/user/signIn',
        { email, password },
        config
      )
        console.log(data)
      if (addToast) {
          addToast("Login Successful", { appearance: "success", autoDismiss: true });
      }
      
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      })
  
      localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

  /* Logout */
  export const logout = () => async(dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({ type: USER_LOGOUT })
  }

  /* Update User */
  export const updateUser = (user, addToast) => async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_UPDATE_REQUEST,
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
        `/api/users/${user._id}`,
        user,
        config
      )

      if (addToast) {
        addToast("User Profile Updated", { appearance: "success", autoDismiss: true });
      }

      dispatch({ 
        type: USER_UPDATE_SUCCESS 
      })
      
    } catch (error) {
      const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
      if (message === 'Not authorized, token failed') {
        dispatch(logout())
      }
      dispatch({
        type: USER_UPDATE_FAIL,
        payload: message,
      })
    }
  }

/* Add Consultant */
export const addUser = (userData, addToast) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ADD_USER_REQUEST,
      })
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
  
      const { data } = await axios.post(
        '/api/users/register',
        userData,
        config
      )

      if (addToast) {
        addToast("User Added", { appearance: "success", autoDismiss: true });
      }
  
      dispatch({
        type: ADD_USER_SUCCESS,
        payload: data,
      })
  
    } catch (error) {
      if (addToast) {
        addToast("Not successful", { appearance: "error", autoDismiss: true });
      }
      dispatch({
        type: ADD_USER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }


  /* Fetch Managers */
export const managerList = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: MANAGERS_DETAILS_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(
      '/api/users/manager',
      config
    )

    dispatch({
      type: MANAGERS_DETAILS_SUCCESS,
      payload: data,
    })

  } catch (error) {
    dispatch({
      type: MANAGERS_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

 /* Fetch Team Leads */
 export const teamLeadList = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: TEAMLEADS_DETAILS_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(
      '/api/users/teamlead',
      config
    )

    dispatch({
      type: TEAMLEADS_DETAILS_SUCCESS,
      payload: data,
    })

  } catch (error) {
    dispatch({
      type: TEAMLEADS_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

/* Fetch ASMs */
 export const asmList = (email, password) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ASMS_DETAILS_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(
      '/api/users/teamlead',
      {email, password},
      config
    )

    dispatch({
      type: ASMS_DETAILS_SUCCESS,
      payload: data,
    })

  } catch (error) {
    dispatch({
      type: ASMS_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

/* Fetch Consultants */
export const consultantList = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: CONSULTANTS_DETAILS_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(
      '/api/users/consultant',
      config
    )

    dispatch({
      type: CONSULTANTS_DETAILS_SUCCESS,
      payload: data,
    })

  } catch (error) {
    dispatch({
      type: CONSULTANTS_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

/* Delete user */
export const deleteUser = (id, addToast) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/users/${id}`, config)

    if (addToast) {
      addToast("User Deleted", { appearance: "success", autoDismiss: true });
    }

    dispatch({ type: USER_DELETE_SUCCESS })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      console.log('Not authorized, token failed')
    }
    dispatch({
      type: USER_DELETE_FAIL,
      payload: message,
    })
  }
}

/* Fetch User List */
export const fetchUserList = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_LIST_REQUEST,
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
      '/api/users',
      config
    )

    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data,
    })

  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

/* Fetch User List */
export const fetchUserDetail = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAIL_REQUEST,
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
      `/api/users/${id}`,
      config
    )

    dispatch({
      type: USER_DETAIL_SUCCESS,
      payload: data,
    })

  } catch (error) {
    dispatch({
      type: USER_DETAIL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}


export const teamLeadsUnderManager = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MANAGER_TEAMLEADS_DETAILS_REQUEST,
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
      `/api/manager/teamLeads/${id}`,
      config
    )

    dispatch({
      type: MANAGER_TEAMLEADS_DETAILS_SUCCESS,
      payload: data,
    })

  } catch (error) {
    dispatch({
      type: MANAGER_TEAMLEADS_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const consultantsUnderTeamLead = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TEAMLEAD_CONSULTANTS_DETAILS_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(
      `/api/manager/teamLeads/${id}`,
      config
    )

    dispatch({
      type: TEAMLEAD_CONSULTANTS_DETAILS_SUCCESS,
      payload: data,
    })

  } catch (error) {
    dispatch({
      type: TEAMLEAD_CONSULTANTS_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const consultantsUnderManager = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MANAGER_CONSULTANTS_DETAILS_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(
      `/api/manager/consultants/${id}`,
      config
    )

    dispatch({
      type: MANAGER_CONSULTANTS_DETAILS_SUCCESS,
      payload: data,
    })

  } catch (error) {
    dispatch({
      type: MANAGER_CONSULTANTS_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

 