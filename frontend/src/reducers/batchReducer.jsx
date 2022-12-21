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
    DELETE_BATCH_RESET,
    UPDATE_BATCH_REQUEST,
    UPDATE_BATCH_SUCCESS,
    UPDATE_BATCH_FAIL,
    UPDATE_BATCH_RESET
} from '../constants/batchConstants';

export const addBatchReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_BATCH_REQUEST:
            return { loading: true }
        case ADD_BATCH_SUCCESS:
            return { loading: false, addedBatch: action.payload }
        case ADD_BATCH_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const fetchBatchsReducer = (state = {}, action) => {
    switch (action.type) {
        case FETCH_ALL_BATCH_REQUEST:
            return { loading: true }
        case FETCH_ALL_BATCH_SUCCESS:
            return { loading: false, batchList: action.payload }
        case FETCH_ALL_BATCH_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const fetchIndividualBatchReducer = (state = {}, action) => {
    switch (action.type) {
        case FETCH_BATCH_REQUEST:
            return { loading: true }
        case FETCH_BATCH_SUCCESS:
            return { loading: false, batchList: action.payload.batchData }
        case FETCH_BATCH_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const updateBatchReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_BATCH_REQUEST:
            return { loading: true }
        case UPDATE_BATCH_SUCCESS:
            return { loading: false, success: true }
        case UPDATE_BATCH_FAIL:
            return { loading: false, error: action.payload }
        case UPDATE_BATCH_RESET:
            return {}
        default:
            return state
    }
}

export const deleteBatchReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_BATCH_REQUEST:
            return { loading: true }
        case DELETE_BATCH_SUCCESS:
            return { loading: false, success: true }
        case DELETE_BATCH_FAIL:
            return { loading: false, error: action.payload }
        case DELETE_BATCH_RESET:
            return {}
        default:
            return state
    }
}