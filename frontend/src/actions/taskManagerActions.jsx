import axios from 'axios'
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
    UPDATE_TASK_REQUEST,
    UPDATE_TASK_SUCCESS,
    UPDATE_TASK_FAIL
} from '../constants/taskManagerContants';

/* Add task */
// export const addTask = () => async (dispatch, getState) => {
//     try {
//       dispatch({
//         type: ADD_TASK_REQUEST,
//       })

//       const {
//         userLogin: { userInfo },
//       } = getState()


//       const config = {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${userInfo.token}`
//         },
//       }   
  
//       const { data } = await axios.post(
//         `/api/todo/new`,
//         config
//       )
  
//       dispatch({
//         type: ADD_TASK_SUCCESS,
//         payload: data,
//       })
  
//     } catch (error) {
//       dispatch({
//         type: ADD_TASK_FAIL,
//         payload:
//           error.response && error.response.data.message
//             ? error.response.data.message
//             : error.message,
//       })
//     }
//   }

export const addTask = (task) => async (dispatch,getState) => {
  try {
    dispatch({
      type: ADD_TASK_REQUEST,
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
      '/api/todo/new',task,
      config
    )

    dispatch({
      type: ADD_TASK_SUCCESS,
      payload: data,
    })

  } catch (error) {
    dispatch({
      type: ADD_TASK_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}


/* Fetch all tasks */
export const fetchTasks = () => async (dispatch,getState) => {
    try {
      dispatch({
        type: FETCH_ALL_TASK_REQUEST,
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
        '/api/todo/list',
        config
      )
  
      dispatch({
        type: FETCH_ALL_TASK_SUCCESS,
        payload: data,
      })
  
    } catch (error) {
      dispatch({
        type: FETCH_ALL_TASK_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

/* Fetch tasks by id */
export const fetchIndividualTasks = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: FETCH_TASK_REQUEST,
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
        `/api/todo/${id}`,
        config
      )
    
      dispatch({
        type: FETCH_TASK_SUCCESS,
        payload: data,
      })
  
    } catch (error) {
      dispatch({
        type: FETCH_TASK_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

/* delete tasks by id */
export const deleteTask = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: DELETE_TASK_REQUEST,
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
        `/api/todo/${id}`,
        config
      )
  
      dispatch({
        type: DELETE_TASK_SUCCESS,
        payload: data,
      })
  
    } catch (error) {
      dispatch({
        type: DELETE_TASK_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }


  /* update tasks by id */
export const updateTask = (task) => async (dispatch, getState) => {
  try {
    dispatch({
      type: UPDATE_TASK_REQUEST,
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
      `/api/todo/${task._id}`, task,
      config
    )

    dispatch({
      type: UPDATE_TASK_SUCCESS,
      payload: data,
    })

  } catch (error) {
    dispatch({
      type: UPDATE_TASK_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}