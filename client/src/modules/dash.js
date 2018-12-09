const initialState = {
	profile: {
		api_key: null,
		spotify_id: null,
		name: null,
		profile_picture: null,
		gigs: null,
	},
  gigs: null,
  gigs_loading: false,
	error: null,
	loading: false,
	// find_loading and nearby_gigs are related to the same api call
	find_loading: false,
	nearby_gigs: null,
	toggle_create: false,
	toggle_join: true,
  toggle_gigs: false,
  prev_path: null,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case "DASH_FETCH_BEGIN":
			return {
				...state,
				loading: true,
			};
		case "DASH_FETCH_SUCCESS":
			return {
				...state,
				// Saves the entire response to the profile variable
				profile: action.payload,
				gigs: action.payload.gigs,
				loading: false,
			};
		case "DASH_FETCH_FAILURE":
			return {
				...state,
				error: action.payload.error,
				loading: false,
			};
		case "CREATE_GIG_BEGIN":
			return {
				...state,
				loading: true,
			};
		case "CREATE_GIG_SUCCESS":
			return {
				...state,
				loading: false,
			};
		case "CREATE_GIG_FAILURE":
			return {
				...state,
				error: action.payload.error,
				loading: false,
			};
		case "LEAVE_GIG_BEGIN":
			return {
				...state,
				loading: true,
			};
		case "LEAVE_GIG_SUCCESS":
			return {
				...state,
				loading: false,
			};
		case "LEAVE_GIG_FAILURE":
			return {
				...state,
				error: action.payload.error,
				loading: false,
			};
		case "JOIN_GIG_BEGIN":
			return {
				...state,
				loading: true,
			};
		case "JOIN_GIG_SUCCESS":
			return {
				...state,
				loading: false,
			};
		case "JOIN_GIG_FAILURE":
			return {
				...state,
				error: action.payload.error,
				loading: false,
			};
		case "FIND_GIGS_BEGIN":
			return {
				...state,
				find_loading: true,
			};
		case "FIND_GIGS_SUCCESS":
			return {
				...state,
				nearby_gigs: action.payload,
				find_loading: false,
			};
		case "FIND_GIGS_FAILURE":
			return {
				...state,
				error: action.payload.error,
				find_loading: false,
			};
		case "GET_GIGS_BEGIN":
			return {
				...state,
				gigs_loading: true,
			};
		case "GET_GIGS_SUCCESS":
			return {
				...state,
				gigs_loading: false,
				gigs: action.payload,
			};
		case "GET_GIGS_FAILURE":
			return {
				...state,
				gigs_loading: false,
				error: action.payload,
			};
		case "TOGGLE_CREATE":
			return {
				...state,
				toggle_create: true,
				toggle_join: false,
				toggle_gigs: false,
			};
		case "TOGGLE_JOIN":
			return {
				...state,
				toggle_create: false,
				toggle_join: true,
				toggle_gigs: false,
			};
		case "TOGGLE_GIGS":
			return {
				...state,
				toggle_create: false,
				toggle_join: false,
				toggle_gigs: true,
      };
      case "SET_PREV_PATH":
      return {
        ...state,
        prev_path: action.payload
      }
		case "RESET_DASH":
			return {
				...state,
				toggle_create: false,
				toggle_join: false,
				toggle_gigs: true,
				loading: false,
				error: null,
				nearby_gigs: null,
        find_loading: null,
        prev_path: null
			};
		default:
			return state;
	}
};
