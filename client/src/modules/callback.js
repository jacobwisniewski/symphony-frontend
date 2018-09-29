const initialState = {
    temp_data: null,  // This data is returned from the API and is not organised in the store
    loading: false,  
    error: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        // GET_URL_BEGIN action sets 'loading' as true
        case PUSH_CODE_BEGIN:
        return {
            ...state,
            loading: true
        }

        // GET_URL_SUCCESS action sets 'url' as the fetched url and 'loading'
        // as false
        case PUSH_CODE_SUCCESS:
        return {
            ...state,
            temp_data: action.payload, // Save the returned data to temp_data in the store
            loading: false
            
        }

        // GET_URL_FAILURE sets 'error' as the given error and 'loading' as
        // false
        case PUSH_CODE_FAILURE:
        return {
            ...state,
            error: action.payload, // Error we got back
            loading: false
        }
        default:
        return state
    }
}