const initialState = {
    loading: false,
    error: null,
    mongo_id: null,
    spotify_id: null,
    user_name: null,
    profile_picture: null,
    user_gigs: null
}

// Profile reducer
export default (state = initialState, action) => {
    switch (action.type) {
      case 'GET_PROFILE_BEGIN':
      return {
        ...state,
        loading: true
      }
      case 'GET_PROFILE_SUCCESS':
      return {
        ...state,
        loading: false,
        mongo_id: action.payload.mongo_id,
        spotify_id: action.payload.spotify_id,
        user_name: action.payload.user_name,
        profile_picture: action.payload.profile_picture,
        user_gigs: action.payload.user_gigs
      }
      case 'GET_PROFILE_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload
      }
      default:
        return state;
    }
  };