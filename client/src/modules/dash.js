const initialState = {
  profile: {
    api_key: null,
    spotify_id: null,
    name: null,
    profile_picture: null,
    gigs: null
  },
  error: null,
  loading: false,
  // find_loading and nearby_gigs are related to the same api call
  find_loading: false,
  nearby_gigs: null,
  toggle_create: false,
  toggle_join: false,
  toggle_gigs: true
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "DASH_FETCH_BEGIN":
      return {
        ...state,
        loading: true
      };
    case "DASH_FETCH_SUCCESS":
      return {
        ...state,
        // Saves the entire response to the profile variable
        profile: action.payload,
        loading: false
      };
    case "DASH_FETCH_FAILURE":
      return {
        ...state,
        error: action.payload.error,
        loading: false
      };
    case "CREATE_GIG_BEGIN":
      return {
        ...state,
        loading: true
      };
    case "CREATE_GIG_SUCCESS":
      return {
        ...state,
        loading: false
      };
    case "CREATE_GIG_FAILURE":
      return {
        ...state,
        error: action.payload.error,
        loading: false
      };
    case "LEAVE_GIG_BEGIN":
      return {
        ...state,
        loading: true
      };
    case "LEAVE_GIG_SUCCESS":
      return {
        ...state,
        loading: false
      };
    case "LEAVE_GIG_FAILURE":
      return {
        ...state,
        error: action.payload.error,
        loading: false
      };
    case "JOIN_GIG_BEGIN":
      return {
        ...state,
        loading: true
      };
    case "JOIN_GIG_SUCCESS":
      return {
        ...state,
        loading: false
      };
    case "JOIN_GIG_FAILURE":
      return {
        ...state,
        error: action.payload.error,
        loading: false
      };
    case "FIND_GIGS_BEGIN":
      return {
        ...state,
        find_loading: true
      };
    case "FIND_GIGS_SUCCESS":
      return {
        ...state,
        nearby_gigs: action.payload,
        find_loading: false
      };
    case "FIND_GIGS_FAILURE":
      return {
        ...state,
        error: action.payload.error,
        find_loading: false
      };
    case "TOGGLE_CREATE":
      return {
        ...state,
        toggle_create: true,
        toggle_join: false,
        toggle_gigs: false
      };
    case "TOGGLE_JOIN":
      return {
        ...state,
        toggle_create: false,
        toggle_join: true,
        toggle_gigs: false
      };
    case "TOGGLE_GIGS":
      return {
        ...state,
        toggle_create: false,
        toggle_join: false,
        toggle_gigs: true
      };
      case "RESET_DASH":
      return {
        ...state,
        toggle_create: false,
        toggle_join: false,
        toggle_gigs: true,
        loading: false,
        error: null,
        nearby_gigs: null,
        find_loading: null
      }
    default:
      return state;
  }
};
