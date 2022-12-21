import axios from 'axios'
import {
    ADD_STUDENT_REQUEST,
    ADD_STUDENT_SUCCESS,
    ADD_STUDENT_FAIL,
    FETCH_ALL_STUDENT_REQUEST,
    FETCH_ALL_STUDENT_SUCCESS,
    FETCH_ALL_STUDENT_FAIL,
    FETCH_STUDENT_REQUEST,
    FETCH_STUDENT_SUCCESS,
    FETCH_STUDENT_FAIL,
    DELETE_STUDENT_REQUEST,
    DELETE_STUDENT_SUCCESS,
    DELETE_STUDENT_FAIL,
    UPDATE_STUDENT_REQUEST,
    UPDATE_STUDENT_SUCCESS,
    UPDATE_STUDENT_FAIL
} from '../constants/studentConstants';

/* Add Student */
// export const addStudent = () => async (dispatch, getState) => {
//     try {
//       dispatch({
//         type: ADD_STUDENT_REQUEST,
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
//         type: ADD_STUDENT_SUCCESS,
//         payload: data,
//       })

//     } catch (error) {
//       dispatch({
//         type: ADD_STUDENT_FAIL,
//         payload:
//           error.response && error.response.data.message
//             ? error.response.data.message
//             : error.message,
//       })
//     }
//   }

export const addStudent = (Student) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ADD_STUDENT_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo && userInfo.userInfo.token}`
            },
        }

        const { data } = await axios.post(
            'http://localhost:5000/api/newuser/add', Student,
            config
        )

        dispatch({
            type: ADD_STUDENT_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: ADD_STUDENT_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

/* Fetch all Student */
export const fetchStudent = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: FETCH_ALL_STUDENT_REQUEST,
        })
        
        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo && userInfo.userInfo.token}`
            },
        }

        const { data } = await axios.get(
            'http://localhost:5000/api/newuser',
            config
        )
        console.log(data)
        dispatch({
            type: FETCH_ALL_STUDENT_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: FETCH_ALL_STUDENT_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

/* Fetch Student by id */
export const fetchIndividualStudent = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: FETCH_STUDENT_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo && userInfo.userInfo.token}`
            },
        }

        const { data } = await axios.get(
            `http://localhost:5000/api/newUser/${id}`,
            config
        )

        dispatch({
            type: FETCH_STUDENT_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: FETCH_STUDENT_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

/* delete Student by id */
export const deleteStudent = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: DELETE_STUDENT_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo && userInfo.userInfo.token}`
            },
        }

        const { data } = await axios.delete(
            `http://localhost:5000/api/newUser/${id}`,
            config
        )
        console.log(id)
        dispatch({
            type: DELETE_STUDENT_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: DELETE_STUDENT_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

/* update Student by id */
export const updateStudent = (Student) => async (dispatch, getState) => {
    try {
        dispatch({
            type: UPDATE_STUDENT_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo && userInfo.userInfo.token}`
            },
        }

        const { data } = await axios.put(
            `http://localhost:5000/api/newUser/${Student._id}`, Student,
            config
        )

        dispatch({
            type: UPDATE_STUDENT_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: UPDATE_STUDENT_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}