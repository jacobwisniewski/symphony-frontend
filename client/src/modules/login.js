const initialState = {
  url: null,
  state: null,
  loading: false,
  error: null,
  logged_in: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "URL_FETCH_BEGIN":
      return {
        ...state,
        loading: true
      };
    case "URL_FETCH_SUCCESS":
      return {
        ...state,
        url: action.payload.url,
        state: action.payload.state,
        loading: false
      };
    case "URL_FETCH_FAILURE":
      return {
        ...state,
        error: action.payload.error,
        loading: false
      };
    case "USER_LOGIN":
      return {
        ...state,
        logged_in: true
      };
    default:
      return state;
  }
};
