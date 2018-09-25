export const GET_GIG_REQUESTED = 'login/GET_GIG_REQUESTED'
export const JOIN_GIG_REQUESTED = 'login/JOIN_GIG_REQUESTED'
export const GET_PROFILE_REQUESTED = 'login/GET_PROFILE_REQUESTED'

const initialState = {
    getgig: false,
    joingig: false,
    getprofile: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_GIG_REQUESTED:
            return {
                ...state,
                getgig: true
            }
        
        case JOIN_GIG_REQUESTED:
            return {
                ...state,
                joingig: true
            }
        
        case GET_PROFILE_REQUESTED:
            return {
                ...state,
                getprofile: true
            }
        default:
            return state
    }
}

export const joinGig = () => {
    return dispatch => {
        dispatch({
            type: JOIN_GIG_REQUESTED
        })
    }
}

export const getGig = () => {
    return dispatch => {
        dispatch({
            type: GET_GIG_REQUESTED
        })
    }
}

export const getProfile = () => {
    return dispatch => {
        dispatch({
            type: GET_PROFILE_REQUESTED
        })
    }
}