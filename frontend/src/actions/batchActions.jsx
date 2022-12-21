import axios from 'axios'
import {
    ADD_BATCH_REQUEST,
    ADD_BATCH_SUCCESS,
    ADD_BATCH_FAIL,
    FETCH_ALL_BATCH_REQUEST,
    FETCH_ALL_BATCH_SUCCESS,
    FETCH_ALL_BATCH_FAIL,
    FETCH_BATCH_REQUEST,
    FETCH_BATCH_SUCCESS,
    FETCH_BATCH_FAIL,
    DELETE_BATCH_REQUEST,
    DELETE_BATCH_SUCCESS,
    DELETE_BATCH_FAIL,
    UPDATE_BATCH_REQUEST,
    UPDATE_BATCH_SUCCESS,
    UPDATE_BATCH_FAIL
} from '../constants/batchConstants';

/* Add BATCH */
// export const addBATCH = () => async (dispatch, getState) => {
//     try {
//       dispatch({
//         type: ADD_BATCH_REQUEST,
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
//         type: ADD_BATCH_SUCCESS,
//         payload: data,
//       })

//     } catch (error) {
//       dispatch({
//         type: ADD_BATCH_FAIL,
//         payload:
//           error.response && error.response.data.message
//             ? error.response.data.message
//             : error.message,
//       })
//     }
//   }

export const addBatch = (batch) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ADD_BATCH_REQUEST,
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
        console.log(batch)
        const { data } = await axios.post(
            'http://localhost:5000/api/batch/add', batch,
            config
        )

        dispatch({
            type: ADD_BATCH_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: ADD_BATCH_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

/* Fetch all BATCH */
export const fetchBatch = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: FETCH_ALL_BATCH_REQUEST,
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
            'http://localhost:5000/api/batch',
            config
        )
        console.log(data)
        dispatch({
            type: FETCH_ALL_BATCH_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: FETCH_ALL_BATCH_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

/* Fetch BATCH by id */
export const fetchIndividualBatch = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: FETCH_BATCH_REQUEST,
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
            `http://localhost:5000/api/batch/${id}`,
            config
        )

        dispatch({
            type: FETCH_BATCH_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: FETCH_BATCH_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

/* delete BATCH by id */
export const deleteBatch = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: DELETE_BATCH_REQUEST,
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
            `http://localhost:5000/api/batch/${id}`,
            config
        )
        console.log(id)
        dispatch({
            type: DELETE_BATCH_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: DELETE_BATCH_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

/* update BATCH by id */
export const updateBatch = (batch) => async (dispatch, getState) => {
    try {
        dispatch({
            type: UPDATE_BATCH_REQUEST,
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
        console.log(batch._id)
        const { data } = await axios.put(
            `http://localhost:5000/api/batch/${batch._id}`, batch,      
            config
        )

        dispatch({
            type: UPDATE_BATCH_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: UPDATE_BATCH_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}