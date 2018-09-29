
const initialState = {
    url: null,
    state: null,
    loading: false,
    error: null
}

// Login reducer
export default (state = initialState, action) => {
    switch (action.type) {
        // GET_URL_BEGIN action sets 'loading' as true
        case 'GET_URL_BEGIN':
        return {
            ...state,
            loading: true
        }

        // GET_URL_SUCCESS action sets 'url' as the fetched url and 'loading'
        // as false
        case 'GET_URL_SUCCESS':
        return {
            ...state,
            url: action.payload.url, // The url we got back from the call
            state: action.payload.state, // The state we got back from the call
            loading: false
            
        }

        // GET_URL_FAILURE sets 'error' as the given error and 'loading' as
        // false
        case 'GET_URL_FAILURE':
        return {
            ...state,
            error: action.payload, // Error we got back
            loading: false
        }
        default:
        return state
    }
}