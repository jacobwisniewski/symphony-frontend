const initialState = {
  access_code: null,
  logged_in: false
};

// Callback reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case "PUSH_CODE":
      return {
        ...state,
        access_code: action.payload
      };
    case "LOG_IN":
    return {
      ...state,
      logged_in: true
    }
    case "LOG_OUT":
    return {
      ...state,
      logged_in: false
    }
    default:
      return state;
  }
};
