const initialState = {
  logged_in: false
};

// Callback reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case "LOG_IN":
    return {
      ...state,
      logged_in: true
    }
    default:
      return state;
  }
};
